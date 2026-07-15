import type { Metadata } from 'next'
import { Suspense } from 'react'
import { filterProperties, getPublicProperties } from '@/lib/properties-store'
import { listProvincesFromProperties } from '@/lib/property-location'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'
import { HEADER_OFFSET_CLASS } from '@/lib/logo'
import { getServerI18n, getSiteMetadataVars } from '@/i18n/server'
import { interpolate } from '@/i18n/interpolate'

export const dynamic = 'force-dynamic'

interface SearchParams {
  type?: string
  operation?: string
  status?: string
  minPrice?: string
  maxPrice?: string
  extra?: string
  extras?: string
  bedrooms?: string
  bathrooms?: string
  province?: string
}

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getServerI18n()
  const vars = getSiteMetadataVars(dict)
  return {
    title: interpolate(dict.metadata.properties.title, vars),
    description: dict.metadata.properties.description,
  }
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const allProperties = await getPublicProperties()
  const availableProvinces = listProvincesFromProperties(allProperties)
  const properties = filterProperties(allProperties, searchParams)
  const { dict } = await getServerI18n()
  const p = dict.properties

  return (
    <div className={HEADER_OFFSET_CLASS}>
      <div className="bg-brand-black text-white py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-400 text-xs tracking-[0.3em] uppercase mb-4">{p.eyebrow}</p>
          <h1 className="font-display text-5xl md:text-6xl font-light">{p.title}</h1>
          <p className="text-stone-400 mt-4 text-lg font-light">
            {properties.length === 1
              ? interpolate(p.countOne, { count: properties.length })
              : interpolate(p.countMany, { count: properties.length })}
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="skeleton h-40 w-full" />}>
        <PropertyFilters availableProvinces={availableProvinces} />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        {properties.length === 0 ? (
          <div className="border border-dashed border-stone-200 py-32 text-center">
            <p className="mb-2 text-lg text-stone-400">{p.noResults}</p>
            <p className="mb-6 text-sm text-stone-400">{p.noResultsHint}</p>
            <a href="/propiedades" className="btn-primary px-8 py-3 text-sm">
              {p.viewAll}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
