import { z } from 'zod'
import { TRIP_INTERESTS, TRANSPORT_MODES } from './trip'

export const DURATION_BUCKETS = ['1_day', '3_day', '7_day', '15_day'] as const
export const TEMPLATE_TAGS = ['trek', 'fort', 'temple', 'beach', 'chill', 'adventure', 'rainy_season', 'city', 'nature'] as const

export const tripTemplateSuggestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  destinations: z.array(z.string()),
  transportMode: z.enum(TRANSPORT_MODES),
  interests: z.array(z.enum(TRIP_INTERESTS)),
  tags: z.array(z.enum(TEMPLATE_TAGS)),
  durationDaysMin: z.number().int(),
  durationDaysMax: z.number().int(),
  isInternational: z.boolean(),
})

export const tripTemplateBucketsResponseSchema = z.object({
  oneDay: z.array(tripTemplateSuggestionSchema),
  threeDay: z.array(tripTemplateSuggestionSchema),
  sevenDay: z.array(tripTemplateSuggestionSchema),
  fifteenDay: z.array(tripTemplateSuggestionSchema),
})

export type TripTemplateSuggestion = z.infer<typeof tripTemplateSuggestionSchema>