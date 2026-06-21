export const runtime = 'nodejs'
import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({
    groq_key_exists: !!process.env.GROQ_API_KEY,
    groq_key_prefix: process.env.GROQ_API_KEY?.substring(0, 8) ?? 'missing'
  })
}
