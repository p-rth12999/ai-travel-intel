import { Trip } from '@/types/trip'
import PrintButton from '@/components/trips/PrintButton'
import TripHeaderActions from '@/components/trips/TripHeaderActions'
import TripStatusActions from '@/components/trips/TripStatusActions'

export default function TripHeader({ trip }: { trip: Trip }) {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  const start = new Date(trip.start_date).toLocaleDateString('en-US', options)
  const end = new Date(trip.end_date).toLocaleDateString('en-US', options)

  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{trip.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{trip.source} → {trip.destinations.join(' → ')}</p>
        <p className="mt-1 text-xs text-gray-400">
          {start} – {end} · {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''} · {trip.budget} {trip.currency}
        </p>
      </div>
      <div className="flex items-center gap-2 print:hidden">
        <TripStatusActions trip={trip} />
        <TripHeaderActions trip={trip} />
        <PrintButton />
      </div>
    </div>
  )
}