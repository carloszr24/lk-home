export function extractProvinceFromLocation(location: string): string | null {
  const match = location.match(/\(([^)]+)\)\s*$/)
  return match ? match[1].trim() : null
}

export function getPropertyProvince(property: {
  province?: string | null
  location: string
}): string | null {
  return property.province?.trim() || extractProvinceFromLocation(property.location)
}
