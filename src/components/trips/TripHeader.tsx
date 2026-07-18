import { Trip } from '@/types/trip'

export default function TripHeader({ trip }: { trip: Trip }) {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  const start = new Date(trip.start_date).toLocaleDateString('en-US', options)
  const end = new Date(trip.end_date).toLocaleDateString('en-US', options)

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900">{trip.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{trip.destination}</p>
      <p className="mt-1 text-xs text-gray-400">
        {start} – {end} · {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''} · {trip.budget} {trip.currency}
      </p>
    </div>
  )
}