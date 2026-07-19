import { zodFunction } from 'openai/helpers/zod'
import { tripAIContentSchema } from '@/lib/validations/trip-ai-content'

export const EDITABLE_CARDS = [
  { key: 'overview', name: 'update_overview', schema: tripAIContentSchema.shape.overview },
  { key: 'timeline', name: 'update_timeline', schema: tripAIContentSchema.shape.timeline },
  { key: 'packingChecklist', name: 'update_packing_checklist', schema: tripAIContentSchema.shape.packingChecklist },
  { key: 'worthItAnalysis', name: 'update_worth_it_analysis', schema: tripAIContentSchema.shape.worthItAnalysis },
  { key: 'crowdIntelligence', name: 'update_crowd_intelligence', schema: tripAIContentSchema.shape.crowdIntelligence },
  { key: 'localWisdom', name: 'update_local_wisdom', schema: tripAIContentSchema.shape.localWisdom },
  { key: 'localRegulations', name: 'update_local_regulations', schema: tripAIContentSchema.shape.localRegulations },
  { key: 'restaurantRecommendations', name: 'update_restaurant_recommendations', schema: tripAIContentSchema.shape.restaurantRecommendations },
  { key: 'weather', name: 'update_weather', schema: tripAIContentSchema.shape.weather },
  { key: 'medicalRecommendations', name: 'update_medical_recommendations', schema: tripAIContentSchema.shape.medicalRecommendations },
  { key: 'smartChecklist', name: 'update_smart_checklist', schema: tripAIContentSchema.shape.smartChecklist },
  { key: 'hiddenGems', name: 'update_hidden_gems', schema: tripAIContentSchema.shape.hiddenGems },
] as const

export const cardEditTools = EDITABLE_CARDS.map((card) =>
  zodFunction({
    name: card.name,
    description: `Rewrite the entire "${card.key}" section with revised, complete data. Call this only when the user asks to change, update, or regenerate this specific part of their trip plan.`,
    parameters: card.schema,
  })
)

export function findCardByToolName(toolName: string) {
  return EDITABLE_CARDS.find((c) => c.name === toolName)
}