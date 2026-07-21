import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateTripTemplateSuggestions } from '@/lib/openai/generate-trip-templates'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { locationName, lat, lon } = await request.json()
  if (!locationName || typeof lat !== 'number' || typeof lon !== 'number') {
    return NextResponse.json({ error: 'Missing locationName, lat, or lon' }, { status: 400 })
  }

  try {
    const suggestions = await generateTripTemplateSuggestions(locationName, lat, lon)

    const rows = suggestions.map((s) => ({
      title: s.title,
      description: s.description,
      destinations: s.destinations,
      region: locationName,
      state: '',
      country: 'India',
      transport_mode: s.transportMode,
      interests: s.interests,
      tags: s.tags,
      duration_days_min: s.durationDaysMin,
      duration_days_max: s.durationDaysMax,
      popularity_score: 0,
      latitude: lat,
      longitude: lon,
      image_seed: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).slice(2, 7),
      ai_generated: true,
    }))

    const { error } = await supabase.from('trip_templates').insert(rows)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ inserted: rows.length })
  } catch (err) {
    console.error('Template generation failed:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}