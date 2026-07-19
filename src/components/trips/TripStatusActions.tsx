'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trip } from '@/types/trip'
import { computeDisplayStatus } from '@/lib/trip-status'
import RatingDialog from '@/components/trips/RatingDialog'

export default function TripStatusActions({ trip }: { trip: Trip }) {
  const router = useRouter()
  const supabase = createClient()
  const [showRating, setShowRating] = useState(false)
  const displayStatus = computeDisplayStatus(trip)

  if (displayStatus !== 'upcoming') return null

  async function handleCancel() {
    await supabase.from('trips').update({ status: 'cancelled' }).eq('id', trip.id)
    router.refresh()
  }

  return (
    <>
      <button onClick={() => setShowRating(true)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
        Mark Completed
      </button>
      <button onClick={handleCancel} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
        Cancel Trip
      </button>
      {showRating && (
        <RatingDialog tripId={trip.id} onClose={() => setShowRating(false)} onSubmitted={() => { setShowRating(false); router.refresh() }} />
      )}
    </>
  )
}