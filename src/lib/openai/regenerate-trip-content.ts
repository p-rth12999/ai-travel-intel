'use server'

import { createClient } from '@/lib/supabase/server'
import { generateTripAIContent } from '@/lib/openai/generate-trip-content'
import { Trip } from '@/types/trip'

export async function regenerateTripContent(
  tripId: string,
  completedActivities: string[] = [],
  completedPackingItems: string[] = []
) {
  const supabase = await createClient()
  const { data: trip, error } = await supabase.from('trips').select('*').eq('id', tripId).single()
  if (error || !trip) throw new Error('Trip not found')

  const content = await generateTripAIContent(trip as Trip, completedActivities, completedPackingItems)

  await supabase.from('trips').update({ ai_content: content, ai_generated_at: new Date().toISOString() }).eq('id', tripId)
}