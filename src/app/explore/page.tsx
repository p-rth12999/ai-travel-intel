import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import ExploreGrid from '@/components/explore/ExploreGrid'

export default async function ExplorePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: mockTrips } = await supabase
    .from('mock_trips')
    .select('*')
    .order('popularity_score', { ascending: false })

  return (
    <div className="flex min-h-screen bg-[#DEEDFC]">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <h1 className="mb-6 text-xl font-semibold text-gray-900">Explore</h1>
        <ExploreGrid trips={mockTrips || []} />
      </div>
    </div>
  )
}