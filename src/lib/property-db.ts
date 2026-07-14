import type { Property } from '@/types'
import { DEMO_PROPERTIES } from '@/data/properties'
import { readJsonFile, writeJsonFile } from '@/lib/local-db'
import { normalizeExtraIds, parseExtrasColumn, syncLegacyExtraFields } from '@/lib/property-extras'
import {
  isArchivedFlag,
  isFeaturedFlag,
  MAX_FEATURED_ON_HOME,
  wouldExceedFeaturedHomeLimit,
} from '@/lib/property-constants'

export {
  isArchivedFlag,
  isFeaturedFlag,
  MAX_FEATURED_ON_HOME,
  MAX_PROPERTY_IMAGES,
  wouldExceedFeaturedHomeLimit,
} from '@/lib/property-constants'

const PROPERTIES_FILE = 'properties.json'

function normalizeExternalUrl(value?: string | null): string | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export type PropertyRow = {
  id: string
  title: string
  price: number
  location: string
  province: string | null
  type: string
  operation: string | null
  status: string
  description: string
  images: string
  fotocasa_url: string | null
  bedrooms: number | null
  bathrooms: number | null
  sq_meters: number | null
  availability: string | null
  hot_water: string | null
  heating: string | null
  condition: string | null
  property_age: string | null
  floor: string | null
  garage: string | null
  elevator: string | null
  furnished: string | null
  extras: unknown
  energy_rating: string | null
  energy_value: number | null
  emissions_rating: string | null
  emissions_value: number | null
  featured: boolean
  archived?: boolean
  sort_order?: number
  created_at: string
  updated_at: string
}

function propertyToRow(property: Property): PropertyRow {
  return {
    id: property.id,
    title: property.title,
    price: property.price,
    location: property.location,
    province: property.province ?? null,
    type: property.type,
    operation: property.operation ?? 'venta',
    status: property.status,
    description: property.description,
    images: property.images,
    fotocasa_url: property.fotocasaUrl ?? null,
    bedrooms: property.bedrooms ?? null,
    bathrooms: property.bathrooms ?? null,
    sq_meters: property.sqMeters ?? null,
    availability: property.availability ?? null,
    hot_water: property.hotWater ?? null,
    heating: property.heating ?? null,
    condition: property.condition ?? null,
    property_age: property.propertyAge ?? null,
    floor: property.floor ?? null,
    garage: property.garage ?? null,
    elevator: property.elevator ?? null,
    furnished: property.furnished ?? null,
    extras: property.extras ?? [],
    energy_rating: property.energyRating ?? null,
    energy_value: property.energyValue ?? null,
    emissions_rating: property.emissionsRating ?? null,
    emissions_value: property.emissionsValue ?? null,
    featured: Boolean(property.featured),
    archived: Boolean(property.archived),
    sort_order: property.sortOrder ?? 0,
    created_at: property.createdAt.toISOString(),
    updated_at: property.updatedAt.toISOString(),
  }
}

async function ensurePropertiesSeeded(): Promise<PropertyRow[]> {
  const existing = await readJsonFile<PropertyRow[] | null>(PROPERTIES_FILE, null)
  if (existing && existing.length > 0) return existing

  const seeded = DEMO_PROPERTIES.map(propertyToRow)
  await writeJsonFile(PROPERTIES_FILE, seeded)
  return seeded
}

async function readPropertyRows(): Promise<PropertyRow[]> {
  return ensurePropertiesSeeded()
}

async function writePropertyRows(rows: PropertyRow[]): Promise<void> {
  await writeJsonFile(PROPERTIES_FILE, rows)
}

export function rowToProperty(r: PropertyRow): Property {
  return {
    id: r.id,
    title: r.title,
    price: r.price,
    location: r.location,
    province: r.province,
    type: r.type,
    operation: r.operation || 'venta',
    status: r.status,
    description: r.description,
    images: r.images,
    fotocasaUrl: r.fotocasa_url,
    bedrooms: r.bedrooms,
    bathrooms: r.bathrooms,
    sqMeters: r.sq_meters,
    availability: r.availability,
    hotWater: r.hot_water,
    heating: r.heating,
    condition: r.condition,
    propertyAge: r.property_age,
    floor: r.floor,
    garage: r.garage,
    elevator: r.elevator,
    furnished: r.furnished,
    extras: parseExtrasColumn(r.extras),
    energyRating: r.energy_rating,
    energyValue: r.energy_value,
    emissionsRating: r.emissions_rating,
    emissionsValue: r.emissions_value,
    featured: r.featured,
    archived: isArchivedFlag(r.archived),
    sortOrder: r.sort_order ?? 0,
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  }
}

function sortRowsByDisplayOrder(rows: PropertyRow[]): PropertyRow[] {
  return [...rows].sort((a, b) => {
    const aOrder = a.sort_order
    const bOrder = b.sort_order
    if (typeof aOrder === 'number' && typeof bOrder === 'number' && aOrder !== bOrder) {
      return aOrder - bOrder
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
}

export function rowsToProperties(rows: PropertyRow[] | null): Property[] {
  if (!rows?.length) return []
  return sortRowsByDisplayOrder(rows).map(rowToProperty)
}

export type PropertyInsert = {
  title: string
  price: number
  location: string
  province: string | null
  type: string
  operation: string
  status: string
  description: string
  images: string
  fotocasa_url: string | null
  bedrooms: number | null
  bathrooms: number | null
  sq_meters: number | null
  availability: string | null
  hot_water: string | null
  heating: string | null
  condition: string | null
  property_age: string | null
  floor: string | null
  garage: string | null
  elevator: string | null
  furnished: string | null
  extras: unknown
  energy_rating: string | null
  energy_value: number | null
  emissions_rating: string | null
  emissions_value: number | null
  featured: boolean
  sort_order?: number
}

export function bodyToInsert(body: {
  title: string
  price: string | number
  location: string
  province?: string | null
  type: string
  operation?: string
  status?: string
  description: string
  images: string | string[]
  fotocasaUrl?: string | null
  bedrooms?: string | number | null
  bathrooms?: string | number | null
  sqMeters?: string | number | null
  availability?: string | null
  hotWater?: string | null
  heating?: string | null
  condition?: string | null
  propertyAge?: string | null
  floor?: string | null
  garage?: string | null
  elevator?: string | null
  furnished?: string | null
  extras?: string[] | null
  energyRating?: string | null
  energyValue?: string | number | null
  emissionsRating?: string | null
  emissionsValue?: string | number | null
  featured?: boolean
}): PropertyInsert {
  const imagesStr = Array.isArray(body.images) ? JSON.stringify(body.images) : String(body.images)
  const province = body.province?.trim() || null
  const extras = normalizeExtraIds(body.extras ?? [])
  const legacyExtras = syncLegacyExtraFields(extras)
  const heatingDetail = body.heating?.trim() || null

  return {
    title: body.title,
    price: typeof body.price === 'number' ? body.price : parseFloat(String(body.price)),
    location: body.location,
    province,
    type: body.type,
    operation: body.operation || 'venta',
    status: body.status || 'disponible',
    description: body.description,
    images: imagesStr,
    fotocasa_url: normalizeExternalUrl(body.fotocasaUrl),
    bedrooms: body.bedrooms !== undefined && body.bedrooms !== '' && body.bedrooms !== null
      ? parseInt(String(body.bedrooms), 10)
      : null,
    bathrooms: body.bathrooms !== undefined && body.bathrooms !== '' && body.bathrooms !== null
      ? parseInt(String(body.bathrooms), 10)
      : null,
    sq_meters: body.sqMeters !== undefined && body.sqMeters !== '' && body.sqMeters !== null
      ? parseFloat(String(body.sqMeters))
      : null,
    availability: body.availability || null,
    hot_water: body.hotWater || null,
    heating: heatingDetail || (extras.includes('heating') ? 'Sí' : null),
    condition: body.condition || null,
    property_age: body.propertyAge || null,
    floor: body.floor || null,
    garage: legacyExtras.garage,
    elevator: legacyExtras.elevator,
    furnished: legacyExtras.furnished,
    extras,
    energy_rating: body.energyRating || null,
    energy_value: body.energyValue !== undefined && body.energyValue !== '' && body.energyValue !== null
      ? parseFloat(String(body.energyValue))
      : null,
    emissions_rating: body.emissionsRating || null,
    emissions_value: body.emissionsValue !== undefined && body.emissionsValue !== '' && body.emissionsValue !== null
      ? parseFloat(String(body.emissionsValue))
      : null,
    featured: Boolean(body.featured),
  }
}

export function slugifyTitle(title: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72)
  return base || `propiedad-${Date.now()}`
}

async function uniquePropertyId(base: string): Promise<string> {
  const rows = await readPropertyRows()
  let candidate = base
  let n = 2
  while (rows.some((row) => row.id === candidate)) {
    candidate = `${base}-${n}`
    n += 1
  }
  return candidate
}

export async function listFeaturedPropertyRows(): Promise<PropertyRow[]> {
  const rows = await readPropertyRows()
  return sortRowsByDisplayOrder(rows)
    .filter((row) => isFeaturedFlag(row.featured) && !isArchivedFlag(row.archived))
    .slice(0, MAX_FEATURED_ON_HOME)
}

export async function listPropertyRows(): Promise<PropertyRow[]> {
  const rows = await readPropertyRows()
  return sortRowsByDisplayOrder(rows)
}

export async function getPropertyRowById(id: string): Promise<PropertyRow | null> {
  const rows = await readPropertyRows()
  return rows.find((row) => row.id === id) ?? null
}

async function nextSortOrder(): Promise<number> {
  const rows = await readPropertyRows()
  const max = rows.reduce((acc, row) => Math.max(acc, row.sort_order ?? 0), -1)
  return max + 1
}

export async function createPropertyRow(insert: PropertyInsert, titleForSlug: string): Promise<PropertyRow> {
  const rows = await readPropertyRows()
  const id = await uniquePropertyId(slugifyTitle(titleForSlug))
  const now = new Date().toISOString()
  const row: PropertyRow = {
    ...insert,
    id,
    sort_order: insert.sort_order ?? (await nextSortOrder()),
    archived: false,
    created_at: now,
    updated_at: now,
  }
  rows.push(row)
  await writePropertyRows(rows)
  return row
}

export async function updatePropertyRow(id: string, insert: PropertyInsert): Promise<PropertyRow> {
  const rows = await readPropertyRows()
  const index = rows.findIndex((row) => row.id === id)
  if (index === -1) throw new Error('Propiedad no encontrada')

  const updated: PropertyRow = {
    ...rows[index],
    ...insert,
    id,
    updated_at: new Date().toISOString(),
  }
  rows[index] = updated
  await writePropertyRows(rows)
  return updated
}

export async function deletePropertyRow(id: string): Promise<void> {
  const rows = await readPropertyRows()
  const filtered = rows.filter((row) => row.id !== id)
  if (filtered.length === rows.length) throw new Error('Propiedad no encontrada')
  await writePropertyRows(filtered)
}

export async function updatePropertySortOrders(ids: string[]): Promise<void> {
  const rows = await readPropertyRows()
  const now = new Date().toISOString()
  const orderMap = new Map(ids.map((id, index) => [id, index]))
  const updated = rows.map((row) => {
    const order = orderMap.get(row.id)
    if (order === undefined) return row
    return { ...row, sort_order: order, updated_at: now }
  })
  await writePropertyRows(updated)
}

export async function setPropertyArchived(id: string, archived: boolean): Promise<PropertyRow> {
  const rows = await readPropertyRows()
  const index = rows.findIndex((row) => row.id === id)
  if (index === -1) throw new Error('Propiedad no encontrada')

  const updated: PropertyRow = {
    ...rows[index],
    archived,
    featured: archived ? false : rows[index].featured,
    updated_at: new Date().toISOString(),
  }
  rows[index] = updated
  await writePropertyRows(rows)
  return updated
}

export async function assertFeaturedHomeLimit(
  wantFeatured: boolean,
  editingPropertyId: string | null
): Promise<string | null> {
  if (!wantFeatured) return null
  const rows = await listPropertyRows()
  const activeRows = rows.filter((row) => !isArchivedFlag(row.archived))
  if (wouldExceedFeaturedHomeLimit(activeRows, { wantFeatured, editingPropertyId })) {
    return `Solo puedes tener ${MAX_FEATURED_ON_HOME} destacadas en la home. Quita la marca en otra propiedad primero.`
  }
  return null
}
