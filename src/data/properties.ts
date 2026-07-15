import type { Property } from '@/types'

const now = new Date('2026-07-14T12:00:00.000Z')

/** Catálogo demo en archivo local. Se copia a `.data/properties.json` en el primer arranque. */
export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'demo-casa-001',
    title: 'Casa unifamiliar con jardín',
    price: 250_000,
    location: 'Zona residencial',
    province: '',
    type: 'casa',
    operation: 'venta',
    status: 'disponible',
    description: `Casa unifamiliar en urbanización tranquila, lista para entrar a vivir.

Distribuida en dos plantas con salón-comedor, cocina amplia, patio con jardín y zona de noche con tres dormitorios y dos baños completos.

Precio negociable. Solicita visita sin compromiso.`,
    images: JSON.stringify([]),
    fotocasaUrl: null,
    bedrooms: 3,
    bathrooms: 2,
    sqMeters: null,
    availability: 'Entrega inmediata',
    hotWater: null,
    heating: null,
    condition: 'Buen estado',
    propertyAge: null,
    floor: null,
    garage: null,
    elevator: 'No',
    furnished: null,
    extras: [],
    featured: true,
    archived: false,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'demo-casa-002',
    title: 'Chalet con piscina',
    price: 380_000,
    location: 'Zona residencial',
    province: '',
    type: 'casa',
    operation: 'venta',
    status: 'disponible',
    description: `Chalet en zona residencial consolidada, con parques y servicios en los alrededores.

Cuatro dormitorios, tres baños completos, cocina independiente y patio con piscina. Cochera doble y acabados de calidad.

Entrega inmediata.`,
    images: JSON.stringify([]),
    fotocasaUrl: null,
    bedrooms: 4,
    bathrooms: 3,
    sqMeters: null,
    availability: 'Entrega inmediata',
    hotWater: null,
    heating: null,
    condition: 'Excelente estado',
    propertyAge: null,
    floor: null,
    garage: 'Cochera doble',
    elevator: 'No',
    furnished: null,
    extras: ['pool', 'garage'],
    featured: true,
    archived: false,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'demo-piso-001',
    title: 'Piso luminoso en zona céntrica',
    price: 78_500,
    location: 'Centro urbano',
    province: '',
    type: 'piso',
    operation: 'venta',
    status: 'disponible',
    description: `Piso en edificio sin ascensor, en una zona tranquila y bien comunicada.

Salón amplio con balcón, tres dormitorios, baño completo y cocina independiente. Ideal como vivienda habitual o inversión.

Precio negociable.`,
    images: JSON.stringify([]),
    fotocasaUrl: null,
    bedrooms: 3,
    bathrooms: 1,
    sqMeters: null,
    availability: 'Disponible',
    hotWater: null,
    heating: null,
    condition: 'Buen estado',
    propertyAge: null,
    floor: '1ª planta',
    garage: null,
    elevator: 'No',
    furnished: null,
    extras: [],
    featured: true,
    archived: false,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
]
