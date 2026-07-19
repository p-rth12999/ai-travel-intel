import { Languages } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function OfflineLanguageCard({ data }: { data: NonNullable<TripAIContent['offlineLanguage']> }) {
  return (
    <WorkspaceCard title="Offline Language" icon={Languages} status="ready">
      <div className="space-y-1.5">
        {data.phrases.map((p, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-700">{p.phrase}</span>
            <span className="text-gray-400">{p.translation}</span>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}