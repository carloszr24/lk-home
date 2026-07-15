'use client'

import { createContext, useCallback, useContext, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_STORAGE_KEY, type Locale } from './config'
import { getDictionary } from './get-dictionary'
import { interpolate } from './interpolate'
import type { Dictionary } from './types'
import { formatPriceLocalized, getExtraLabel, getOpeningHours } from './utils'

type I18nContextValue = {
  locale: Locale
  dict: Dictionary
  t: (template: string, vars?: Record<string, string | number | undefined | null>) => string
  setLocale: (locale: Locale) => void
  formatPrice: (price: number, operation?: string) => string
  getExtraLabel: (extraId: string) => string
  openingHours: ReturnType<typeof getOpeningHours>
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const router = useRouter()
  const dict = useMemo(() => getDictionary(locale), [locale])

  const tFn = useCallback(
    (template: string, vars?: Record<string, string | number | undefined | null>) =>
      vars ? interpolate(template, vars) : template,
    []
  )

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return
      document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;SameSite=Lax`
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      router.refresh()
    },
    [locale, router]
  )

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dict,
      t: tFn,
      setLocale,
      formatPrice: (price, operation) => formatPriceLocalized(dict, locale, price, operation),
      getExtraLabel: (extraId) => getExtraLabel(dict, extraId),
      openingHours: getOpeningHours(dict),
    }),
    [dict, locale, setLocale, tFn]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

export function useI18nOptional() {
  return useContext(I18nContext)
}

export function syncLocaleFromStorage(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored === 'es' || stored === 'eu') {
      const current = document.cookie.match(new RegExp(`${LOCALE_COOKIE}=([^;]+)`))?.[1]
      if (current !== stored) {
        document.cookie = `${LOCALE_COOKIE}=${stored};path=/;max-age=31536000;SameSite=Lax`
      }
      return stored
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE
}
