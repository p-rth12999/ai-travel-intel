import { z } from 'zod'
import { tripAIContentSchema } from './trip-ai-content'

export const tripHealthSchema = z.object({
  score: z.number().min(0).max(100),
  level: z.enum(['green', 'yellow', 'red']),
  summary: z.string(),
  factors: z.array(z.string()),
})

export type TripHealth = z.infer<typeof tripHealthSchema>

export const AFFECTED_CARD_KEYS = [
  'weather',
  'packingChecklist',
  'timeline',
  'crowdIntelligence',
  'localRegulations',
  'mobilityIntelligence',
  'accommodationIntelligence',
] as const

export const liveIntelligenceResponseSchema = z.object({
  tripHealth: tripHealthSchema,
  updateSummary: z.string(),
  affectedCards: z.array(z.enum(AFFECTED_CARD_KEYS)),
  cardPatches: z.object({
    weather: tripAIContentSchema.shape.weather.nullable(),
    packingChecklist: tripAIContentSchema.shape.packingChecklist.nullable(),
    timeline: tripAIContentSchema.shape.timeline.nullable(),
    crowdIntelligence: tripAIContentSchema.shape.crowdIntelligence.nullable(),
    localRegulations: tripAIContentSchema.shape.localRegulations.nullable(),
    mobilityIntelligence: tripAIContentSchema.shape.mobilityIntelligence.nullable(),
    accommodationIntelligence: tripAIContentSchema.shape.accommodationIntelligence.nullable(),
  }),
})

