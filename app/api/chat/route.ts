export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const DEFAULT_SYSTEM_PROMPT =
  'Eres un tutor MIR experto y cercano. Ayudas a Ana a preparar el examen MIR enero 2027. Responde siempre en español, de forma directa y orientada al examen.'

export async function POST(req: NextRequest) {
  try {
    const { message, specialty, category, history } = await req.json()

    let systemPrompt = DEFAULT_SYSTEM_PROMPT
    try {
      const promptPath = path.join(process.cwd(), 'agents', category, specialty, 'system-prompt.md')
      systemPrompt = fs.readFileSync(promptPath, 'utf-8')
    } catch {
      // file not found, use default
    }

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
