import { Backpack } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'

export default function PackingChecklistCard() {
  return (
    <WorkspaceCard title="Packing Checklist" icon={Backpack} status="ready">
      <p className="text-sm text-gray-600">
        A suggested packing list tailored to your destination and dates will appear here.
      </p>
    </WorkspaceCard>
  )
}