import { TripAIContent } from '@/lib/validations/trip-ai-content'
import WorkspaceSections from '@/components/workspace/WorkspaceSections'
import AIChatCard from '@/components/workspace/cards/AIChatCard'
import { DestinationMeta } from '@/types/trip'

export default function WorkspaceGrid({
  content,
  tripId,
  destinationMeta,
}: {
  content: TripAIContent
  tripId: string
  destinationMeta: DestinationMeta[] | null
}) {
  return (
    <div>
      <WorkspaceSections content={content} destinationMeta={destinationMeta} />
      <AIChatCard tripId={tripId} />
    </div>
  )
}