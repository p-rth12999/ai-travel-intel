import { Siren } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

const TYPE_LABELS = {
  hospital: 'Hospital',
  pharmacy: 'Pharmacy',
  emergency_number: 'Emergency number',
  consulate: 'Consulate',
}

export default function EmergencyInfoCard({ data }: { data: TripAIContent['emergencyInfo'] }) {
  return (
    <WorkspaceCard title="Emergency Information" icon={Siren} status="ready">
      <div className="space-y-2">
        {data.items.map((item, i) => (
          <div key={i} className="flex justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-400">{TYPE_LABELS[item.type]}</p>
            </div>
            <p className="text-xs text-gray-500 text-right">{item.detail}</p>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}