import { Users } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'

export default function CrowdIntelligenceCard() {
  return (
    <WorkspaceCard title="Crowd Intelligence" icon={Users} status="ready">
      <p className="text-sm text-gray-600">
        Predictions on busy vs. quiet times for popular spots will appear here.
      </p>
    </WorkspaceCard>
  )
}