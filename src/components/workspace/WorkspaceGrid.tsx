import { TripAIContent } from '@/lib/validations/trip-ai-content'
import OverviewCard from '@/components/workspace/cards/OverviewCard'
import TimelineCard from '@/components/workspace/cards/TimelineCard'
import PackingChecklistCard from '@/components/workspace/cards/PackingChecklistCard'
import WorthItAnalysisCard from '@/components/workspace/cards/WorthItAnalysisCard'
import HiddenGemsCard from '@/components/workspace/cards/HiddenGemsCard'
import RestaurantRecommendationsCard from '@/components/workspace/cards/RestaurantRecommendationsCard'
import CrowdIntelligenceCard from '@/components/workspace/cards/CrowdIntelligenceCard'
import SmartChecklistCard from '@/components/workspace/cards/SmartChecklistCard'
import LocalWisdomCard from '@/components/workspace/cards/LocalWisdomCard'
import LocalRegulationsCard from '@/components/workspace/cards/LocalRegulationsCard'
import WeatherCard from '@/components/workspace/cards/WeatherCard'
import MedicalRecommendationsCard from '@/components/workspace/cards/MedicalRecommendationsCard'
import EmergencyInfoCard from '@/components/workspace/cards/EmergencyInfoCard'
import CurrencyInfoCard from '@/components/workspace/cards/CurrencyInfoCard'
import OfflineLanguageCard from '@/components/workspace/cards/OfflineLanguageCard'
import AIChatCard from '@/components/workspace/cards/AIChatCard'
import MobilityIntelligenceCard from '@/components/workspace/cards/MobilityIntelligenceCard'
import AccommodationIntelligenceCard from '@/components/workspace/cards/AccommodationIntelligenceCard'

export default function WorkspaceGrid({ content, tripId }: { content: TripAIContent; tripId: string }) {
  return (
    <div className="space-y-6 print:space-y-4">
      <OverviewCard data={content.overview} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,1fr)_2fr] print:grid-cols-1">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <TimelineCard data={content.timeline} />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Plan</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 print:grid-cols-1">
              <PackingChecklistCard data={content.packingChecklist} />
              <WorthItAnalysisCard data={content.worthItAnalysis} />
              <HiddenGemsCard data={content.hiddenGems} />
              <RestaurantRecommendationsCard data={content.restaurantRecommendations} />
              <CrowdIntelligenceCard data={content.crowdIntelligence} />
              <SmartChecklistCard data={content.smartChecklist} />
              <MobilityIntelligenceCard data={content.mobilityIntelligence} />
<AccommodationIntelligenceCard data={content.accommodationIntelligence} />
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Safety</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 print:grid-cols-1">
              <LocalWisdomCard data={content.localWisdom} />
              <LocalRegulationsCard data={content.localRegulations} />
              <WeatherCard data={content.weather} />
              <MedicalRecommendationsCard data={content.medicalRecommendations} />
              <EmergencyInfoCard data={content.emergencyInfo} />
              {content.tripType === 'international' && content.currencyInfo && <CurrencyInfoCard data={content.currencyInfo} />}
              {content.tripType === 'international' && content.offlineLanguage && <OfflineLanguageCard data={content.offlineLanguage} />}
            </div>
          </div>
        </div>
      </div>

      <AIChatCard tripId={tripId} />
    </div>
  )
}