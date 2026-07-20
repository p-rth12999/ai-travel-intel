'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Map, Calendar, Bell, Compass, User, Settings, LogOut } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

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
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="hidden w-60 shrink-0 flex-col bg-[#0B1832] p-5 lg:flex">
      <div className="mb-8 px-1">
  <Link href="/">
    <Logo height={26} />
  </Link>
</div>
      <nav className="flex-1 space-y-1">
        {ITEMS.map((item) => {
          const isActive = item.href === pathname
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive ? 'bg-white/10 font-medium text-white' : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          )
        })}
      </nav>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-blue-100/60 hover:bg-white/5 hover:text-white"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </aside>
  )
}