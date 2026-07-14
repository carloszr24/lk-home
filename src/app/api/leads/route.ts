import { NextRequest, NextResponse } from 'next/server'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { LEAD_INTENTS, LEAD_PRIORITIES, LEAD_SOURCES, LEAD_STATUSES, rowsToLeads, type LeadRow } from '@/lib/leads'
import { deleteLeadRow, insertLeadRow, listLeadRows, updateLeadRow } from '@/lib/leads-store'
import { sendLeadNotificationEmail } from '@/lib/lead-notification'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function GET(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  try {
    const rows = await listLeadRows()
    return NextResponse.json(rowsToLeads(rows.slice(0, 500)))
  } catch {
    return NextResponse.json({ error: 'Error al obtener leads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const fullName = String(body.fullName || '').trim()
    const phone = String(body.phone || '').trim()
    const email = String(body.email || '').trim() || null
    const notes = String(body.notes || '').trim() || null
    const source = String(body.source || 'web_contacto')
    const intent = String(body.intent || 'otro')
    const priority = String(body.priority || 'media')
    const propertyRef = String(body.propertyRef || '').trim() || null
    const saleTimeline = String(body.saleTimeline || '').trim() || null
    const propertyType = String(body.propertyType || '').trim() || null
    const location = String(body.location || '').trim() || null
    const sqMeters = String(body.sqMeters || '').trim() || null
    const bedrooms = String(body.bedrooms || '').trim() || null
    const bathrooms = String(body.bathrooms || '').trim() || null
    const condition = String(body.condition || '').trim() || null
    const observations = String(body.observations || '').trim() || null

    if (!fullName || !phone) {
      return NextResponse.json({ error: 'Nombre y telefono son obligatorios' }, { status: 400 })
    }
    if (!LEAD_SOURCES.includes(source as (typeof LEAD_SOURCES)[number])) {
      return NextResponse.json({ error: 'Origen de lead no valido' }, { status: 400 })
    }
    if (!LEAD_INTENTS.includes(intent as (typeof LEAD_INTENTS)[number])) {
      return NextResponse.json({ error: 'Tipo de interes no valido' }, { status: 400 })
    }
    if (!LEAD_PRIORITIES.includes(priority as (typeof LEAD_PRIORITIES)[number])) {
      return NextResponse.json({ error: 'Prioridad no valida' }, { status: 400 })
    }

    const row = await insertLeadRow({
      full_name: fullName,
      phone,
      email,
      notes,
      source: source as LeadRow['source'],
      intent: intent as LeadRow['intent'],
      priority: priority as LeadRow['priority'],
      property_ref: propertyRef,
      sale_timeline: saleTimeline,
      status: 'nuevo',
    })

    const lead = rowsToLeads([row])[0]
    const emailResult = await sendLeadNotificationEmail({
      full_name: fullName,
      phone,
      email,
      source,
      intent,
      notes,
      property_ref: propertyRef,
      sale_timeline: saleTimeline,
      property_type: propertyType,
      location,
      sq_meters: sqMeters,
      bedrooms,
      bathrooms,
      condition,
      observations,
    })

    if (!emailResult.ok) {
      console.error('[api/leads] No se pudo enviar el email al equipo:', emailResult.error)
    }

    return NextResponse.json(lead, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear lead' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  try {
    const body = await request.json()
    const id = String(body.id || '').trim()
    if (!id) return NextResponse.json({ error: 'ID no valido' }, { status: 400 })

    const updates: Partial<LeadRow> = {}
    if (body.status) {
      const status = String(body.status)
      if (!LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
        return NextResponse.json({ error: 'Estado no valido' }, { status: 400 })
      }
      updates.status = status as LeadRow['status']
      if (status === 'contactado' && !body.firstResponseAt) {
        updates.first_response_at = new Date().toISOString()
      }
    }
    if (body.priority) {
      const priority = String(body.priority)
      if (!LEAD_PRIORITIES.includes(priority as (typeof LEAD_PRIORITIES)[number])) {
        return NextResponse.json({ error: 'Prioridad no valida' }, { status: 400 })
      }
      updates.priority = priority as LeadRow['priority']
    }
    if (body.notes !== undefined) updates.notes = String(body.notes || '').trim() || null
    if (body.assignedTo !== undefined) updates.assigned_to = String(body.assignedTo || '').trim() || null
    if (body.lastContactAt) updates.last_contact_at = new Date(body.lastContactAt).toISOString()

    const row = await updateLeadRow(id, updates)
    if (!row) return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 })
    return NextResponse.json(rowsToLeads([row])[0])
  } catch {
    return NextResponse.json({ error: 'Error al actualizar lead' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  try {
    const body = await request.json()
    const id = String(body.id || '').trim()
    if (!id) return NextResponse.json({ error: 'ID no valido' }, { status: 400 })

    const deleted = await deleteLeadRow(id)
    if (!deleted) return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar lead' }, { status: 500 })
  }
}
