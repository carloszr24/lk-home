import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { optimizePropertyImage } from '@/lib/optimize-image'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'properties')
const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  const propertyId = request.nextUrl.searchParams.get('propertyId')?.trim()
  if (!propertyId) return badRequest('Falta propertyId')

  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return badRequest('Falta file')
  if (!ALLOWED_TYPES.has(file.type)) return badRequest('Tipo no permitido (jpg/png/webp)')
  if (file.size > MAX_BYTES) return badRequest('La imagen supera 5MB')

  const originalBuffer = Buffer.from(await file.arrayBuffer())
  const optimized = await optimizePropertyImage(originalBuffer)
  const filename = `${crypto.randomUUID()}.${optimized.ext}`
  const relativePath = `uploads/properties/${propertyId}/${filename}`
  const absolutePath = path.join(process.cwd(), 'public', relativePath)

  await fs.mkdir(path.dirname(absolutePath), { recursive: true })
  await fs.writeFile(absolutePath, optimized.data)

  const url = `/${relativePath}`
  return NextResponse.json({ url, path: relativePath })
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = null
  }

  const relativePath = (body as { path?: string } | null)?.path?.trim()
  if (!relativePath) return badRequest('Falta path')
  if (!relativePath.startsWith('uploads/properties/')) {
    return badRequest('Ruta no válida')
  }

  const absolutePath = path.join(process.cwd(), 'public', relativePath)
  try {
    await fs.unlink(absolutePath)
  } catch {
    return NextResponse.json({ error: 'No se pudo eliminar la imagen' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
