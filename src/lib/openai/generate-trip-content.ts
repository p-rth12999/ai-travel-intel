import { openai } from '@/lib/openai/client'
import { tripAIContentSchema, TripAIContent } from '@/lib/validations/trip-ai-content'
import { Trip } from '@/types/trip'
import { zodResponseFormat } from 'openai/helpers/zod'

export async function generateTripAIContent(trip: Trip): Promise<TripAIContent> {
  const completion = await openai.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [
      {
        role: 'system',
        content:
          'You are a travel planning assistant. Generate detailed, practical, and destination-specific content for the trip described. Be specific to the actual destination — avoid generic advice.',
      },
      {
        role: 'user',
        content: `Generate a complete travel plan for this trip:
Title: ${trip.title}
Destination: ${trip.destination}
Dates: ${trip.start_date} to ${trip.end_date}
Travelers: ${trip.travelers}
Budget: ${trip.budget} ${trip.currency}
Interests: ${trip.interests.join(', ')}`,
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