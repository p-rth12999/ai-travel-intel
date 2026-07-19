import { openai } from '@/lib/openai/client'
import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'
import { cardEditTools, findCardByToolName } from '@/lib/openai/card-edit-tools'

export async function POST(req: NextRequest) {
  const { tripId, messages } = await req.json()

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
    content: `You are a helpful travel assistant for this specific trip. Answer questions using this context — never ask the user to repeat details you already have. If the user asks you to change, update, or regenerate a specific section of their plan, call the matching tool with the complete revised data for that section.

Journey: ${trip.source} → ${trip.destinations.join(' → ')}
Title: ${trip.title}
Dates: ${trip.start_date} to ${trip.end_date}
Travelers: ${trip.travelers}
Budget: ${trip.budget} ${trip.currency}
Mode of transport: ${trip.transport_mode}
Preferences: ${trip.interests.join(', ') || 'None specified'}
Food preferences/restrictions: ${trip.food_preferences.join(', ') || 'None specified'}
Accessibility needs: ${trip.accessibility_needs.join(', ') || 'None specified'}

This is a continuous multi-leg journey from ${trip.source}. Keep origin-dependent context (visa status, embassy references, home currency) consistent throughout, regardless of which leg is currently being discussed.

${trip.ai_content ? `Current trip plan (reference and revise this when relevant): ${JSON.stringify(trip.ai_content)}` : ''}`,
  }

  const firstPass = await openai.chat.completions.create({
    model: 'openai/gpt-4o-mini',
    messages: [systemMessage, ...messages],
    tools: cardEditTools,
    tool_choice: 'auto',
  })

  const firstMessage = firstPass.choices[0].message
  const toolCalls = firstMessage.tool_calls || []
  const updatedCardKeys: string[] = []

  if (toolCalls.length > 0) {
    const updatedContent = { ...(trip.ai_content as Record<string, unknown> || {}) }
    const toolResultMessages = []

    for (const toolCall of toolCalls) {
  if (toolCall.type !== 'function') {
    continue
  }

  const cardDef = findCardByToolName(toolCall.function.name)

      if (!cardDef) {
        toolResultMessages.push({
          role: 'tool' as const,
          tool_call_id: toolCall.id,
          content: 'Unknown tool.',
        })
        continue
      }

      const rawArgs = JSON.parse(toolCall.function.arguments)
      const parsed = cardDef.schema.safeParse(rawArgs)

      if (!parsed.success) {
        toolResultMessages.push({
          role: 'tool' as const,
          tool_call_id: toolCall.id,
          content: 'Invalid data — the update was not saved.',
        })
        continue
      }

      updatedContent[cardDef.key] = parsed.data
      updatedCardKeys.push(cardDef.key)

      toolResultMessages.push({
        role: 'tool' as const,
        tool_call_id: toolCall.id,
        content: 'Update saved successfully.',
      })
    }

    if (updatedCardKeys.length > 0) {
      await supabase
        .from('trips')
        .update({ ai_content: updatedContent })
        .eq('id', tripId)
    }

    const secondPass = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [systemMessage, ...messages, firstMessage, ...toolResultMessages],
      stream: true,
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of secondPass) {
          const text = chunk.choices[0]?.delta?.content || ''
          if (text) controller.enqueue(encoder.encode(text))
        }
        controller.close()
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Card-Updated': updatedCardKeys.join(','),
      },
    })
  }

  const encoder = new TextEncoder()
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(firstMessage.content || ''))
      controller.close()
    },
  })

  return new Response(readableStream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

