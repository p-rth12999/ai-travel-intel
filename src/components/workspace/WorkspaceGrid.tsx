import { TripAIContent } from '@/lib/validations/trip-ai-content'
import WorkspaceSections from '@/components/workspace/WorkspaceSections'
import AIChatCard from '@/components/workspace/cards/AIChatCard'

export default function WorkspaceGrid({ content, tripId }: { content: TripAIContent; tripId: string }) {
  return (
    <div>
      <WorkspaceSections content={content} />
      <AIChatCard tripId={tripId} />
    </div>
  )
}