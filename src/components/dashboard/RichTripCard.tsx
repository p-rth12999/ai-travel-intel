'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, HardDriveDownload, Radio, Star } from 'lucide-react'
import { Trip } from '@/types/trip'
import { computeDisplayStatus } from '@/lib/trip-status'
import { getTripHeroImage } from '@/lib/trip-hero-image'

const STATUS_STYLES = {
  planning: 'bg-gray-900/70 text-white',
  upcoming: 'bg-blue-600/90 text-white',
  completed: 'bg-green-600/90 text-white',
  cancelled: 'bg-red-600/90 text-white',
}
const STATUS_LABELS = { planning: 'Planning', upcoming: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' }

function healthPillStyle(score: number) {
  if (score >= 90) return 'bg-green-500/90 text-white'
  if (score >= 70) return 'bg-amber-500/90 text-white'
  return 'bg-red-500/90 text-white'
}

export default function RichTripCard({ trip, avgRating }: { trip: Trip; avgRating: number | null }) {
  const status = computeDisplayStatus(trip)
  const health = (trip.trip_health as { score?: number } | null)?.score
  const heroImage = getTripHeroImage(trip.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/trips/${trip.id}`}
        className="group block overflow-hidden rounded-3xl border border-white bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
      >
        <div className="relative h-40 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={trip.destinations[0]}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur ${STATUS_STYLES[status]}`}>
            {STATUS_LABELS[status]}
          </span>
          {typeof health === 'number' && (status === 'upcoming' || status === 'planning') && (
            <span className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-semibold backdrop-blur ${healthPillStyle(health)}`}>
              {health}%
            </span>
          )}

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="text-sm font-semibold drop-shadow">{trip.title}</h3>
            <p className="text-xs text-white/80 drop-shadow">{trip.source} → {trip.destinations.join(' → ')}</p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-400">{trip.start_date} – {trip.end_date}</p>

          {status === 'completed' && avgRating !== null && (
            <div className="mt-2 flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className={`h-3.5 w-3.5 ${n <= Math.round(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-2 text-gray-400">
            {trip.ai_content !== null && (
              <span className="flex items-center gap-1 text-xs" title="AI plan ready">
                <Sparkles className="h-3 w-3" /> AI Ready
              </span>
            )}
            <span className="flex items-center gap-1 text-xs" title="Downloadable offline">
              <HardDriveDownload className="h-3 w-3" /> Offline
            </span>
            {trip.live_intelligence_refreshed_at && (
              <span className="flex items-center gap-1 text-xs" title="Receiving live updates">
                <Radio className="h-3 w-3" /> Live
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}