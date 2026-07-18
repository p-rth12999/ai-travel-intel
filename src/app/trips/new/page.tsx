import TripForm from '@/components/trips/TripForm'

export default function NewTripPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create a New Travel Plan
        </h1>
        <p className="mt-1 mb-8 text-sm text-gray-500">
          Tell us about your trip and we&apos;ll help you plan it.
        </p>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <TripForm />
        </div>
      </div>
    </div>
  )
}