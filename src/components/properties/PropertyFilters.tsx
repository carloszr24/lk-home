'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import {
  BATHROOM_FILTER_OPTIONS,
  BEDROOM_FILTER_OPTIONS,
  PROPERTY_OPERATIONS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from '@/lib/utils'
import { useI18n } from '@/i18n/client'
import { getPropertyExtraOptions } from '@/i18n/utils'

const PRICE_MIN = 0
const PRICE_MAX = 1000000

function formatEuro(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

const selectClass =
  'w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-400'

function parseSelectedExtras(extras: string | null, legacyExtra: string | null): string[] {
  const fromList = (extras || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  if (fromList.length > 0) return fromList
  return legacyExtra ? [legacyExtra] : []
}

export function PropertyFilters({ availableProvinces }: { availableProvinces: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { dict, locale } = useI18n()
  const f = dict.properties.filters
  const localeTag = locale === 'eu' ? 'eu-ES' : 'es-ES'
  const extraOptions = getPropertyExtraOptions(dict)

  const type = searchParams.get('type') || ''
  const operation = searchParams.get('operation') || ''
  const status = searchParams.get('status') || ''
  const province = searchParams.get('province') || ''
  const bedrooms = searchParams.get('bedrooms') || ''
  const bathrooms = searchParams.get('bathrooms') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  const selectedExtras = parseSelectedExtras(searchParams.get('extras'), searchParams.get('extra'))
  const minPriceValue = minPrice ? Number(minPrice) : ''
  const maxPriceValue = maxPrice ? Number(maxPrice) : ''

  const hasFilters =
    type ||
    operation ||
    status ||
    selectedExtras.length > 0 ||
    province ||
    bedrooms ||
    bathrooms ||
    minPrice ||
    maxPrice

  const [open, setOpen] = useState(Boolean(hasFilters))

  const updateParams = useCallback((mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString())
    mutate(params)
    params.delete('extra')
    router.replace(`/propiedades?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  const updateParam = useCallback((key: string, value: string) => {
    updateParams((params) => {
      if (value) params.set(key, value)
      else params.delete(key)
    })
  }, [updateParams])

  const setExtras = useCallback((values: string[]) => {
    updateParams((params) => {
      if (values.length > 0) params.set('extras', values.join(','))
      else params.delete('extras')
    })
  }, [updateParams])

  const clearAll = () => {
    router.replace('/propiedades', { scroll: false })
    setOpen(false)
  }

  return (
    <div className="bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between gap-4 py-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-sm text-stone-800 hover:text-stone-950 transition-colors"
            aria-expanded={open}
          >
            <span className="font-medium">{f.title}</span>
            {hasFilters && (
              <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[11px] font-medium text-brand-red">
                {f.active}
              </span>
            )}
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
              className={`h-4 w-4 text-stone-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {hasFilters && (
            <button onClick={clearAll} className="text-sm text-brand-charcoal hover:text-brand-charcoal-dark transition-colors">
              {f.clear}
            </button>
          )}
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pb-4 pt-1">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">{f.propertyType}</label>
              <select value={type} onChange={(e) => updateParam('type', e.target.value)} className={selectClass}>
                <option value="">{f.all}</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {dict.labels.type[t]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">{f.operation}</label>
              <select value={operation} onChange={(e) => updateParam('operation', e.target.value)} className={selectClass}>
                <option value="">{f.allF}</option>
                {PROPERTY_OPERATIONS.map((op) => (
                  <option key={op} value={op}>
                    {dict.labels.operation[op]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">{f.status}</label>
              <select value={status} onChange={(e) => updateParam('status', e.target.value)} className={selectClass}>
                <option value="">{f.all}</option>
                {PROPERTY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {dict.labels.status[s]}
                  </option>
                ))}
              </select>
            </div>

            {availableProvinces.length > 0 && (
              <div>
                <label className="text-xs text-stone-500 mb-1.5 block">{f.province}</label>
                <select value={province} onChange={(e) => updateParam('province', e.target.value)} className={selectClass}>
                  <option value="">{f.allF}</option>
                  {availableProvinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">{f.bedrooms}</label>
              <select value={bedrooms} onChange={(e) => updateParam('bedrooms', e.target.value)} className={selectClass}>
                <option value="">{f.any}</option>
                {BEDROOM_FILTER_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n === '4' ? f.fourOrMore : n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">{f.bathrooms}</label>
              <select value={bathrooms} onChange={(e) => updateParam('bathrooms', e.target.value)} className={selectClass}>
                <option value="">{f.any}</option>
                {BATHROOM_FILTER_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n === '3' ? f.threeOrMore : n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">{f.minPrice}</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-400">€</span>
                <input
                  type="number"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  value={minPriceValue}
                  onChange={(e) => updateParam('minPrice', e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full pl-7 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
                  placeholder={formatEuro(PRICE_MIN, localeTag)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">{f.maxPrice}</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-400">€</span>
                <input
                  type="number"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  value={maxPriceValue}
                  onChange={(e) => updateParam('maxPrice', e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full pl-7 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
                  placeholder={formatEuro(PRICE_MAX, localeTag)}
                />
              </div>
            </div>
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <label className="text-xs text-stone-500 mb-1.5 block">{f.extras}</label>
              <div className="rounded-2xl border border-stone-200 bg-white p-3">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {extraOptions.map((option) => {
                    const checked = selectedExtras.includes(option.value)
                    return (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors ${
                          checked
                            ? 'border-brand-red bg-brand-red/5 text-stone-900'
                            : 'border-transparent text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const next = checked
                              ? selectedExtras.filter((value) => value !== option.value)
                              : [...selectedExtras, option.value]
                            setExtras(next)
                          }}
                          className="accent-brand-red"
                        />
                        {option.label}
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
