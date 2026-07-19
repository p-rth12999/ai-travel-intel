import Link from 'next/link'
import { Trip } from '@/types/trip'
import { getAccentColor } from '@/lib/theme-colors'
import { computeDisplayStatus } from '@/lib/trip-status'

const STATUS_LABELS = { planning: 'Planning', upcoming: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' }

function formatDateRange(startDate: string, endDate: string) {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  const start = new Date(startDate).toLocaleDateString('en-US', options)
  const end = new Date(endDate).toLocaleDateString('en-US', options)
  return `${start} – ${end}`
}

export default function TripCard({ trip }: { trip: Trip }) {
  const color = getAccentColor(trip.id)
  const status = computeDisplayStatus(trip)

  return (
    <Link href={`/trips/${trip.id}`} className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className={`h-2 w-full ${color.bar}`} />
      <div className="flex flex-1 flex-col p-5">
        <div className={`mb-3 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium ${color.bg} ${color.text}`}>
          {STATUS_LABELS[status]}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{trip.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{trip.source} → {trip.destinations.join(' → ')}</p>
        <p className="mt-4 text-xs text-gray-400">{formatDateRange(trip.start_date, trip.end_date)}</p>
      </div>
    </Link>
  )
}