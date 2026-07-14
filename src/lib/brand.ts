export const SITE_NAME = (process.env.NEXT_PUBLIC_SITE_NAME ?? 'Olmo & Cobo').trim()

export const SITE_FULL_NAME = 'Olmo & Cobo Grupo Inmobiliario & Financiero'

export const SITE_TAGLINE = 'Grupo Inmobiliario & Financiero'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').trim()

export const BRAND_COLORS = {
  gold: '#C4A035',
  goldLight: '#E0C56A',
  goldDark: '#9A7B1F',
  black: '#0A0A0A',
} as const
