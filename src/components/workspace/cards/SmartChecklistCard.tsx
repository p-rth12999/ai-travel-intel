import { ListChecks } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'

export default function SmartChecklistCard() {
  return (
    <WorkspaceCard title="Smart Checklist" icon={ListChecks} status="ready">
      <p className="text-sm text-gray-600">
        Pre-departure to-dos (visas, bookings, reminders) will appear here.
      </p>
    </WorkspaceCard>
  )
}