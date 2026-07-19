'use client'

export default function TagSelector({
  selected,
  options,
  label,
  onToggle,
}: {
  selected: string[]
  options: readonly string[]
  label: string
  onToggle: (value: string) => void
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-blue-400'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}