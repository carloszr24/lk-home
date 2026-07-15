export const SITE_NAME = (process.env.NEXT_PUBLIC_SITE_NAME ?? 'LK Home').trim()

export const SITE_FULL_NAME = (process.env.NEXT_PUBLIC_SITE_FULL_NAME ?? SITE_NAME).trim()

export const SITE_TAGLINE = (process.env.NEXT_PUBLIC_SITE_TAGLINE ?? 'Inmobiliaria').trim()

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').trim()

export const BRAND_COLORS = {
  gold: '#C4A035',
  goldLight: '#E0C56A',
  goldDark: '#9A7B1F',
  black: '#0A0A0A',
} as const
