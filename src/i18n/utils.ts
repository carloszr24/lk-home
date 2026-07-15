import type { Locale } from './config'
import type { Dictionary } from './types'

export function getOpeningHours(dict: Dictionary) {
  const { days } = dict
  return [
    { day: days.monday, hours: '10:00–14:00' },
    { day: days.tuesday, hours: '10:00–14:00, 17:00–19:30' },
    { day: days.wednesday, hours: '10:00–14:00' },
    { day: days.thursday, hours: '10:00–14:00' },
    { day: days.friday, hours: '10:00–14:00' },
    { day: days.saturday, hours: dict.common.closed },
    { day: days.sunday, hours: dict.common.closed },
  ]
}

export function getExtraLabel(dict: Dictionary, extraId: string): string {
  return dict.labels.extras[extraId] ?? extraId
}

export function formatPriceLocalized(
  dict: Dictionary,
  locale: Locale,
  price: number,
  operation?: string
): string {
  if (!price || price <= 0) return dict.common.consultPrice
  const localeTag = locale === 'eu' ? 'eu-ES' : 'es-ES'
  const base = new Intl.NumberFormat(localeTag, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
  return operation === 'alquiler' ? `${base}${dict.common.perMonth}` : base
}

export function getPropertyExtraOptions(dict: Dictionary) {
  return Object.entries(dict.labels.extras).map(([value, label]) => ({ value, label }))
}
