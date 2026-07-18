const ACCENT_COLORS = [
  { bg: 'bg-orange-100', text: 'text-orange-700', bar: 'bg-orange-400' },
  { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-400' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700', bar: 'bg-emerald-400' },
  { bg: 'bg-purple-100', text: 'text-purple-700', bar: 'bg-purple-400' },
  { bg: 'bg-pink-100', text: 'text-pink-700', bar: 'bg-pink-400' },
  { bg: 'bg-amber-100', text: 'text-amber-700', bar: 'bg-amber-400' },
]

export function getAccentColor(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % ACCENT_COLORS.length
  return ACCENT_COLORS[index]
}