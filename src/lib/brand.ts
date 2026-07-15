export const SITE_NAME = (process.env.NEXT_PUBLIC_SITE_NAME ?? 'LK Home').trim()

export const SITE_FULL_NAME = (process.env.NEXT_PUBLIC_SITE_FULL_NAME ?? 'Inmobiliaria LK Home').trim()

export const SITE_TAGLINE = (process.env.NEXT_PUBLIC_SITE_TAGLINE ?? 'Inmobiliaria en Gipuzkoa').trim()

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').trim()

export const BRAND_COLORS = {
  charcoal: '#333333',
  charcoalLight: '#5c5c5c',
  charcoalDark: '#1a1a1a',
  stone: '#f5f5f4',
  white: '#ffffff',
} as const
