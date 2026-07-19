import { BedDouble } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function AccommodationIntelligenceCard({ data }: { data: TripAIContent['accommodationIntelligence'] }) {
  return (
    <WorkspaceCard title="Accommodation Intelligence" icon={BedDouble} status="ready">
      <div className="space-y-3">
        {data.insights.map((insight, i) => (
          <div key={i}>
            <p className="text-sm font-medium text-gray-900">{insight.destination}</p>
            <p className="text-xs text-gray-500">{insight.insight}</p>
            <p className="text-xs text-gray-400">Book: {insight.recommendedBookingWindow}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2 border-t border-gray-100 pt-2">
        {data.recommendations.map((rec, i) => (
          <div key={i}>
            <p className="text-xs font-medium text-gray-700">{rec.destination}: {rec.primary}</p>
            <p className="text-xs text-gray-400">Alternatives: {rec.alternatives.join(', ')}</p>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}