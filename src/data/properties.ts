import type { Property } from '@/types'

const now = new Date('2026-07-15T12:00:00.000Z')

function images(...paths: string[]): string {
  return JSON.stringify(paths.map((p) => `/images/${p}`))
}

/** Catálogo inicial. Se copia a `.data/properties.json` en el primer arranque. */
export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'lk1',
    title: 'Dúplex en venta en Calle Modesto Txurruka s/n',
    price: 380_000,
    location: 'Mutriku',
    province: 'Guipúzcoa',
    type: 'duplex',
    operation: 'venta',
    status: 'disponible',
    description: `¡Descubre este espectacular dúplex de 140 m² en una ubicación privilegiada! Situado en la segunda planta, este hogar ofrece un amplio salón comedor lleno de luz natural gracias a sus grandes ventanas. Imagina disfrutar de las frías noches junto a la acogedora chimenea, creando un ambiente perfecto para relajarte. La cocina, completamente equipada y en un espacio diáfano, se integra a la perfección con el salón y comedor, ideal para compartir momentos inolvidables con amigos y familiares.

Este dúplex cuenta con dos acogedores dormitorios que garantizan el descanso y la intimidad. Además, tienes la opción de transformar el espacio adicional de uno de ellos en una tercera habitación o un vestidor, adaptándolo a tus necesidades. El baño completo de la planta superior brinda comodidad en tu día a día.

Cada planta tiene 70 m².

No te pierdas el balcón con vistas despejadas al puerto y al mar, un lugar perfecto para disfrutar del aire fresco y contemplar la belleza del entorno. Construido en 2007 y en excelente estado, este inmueble también incluye un trastero de aproximadamente 30 m², ideal para almacenar todo lo que necesites. Con calefacción central y una distribución pensada para maximizar el confort, este dúplex es la opción perfecta para quienes buscan calidad de vida en un entorno inigualable.

150 m² construidos · 142 m² útiles · 2ª planta exterior · Sin ascensor · Certificado energético en trámite.`,
    images: images('lk1.png', 'lk1-1.png', 'lk1-2.png', 'lk1-3.png'),
    fotocasaUrl: null,
    bedrooms: 2,
    bathrooms: 2,
    sqMeters: 150,
    availability: 'Disponible',
    hotWater: null,
    heating: 'Calefacción central',
    condition: 'Buen estado',
    propertyAge: '2007',
    floor: '2ª planta exterior',
    garage: null,
    elevator: 'No',
    furnished: null,
    extras: ['storage', 'heating'],
    energyRating: 'En trámite',
    energyValue: null,
    emissionsRating: null,
    emissionsValue: null,
    featured: true,
    archived: false,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'lk2',
    title: 'Chalet independiente en venta en Laranga Auzoa',
    price: 990_000,
    location: 'Mutriku',
    province: 'Guipúzcoa',
    type: 'casa',
    operation: 'venta',
    status: 'disponible',
    description: `Chalet independiente en venta en Mutriku, un encantador pueblo pesquero que ofrece la combinación perfecta de tranquilidad y belleza natural. Ubicado en el barrio de Laranga, este hogar cuenta con vistas de 360 grados que te dejarán sin aliento. Construido en 1995 y con zonas recientemente mejoradas, el chalet se extiende sobre una generosa superficie construida de 220 m², rodeado de una parcela de 16.000 m² que garantiza privacidad y espacio para disfrutar.

La distribución del chalet es óptima, con amplios espacios luminosos gracias a sus grandes ventanas que permiten la entrada de luz natural. El acogedor salón de la casa principal con chimenea se conecta perfectamente con la terraza y el jardín, creando un ambiente ideal para reuniones familiares y momentos de relax. La amplia terraza, equipada con jardín, parrilla y piscina, es perfecta para disfrutar del aire libre y organizar inolvidables barbacoas. Todas las estancias tienen acceso a la zona de piscina y jardín.

Este chalet cuenta con cinco habitaciones espaciosas, adaptables a diferentes necesidades, ideales para familias numerosas o para aquellos que deseen tener un espacio extra para invitados. Con tres baños completos y un aseo, la comodidad está garantizada. También dispone de tres cocinas independientes completamente equipadas. Un altillo abuhardillado con buena altura que ofrece muchas posibilidades.

No te preocupes por el almacenamiento, ya que el inmueble incluye un gran trastero para maquinaria y herramientas, además de un parking privado con capacidad para 3 a 4 coches y lavadero.

Hay lugares donde el tiempo se ralentiza, donde huele a mar y a historia, y donde la calidad de vida se convierte en rutina. Mutriku conserva su alma intacta: calles con carácter, tradición marinera, tranquilidad y una belleza que no se negocia.

240 m² construidos · Parcela de 16.000 m² · 5 habitaciones · 3 baños · Orientación norte, sur, este y oeste.`,
    images: images('lk2.png', 'lk2-1.png', 'lk2-2.png', 'lk2-3.png'),
    fotocasaUrl: null,
    bedrooms: 5,
    bathrooms: 3,
    sqMeters: 240,
    availability: 'Disponible',
    hotWater: null,
    heating: 'Calefacción individual',
    condition: 'Buen estado',
    propertyAge: '1995',
    floor: '2 plantas',
    garage: 'Plaza de garaje incluida',
    elevator: 'No',
    furnished: null,
    extras: ['pool', 'garage', 'storage', 'heating'],
    energyRating: null,
    energyValue: 146,
    emissionsRating: null,
    emissionsValue: 31,
    featured: true,
    archived: false,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'lk3',
    title: 'Piso en venta en Calle Jose M Linazasoro, 1',
    price: 270_000,
    location: 'Mendaro',
    province: 'Guipúzcoa',
    type: 'piso',
    operation: 'venta',
    status: 'disponible',
    description: `Descubre este espectacular piso en Mendaro, ideal para quienes buscan comodidad y estilo. Con una superficie útil de 90 m², este inmueble se encuentra en una ubicación privilegiada, paralelo al río Deba y a pocos pasos de todos los servicios necesarios. La orientación noreste-suroeste garantiza luz natural durante todo el día, creando un ambiente cálido y acogedor.

El piso cuenta con tres amplios dormitorios, perfectos para toda la familia, y dos baños completos, uno de ellos en suite, que ofrecen privacidad y confort. El salón-comedor es espacioso y luminoso, ideal para disfrutar de momentos en familia o recibir amigos. La cocina está completamente equipada, lista para que des rienda suelta a tu creatividad culinaria.

Además, este inmueble incluye un garaje doble con acceso directo a la vivienda mediante ascensor, lo que añade un plus de comodidad. También cuenta con un amplio trastero independiente, perfecto para almacenar todo lo que necesites. El estado de conservación es excelente, ya que fue construido en 2007 y se ha mantenido en perfectas condiciones.

No dejes pasar la oportunidad de vivir en este maravilloso piso exterior, con un patio interior que brinda un espacio adicional para relajarte.

100 m² construidos · 90 m² útiles · 1ª planta exterior · Con ascensor · Certificado energético en trámite.`,
    images: images('lk3.png', 'lk3-1.png', 'lk3-2.png', 'lk3-3.png'),
    fotocasaUrl: null,
    bedrooms: 3,
    bathrooms: 2,
    sqMeters: 100,
    availability: 'Disponible',
    hotWater: null,
    heating: 'Gas natural individual',
    condition: 'Excelente estado',
    propertyAge: '2007',
    floor: '1ª planta exterior',
    garage: 'Plaza de garaje incluida',
    elevator: 'Sí',
    furnished: null,
    extras: ['garage', 'elevator', 'storage', 'heating'],
    energyRating: 'En trámite',
    energyValue: null,
    emissionsRating: null,
    emissionsValue: null,
    featured: true,
    archived: false,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
]
