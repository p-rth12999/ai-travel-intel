import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function NewTripCard() {
  return (
    <Link
      href="/trips/new"
      className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
    >
      <Plus className="h-8 w-8" />
      <span className="font-medium">New Travel Plan</span>
    </Link>
  )
}