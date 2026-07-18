import { Lightbulb } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function LocalWisdomCard({ data }: { data: TripAIContent['localWisdom'] }) {
  return (
    <WorkspaceCard title="Local Wisdom" icon={Lightbulb} status="ready">
      <ul className="space-y-1.5">
        {data.tips.map((tip, i) => (
          <li key={i} className="text-sm text-gray-600">• {tip}</li>
        ))}
      </ul>
    </WorkspaceCard>
  )
}