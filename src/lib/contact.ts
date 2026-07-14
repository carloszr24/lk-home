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
  address: 'Avda. Europa Nº68, 23600 Martos, Jaén',
} as const

export const OFFICES = {
  primary: {
    label: 'Oficina',
    line1: 'Avda. Europa Nº68',
    line2: '23600 Martos, Jaén',
    full: 'Avda. Europa Nº68, 23600 Martos, Jaén',
    mapsQuery: 'Avda.+Europa+68,+23600+Martos,+Jaen',
  },
} as const

export const OPENING_HOURS = [
  { day: 'Lunes', hours: '10:00–14:00, 18:00–20:00' },
  { day: 'Martes', hours: '10:00–14:00, 18:00–20:00' },
  { day: 'Miércoles', hours: '10:00–14:00, 18:00–20:00' },
  { day: 'Jueves', hours: '10:00–14:00, 18:00–20:00' },
  { day: 'Viernes', hours: '10:00–14:00, 18:00–20:00' },
  { day: 'Sábado', hours: 'Cerrado' },
  { day: 'Domingo', hours: 'Cerrado' },
] as const

const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? CONTACT_EMAIL).trim()

export const CONTACT = {
  address: OFFICES.primary,
  offices: OFFICES,
  phone: {
    display: '603 92 96 04',
    e164: '+34603929604',
    wa: '34603929604',
    label: 'Teléfono',
  },
  email: contactEmail,
} as const

export const mapsHref = `https://maps.google.com/?q=${CONTACT.address.mapsQuery}`
export const phoneHref = `tel:${CONTACT.phone.e164}`
export const hasEmail = CONTACT.email.length > 0
export const emailHref = hasEmail ? `mailto:${CONTACT.email}` : ''
export const whatsappHref = `https://wa.me/${CONTACT.phone.wa}`
export const whatsappDisplay = `+34 ${CONTACT.phone.display}`
