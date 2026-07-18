import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import TripHeader from '@/components/trips/TripHeader'
import WorkspaceGrid from '@/components/workspace/WorkspaceGrid'
import WorkspaceGridSkeleton from '@/components/workspace/WorkspaceGridSkeleton'
import { getOrGenerateTripContent } from '@/lib/openai/get-or-generate-trip-content'
import { tripAIContentSchema } from '@/lib/validations/trip-ai-content'

async function AIWorkspaceSection({ trip }: { trip: any }) {
  try {
    const rawContent = await getOrGenerateTripContent(trip)
    const parsed = tripAIContentSchema.safeParse(rawContent)

    if (!parsed.success) {
      return <WorkspaceGridSkeleton status="error" />
    }

    return <WorkspaceGrid content={parsed.data} />
  } catch {
    return <WorkspaceGridSkeleton status="error" />
  }
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