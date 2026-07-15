export const LOCALES = ['es', 'eu'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'es'
export const LOCALE_COOKIE = 'lk-locale'
export const LOCALE_STORAGE_KEY = 'lk-locale'

export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Español',
  eu: 'Euskara',
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'es' || value === 'eu'
}
