'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardHeader({ userName, onSearch }: { userName: string; onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex flex-col gap-4 rounded-3xl border border-white bg-white/80 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{getGreeting()}, {userName} 👋</h1>
        <p className="text-sm text-gray-500">Ready for your next adventure?</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value) }}
            placeholder="Search trips, destinations..."
            className="w-64 rounded-full border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-blue-400 focus:outline-none"
          />
        </div>
        <Link
          href="/trips/new"
          className="flex items-center gap-1 whitespace-nowrap rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> New Trip
        </Link>
      </div>
    </motion.div>
  )
}