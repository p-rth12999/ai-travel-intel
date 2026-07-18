import { openai } from '@/lib/openai/client'
import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { tripId, messages } = await req.json()
  console.log('Received tripId:', tripId)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { data: trip, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single()

  if (error || !trip) {
    return new Response('Trip not found', { status: 404 })
  }

  const systemMessage = {
    role: 'system' as const,
    content: `You are a helpful travel assistant for this specific trip. Answer questions using this context — never ask the user to repeat details you already have:

Title: ${trip.title}
Destination: ${trip.destination}
Dates: ${trip.start_date} to ${trip.end_date}
Travelers: ${trip.travelers}
Budget: ${trip.budget} ${trip.currency}
Interests: ${trip.interests.join(', ')}

${trip.ai_content ? `Previously generated trip plan (reference this when relevant): ${JSON.stringify(trip.ai_content)}` : ''}`,
  }

  const stream = await openai.chat.completions.create({
    model: 'openai/gpt-4o-mini',
    messages: [systemMessage, ...messages],
    stream: true,
  })

  const encoder = new TextEncoder()
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || ''
        if (text) {
          controller.enqueue(encoder.encode(text))
        }
      }
      controller.close()
    },
  })

  return new Response(readableStream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}