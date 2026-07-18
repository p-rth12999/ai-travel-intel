import { UtensilsCrossed } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function RestaurantRecommendationsCard({ data }: { data: TripAIContent['restaurantRecommendations'] }) {
  return (
    <WorkspaceCard title="Restaurant Recommendations" icon={UtensilsCrossed} status="ready">
      <div className="space-y-3">
        {data.restaurants.map((r, i) => (
          <div key={i}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">{r.name}</p>
              <span className="text-xs text-gray-400">{r.priceRange}</span>
            </div>
            <p className="text-xs text-gray-500">{r.cuisine} — {r.note}</p>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  )
}