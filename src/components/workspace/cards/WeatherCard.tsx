import { CloudSun } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'

export default function WeatherCard() {
  return (
    <WorkspaceCard title="Weather" icon={CloudSun} status="ready">
      <p className="text-sm text-gray-600">
        A weather forecast or seasonal outlook for your trip dates will appear here.
      </p>
    </WorkspaceCard>
  )
}