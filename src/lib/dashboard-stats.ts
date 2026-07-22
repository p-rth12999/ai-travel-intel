import { Trip } from '@/types/trip'

export function computeDashboardStats(trips: Trip[]) {
  const now = new Date()
  const thisMonthCount = trips.filter((t) => {
    const created = new Date(t.created_at)
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
  }).length

  const countries = new Set<string>()
  const places = new Set<string>()

  trips.forEach((t) => {
    if (t.destination_meta && t.destination_meta.length > 0) {
      t.destination_meta.forEach((m) => {
        places.add(m.destination.trim())
        if (m.country) countries.add(m.country.toLowerCase())
      })
    } else {
      t.destinations.forEach((d) => {
        places.add(d.trim())
        const parts = d.split(',')
        countries.add(parts[parts.length - 1].trim().toLowerCase())
      })
    }
  })

  const withAIContent = trips.filter((t) => t.ai_content).length
  const aiSuggestionsUsedPct = trips.length > 0 ? Math.round((withAIContent / trips.length) * 100) : 0

  const healthScores = trips
    .map((t) => (t.trip_health as { score?: number } | null)?.score)
    .filter((s): s is number => typeof s === 'number')
  const avgHealth = healthScores.length > 0 ? Math.round(healthScores.reduce((a, b) => a + b, 0) / healthScores.length) : null

  return {
    tripsPlanned: trips.length,
    tripsThisMonth: thisMonthCount,
    countriesVisited: countries.size,
    placesExplored: places.size,
    aiSuggestionsUsedPct,
    avgTripHealth: avgHealth,
  }
}