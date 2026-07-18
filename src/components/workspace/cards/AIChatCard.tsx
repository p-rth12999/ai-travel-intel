import { MessageCircle } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'

export default function AIChatCard() {
  return (
    <WorkspaceCard title="AI Chat" icon={MessageCircle} status="ready">
      <p className="text-sm text-gray-600">
        A chat interface for follow-up questions about this trip will appear here.
      </p>
    </WorkspaceCard>
  )
}