import { openai } from '@/lib/openai/client'
import { tripAIContentSchema, TripAIContent } from '@/lib/validations/trip-ai-content'
import { Trip } from '@/types/trip'
import { zodResponseFormat } from 'openai/helpers/zod'

export async function generateTripAIContent(
  trip: Trip,
  completedActivities: string[] = [],
  completedPackingItems: string[] = []
): Promise<TripAIContent> {
  const progressNote =
    completedActivities.length > 0 || completedPackingItems.length > 0
      ? `

The traveler has already completed part of this plan. Already-done activities (do not repeat or reschedule these — continue the itinerary from the next logical point onward, renumbering remaining days starting from Day 1): ${completedActivities.join('; ')}. Already-handled packing items (exclude these from the new checklist): ${completedPackingItems.join('; ') || 'none'}.`
      : ''

const completion = await openai.chat.completions.parse({
  model: 'openai/gpt-4o-mini',
  max_tokens: 4000,
  messages: [
      { role: 'system', content: 'You are a travel planning assistant. Generate detailed, practical, and destination-specific content for the trip described. Be specific to the actual destination — avoid generic advice.' },
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
Accessibility needs: ${trip.accessibility_needs.join(', ') || 'None specified'}${progressNote}

This is ONE continuous multi-leg journey, not separate trips. Keep origin-dependent context (visa status, embassy references, home currency) fixed throughout regardless of which leg is being discussed.
First, determine tripType: "domestic" if every stop is in the same country as ${trip.source}, "international" otherwise.
Restaurant recommendations must strictly respect food preferences. Timeline, activities, and medical recommendations must account for accessibility needs.
For currencyInfo and offlineLanguage: only populate if tripType is "international", otherwise return null for both.`,
      },
    ],
    response_format: zodResponseFormat(tripAIContentSchema, 'trip_ai_content'),
  })

  const parsed = completion.choices[0].message.parsed
  if (!parsed) throw new Error('OpenAI did not return valid structured content.')
  return parsed
}




