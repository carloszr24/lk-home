import type { Property } from '@/types'

const now = new Date('2026-07-14T12:00:00.000Z')

/** Catálogo demo en archivo local. Se copia a `.data/properties.json` en el primer arranque. */
export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'casa-los-villares-ref-1246',
    title: 'Casa con piscina en Los Villares — entrega inmediata',
    price: 250_000,
    location: 'Los Villares (Jaén)',
    province: 'Jaén',
    type: 'casa',
    operation: 'venta',
    status: 'disponible',
    description: `Ref. 1246 · Los Villares (Jaén)

Casa unifamiliar en urbanización tranquila y consolidada, con todos los servicios a mano y a unos 10 minutos en coche de Jaén capital. Lista para entrar a vivir.

La vivienda se distribuye en dos plantas más sótano. En la planta principal encontrarás recibidor, salón-comedor, cocina amplia y un gran patio con porche y piscina privada. La zona de noche cuenta con tres dormitorios, tres baños completos y un aseo adicional, además de lavadero.

En el sótano dispone de cochera para dos vehículos —con cocina y chimenea—, trastero y sala de calderas. Calefacción por aerotermia y aire acondicionado por split en todas las estancias.

Precio negociable. En Olmo & Cobo te ayudamos también a encontrar la hipoteca que mejor encaje contigo.`,
    images: JSON.stringify([
      '/images/olmo-cobo1.jpg',
      '/images/olmo-cobo1-1.jpg',
      '/images/olmo-cobo1-2.jpg',
    ]),
    fotocasaUrl: null,
    bedrooms: 3,
    bathrooms: 4,
    sqMeters: null,
    availability: 'Entrega inmediata',
    hotWater: null,
    heating: 'Aerotermia',
    condition: 'Excelente estado',
    propertyAge: null,
    floor: null,
    garage: 'Cochera para 2 vehículos',
    elevator: 'No',
    furnished: null,
    extras: ['pool', 'garage', 'storage', 'heating'],
    featured: true,
    archived: false,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'casa-martos-piscina-ref-1260',
    title: 'Casa con piscina en zona residencial de Martos',
    price: 380_000,
    location: 'Martos (Jaén)',
    province: 'Jaén',
    type: 'casa',
    operation: 'venta',
    status: 'disponible',
    description: `Ref. 1260 · Martos (Jaén)

Chalet en una de las zonas residenciales más demandadas de Martos: tranquila, con parques, áreas de juego y ocio en los alrededores.

La casa ofrece cuatro dormitorios amplios y luminosos, cinco baños completos —uno en suite con bañera de hidromasaje— y dos cocinas, una junto al salón y otra en el sótano. El exterior incluye patio con piscina y solárium, además de cochera doble.

Entre sus extras destacan ventanas con doble acristalamiento, calefacción por suelo radiante, aire acondicionado central y acabados de diseño. Entrega inmediata.

Consulta financiación a medida: en Olmo & Cobo te acompañamos para conseguir la mejor hipoteca.`,
    images: JSON.stringify([
      '/images/olmo-cobo-2.jpg',
      '/images/olmo-cobo-2-1.jpg',
      '/images/olmo-cobo-2-2.jpg',
    ]),
    fotocasaUrl: null,
    bedrooms: 4,
    bathrooms: 5,
    sqMeters: null,
    availability: 'Entrega inmediata',
    hotWater: null,
    heating: 'Suelo radiante',
    condition: 'Excelente estado',
    propertyAge: null,
    floor: null,
    garage: 'Cochera doble',
    elevator: 'No',
    furnished: null,
    extras: ['pool', 'garage', 'heating'],
    featured: true,
    archived: false,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'piso-martos-juzgados-ref-1256',
    title: 'Piso en zona Juzgados, Martos',
    price: 78_500,
    location: 'Martos (Jaén)',
    province: 'Jaén',
    type: 'piso',
    operation: 'venta',
    status: 'disponible',
    description: `Ref. 1256 · Zona Juzgados, Martos (Jaén)

Piso en primera planta de edificio sin ascensor, en una zona tranquila y bien comunicada de Martos. Una opción equilibrada tanto como vivienda habitual como para inversión.

Dispone de salón amplio y luminoso con acceso a balcón, tres dormitorios, baño completo y cocina independiente con lavadero y pequeña terraza interior. Incluye aire acondicionado, calefacción y ventanas de aluminio con cristal Climalit.

Precio negociable. Solicita visita sin compromiso.`,
    images: JSON.stringify([
      '/images/olmo-cobo3.jpg',
      '/images/olmo-cobo3-1.jpg',
      '/images/olmo-cobo3-2.jpg',
    ]),
    fotocasaUrl: null,
    bedrooms: 3,
    bathrooms: 1,
    sqMeters: null,
    availability: 'Disponible',
    hotWater: null,
    heating: 'Calefacción instalada',
    condition: 'Buen estado',
    propertyAge: null,
    floor: '1ª planta',
    garage: null,
    elevator: 'No',
    furnished: null,
    extras: ['heating'],
    featured: true,
    archived: false,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
]
