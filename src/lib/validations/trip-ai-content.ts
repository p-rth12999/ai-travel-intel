import { z } from 'zod'

export const tripAIContentSchema = z.object({
  tripType: z.enum(['domestic', 'international']),

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
  localRegulations: z.object({
    rules: z.array(
      z.object({
        rule: z.string(),
        context: z.string(),
      })
    ),
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
  medicalRecommendations: z.object({
    items: z.array(
      z.object({
        recommendation: z.string(),
        reason: z.string(),
      })
    ),
  }),
  smartChecklist: z.object({
    tasks: z.array(
      z.object({
        task: z.string(),
        timeframe: z.string(),
      })
    ),
  }),
  hiddenGems: z.object({
    spots: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        whyHiddenGem: z.string(),
      })
    ),
  }),
  emergencyInfo: z.object({
  items: z.array(
    z.object({
      type: z.enum(['hospital', 'pharmacy', 'emergency_number', 'consulate']),
      name: z.string(),
      detail: z.string(),
    })
  ),
}),
mobilityIntelligence: z.object({
  destinationNotes: z.array(
    z.object({
      destination: z.string(),
      isCarFree: z.boolean(),
      recommendedRoute: z.array(z.string()),
      reasoning: z.string(),
    })
  ),
  rentalVehicleAssessment: z.string().nullable(),
}),

accommodationIntelligence: z.object({
  insights: z.array(
    z.object({
      destination: z.string(),
      insight: z.string(),
      recommendedBookingWindow: z.string(),
    })
  ),
  recommendations: z.array(
    z.object({
      destination: z.string(),
      primary: z.string(),
      alternatives: z.array(z.string()),
    })
  ),
}),
  currencyInfo: z
    .object({
      exchangeRateNote: z.string(),
      estimatedConversion: z.string(),
      paymentSuggestions: z.array(z.string()),
    })
    .nullable(),
  offlineLanguage: z
    .object({
      phrases: z.array(
        z.object({
          phrase: z.string(),
          translation: z.string(),
        })
      ),
    })
    .nullable(),
})

export type TripAIContent = z.infer<typeof tripAIContentSchema>