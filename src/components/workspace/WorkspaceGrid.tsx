import { TripAIContent } from '@/lib/validations/trip-ai-content'
import OverviewCard from '@/components/workspace/cards/OverviewCard'
import TimelineCard from '@/components/workspace/cards/TimelineCard'
import PackingChecklistCard from '@/components/workspace/cards/PackingChecklistCard'
import WorthItAnalysisCard from '@/components/workspace/cards/WorthItAnalysisCard'
import CrowdIntelligenceCard from '@/components/workspace/cards/CrowdIntelligenceCard'
import LocalWisdomCard from '@/components/workspace/cards/LocalWisdomCard'
import LocalRegulationsCard from '@/components/workspace/cards/LocalRegulationsCard'
import RestaurantRecommendationsCard from '@/components/workspace/cards/RestaurantRecommendationsCard'
import WeatherCard from '@/components/workspace/cards/WeatherCard'
import MedicalRecommendationsCard from '@/components/workspace/cards/MedicalRecommendationsCard'
import SmartChecklistCard from '@/components/workspace/cards/SmartChecklistCard'
import HiddenGemsCard from '@/components/workspace/cards/HiddenGemsCard'
import CurrencyInfoCard from '@/components/workspace/cards/CurrencyInfoCard'
import OfflineLanguageCard from '@/components/workspace/cards/OfflineLanguageCard'
import EmergencyInfoCard from '@/components/workspace/cards/EmergencyInfoCard'
import AIChatCard from '@/components/workspace/cards/AIChatCard'



export default function WorkspaceGrid({ content, tripId }: { content: TripAIContent; tripId: string }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-1 print:gap-3">
      <OverviewCard data={content.overview} />
      <TimelineCard data={content.timeline} />
      <PackingChecklistCard data={content.packingChecklist} />
      <WorthItAnalysisCard data={content.worthItAnalysis} />
      <CrowdIntelligenceCard data={content.crowdIntelligence} />
      <HiddenGemsCard data={content.hiddenGems} />
      <LocalWisdomCard data={content.localWisdom} />
      <LocalRegulationsCard data={content.localRegulations} />
      <RestaurantRecommendationsCard data={content.restaurantRecommendations} />
      <EmergencyInfoCard data={content.emergencyInfo} />
      <WeatherCard data={content.weather} />
      <MedicalRecommendationsCard data={content.medicalRecommendations} />
      <SmartChecklistCard data={content.smartChecklist} />
      {content.tripType === 'international' && content.currencyInfo && (
        <CurrencyInfoCard data={content.currencyInfo} />
      )}
      {content.tripType === 'international' && content.offlineLanguage && (
        <OfflineLanguageCard data={content.offlineLanguage} />
      )}
      <div className="print:hidden">
        <AIChatCard tripId={tripId} />
      </div>
    </div>
  )
}