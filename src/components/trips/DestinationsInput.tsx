'use client'

import { useState } from 'react'
import { Plus, X, GripVertical } from 'lucide-react'

export default function DestinationsInput({
  value,
  onChange,
  error,
}: {
  value: string[]
  onChange: (next: string[]) => void
  error?: string
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  function updateAt(index: number, text: string) {
    const next = [...value]
    next[index] = text
    onChange(next)
  }

  function addStop() {
    onChange([...value, ''])
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function handleDrop(index: number) {
    if (dragIndex === null || dragIndex === index) return
    const next = [...value]
    const [moved] = next.splice(dragIndex, 1)
    next.splice(index, 0, moved)
    onChange(next)
    setDragIndex(null)
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Destination{value.length > 1 ? 's' : ''} (drag to reorder)
      </label>
      <div className="space-y-2">
        {value.map((dest, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(i)}
            className="flex gap-2"
          >
            <span className="flex cursor-grab items-center text-gray-300">
              <GripVertical className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={dest}
              onChange={(e) => updateAt(i, e.target.value)}
              placeholder={i === 0 ? 'e.g. Malta' : `Stop ${i + 1}, e.g. Italy`}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {value.length > 1 && (
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="rounded-lg border border-gray-300 px-2 text-gray-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addStop}
        className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:underline"
      >
        <Plus className="h-3.5 w-3.5" /> Add another stop
      </button>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}