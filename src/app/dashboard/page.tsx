import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TripCard from '@/components/trips/TripCard'
import NewTripCard from '@/components/trips/NewTripCard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: trips, error } = await supabase
    .from('trips')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Your Travel Plans</h1>
        <p className="mt-1 text-sm text-gray-500">Signed in as {user.email}</p>
      </header>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Couldn&apos;t load your trips: {error.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <NewTripCard />
        {trips?.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>

      {trips && trips.length === 0 && (
        <p className="mt-10 text-center text-sm text-gray-400">
          No trips yet — create your first one above.
        </p>
      )}
    </div>
  )
}