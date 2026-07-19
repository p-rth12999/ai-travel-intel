import { ShieldAlert } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function LocalRegulationsCard({ data }: { data: TripAIContent['localRegulations'] }) {
  return (
    <WorkspaceCard title="Local Regulations & Etiquette" icon={ShieldAlert} status="ready">
      <div className="space-y-2">
        {data.rules.map((r, i) => (
          <div key={i}>
            <p className="text-sm text-gray-700">{r.rule}</p>
            <p className="text-xs text-gray-400">{r.context}</p>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}