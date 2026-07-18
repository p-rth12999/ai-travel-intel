'use server'

import { createClient } from '@/lib/supabase/server'
import { generateTripAIContent } from '@/lib/openai/generate-trip-content'
import { TripAIContent } from '@/lib/validations/trip-ai-content'
import { Trip } from '@/types/trip'

export async function getOrGenerateTripContent(trip: Trip): Promise<TripAIContent> {
  if (trip.ai_content) {
    return trip.ai_content as TripAIContent
  }

  const content = await generateTripAIContent(trip)

  const supabase = await createClient()
  await supabase
    .from('trips')
    .update({ ai_content: content, ai_generated_at: new Date().toISOString() })
    .eq('id', trip.id)

  return content
}