import { z } from 'zod'

export const tripAIContentSchema = z.object({
  overview: z.object({
    summary: z.string(),
    highlights: z.array(z.string()),
  }),
  timeline: z.object({
    days: z.array(
      z.object({
        day: z.number(),
        date: z.string(),
        title: z.string(),
        activities: z.array(z.string()),
      })
    ),
  }),
  packingChecklist: z.object({
    categories: z.array(
      z.object({
        category: z.string(),
        items: z.array(z.string()),
      })
    ),
  }),
  worthItAnalysis: z.object({
    items: z.array(
      z.object({
        name: z.string(),
        estimatedCost: z.string(),
        verdict: z.enum(['worth_it', 'skip', 'situational']),
        reasoning: z.string(),
      })
    ),
  }),
  crowdIntelligence: z.object({
    insights: z.array(
      z.object({
        place: z.string(),
        bestTimeToVisit: z.string(),
        crowdLevel: z.enum(['low', 'medium', 'high']),
      })
    ),
  }),
  localWisdom: z.object({
    tips: z.array(z.string()),
  }),
  restaurantRecommendations: z.object({
    restaurants: z.array(
      z.object({
        name: z.string(),
        cuisine: z.string(),
        priceRange: z.enum(['$', '$$', '$$$', '$$$$']),
        note: z.string(),
      })
    ),
  }),
  weather: z.object({
    forecastSummary: z.string(),
    averageTempRange: z.string(),
    packingNote: z.string(),
  }),
  smartChecklist: z.object({
    tasks: z.array(
      z.object({
        task: z.string(),
        timeframe: z.string(),
      })
    ),
  }),
})

export type TripAIContent = z.infer<typeof tripAIContentSchema>