import { z } from 'zod'
import { TRIP_INTERESTS, TRANSPORT_MODES } from './trip'

export const DURATION_BUCKETS = ['1_day', '3_day', '7_day', '15_day'] as const
export const TEMPLATE_TAGS = ['trek', 'fort', 'temple', 'beach', 'chill', 'adventure', 'rainy_season', 'city', 'nature'] as const

export const tripTemplateSuggestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  destinations: z.array(z.string()).min(1),
  transportMode: z.enum(TRANSPORT_MODES),
  interests: z.array(z.enum(TRIP_INTERESTS)),
  tags: z.array(z.enum(TEMPLATE_TAGS)).min(1),
  durationDaysMin: z.number().int().min(1).max(20),
  durationDaysMax: z.number().int().min(1).max(20),
  isInternational: z.boolean(),
})

export const tripTemplateBucketsResponseSchema = z.object({
  oneDay: z.array(tripTemplateSuggestionSchema).min(1).max(4),
  threeDay: z.array(tripTemplateSuggestionSchema).min(1).max(4),
  sevenDay: z.array(tripTemplateSuggestionSchema).min(1).max(4),
  fifteenDay: z.array(tripTemplateSuggestionSchema).min(1).max(4),
})

export type TripTemplateSuggestion = z.infer<typeof tripTemplateSuggestionSchema>