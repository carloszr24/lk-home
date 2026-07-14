/** Máximo de inmuebles destacados en la página de inicio (home). */
export const MAX_FEATURED_ON_HOME = 3

/** Máximo de fotos por propiedad en el panel admin. */
export const MAX_PROPERTY_IMAGES = 50

/** Coherente con el filtro de la home ante valores raros desde DB. */
export function isFeaturedFlag(value: unknown): boolean {
  return value === true || value === 'true' || value === 't' || value === 1
}

export function isArchivedFlag(value: unknown): boolean {
  return value === true || value === 'true' || value === 't' || value === 1
}

/**
 * ¿Activar destacada superaría el cupo? Si esta fila ya es destacada, no ocupa "nuevo" cupo.
 */
export function wouldExceedFeaturedHomeLimit(
  rows: { id: string; featured: unknown }[],
  opts: { wantFeatured: boolean; editingPropertyId: string | null }
): boolean {
  if (!opts.wantFeatured) return false
  const featuredIds = rows.filter((r) => isFeaturedFlag(r.featured)).map((r) => r.id)
  if (opts.editingPropertyId && featuredIds.includes(opts.editingPropertyId)) return false
  return featuredIds.length >= MAX_FEATURED_ON_HOME
}
