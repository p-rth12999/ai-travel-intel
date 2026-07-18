import { UtensilsCrossed } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'

export default function RestaurantRecommendationsCard() {
  return (
    <WorkspaceCard title="Restaurant Recommendations" icon={UtensilsCrossed} status="ready">
      <p className="text-sm text-gray-600">
        Food and restaurant picks matched to your interests will appear here.
      </p>
    </WorkspaceCard>
  )
}