import { openai } from '@/lib/openai/client'
import { tripTemplateBucketsResponseSchema } from '@/lib/validations/trip-template-ai'
import { zodResponseFormat } from 'openai/helpers/zod'

export async function generateTripTemplateBuckets(
  locationName: string,
  lat: number,
  lon: number,
  includeInternational: boolean
) {
  const completion = await openai.chat.completions.parse({
    model: 'openai/gpt-4o-mini',
    max_tokens: 3000,
    messages: [
      {
        role: 'system',
        content:
          'You are a travel recommendation assistant. Suggest real, well-known trip ideas genuinely reachable from a given location, grouped by trip length. Only suggest places that actually exist — do not invent place names. If unsure of a hyper-local option, suggest the closest well-known regional option you do know of instead of fabricating something closer. For each bucket, return at most 4 suggestions and at least 1.',
      },
      {
        role: 'user',
        content: `Suggest trip ideas near: ${locationName} (approx coordinates ${lat}, ${lon}), grouped into four buckets:
- oneDay: 1-2 short local day-trip ideas, very close by
- threeDay: 2-3 weekend-length trip ideas (2-4 days), regionally close
- sevenDay: 2-3 week-length trip ideas (5-9 days)${includeInternational ? ', at least one of which may be a realistic international option reachable from this location' : ', staying domestic'}
- fifteenDay: 1-2 extended trip ideas (10+ days)${includeInternational ? ', at least one of which may be international' : ', staying domestic'}
Set isInternational to true only for suggestions that cross into a different country than ${locationName}.
For each suggestion, provide a title, 1-2 sentence description, destination name(s), the most practical transport mode, relevant interest tags, category tags, and a realistic day-range for that bucket.`,
      },
    ],
    response_format: zodResponseFormat(tripTemplateBucketsResponseSchema, 'trip_template_buckets'),
  })

  const parsed = completion.choices[0].message.parsed
  if (!parsed) throw new Error('OpenAI did not return valid template suggestions.')

  return {
    oneDay: parsed.oneDay.slice(0, 4),
    threeDay: parsed.threeDay.slice(0, 4),
    sevenDay: parsed.sevenDay.slice(0, 4),
    fifteenDay: parsed.fifteenDay.slice(0, 4),
  }
}