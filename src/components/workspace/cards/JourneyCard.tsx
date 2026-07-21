import { ArrowRight, Route } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { countryCodeToFlag } from '@/lib/geo/country-flag'
import { DestinationMeta } from '@/types/trip'

type Leg = { from: string; to: string; transportMode: string; note: string }

function flagFor(name: string, meta: DestinationMeta[] | null): string {
  if (!meta) return '📍'
  const match = meta.find(
    (m) =>
      m.destination.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(m.destination.toLowerCase())
  )
  return match ? countryCodeToFlag(match.countryCode) : '📍'
}

export default function JourneyCard({
  journeyPlan,
  destinationMeta,
}: {
  journeyPlan: { optimized: boolean; legs: Leg[] }
  destinationMeta: DestinationMeta[] | null
}) {
  if (!journeyPlan.legs.length) {
return (
     <WorkspaceCard title="Journey" icon={Route} status="empty" emptyMessage="No route data available yet.">
       <></>
     </WorkspaceCard>
   )  }

  const nodes = [journeyPlan.legs[0].from, ...journeyPlan.legs.map((l) => l.to)]
  const notedLegs = journeyPlan.legs.filter((l) => l.note)

  return (
    <WorkspaceCard title="Journey" icon={Route}>
      {journeyPlan.optimized && (
        <p className="mb-3 text-xs font-medium text-blue-600">Reordered by AI for a more practical route</p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-center">
              <span className="text-xl">{flagFor(node, destinationMeta)}</span>
              <span className="text-xs font-medium text-gray-800">{node}</span>
            </div>
            {i < journeyPlan.legs.length && (
              <div className="flex flex-col items-center px-1">
                <span className="mb-0.5 whitespace-nowrap text-[10px] font-medium text-gray-500">
                  {journeyPlan.legs[i].transportMode}
                </span>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </div>
            )}
          </div>
        ))}
      </div>
      {notedLegs.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-3">
          {notedLegs.map((l, i) => (
            <li key={i} className="text-xs text-gray-500">
              <span className="font-medium text-gray-700">{l.from} → {l.to}:</span> {l.note}
            </li>
          ))}
        </ul>
      )}
    </WorkspaceCard>
  )
}