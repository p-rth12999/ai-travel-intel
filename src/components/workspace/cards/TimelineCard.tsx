'use client'

import { CalendarDays } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'
import { useCompletion } from '@/components/workspace/CompletionContext'

export default function TimelineCard({ data }: { data: TripAIContent['timeline'] }) {
  const { completedActivities, toggleActivity } = useCompletion()

  return (
    <WorkspaceCard title="Timeline" icon={CalendarDays} status="ready">
      <div className="space-y-4">
        {data.days.map((day) => (
          <div key={day.day}>
            <p className="text-sm font-medium text-gray-900">Day {day.day}: {day.title}</p>
            <ul className="mt-1 space-y-1">
              {day.activities.map((activity, i) => {
                const isDone = completedActivities.includes(activity)
                return (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <input type="checkbox" checked={isDone} onChange={() => toggleActivity(activity)} className="mt-0.5" />
                    <span className={isDone ? 'text-gray-300 line-through' : 'text-gray-500'}>{activity}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}