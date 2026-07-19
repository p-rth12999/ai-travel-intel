import { Map, Globe, Building2, Sparkles, HeartPulse } from 'lucide-react'

export default function StatsRow({
  stats,
}: {
  stats: ReturnType<typeof import('@/lib/dashboard-stats').computeDashboardStats>
}) {
  const cards = [
    { icon: Map, label: 'Trips Planned', value: stats.tripsPlanned, sub: stats.tripsThisMonth > 0 ? `+${stats.tripsThisMonth} this month` : undefined },
    { icon: Globe, label: 'Countries Visited', value: stats.countriesVisited },
    { icon: Building2, label: 'Cities Explored', value: stats.citiesExplored },
    { icon: Sparkles, label: 'AI Suggestions Used', value: `${stats.aiSuggestionsUsedPct}%` },
    { icon: HeartPulse, label: 'Avg Trip Health', value: stats.avgTripHealth !== null ? `${stats.avgTripHealth}%` : '—' },
  ]

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-4">
          <card.icon className="h-4 w-4 text-gray-400" />
          <p className="mt-2 text-xl font-semibold text-gray-900">{card.value}</p>
          <p className="text-xs text-gray-500">{card.label}</p>
          {card.sub && <p className="mt-0.5 text-xs text-green-600">{card.sub}</p>}
        </div>
      ))}
    </div>
  )
}