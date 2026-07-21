import { openai } from '@/lib/openai/client'
import { tripTemplateSuggestionsResponseSchema } from '@/lib/validations/trip-template-ai'
import { zodResponseFormat } from 'openai/helpers/zod'

export async function generateTripTemplateSuggestions(locationName: string, lat: number, lon: number) {
  const completion = await openai.chat.completions.parse({
    model: 'openai/gpt-4o-mini',
    max_tokens: 2000,
    messages: [
      {
        role: 'system',
        content:
          'You are a travel recommendation assistant. Suggest real, well-known short trip ideas (treks, forts, temples, beaches, hill stations) genuinely near a given location. Only suggest places that actually exist and are genuinely reachable from the given location within a reasonable day-trip or short-weekend range — do not invent place names. If you are not confident about specific nearby spots, suggest the closest well-known regional options you do know of, even if slightly farther, rather than fabricating something closer.',
      },
      {
        role: 'user',
        content: `Suggest 3-5 short trip ideas near: ${locationName} (approx coordinates ${lat}, ${lon}).
For each, provide a title, a 1-2 sentence description, the destination name(s), the most practical transport mode, relevant interest tags, category tags, and a realistic duration range in days.`,
      },
    ],
    response_format: zodResponseFormat(tripTemplateSuggestionsResponseSchema, 'trip_template_suggestions'),
  })

  const parsed = completion.choices[0].message.parsed
  if (!parsed) throw new Error('OpenAI did not return valid template suggestions.')
  return parsed.suggestions
}