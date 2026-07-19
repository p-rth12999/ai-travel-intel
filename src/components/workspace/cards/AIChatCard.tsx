'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, Send, Maximize2, X } from 'lucide-react'
import WorkspaceCard from '@/components/workspace/WorkspaceCard'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChatCard({ tripId }: { tripId: string }) {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, isExpanded])

  async function sendMessage() {
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return

    const userMessage: ChatMessage = { role: 'user', content: trimmed }
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setInput('')
    setIsStreaming(true)
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/trip-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripId, messages: nextMessages }),
      })

      const updatedCards = res.headers.get('X-Card-Updated')
      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunkText = decoder.decode(value)
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunkText,
          }
          return updated
        })
      }

      if (updatedCards) router.refresh()
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  const chatBody = (maxHeightClass: string) => (
    <>
      <div ref={scrollRef} className={`mb-3 space-y-3 overflow-y-auto ${maxHeightClass}`}>
        {messages.length === 0 && (
          <p className="text-sm text-gray-400">
            Ask anything about this trip, or ask me to update a specific card — I already know your trip details.
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-lg px-3 py-2 text-sm ${
              msg.role === 'user' ? 'ml-6 bg-blue-50 text-blue-900' : 'mr-6 bg-gray-50 text-gray-700'
            }`}
          >
            {msg.content || (msg.role === 'assistant' && isStreaming ? '...' : '')}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask a question..."
          disabled={isStreaming}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
        />
        <button
          onClick={sendMessage}
          disabled={isStreaming || !input.trim()}
          className="rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </>
  )

  return (
    <>
      <WorkspaceCard title="AI Chat" icon={MessageCircle} status="ready">
        <div className="mb-2 flex justify-end">
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
          >
            <Maximize2 className="h-3 w-3" />
            Expand
          </button>
        </div>
        {chatBody('max-h-64')}
      </WorkspaceCard>

      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="flex max-h-[80vh] w-full max-w-2xl flex-col rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">AI Chat</h3>
              <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            {chatBody('flex-1 min-h-[300px]')}
          </div>
        </div>
      )}
    </>
  )
}