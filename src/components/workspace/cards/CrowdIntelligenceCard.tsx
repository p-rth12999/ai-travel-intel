import { Users } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

const CROWD_STYLES = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
}
const CROWD_LABELS = {
  low: 'Low crowds',
  medium: 'Moderate crowds',
  high: 'High crowds',
}

export default function CrowdIntelligenceCard({ data }: { data: TripAIContent['crowdIntelligence'] }) {
  return (
    <WorkspaceCard title="Crowd Intelligence" icon={Users} status="ready">
      <div className="space-y-3">
        {data.insights.map((insight, i) => (
          <div key={i}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">{insight.place}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CROWD_STYLES[insight.crowdLevel]}`}>
                {CROWD_LABELS[insight.crowdLevel]}
              </span>
            </div>
            <p className="text-xs text-gray-500">Best time: {insight.bestTimeToVisit}</p>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}