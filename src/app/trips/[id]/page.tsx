import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import TripHeader from '@/components/trips/TripHeader'
import WorkspaceGrid from '@/components/workspace/WorkspaceGrid'
import WorkspaceGridSkeleton from '@/components/workspace/WorkspaceGridSkeleton'
import TripHealthCard from '@/components/workspace/cards/TripHealthCard'
import TripUpdateBanner from '@/components/trips/TripUpdateBanner'
import { CompletionProvider } from '@/components/workspace/CompletionContext'
import { getOrGenerateTripContent } from '@/lib/openai/get-or-generate-trip-content'
import { refreshLiveIntelligenceIfNeeded } from '@/lib/openai/refresh-live-intelligence'
import { tripAIContentSchema } from '@/lib/validations/trip-ai-content'
import { tripHealthSchema } from '@/lib/validations/trip-live-intelligence'
import { Trip } from '@/types/trip'

async function AIWorkspaceSection({ trip }: { trip: Trip }) {
  let content: ReturnType<typeof tripAIContentSchema.parse> | null = null
  let hasError = false

  try {
    const rawContent = await getOrGenerateTripContent(trip)
    const parsed = tripAIContentSchema.safeParse(rawContent)
    if (!parsed.success) {
      console.error('Zod validation failed:', parsed.error)
      hasError = true
    } else {
      content = parsed.data
    }
  } catch (err) {
    console.error('AI content generation failed:', err)
    hasError = true
  }

  if (hasError || !content) {
    return <WorkspaceGridSkeleton status="error" />
  }

  return <WorkspaceGrid content={content} tripId={trip.id} />
}

export default async function TripWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: initialTrip, error } = await supabase.from('trips').select('*').eq('id', id).single()
  if (error || !initialTrip) notFound()

  await refreshLiveIntelligenceIfNeeded(initialTrip as Trip)

  const { data: trip } = await supabase.from('trips').select('*').eq('id', id).single()
  const finalTrip = (trip ?? initialTrip) as Trip

  const healthParsed = finalTrip.trip_health ? tripHealthSchema.safeParse(finalTrip.trip_health) : null
if (finalTrip.trip_health && !healthParsed?.success) {
  console.error('Trip health validation failed:', healthParsed?.error)
}

  const { data: latestUpdate } = await supabase
    .from('trip_update_log')
    .select('*')
    .eq('trip_id', id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <CompletionProvider>
        <TripHeader trip={finalTrip} />
        {latestUpdate && (
          <TripUpdateBanner summary={latestUpdate.summary} affectedCards={latestUpdate.affected_cards} />
        )}
        {healthParsed?.success && (
          <div className="mb-6">
            <TripHealthCard health={healthParsed.data} />
          </div>
        )}
        <Suspense fallback={<WorkspaceGridSkeleton status="loading" />}>
          <AIWorkspaceSection trip={finalTrip} />
        </Suspense>
      </CompletionProvider>
    </div>
  )
}