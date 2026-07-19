export default function TripUpdateBanner({
  summary,
  affectedCards,
}: {
  summary: string
  affectedCards: string[]
}) {
  return (
    <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 print:hidden">
      <span className="font-medium">Travel update:</span> {summary}
      {affectedCards.length > 0 && (
        <span className="text-blue-500"> (updated: {affectedCards.join(', ')})</span>
      )}
    </div>
  )
}