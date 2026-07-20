import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { getAccentColor } from '@/lib/theme-colors'

interface WorkspaceCardProps {
  title: string
  icon: LucideIcon
  status?: 'loading' | 'error' | 'empty' | 'ready'
  errorMessage?: string
  emptyMessage?: string
  children: ReactNode
}

export default function WorkspaceCard({
  title,
  icon: Icon,
  status = 'ready',
  errorMessage = 'Something went wrong loading this.',
  emptyMessage = 'Nothing to show yet.',
  children,
}: WorkspaceCardProps) {
  const accent = getAccentColor(title)

  return (
    <div className="flex flex-col rounded-3xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-center gap-2">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${accent.bg}`}>
          <Icon className={`h-4 w-4 ${accent.text}`} />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>

      {status === 'loading' && (
        <div className="flex flex-1 animate-pulse flex-col gap-2">
          <div className="h-3 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
          <div className="h-3 w-2/3 rounded bg-gray-200" />
        </div>
      )}
      {status === 'error' && <p className="text-sm text-red-600">{errorMessage}</p>}
      {status === 'empty' && <p className="text-sm text-gray-400">{emptyMessage}</p>}
      {status === 'ready' && children}
    </div>
  )
}