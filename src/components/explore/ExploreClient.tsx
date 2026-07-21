'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Loader2 } from 'lucide-react'
import LocationSearch, { ResolvedLocation } from './LocationSearch'
import TemplateFilters from './TemplateFilters'
import TemplateCard, { TripTemplate } from './TemplateCard'
import { haversineDistanceKm } from '@/lib/geo/distance'

export default function ExploreClient({ templates }: { templates: (TripTemplate & { latitude: number; longitude: number })[] }) {
  const [location, setLocation] = useState<ResolvedLocation | null>(null)
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)
  const router = useRouter()

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const withDistance = useMemo(() => {
    return templates
      .map((t) => ({
        template: t,
        distanceKm: location ? haversineDistanceKm(location.lat, location.lon, t.latitude, t.longitude) : null,
      }))
      .filter(({ template }) => activeTags.length === 0 || activeTags.some((tag) => template.tags.includes(tag)))
      .sort((a, b) => {
        if (a.distanceKm !== null && b.distanceKm !== null) return a.distanceKm - b.distanceKm
        return b.template.popularity_score - a.template.popularity_score
      })
  }, [templates, location, activeTags])

  async function handleGenerateMore() {
    if (!location) return
    setGenerating(true)
    try {
      await fetch('/api/generate-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationName: location.name, lat: location.lat, lon: location.lon }),
      })
      router.refresh()
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <LocationSearch onSelect={setLocation} />
        <button
          onClick={handleGenerateMore}
          disabled={!location || generating}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {generating ? 'Generating...' : 'Generate more'}
        </button>
      </div>

      <div className="mb-6">
        <TemplateFilters active={activeTags} onToggle={toggleTag} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {withDistance.map(({ template, distanceKm }) => (
          <TemplateCard key={template.id} template={template} distanceKm={distanceKm} />
        ))}
      </div>
    </div>
  )
}