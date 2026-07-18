import { TripAIContent } from '@/lib/validations/trip-ai-content'
import OverviewCard from '@/components/workspace/cards/OverviewCard'
import TimelineCard from '@/components/workspace/cards/TimelineCard'
import PackingChecklistCard from '@/components/workspace/cards/PackingChecklistCard'
import WorthItAnalysisCard from '@/components/workspace/cards/WorthItAnalysisCard'
import CrowdIntelligenceCard from '@/components/workspace/cards/CrowdIntelligenceCard'
import LocalWisdomCard from '@/components/workspace/cards/LocalWisdomCard'
import RestaurantRecommendationsCard from '@/components/workspace/cards/RestaurantRecommendationsCard'
import WeatherCard from '@/components/workspace/cards/WeatherCard'
import SmartChecklistCard from '@/components/workspace/cards/SmartChecklistCard'
import AIChatCard from '@/components/workspace/cards/AIChatCard'

export default function WorkspaceGrid({ content, tripId }: { content: TripAIContent; tripId: string }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <OverviewCard data={content.overview} />
      <TimelineCard data={content.timeline} />
      <PackingChecklistCard data={content.packingChecklist} />
      <WorthItAnalysisCard data={content.worthItAnalysis} />
      <CrowdIntelligenceCard data={content.crowdIntelligence} />
      <LocalWisdomCard data={content.localWisdom} />
      <RestaurantRecommendationsCard data={content.restaurantRecommendations} />
      <WeatherCard data={content.weather} />
      <SmartChecklistCard data={content.smartChecklist} />
      <AIChatCard tripId={tripId} />
    </div>
  )
}