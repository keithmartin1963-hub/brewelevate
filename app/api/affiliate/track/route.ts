import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // In production: persist to DB / send to analytics service
    // For now, acknowledge and log
    console.log('[Affiliate Track]', body)

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
