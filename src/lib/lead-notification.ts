import { LEAD_INTENT_LABELS, LEAD_SOURCE_LABELS } from '@/lib/leads'
import type { LeadIntent, LeadSource } from '@/types'

export type LeadNotificationPayload = {
  full_name: string
  phone: string
  email?: string | null
  source: string
  intent: string
  notes?: string | null
  property_ref?: string | null
  sale_timeline?: string | null
}

const BRAND_RED = '#C8102E'
const BRAND_BLUE = '#0057FF'
const SITE_URL = 'https://www.ymarinmobiliaria.es'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function intentLabel(intent: string): string {
  return LEAD_INTENT_LABELS[intent as LeadIntent] || intent
}

function sourceLabel(source: string): string {
  return LEAD_SOURCE_LABELS[source as LeadSource] || source
}

function buildSubject(record: LeadNotificationPayload): string {
  const name = record.full_name
  const intent = intentLabel(record.intent)

  switch (record.source) {
    case 'web_contacto':
      return `[YMAR] ${name} · Contacto web · ${intent}`
    case 'web_valoracion':
      return `[YMAR] ${name} · Valoración gratuita`
    default:
      return `[YMAR] Nuevo lead · ${name}`
  }
}

function buildHeadline(record: LeadNotificationPayload): string {
  switch (record.source) {
    case 'web_contacto':
      return 'Nuevo mensaje de contacto'
    case 'web_valoracion':
      return 'Nueva solicitud de valoración'
    default:
      return 'Nuevo aviso en la web'
  }
}

function buildBadge(record: LeadNotificationPayload): { label: string; color: string } {
  switch (record.source) {
    case 'web_contacto':
      return { label: 'Contacto', color: BRAND_BLUE }
    case 'web_valoracion':
      return { label: 'Valoración gratuita', color: BRAND_RED }
    default:
      return { label: sourceLabel(record.source), color: '#57534e' }
  }
}

type FieldRow = { label: string; value: string; href?: string }

function buildFields(record: LeadNotificationPayload): FieldRow[] {
  const fields: FieldRow[] = [
    { label: 'Nombre', value: record.full_name },
    { label: 'Teléfono', value: record.phone, href: `tel:${record.phone.replace(/\s/g, '')}` },
  ]

  if (record.email) {
    fields.push({ label: 'Email', value: record.email, href: `mailto:${record.email}` })
  }

  fields.push({ label: 'Interés', value: intentLabel(record.intent) })

  if (record.property_ref) {
    fields.push({ label: 'Referencia', value: record.property_ref })
  }

  if (record.sale_timeline) {
    fields.push({ label: 'Plazo de venta', value: record.sale_timeline })
  }

  if (record.notes) {
    fields.push({ label: 'Mensaje', value: record.notes })
  }

  return fields
}

function renderFieldValue(field: FieldRow): string {
  const safeValue = escapeHtml(field.value)
  if (field.href) {
    return `<a href="${escapeHtml(field.href)}" style="color:${BRAND_BLUE};text-decoration:none;font-weight:600">${safeValue}</a>`
  }
  return `<span style="color:#1c1917">${safeValue}</span>`
}

function buildEmailContent(record: LeadNotificationPayload) {
  const headline = buildHeadline(record)
  const badge = buildBadge(record)
  const fields = buildFields(record)
  const now = new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const textLines = [
    headline,
    '',
    ...fields.map((field) => `${field.label}: ${field.value}`),
    '',
    `Recibido: ${now}`,
    SITE_URL,
  ]

  const text = textLines.join('\n')

  const fieldRows = fields
    .map((field) => {
      const isMessage = field.label === 'Mensaje'
      const valueCell = isMessage
        ? `<td style="padding:12px 16px;background:#fafaf9;border:1px solid #e7e5e4;border-radius:8px;white-space:pre-wrap;line-height:1.6">${renderFieldValue(field)}</td>`
        : `<td style="padding:10px 0;text-align:right">${renderFieldValue(field)}</td>`

      if (isMessage) {
        return `
          <tr>
            <td colspan="2" style="padding:16px 0 6px">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#78716c">${escapeHtml(field.label)}</div>
            </td>
          </tr>
          <tr><td colspan="2">${valueCell}</td></tr>`
      }

      return `
          <tr>
            <td style="padding:10px 0;font-size:13px;font-weight:600;color:#78716c;vertical-align:top;width:38%">${escapeHtml(field.label)}</td>
            ${valueCell}
          </tr>`
    })
    .join('')

  const ctaButtons = `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0">
      <tr>
        <td style="padding-right:10px">
          <a href="tel:${escapeHtml(record.phone.replace(/\s/g, ''))}" style="display:inline-block;background:${BRAND_RED};color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:8px">Llamar ahora</a>
        </td>
        ${
          record.email
            ? `<td>
          <a href="mailto:${escapeHtml(record.email)}" style="display:inline-block;background:#ffffff;color:${BRAND_RED};font-size:14px;font-weight:700;text-decoration:none;padding:11px 20px;border-radius:8px;border:2px solid ${BRAND_RED}">Responder por email</a>
        </td>`
            : ''
        }
      </tr>
    </table>`

  const html = `
<!DOCTYPE html>
<html lang="es">
  <body style="margin:0;padding:24px 12px;background:#f5f5f4;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto">
      <tr>
        <td style="background:${BRAND_RED};border-radius:12px 12px 0 0;padding:20px 24px">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.82)">YMAR Inmobiliaria</div>
          <div style="margin-top:8px;font-size:22px;font-weight:700;line-height:1.25;color:#ffffff">${escapeHtml(headline)}</div>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;border-left:1px solid #e7e5e4;border-right:1px solid #e7e5e4;padding:20px 24px 8px">
          <span style="display:inline-block;background:${badge.color};color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:6px 10px;border-radius:999px">${escapeHtml(badge.label)}</span>
          <span style="display:inline-block;margin-left:8px;font-size:13px;color:#78716c">${escapeHtml(now)}</span>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;border-left:1px solid #e7e5e4;border-right:1px solid #e7e5e4;padding:8px 24px 24px">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            ${fieldRows}
          </table>
          ${ctaButtons}
        </td>
      </tr>
      <tr>
        <td style="background:#fafaf9;border:1px solid #e7e5e4;border-top:none;border-radius:0 0 12px 12px;padding:16px 24px;text-align:center">
          <a href="${SITE_URL}" style="font-size:13px;color:#78716c;text-decoration:none">ymarinmobiliaria.es</a>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim()

  return { text, html, subject: buildSubject(record) }
}

function notificationRecipients(): string[] {
  const raw = process.env.LEADS_NOTIFICATION_EMAIL?.trim() || 'ymarinmobiliaria@gmail.com'
  return raw
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

export function isLeadEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && notificationRecipients().length > 0)
}

export async function sendLeadNotificationEmail(
  record: LeadNotificationPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY no configurada' }
  }

  const to = notificationRecipients()
  if (to.length === 0) {
    return { ok: false, error: 'LEADS_NOTIFICATION_EMAIL no configurado' }
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || 'YMAR Inmobiliaria <onboarding@resend.dev>'

  const { text, html, subject } = buildEmailContent(record)
  const body: Record<string, unknown> = {
    from,
    to,
    subject,
    text,
    html,
  }

  if (record.email) {
    body.reply_to = record.email
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[lead-notification] Resend error:', res.status, err)
    return { ok: false, error: err }
  }

  return { ok: true }
}
