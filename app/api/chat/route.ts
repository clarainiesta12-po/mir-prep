export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { getSystemPrompt } from '@/lib/systemPrompts'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { message, specialty, category, history } = await req.json()

    const systemPrompt = getSystemPrompt(category, specialty)

    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...(history ?? []),
      { role: 'user', content: message },
    ]

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      stream: true,
    })

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? ''
          if (text) controller.enqueue(encoder.encode(text))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (error) {
    console.error('[chat/route] error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
