'use server'

import { createClient } from '@/lib/supabase/server'
import { generateTripAIContent } from '@/lib/openai/generate-trip-content'
import { tripAIContentSchema, TripAIContent } from '@/lib/validations/trip-ai-content'
import { Trip } from '@/types/trip'

export async function getOrGenerateTripContent(trip: Trip): Promise<TripAIContent> {
  if (trip.ai_content) {
    const cached = tripAIContentSchema.safeParse(trip.ai_content)
    if (cached.success) {
      return cached.data
    }
    // Cached content doesn't match the current schema (e.g. we added new
    // fields since it was generated) — fall through and regenerate.
  }

  const content = await generateTripAIContent(trip)

  const supabase = await createClient()
  await supabase
    .from('trips')
    .update({ ai_content: content, ai_generated_at: new Date().toISOString() })
    .eq('id', trip.id)

  return content
}