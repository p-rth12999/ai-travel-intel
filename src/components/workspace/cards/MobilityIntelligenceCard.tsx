import { Navigation } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function MobilityIntelligenceCard({ data }: { data: TripAIContent['mobilityIntelligence'] }) {
  return (
    <WorkspaceCard title="Mobility Intelligence" icon={Navigation} status="ready">
      {data.rentalVehicleAssessment && (
        <p className="mb-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-800">{data.rentalVehicleAssessment}</p>
      )}
      <div className="space-y-3">
        {data.destinationNotes.map((note, i) => (
          <div key={i}>
            <p className="text-sm font-medium text-gray-900">
              {note.destination} {note.isCarFree && <span className="text-xs text-red-500">(car-free)</span>}
            </p>
            <ul className="mt-1 space-y-0.5">
              {note.recommendedRoute.map((step, j) => (
                <li key={j} className="text-xs text-gray-500">• {step}</li>
              ))}
            </ul>
            <p className="mt-0.5 text-xs italic text-gray-400">{note.reasoning}</p>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}