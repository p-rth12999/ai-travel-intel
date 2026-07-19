'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, RefreshCw } from 'lucide-react'
import { Trip } from '@/types/trip'
import EditTripDialog from '@/components/trips/EditTripDialog'
import { regenerateTripContent } from '@/lib/openai/regenerate-trip-content'

export default function TripHeaderActions({ trip }: { trip: Trip }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  async function handleRegenerate() {
    setIsRegenerating(true)
    try {
      await regenerateTripContent(trip.id)
      router.refresh()
    } finally {
      setIsRegenerating(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
        <button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
          {isRegenerating ? 'Regenerating...' : 'Regenerate plan'}
        </button>
      </div>

      {isEditing && <EditTripDialog trip={trip} onClose={() => setIsEditing(false)} />}
    </>
  )
}