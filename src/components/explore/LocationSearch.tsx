'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, MapPin } from 'lucide-react'

export type ResolvedLocation = { name: string; lat: number; lon: number }

type GeoResult = { name: string; latitude: number; longitude: number; admin1?: string; country?: string }

export default function LocationSearch({ onSelect }: { onSelect: (loc: ResolvedLocation) => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeoResult[]>([])
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setResults([])
      return
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        )
        const data = await res.json()
        setResults(data.results || [])
        setOpen(true)
      } catch {
        setResults([])
      }
    }, 350)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  function handlePick(r: GeoResult) {
    setQuery(r.name)
    setOpen(false)
    onSelect({ name: r.name, lat: r.latitude, lon: r.longitude })
  }

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search trips near..."
          className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-blue-400 focus:outline-none"
        />
      </div>
      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full rounded-2xl border border-gray-100 bg-white shadow-lg">
          {results.map((r, i) => (
            <li key={i}>
              <button
                onClick={() => handlePick(r)}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-blue-50"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                {r.name}{r.admin1 ? `, ${r.admin1}` : ''}{r.country ? `, ${r.country}` : ''}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}