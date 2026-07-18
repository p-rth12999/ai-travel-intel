import { CloudSun } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function WeatherCard({ data }: { data: TripAIContent['weather'] }) {
  return (
    <WorkspaceCard title="Weather" icon={CloudSun} status="ready">
      <p className="text-sm text-gray-600">{data.forecastSummary}</p>
      <p className="mt-2 text-sm font-medium text-gray-900">{data.averageTempRange}</p>
      <p className="mt-2 text-xs text-gray-500">{data.packingNote}</p>
    </WorkspaceCard>
  )
}