import { ListChecks } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function SmartChecklistCard({ data }: { data: TripAIContent['smartChecklist'] }) {
  return (
    <WorkspaceCard title="Smart Checklist" icon={ListChecks} status="ready">
      <div className="space-y-2">
        {data.tasks.map((t, i) => (
          <div key={i} className="flex items-start justify-between gap-2">
            <p className="text-sm text-gray-700">{t.task}</p>
            <span className="whitespace-nowrap text-xs text-gray-400">{t.timeframe}</span>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}