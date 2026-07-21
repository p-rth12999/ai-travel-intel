'use client'

const TAGS = ['trek', 'fort', 'temple', 'beach', 'chill', 'adventure', 'rainy_season']

export default function TemplateFilters({
  active,
  onToggle,
}: {
  active: string[]
  onToggle: (tag: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => onToggle(tag)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition ${
            active.includes(tag)
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-blue-50'
          }`}
        >
          {tag.replace('_', ' ')}
        </button>
      ))}
    </div>
  )
}