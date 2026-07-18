import { CalendarDays } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function TimelineCard({ data }: { data: TripAIContent['timeline'] }) {
  return (
    <WorkspaceCard title="Timeline" icon={CalendarDays} status="ready">
      <div className="space-y-3">
        {data.days.map((day) => (
          <div key={day.day}>
            <p className="text-sm font-medium text-gray-900">Day {day.day}: {day.title}</p>
            <ul className="mt-1 space-y-0.5">
              {day.activities.map((a, i) => (
                <li key={i} className="text-xs text-gray-500">• {a}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}