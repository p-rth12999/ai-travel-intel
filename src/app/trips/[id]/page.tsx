import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import TripHeader from '@/components/trips/TripHeader'
import WorkspaceGrid from '@/components/workspace/WorkspaceGrid'
import WorkspaceGridSkeleton from '@/components/workspace/WorkspaceGridSkeleton'
import { getOrGenerateTripContent } from '@/lib/openai/get-or-generate-trip-content'
import { tripAIContentSchema } from '@/lib/validations/trip-ai-content'
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

  const { data: trip, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !trip) notFound()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <TripHeader trip={trip} />
      <Suspense fallback={<WorkspaceGridSkeleton status="loading" />}>
        <AIWorkspaceSection trip={trip} />
      </Suspense>
    </div>
  )
}