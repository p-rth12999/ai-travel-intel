import Link from 'next/link'
import { PlusCircle, Sparkles } from 'lucide-react'

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
      <p className="mb-3 text-sm font-semibold text-gray-900">Quick Actions</p>
      <div className="space-y-2">
        <Link href="/trips/new" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
          <PlusCircle className="h-4 w-4" /> Create Trip
        </Link>
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-gray-400" disabled>
          <Sparkles className="h-4 w-4" /> AI Recommendations (soon)
        </button>
      </div>
    </div>
  )
}