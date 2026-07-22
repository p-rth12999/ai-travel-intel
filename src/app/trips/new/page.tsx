import { Suspense } from 'react'
import TripForm from '@/components/trips/TripForm'

export const dynamic = 'force-dynamic'

export default function NewTripPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1832] px-4 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/world-map.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1832]/30 via-[#0B1832]/60 to-[#0B1832]" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Where do you want to go?</h1>
          <p className="mt-1 text-sm text-blue-100/70">Tell us about your trip and we&apos;ll help you plan it.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur">
          <Suspense fallback={<div className="p-6 text-center text-sm text-gray-400">Loading form...</div>}>
            <TripForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}