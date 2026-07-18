import { Lightbulb } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'

export default function LocalWisdomCard() {
  return (
    <WorkspaceCard title="Local Wisdom" icon={Lightbulb} status="ready">
      <p className="text-sm text-gray-600">
        Local tips, etiquette, and insider advice will appear here.
      </p>
    </WorkspaceCard>
  )
}