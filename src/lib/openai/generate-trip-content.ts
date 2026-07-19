import { openai } from '@/lib/openai/client'
import { tripAIContentSchema, TripAIContent } from '@/lib/validations/trip-ai-content'
import { Trip } from '@/types/trip'
import { zodResponseFormat } from 'openai/helpers/zod'

export async function generateTripAIContent(trip: Trip): Promise<TripAIContent> {
  const completion = await openai.chat.completions.parse({
    model: 'openai/gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a travel planning assistant. Generate detailed, practical, and destination-specific content for the trip described. Be specific to the actual destination — avoid generic advice.',
      },
      {
        role: 'user',
        content: `Generate a complete travel plan for this trip:
Journey: ${trip.source} → ${trip.destinations.join(' → ')}
Title: ${trip.title}
Dates: ${trip.start_date} to ${trip.end_date}
Travelers: ${trip.travelers}
Budget: ${trip.budget} ${trip.currency}
Mode of transport: ${trip.transport_mode}
Preferences: ${trip.interests.join(', ') || 'None specified'}
Food preferences/restrictions: ${trip.food_preferences.join(', ') || 'None specified'}
Accessibility needs: ${trip.accessibility_needs.join(', ') || 'None specified'}

This is ONE continuous multi-leg journey, not separate trips. The traveler's origin is ${trip.source} — treat all origin-dependent context (visa/entry requirements relative to this origin, embassy/consulate guidance, home currency for conversions) as fixed throughout the ENTIRE journey, even as the physical location changes leg to leg. Only destination-specific facts (weather, local customs, regulations, crowd levels) should change per stop.

First, determine tripType: "domestic" if every stop is in the same country as ${trip.source}, "international" if any stop differs.

Distribute the timeline across all legs in order (${trip.destinations.join(', then ')}), allocating days sensibly across the total trip duration. Restaurant recommendations must strictly respect the food preferences listed. Timeline, activity, and medical recommendations must account for any accessibility needs listed.

For medicalRecommendations: base suggestions on the expected weather/climate per leg AND the accessibility needs listed.

For currencyInfo and offlineLanguage: only populate these with real data if tripType is "international" — otherwise return null for both.`,
      },
    ],
    response_format: zodResponseFormat(tripAIContentSchema, 'trip_ai_content'),
  })

  const parsed = completion.choices[0].message.parsed

  if (!parsed) {
    throw new Error('OpenAI did not return valid structured content.')
  }

  return parsed
}



