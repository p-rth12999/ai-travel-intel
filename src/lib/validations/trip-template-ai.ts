import { z } from 'zod'
import { TRIP_INTERESTS, TRANSPORT_MODES } from './trip'

export const TEMPLATE_TAGS = ['trek', 'fort', 'temple', 'beach', 'chill', 'adventure', 'rainy_season'] as const

export const tripTemplateSuggestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  destinations: z.array(z.string()).min(1),
  transportMode: z.enum(TRANSPORT_MODES),
  interests: z.array(z.enum(TRIP_INTERESTS)),
  tags: z.array(z.enum(TEMPLATE_TAGS)).min(1),
  durationDaysMin: z.number().int().min(1).max(14),
  durationDaysMax: z.number().int().min(1).max(14),
})

export const tripTemplateSuggestionsResponseSchema = z.object({
  suggestions: z.array(tripTemplateSuggestionSchema).min(1).max(5),
})

export type TripTemplateSuggestion = z.infer<typeof tripTemplateSuggestionSchema>