import { Gem } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function HiddenGemsCard({ data }: { data: TripAIContent['hiddenGems'] }) {
  return (
    <WorkspaceCard title="Hidden Gems" icon={Gem} status="ready">
      <div className="space-y-3">
        {data.spots.map((spot, i) => (
          <div key={i}>
            <p className="text-sm font-medium text-gray-900">{spot.name}</p>
            <p className="text-xs text-gray-500">{spot.description}</p>
            <p className="mt-0.5 text-xs italic text-gray-400">{spot.whyHiddenGem}</p>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}