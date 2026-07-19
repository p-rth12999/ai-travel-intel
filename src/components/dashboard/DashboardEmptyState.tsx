import Link from 'next/link'
import { Compass } from 'lucide-react'

export default function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-16 text-center">
      <Compass className="h-10 w-10 text-gray-300" />
      <h3 className="mt-3 text-lg font-semibold text-gray-900">Start your next adventure</h3>
      <p className="mt-1 text-sm text-gray-500">Create an AI-powered travel plan with live intelligence.</p>
      <Link href="/trips/new" className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
        Create your first trip
      </Link>
    </div>
  )
}