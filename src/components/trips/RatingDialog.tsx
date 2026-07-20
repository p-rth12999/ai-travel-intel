'use client'

import { useState } from 'react'
import { Star, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function RatingDialog({ tripId, onClose, onSubmitted }: { tripId: string; onClose: () => void; onSubmitted: () => void }) {
  const supabase = createClient()
  const [stars, setStars] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit() {
    if (stars === 0) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }

    await supabase.from('trip_ratings').insert({ trip_id: tripId, user_id: user.id, stars, feedback: feedback || null })
    await supabase.from('trips').update({ status: 'completed' }).eq('id', tripId)
    setSaving(false)
    onSubmitted()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
  <div className="w-full max-w-sm rounded-3xl border border-white/40 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">How was your trip?</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        <div className="mb-4 flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setStars(n)}>
              <Star className={`h-8 w-8 ${n <= stars ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Any other feedback? (optional)"
          rows={3}
          className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={stars === 0 || saving}
          className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Submit & mark trip complete'}
        </button>
      </div>
    </div>
  )
}