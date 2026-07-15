import type { Locale } from './config'
import es from './dictionaries/es.json'
import eu from './dictionaries/eu.json'
import type { Dictionary } from './types'

const dictionaries: Record<Locale, Dictionary> = { es, eu }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
