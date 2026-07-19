import Link from 'next/link'
import { Sparkles, HardDriveDownload, Radio, Star } from 'lucide-react'
import { Trip } from '@/types/trip'
import { computeDisplayStatus } from '@/lib/trip-status'

const STATUS_LABELS = { planning: 'Planning', upcoming: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' }
const STATUS_STYLES = {
  planning: 'bg-gray-800/80 text-white',
  upcoming: 'bg-blue-600/90 text-white',
  completed: 'bg-green-600/90 text-white',
  cancelled: 'bg-red-600/90 text-white',
}

function healthPillStyle(score: number) {
  if (score >= 90) return 'bg-green-100 text-green-700'
  if (score >= 70) return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

export default function RichTripCard({
  trip,
  avgRating,
}: {
  trip: Trip
  avgRating: number | null
}) {
  const status = computeDisplayStatus(trip)
  const health = (trip.trip_health as { score?: number } | null)?.score
  const heroImage = `https://picsum.photos/seed/${trip.id}/400/240`

  return (
    <Link
      href={`/trips/${trip.id}`}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative h-36 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt={trip.destinations[0]}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}>
          {STATUS_LABELS[status]}
        </span>
        {typeof health === 'number' && (status === 'upcoming' || status === 'planning') && (
          <span className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-semibold ${healthPillStyle(health)}`}>
            {health}%
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">{trip.title}</h3>
        <p className="mt-0.5 text-xs text-gray-500">{trip.source} → {trip.destinations.join(' → ')}</p>
        <p className="mt-1 text-xs text-gray-400">{trip.start_date} – {trip.end_date}</p>

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
  )
}