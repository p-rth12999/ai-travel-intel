'use client'

import { useState } from 'react'
import { Trip } from '@/types/trip'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import StatsRow from '@/components/dashboard/StatsRow'
import DashboardTripsSection from '@/components/dashboard/DashboardTripsSection'
import QuickActions from '@/components/dashboard/QuickActions'
import RecentActivity from '@/components/dashboard/RecentActivity'
import { computeDashboardStats } from '@/lib/dashboard-stats'

export default function DashboardHeaderWrapper({
  userName,
  stats,
  trips,
  ratings,
  activity,
}: {
  userName: string
  stats: ReturnType<typeof computeDashboardStats>
  trips: Trip[]
  ratings: Record<string, number>
  activity: { summary: string; createdAt: string }[]
}) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <DashboardHeader userName={userName} onSearch={setSearchQuery} />
      <StatsRow stats={stats} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
        <DashboardTripsSection trips={trips} ratings={ratings} searchQuery={searchQuery} />
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity items={activity} />
        </div>
      </div>
    </>
  )
}