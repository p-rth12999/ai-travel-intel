export type TripStatus = 'planning' | 'upcoming' | 'completed' | 'cancelled'

export interface Trip {
  id: string
  user_id: string
  title: string
  source: string
  destinations: string[]
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