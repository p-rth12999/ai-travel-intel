import { HeartPulse } from 'lucide-react'
import { TripHealth } from '@/lib/validations/trip-live-intelligence'

const LEVEL_STYLES = {
  green: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  yellow: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  red: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
}

export default function TripHealthCard({ health }: { health: TripHealth }) {
  const style = LEVEL_STYLES[health.level]
  return (
    <div className={`rounded-xl border border-gray-200 p-5 ${style.bg}`}>
      <div className="flex items-center gap-2">
        <HeartPulse className="h-5 w-5 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-900">Trip Health</h3>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
        <span className={`text-2xl font-bold ${style.text}`}>{health.score}%</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{health.summary}</p>
      {health.factors.length > 0 && (
        <ul className="mt-2 space-y-1">
          {health.factors.map((f, i) => (
            <li key={i} className="text-xs text-gray-500">• {f}</li>
          ))}
        </ul>
      )}
    </div>
  )
}