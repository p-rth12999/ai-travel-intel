interface ActivityItem {
  summary: string
  createdAt: string
}

export default function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
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