'use client'

import { useState, useEffect, useRef, use } from 'react'
import { Send, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

function formatSpecialty(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function getInitials(slug: string): string {
  const words = slug.split('-')
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

export default function ChatPage({
  params,
}: {
  params: Promise<{ category: string; specialty: string }>
}) {
  const { category, specialty } = use(params)
  const specialtyLabel = formatSpecialty(specialty)
  const initials = getInitials(specialty)

  const welcomeMessage: Message = {
    role: 'assistant',
    content: `Hola Ana, soy tu tutor especialista en ${specialtyLabel}. Puedes preguntarme cualquier duda del MIR sobre esta materia o pedirme que te explique una pregunta que hayas fallado. ¿Por dónde empezamos?`,
  }

  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const history = messages.slice(-10)
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, specialty, category, history }),
      })

      if (!res.ok || !res.body) throw new Error('Error en la respuesta')

      const assistantMsg: Message = { role: 'assistant', content: '' }
      setMessages((prev) => [...prev, assistantMsg])
      setLoading(false)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunk,
          }
          return updated
        })
      }
    } catch {
      setLoading(false)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.' },
      ])
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 bg-white shrink-0">
        <Link
          href="/chat"
          className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>

        <div className="h-10 w-10 rounded-xl bg-brand-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">{initials}</span>
        </div>

        <div>
          <h1 className="font-bold text-gray-900 leading-tight">{specialtyLabel}</h1>
          <p className="text-xs text-gray-500">Tutor MIR · Especialista en {specialtyLabel}</p>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-xs text-gray-500">En línea</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Agent avatar */}
            {msg.role === 'assistant' && (
              <div className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center shrink-0 mb-0.5">
                <span className="text-white font-bold text-[10px]">{initials}</span>
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-brand-600 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-end gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center shrink-0 mb-0.5">
              <span className="text-white font-bold text-[10px]">{initials}</span>
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
              <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
              <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Footer input */}
      <div className="px-6 py-4 border-t border-gray-100 bg-white shrink-0">
        <div className="flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-brand-300 focus-within:bg-white transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Pregunta al especialista en ${specialtyLabel}...`}
            rows={1}
            disabled={loading}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 resize-none outline-none max-h-32 disabled:opacity-50"
            style={{ fieldSizing: 'content' } as React.CSSProperties}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="h-8 w-8 rounded-xl bg-brand-600 flex items-center justify-center shrink-0 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          Intro para enviar · Shift+Intro para nueva línea
        </p>
      </div>
    </div>
  )
}
