export type TripStatus = 'planning' | 'upcoming' | 'completed'

export interface Trip {
  id: string
  user_id: string
  title: string
  destination: string
  start_date: string
  end_date: string
  travelers: number
  budget: number
  currency: string
  interests: string[]
  status: TripStatus
  created_at: string
  ai_content: unknown | null
  ai_generated_at: string | null
}