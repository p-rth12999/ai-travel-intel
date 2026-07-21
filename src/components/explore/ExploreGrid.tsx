'use client'

import { useMemo, useState } from 'react'
import { Flame, MapPin } from 'lucide-react'

type MockTrip = {
  id: string
  destination: string
  country: string
  duration_days: number
  popularity_score: number
  image_seed: string
}

export default function ExploreGrid({ trips }: { trips: MockTrip[] }) {
  const [country, setCountry] = useState('all')
  const [duration, setDuration] = useState('all')

  const countries = useMemo(() => Array.from(new Set(trips.map((t) => t.country))), [trips])

  const filtered = trips.filter((t) => {
    if (country !== 'all' && t.country !== country) return false
    if (duration === 'short' && t.duration_days > 2) return false
    if (duration === 'medium' && (t.duration_days < 3 || t.duration_days > 5)) return false
    if (duration === 'long' && t.duration_days < 6) return false
    return true
  })

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm">
          <option value="all">All countries</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={duration} onChange={(e) => setDuration(e.target.value)} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm">
          <option value="all">Any length</option>
          <option value="short">1–2 days</option>
          <option value="medium">3–5 days</option>
          <option value="long">6+ days</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div key={t.id} className="overflow-hidden rounded-3xl border border-white bg-white/80 shadow-sm">
            <div
              className="relative h-36 bg-cover bg-center"
              style={{ backgroundImage: `url(https://picsum.photos/seed/${t.image_seed}/400/240)` }}
            >
              {t.popularity_score >= 80 && (
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-orange-500/90 px-2.5 py-1 text-xs font-medium text-white">
                  <Flame className="h-3.5 w-3.5" /> Trending
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-900">{t.destination}</p>
              <p className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" /> {t.country}</p>
              <p className="mt-2 text-xs text-gray-400">{t.duration_days} day{t.duration_days === 1 ? '' : 's'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}