'use client'

import { Backpack } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'
import { useCompletion } from '@/components/workspace/CompletionContext'

export default function PackingChecklistCard({ data }: { data: TripAIContent['packingChecklist'] }) {
  const { completedPackingItems, togglePackingItem } = useCompletion()

  return (
    <WorkspaceCard title="Packing Checklist" icon={Backpack} status="ready">
      <div className="space-y-3">
        {data.categories.map((cat, i) => (
          <div key={i}>
            <p className="text-sm font-medium text-gray-900">{cat.category}</p>
            <ul className="mt-1 space-y-1">
              {cat.items.map((item, j) => {
                const isDone = completedPackingItems.includes(item)
                return (
                  <li key={j} className="flex items-start gap-2 text-xs">
                    <input type="checkbox" checked={isDone} onChange={() => togglePackingItem(item)} className="mt-0.5" />
                    <span className={isDone ? 'text-gray-300 line-through' : 'text-gray-500'}>{item}</span>
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