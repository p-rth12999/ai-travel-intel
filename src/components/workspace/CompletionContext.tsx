'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CompletionContextValue {
  completedActivities: string[]
  completedPackingItems: string[]
  toggleActivity: (text: string) => void
  togglePackingItem: (text: string) => void
}

const CompletionContext = createContext<CompletionContextValue | null>(null)

export function CompletionProvider({ children }: { children: ReactNode }) {
  const [completedActivities, setCompletedActivities] = useState<string[]>([])
  const [completedPackingItems, setCompletedPackingItems] = useState<string[]>([])

  function toggleActivity(text: string) {
    setCompletedActivities((prev) => (prev.includes(text) ? prev.filter((t) => t !== text) : [...prev, text]))
  }
  function togglePackingItem(text: string) {
    setCompletedPackingItems((prev) => (prev.includes(text) ? prev.filter((t) => t !== text) : [...prev, text]))
  }

  return (
    <CompletionContext.Provider value={{ completedActivities, completedPackingItems, toggleActivity, togglePackingItem }}>
      {children}
    </CompletionContext.Provider>
  )
}

export function useCompletion() {
  const ctx = useContext(CompletionContext)
  if (!ctx) throw new Error('useCompletion must be used within CompletionProvider')
  return ctx
}