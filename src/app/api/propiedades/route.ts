import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import {
  assertFeaturedHomeLimit,
  bodyToInsert,
  createPropertyRow,
  isSupabaseConfigured,
  rowToProperty,
} from '@/lib/property-db'
import { getAllProperties } from '@/lib/properties-store'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

function notConfigured() {
  return NextResponse.json(
    { error: 'Supabase no configurado. Añade las variables de entorno del proyecto.' },
    { status: 503 }
  )
}

export async function GET() {
  const properties = await getAllProperties()
  return NextResponse.json(properties)
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }
  if (!isSupabaseConfigured()) return notConfigured()

  let body: Parameters<typeof bodyToInsert>[0]
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const insert = bodyToInsert(body)
  const capError = await assertFeaturedHomeLimit(insert.featured, null)
  if (capError) return NextResponse.json({ error: capError }, { status: 400 })

  try {
    const row = await createPropertyRow(insert, body.title)
    revalidatePath('/')
    revalidatePath('/propiedades')
    revalidatePath(`/propiedades/${row.id}`)
    return NextResponse.json(rowToProperty(row), { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error al crear'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
