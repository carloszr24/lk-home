import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import {
  assertFeaturedHomeLimit,
  bodyToInsert,
  deletePropertyRow,
  getPropertyRowById,
  isSupabaseConfigured,
  rowToProperty,
  updatePropertyRow,
} from '@/lib/property-db'
import { getPropertyById } from '@/lib/properties-store'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

function notConfigured() {
  return NextResponse.json(
    { error: 'Supabase no configurado. Añade las variables de entorno del proyecto.' },
    { status: 503 }
  )
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id)
  if (!property) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json(property)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

  const existing = await getPropertyRowById(params.id)
  if (!existing) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })

  const insert = bodyToInsert(body)
  const capError = await assertFeaturedHomeLimit(insert.featured, params.id)
  if (capError) return NextResponse.json({ error: capError }, { status: 400 })

  try {
    const row = await updatePropertyRow(params.id, insert)
    revalidatePath('/')
    revalidatePath('/propiedades')
    revalidatePath(`/propiedades/${params.id}`)
    return NextResponse.json(rowToProperty(row))
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error al actualizar'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }
  if (!isSupabaseConfigured()) return notConfigured()

  const existing = await getPropertyRowById(params.id)
  if (!existing) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })

  try {
    await deletePropertyRow(params.id)
    revalidatePath('/')
    revalidatePath('/propiedades')
    revalidatePath(`/propiedades/${params.id}`)
    return NextResponse.json({ ok: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error al eliminar'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
