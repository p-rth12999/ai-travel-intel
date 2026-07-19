'use client'

import { useState } from 'react'
import { HardDriveDownload } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { buildOfflineHtml } from '@/lib/offline-export'
import { tripAIContentSchema } from '@/lib/validations/trip-ai-content'
import { Trip } from '@/types/trip'

export default function OfflineExportButton({ tripId }: { tripId: string }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  async function handleExport() {
    setLoading(true)
    const { data: trip, error } = await supabase.from('trips').select('*').eq('id', tripId).single()

    if (error || !trip) {
      setLoading(false)
      alert('Could not load trip data for export.')
      return
    }

    const parsed = tripAIContentSchema.safeParse(trip.ai_content)
    if (!parsed.success) {
      setLoading(false)
      alert('Trip plan is not ready yet — try again once it finishes generating.')
      return
    }

    const html = buildOfflineHtml(trip as Trip, parsed.data)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${trip.title.replace(/\s+/g, '-').toLowerCase()}-offline-plan.html`
    a.click()
    URL.revokeObjectURL(url)
    setLoading(false)
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 print:hidden"
    >
      <HardDriveDownload className="h-3.5 w-3.5" />
      {loading ? 'Preparing...' : 'Download Offline'}
    </button>
  )
}