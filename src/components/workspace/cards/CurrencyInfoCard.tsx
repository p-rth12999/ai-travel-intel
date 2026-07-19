import { Coins } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'
import { TripAIContent } from '@/lib/validations/trip-ai-content'

export default function CurrencyInfoCard({ data }: { data: NonNullable<TripAIContent['currencyInfo']> }) {
  return (
    <WorkspaceCard title="Currency" icon={Coins} status="ready">
      <p className="text-sm text-gray-600">{data.exchangeRateNote}</p>
      <p className="mt-2 text-sm font-medium text-gray-900">{data.estimatedConversion}</p>
      <ul className="mt-2 space-y-1">
        {data.paymentSuggestions.map((s, i) => (
          <li key={i} className="text-xs text-gray-500">• {s}</li>
        ))}
      </ul>
    </WorkspaceCard>
  )
}