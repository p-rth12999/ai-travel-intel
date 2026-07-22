import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateTripTemplateBuckets } from '@/lib/openai/generate-trip-templates'
import { DURATION_BUCKETS } from '@/lib/validations/trip-template-ai'

const BUCKET_KEYS = ['oneDay', 'threeDay', 'sevenDay', 'fifteenDay'] as const
const BUCKET_MAP: Record<(typeof BUCKET_KEYS)[number], (typeof DURATION_BUCKETS)[number]> = {
  oneDay: '1_day',
  threeDay: '3_day',
  sevenDay: '7_day',
  fifteenDay: '15_day',
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { locationName, lat, lon, includeInternational } = await request.json()
  if (!locationName || typeof lat !== 'number' || typeof lon !== 'number') {
    return NextResponse.json({ error: 'Missing locationName, lat, or lon' }, { status: 400 })
  }

  const box = 0.25
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()

  const { data: cached } = await supabase
    .from('trip_templates')
    .select('duration_bucket')
    .gte('latitude', lat - box)
    .lte('latitude', lat + box)
    .gte('longitude', lon - box)
    .lte('longitude', lon + box)
    .gte('created_at', threeDaysAgo)

  const cachedBuckets = new Set((cached ?? []).map((c) => c.duration_bucket))
  const allBucketsCovered = DURATION_BUCKETS.every((b) => cachedBuckets.has(b))

  if (allBucketsCovered) {
    return NextResponse.json({ cached: true, inserted: 0 })
  }

  try {
    const buckets = await generateTripTemplateBuckets(locationName, lat, lon, !!includeInternational)

    const rows = BUCKET_KEYS.flatMap((bucketKey) =>
      buckets[bucketKey].map((s) => ({
        title: s.title,
        description: s.description,
        destinations: s.destinations,
        region: locationName,
        state: '',
        country: '',
        transport_mode: s.transportMode,
        interests: s.interests,
        tags: s.tags,
        duration_days_min: s.durationDaysMin,
        duration_days_max: s.durationDaysMax,
        duration_bucket: BUCKET_MAP[bucketKey],
        is_international: s.isInternational,
        popularity_score: 0,
        latitude: lat,
        longitude: lon,
        image_seed: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).slice(2, 7),
        ai_generated: true,
      }))
    )

    const { error } = await supabase.from('trip_templates').insert(rows)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ cached: false, inserted: rows.length })
  } catch (err) {
    console.error('Template generation failed:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}