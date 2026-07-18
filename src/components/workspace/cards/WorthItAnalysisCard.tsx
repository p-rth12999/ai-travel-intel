import { Scale } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

const VERDICT_STYLES = {
  worth_it: 'bg-green-100 text-green-700',
  skip: 'bg-gray-100 text-gray-600',
  situational: 'bg-amber-100 text-amber-700',
}
const VERDICT_LABELS = {
  worth_it: 'Worth it',
  skip: 'Skip',
  situational: 'Depends',
}

export default function WorthItAnalysisCard({ data }: { data: TripAIContent['worthItAnalysis'] }) {
  return (
    <WorkspaceCard title="Worth-It Analysis" icon={Scale} status="ready">
      <div className="space-y-3">
        {data.items.map((item, i) => (
          <div key={i}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${VERDICT_STYLES[item.verdict]}`}>
                {VERDICT_LABELS[item.verdict]}
              </span>
            </div>
            <p className="text-xs text-gray-500">{item.estimatedCost} — {item.reasoning}</p>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}