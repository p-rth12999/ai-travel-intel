export type TripStatus = 'planning' | 'upcoming' | 'completed' | 'cancelled'


export type DestinationMeta = {
  destination: string
     country: string | null
   countryCode: string | null
  lat: number | null
  lon: number | null
 }

export interface Trip {
  id: string
  user_id: string
  title: string
  source: string
  destinations: string[]
  destination_meta: DestinationMeta[] | null
  auto_sequence: boolean
  start_date: string
  end_date: string
  travelers: number
  budget: number
  currency: string
  transport_mode: string
  interests: string[]
  food_preferences: string[]
  accessibility_needs: string[]
  status: TripStatus
  created_at: string
  ai_content: unknown | null
  ai_generated_at: string | null
  trip_health: unknown | null
  live_intelligence_refreshed_at: string | null
}