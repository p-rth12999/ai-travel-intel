import { Stethoscope } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function MedicalRecommendationsCard({ data }: { data: TripAIContent['medicalRecommendations'] }) {
  return (
    <WorkspaceCard title="Medical Recommendations" icon={Stethoscope} status="ready">
      <div className="space-y-2">
        {data.items.map((item, i) => (
          <div key={i}>
            <p className="text-sm text-gray-700">{item.recommendation}</p>
            <p className="text-xs text-gray-400">{item.reason}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs italic text-gray-400">
        General wellness suggestions — not medical advice or diagnosis.
      </p>
    </WorkspaceCard>
  )
}