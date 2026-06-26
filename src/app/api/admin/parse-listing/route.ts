import { NextRequest, NextResponse } from 'next/server'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { parseListingTextWithGemini } from '@/lib/gemini-listing-parser'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  let body: { text?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const text = body.text?.trim()
  if (!text || text.length < 40) {
    return NextResponse.json(
      { error: 'Pega un texto más largo (mínimo unos 40 caracteres).' },
      { status: 400 }
    )
  }

  try {
    const draft = await parseListingTextWithGemini(text)
    return NextResponse.json(draft)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error al analizar el anuncio'
    const status = message.includes('GEMINI_API_KEY') ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
