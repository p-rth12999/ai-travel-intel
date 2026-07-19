import { Trip } from '@/types/trip'

export function computeDisplayStatus(trip: Trip): 'planning' | 'upcoming' | 'completed' | 'cancelled' {
  if (trip.status === 'completed' || trip.status === 'cancelled') return trip.status
  const today = new Date().toISOString().slice(0, 10)
  return today >= trip.start_date ? 'upcoming' : 'planning'
}