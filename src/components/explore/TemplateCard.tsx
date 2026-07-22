'use client'

import Link from 'next/link'
import { MapPin, Sparkles, Globe2 } from 'lucide-react'

export type TripTemplate = {
  id: string
  title: string
  description: string
  destinations: string[]
  tags: string[]
  duration_days_min: number
  duration_days_max: number
  image_seed: string
  is_international: boolean
}

export default function TemplateCard({ template, distanceKm }: { template: TripTemplate; distanceKm: number | null }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white bg-white/80 shadow-sm">
      <div
        className="relative h-36 bg-cover bg-center"
        style={{ backgroundImage: `url(https://picsum.photos/seed/${template.image_seed}/400/240)` }}
      >
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-purple-500/90 px-2.5 py-1 text-xs font-medium text-white">
          <Sparkles className="h-3.5 w-3.5" /> AI-suggested
        </span>
        {template.is_international && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-blue-600/90 px-2.5 py-1 text-xs font-medium text-white">
            <Globe2 className="h-3.5 w-3.5" /> International
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-medium text-gray-900">{template.title}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="h-3 w-3" /> {template.destinations.join(', ')}
        </p>
        <p className="mt-2 text-xs text-gray-500">{template.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {template.tags.map((t) => (
            <span key={t} className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium capitalize text-blue-600">
              {t.replace('_', ' ')}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>
            {template.duration_days_min === template.duration_days_max
              ? `${template.duration_days_min} day${template.duration_days_min === 1 ? '' : 's'}`
              : `${template.duration_days_min}–${template.duration_days_max} days`}
          </span>
          {distanceKm !== null && <span>~{Math.round(distanceKm)} km away</span>}
        </div>
        <Link
          href={`/trips/new?template=${template.id}`}
          className="mt-3 block rounded-full bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          Plan this out
        </Link>
      </div>
    </div>
  )
}