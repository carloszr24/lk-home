import { SITE_FULL_NAME, SITE_NAME, SITE_TAGLINE } from '@/lib/brand'

export const CONTACT_EMAIL = ''

export const AGENT = {
  name: SITE_NAME,
  fullName: SITE_FULL_NAME,
  title: SITE_TAGLINE,
  tagline:
    'Compra y venta de viviendas, alquileres y gestión integral de tu propiedad en Gipuzkoa.',
} as const

export const LEGAL = {
  ownerName: SITE_FULL_NAME,
  legalForm: '',
  taxId: '',
  address: 'Lersundi Kalea, 31, 20820 Gipuzkoa',
} as const

export const OFFICES = {
  primary: {
    label: 'Oficina',
    line1: 'Lersundi Kalea, 31',
    line2: '20820 Gipuzkoa',
    full: 'Lersundi Kalea, 31, 20820 Gipuzkoa',
    mapsQuery: 'Lersundi+Kalea+31,+20820+Deba,+Gipuzkoa',
  },
} as const

export const OPENING_HOURS = [
  { day: 'Lunes', hours: '10:00–14:00' },
  { day: 'Martes', hours: '10:00–14:00, 17:00–19:30' },
  { day: 'Miércoles', hours: '10:00–14:00' },
  { day: 'Jueves', hours: '10:00–14:00' },
  { day: 'Viernes', hours: '10:00–14:00' },
  { day: 'Sábado', hours: 'Cerrado' },
  { day: 'Domingo', hours: 'Cerrado' },
] as const

const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? CONTACT_EMAIL).trim()
const phoneDisplay = (process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '688 76 32 89').trim()
const phoneE164 = (process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 ?? '+34688763289').trim()
const phoneWa = (process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? '34688763289').trim()

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
