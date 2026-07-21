import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import TripCalendar from '@/components/calendar/TripCalendar'
import { Trip } from '@/types/trip'

export default async function CalendarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: trips } = await supabase
    .from('trips')
    .select('*')
    .not('start_date', 'is', null)
    .not('end_date', 'is', null)

  return (
    <div className="flex min-h-screen bg-[#DEEDFC]">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <h1 className="mb-6 text-xl font-semibold text-gray-900">Trip Calendar</h1>
        <TripCalendar trips={(trips as Trip[]) || []} />
      </div>
    </div>
  )
}