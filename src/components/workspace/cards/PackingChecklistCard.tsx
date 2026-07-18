import { Backpack } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function PackingChecklistCard({ data }: { data: TripAIContent['packingChecklist'] }) {
  return (
    <WorkspaceCard title="Packing Checklist" icon={Backpack} status="ready">
      <div className="space-y-3">
        {data.categories.map((cat, i) => (
          <div key={i}>
            <p className="text-sm font-medium text-gray-900">{cat.category}</p>
            <ul className="mt-1 space-y-0.5">
              {cat.items.map((item, j) => (
                <li key={j} className="text-xs text-gray-500">• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}