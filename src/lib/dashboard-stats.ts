import { Trip } from '@/types/trip'

export function computeDashboardStats(trips: Trip[]) {
  const now = new Date()
  const thisMonthCount = trips.filter((t) => {
    const created = new Date(t.created_at)
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
  }).length

  // Heuristic: treat the text after the last comma in each destination as a
  // rough "country" — not real geocoding, just a lightweight approximation.
  const countries = new Set<string>()
  const cities = new Set<string>()
  trips.forEach((t) => {
    t.destinations.forEach((d) => {
      cities.add(d.trim())
      const parts = d.split(',')
      countries.add(parts[parts.length - 1].trim().toLowerCase())
    })
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
    citiesExplored: cities.size,
    aiSuggestionsUsedPct,
    avgTripHealth: avgHealth,
  }
}