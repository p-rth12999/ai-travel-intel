interface ActivityItem {
  summary: string
  createdAt: string
}

export default function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <div className="rounded-3xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
      <p className="mb-3 text-sm font-semibold text-gray-900">Recent Activity</p>
      {items.length === 0 ? (
        <p className="text-xs text-gray-400">No recent updates yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="text-xs text-gray-500">{item.summary}</li>
          ))}
        </ul>
      )}
    </div>
  )
}