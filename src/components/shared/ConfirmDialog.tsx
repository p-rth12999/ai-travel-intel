'use client'

import { AlertTriangle } from 'lucide-react'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  confirming = false,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  confirming?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-white/40 bg-white p-6 shadow-2xl">
        <div className="mb-3 flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="mb-6 text-sm text-gray-600">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Go back
          </button>
          <button
            onClick={onConfirm}
            disabled={confirming}
            className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {confirming ? 'Please wait...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}