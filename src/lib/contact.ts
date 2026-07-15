import { SITE_FULL_NAME, SITE_NAME, SITE_TAGLINE } from '@/lib/brand'

export const CONTACT_EMAIL = ''

export const AGENT = {
  name: SITE_NAME,
  fullName: SITE_FULL_NAME,
  title: SITE_TAGLINE,
  tagline:
    'Compra y venta de viviendas, hipotecas, asesoría personalizada y créditos empresariales y personales.',
} as const

export const LEGAL = {
  ownerName: SITE_NAME,
  legalForm: '',
  taxId: '',
  address: '',
} as const

export const OFFICES = {
  primary: {
    label: 'Oficina',
    line1: '',
    line2: '',
    full: '',
    mapsQuery: '',
  },
} as const

export const OPENING_HOURS = [
  { day: 'Lunes', hours: '10:00–14:00' },
  { day: 'Martes', hours: '10:00–14:00' },
  { day: 'Miércoles', hours: '10:00–14:00' },
  { day: 'Jueves', hours: '10:00–14:00' },
  { day: 'Viernes', hours: '10:00–14:00' },
  { day: 'Sábado', hours: 'Cerrado' },
  { day: 'Domingo', hours: 'Cerrado' },
] as const

const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? CONTACT_EMAIL).trim()
const phoneDisplay = (process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '').trim()
const phoneE164 = (process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 ?? '').trim()
const phoneWa = (process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? phoneE164.replace(/^\+/, '')).trim()

export const CONTACT = {
  address: OFFICES.primary,
  offices: OFFICES,
  phone: {
    display: phoneDisplay,
    e164: phoneE164,
    wa: phoneWa,
    label: 'Teléfono',
  },
  email: contactEmail,
} as const

export const hasPhone = CONTACT.phone.display.length > 0 && CONTACT.phone.e164.length > 0
export const mapsHref = CONTACT.address.mapsQuery ? `https://maps.google.com/?q=${CONTACT.address.mapsQuery}` : ''
export const phoneHref = hasPhone ? `tel:${CONTACT.phone.e164}` : ''
export const hasEmail = CONTACT.email.length > 0
export const emailHref = hasEmail ? `mailto:${CONTACT.email}` : ''
export const whatsappHref = CONTACT.phone.wa ? `https://wa.me/${CONTACT.phone.wa}` : ''
export const whatsappDisplay = hasPhone ? `+34 ${CONTACT.phone.display}` : ''
