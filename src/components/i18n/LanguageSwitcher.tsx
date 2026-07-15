'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LOCALE_LABELS, type Locale } from '@/i18n/config'
import { useI18n } from '@/i18n/client'
import { cn } from '@/lib/utils'

function FlagSpain({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-lg shadow-sm ring-1 ring-stone-200/80', className)} aria-hidden>
      🇪🇸
    </span>
  )
}

function FlagBasque({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-8 w-8 overflow-hidden rounded-full shadow-sm ring-1 ring-stone-200/80',
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="h-full w-full">
        <rect width="32" height="32" fill="#D52B1E" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#009B48" strokeWidth="6" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#fff" strokeWidth="2.5" />
      </svg>
    </span>
  )
}

const FLAGS: Record<Locale, typeof FlagSpain> = {
  es: FlagSpain,
  eu: FlagBasque,
}

export function LanguageSwitcher() {
  const pathname = usePathname()
  const { locale, setLocale, dict } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  if (pathname.startsWith('/admin')) return null

  const CurrentFlag = FLAGS[locale]

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const locales: Locale[] = ['es', 'eu']

  return (
    <div
      ref={rootRef}
      className="fixed right-3 md:right-5 top-[4.75rem] md:top-[5.75rem] z-40 flex flex-col items-end gap-1"
    >
      <div className="flex items-center gap-1 rounded-full border border-stone-200/90 bg-white/95 p-1 shadow-md backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1 rounded-full px-1 py-0.5 transition-colors hover:bg-stone-50"
          aria-label={dict.language.select}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <CurrentFlag />
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
            className={cn('h-3.5 w-3.5 text-stone-500 transition-transform', open && 'rotate-180')}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {locales
          .filter((l) => l !== locale)
          .map((l) => {
            const Flag = FLAGS[l]
            return (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                className="rounded-full p-0.5 transition-opacity hover:opacity-80"
                aria-label={LOCALE_LABELS[l]}
                title={LOCALE_LABELS[l]}
              >
                <Flag />
              </button>
            )
          })}
      </div>

      {open && (
        <ul
          role="listbox"
          aria-label={dict.language.select}
          className="min-w-[9.5rem] overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lg"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => {
                  setLocale(l)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-stone-50',
                  l === locale && 'bg-stone-50 font-medium text-brand-charcoal'
                )}
              >
                {l === 'es' ? <FlagSpain className="h-7 w-7 text-base" /> : <FlagBasque className="h-7 w-7" />}
                <span>{dict.language[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
