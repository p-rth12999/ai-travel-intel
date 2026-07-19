import Link from 'next/link'
import { LayoutDashboard, Map, Calendar, Bell, Compass, User, Settings } from 'lucide-react'

const ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Map, label: 'Trips', href: '/dashboard' },
  { icon: Calendar, label: 'Calendar', href: '#' },
  { icon: Bell, label: 'Alerts', href: '#' },
  { icon: Compass, label: 'Explore', href: '#' },
  { icon: User, label: 'Profile', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-gray-200 bg-white p-4 lg:block">
      <p className="mb-6 px-2 text-lg font-semibold text-gray-900">Voya</p>
      <nav className="space-y-1">
        {ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <item.icon className="h-4 w-4" /> {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}