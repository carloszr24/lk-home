'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import {
  BATHROOM_FILTER_OPTIONS,
  BEDROOM_FILTER_OPTIONS,
  PROPERTY_OPERATIONS,
  PROPERTY_PROVINCES,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
  OPERATION_LABELS,
  STATUS_LABELS,
  TYPE_LABELS,
} from '@/lib/utils'

const PRICE_MIN = 0
const PRICE_MAX = 1000000

export const EXTRA_FILTER_OPTIONS = [
  { value: 'garage', label: 'Garaje' },
  { value: 'elevator', label: 'Ascensor' },
  { value: 'furnished', label: 'Amueblado' },
  { value: 'heating', label: 'Calefacción' },
  { value: 'pool', label: 'Piscina' },
  { value: 'storage', label: 'Trastero' },
  { value: 'common_areas', label: 'Zonas comunes' },
] as const

function formatEuro(value: number): string {
  return new Intl.NumberFormat('es-ES', {
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

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

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
    setMobileOpen(false)
  }

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

  return (
    <div className="bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-end py-2.5">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="mr-auto md:hidden inline-flex items-center rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-700"
          >
            {mobileOpen ? 'Cerrar filtros' : 'Filtros'}
          </button>
          {hasFilters && (
            <button onClick={clearAll} className="text-sm text-gold hover:text-gold-dark transition-colors">
              Limpiar
            </button>
          )}
        </div>

        <div className={`${mobileOpen ? 'block' : 'hidden'} md:block py-3 md:py-4`}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Tipo de inmueble</label>
              <select value={type} onChange={(e) => updateParam('type', e.target.value)} className={selectClass}>
                <option value="">Todos</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Operación</label>
              <select value={operation} onChange={(e) => updateParam('operation', e.target.value)} className={selectClass}>
                <option value="">Todas</option>
                {PROPERTY_OPERATIONS.map((op) => (
                  <option key={op} value={op}>
                    {OPERATION_LABELS[op]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Estado</label>
              <select value={status} onChange={(e) => updateParam('status', e.target.value)} className={selectClass}>
                <option value="">Todos</option>
                {PROPERTY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Provincia</label>
              <select value={province} onChange={(e) => updateParam('province', e.target.value)} className={selectClass}>
                <option value="">Todas</option>
                {PROPERTY_PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Habitaciones</label>
              <select value={bedrooms} onChange={(e) => updateParam('bedrooms', e.target.value)} className={selectClass}>
                <option value="">Cualquiera</option>
                {BEDROOM_FILTER_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n === '4' ? '4 o más' : n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Baños</label>
              <select value={bathrooms} onChange={(e) => updateParam('bathrooms', e.target.value)} className={selectClass}>
                <option value="">Cualquiera</option>
                {BATHROOM_FILTER_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n === '3' ? '3 o más' : n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Precio mínimo</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-400">€</span>
                <input
                  type="number"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  value={minPriceValue}
                  onChange={(e) => updateParam('minPrice', e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full pl-7 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
                  placeholder={formatEuro(PRICE_MIN)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Precio máximo</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-400">€</span>
                <input
                  type="number"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  value={maxPriceValue}
                  onChange={(e) => updateParam('maxPrice', e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full pl-7 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
                  placeholder={formatEuro(PRICE_MAX)}
                />
              </div>
            </div>
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <label className="text-xs text-stone-500 mb-1.5 block">Extras</label>
              <div className="rounded-2xl border border-stone-200 bg-white p-3">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {EXTRA_FILTER_OPTIONS.map((option) => {
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
  )
}
