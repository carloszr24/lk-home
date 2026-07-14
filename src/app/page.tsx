import Link from 'next/link'
import { getFeaturedPropertiesForHome } from '@/lib/properties-store'
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel'
import { FeaturedPropertiesGrid } from '@/components/home/FeaturedPropertiesGrid'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import { ScrollHint } from '@/components/home/ScrollHint'
import { ValoracionGratuitaModal } from '@/components/home/ValoracionGratuitaModal'
import { BrandName } from '@/components/BrandName'
import { AGENT } from '@/lib/contact'

export const dynamic = 'force-dynamic'

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
      <path d="M3 11.25 12 4l9 7.25" />
      <path d="M5.25 10.5V20h13.5v-9.5" />
      <path d="M9.75 20v-5.5h4.5V20" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="M8 14v4M12 10v8M16 6v12" />
    </svg>
  )
}

function HandshakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
      <path d="M9.5 10.5 12 13l2.5-2.5a2 2 0 0 1 2.8 0l3.2 3.2a2 2 0 0 1 0 2.8l-1.4 1.4a2 2 0 0 1-2.8 0L12 13.7" />
      <path d="M14.5 10.5 12 8 9.5 10.5a2 2 0 0 1-2.8 0L3.5 7.3a2 2 0 0 1 0-2.8l1.4-1.4a2 2 0 0 1 2.8 0L12 7.3" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
      <path d="M3 7h18v12H3z" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  )
}

export default async function HomePage() {
  const featured = await getFeaturedPropertiesForHome()

  return (
    <>
      {/* HERO */}
      <section className="relative h-svh min-h-[32rem] flex flex-col items-center justify-center overflow-hidden pt-[4.75rem] pb-8 md:pt-[5.75rem] md:pb-10">
        <div className="absolute inset-0">
          <HeroCarousel />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        <div className="relative z-10 flex flex-1 w-full items-center justify-center px-4 min-[400px]:px-6 -translate-y-6 md:-translate-y-3">
          <div className="text-center max-w-5xl mx-auto w-full">
          <p className="text-gold text-xs tracking-[0.25em] uppercase mb-4 animate-fade-up">
            {AGENT.title}
          </p>
          <h1 className="font-display text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)] text-balance max-md:tracking-[-0.02em] text-[calc(clamp(2rem,6.5vw+0.25rem,3.2rem)+2pt)] md:text-[calc(clamp(2.5rem,4.8vw+0.9rem,5.2rem)+2pt)] leading-[1.12] md:leading-[1.06] mb-5 md:mb-6 animate-fade-up">
            Tu hogar y tu financiación,
            <span className="hidden md:inline"> </span>
            <br className="md:hidden" aria-hidden="true" />
            con <span className="text-gold [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">asesoría de confianza</span>
          </h1>
          <p className="text-stone-200 text-base sm:text-lg md:text-xl font-normal max-w-[min(100%,22rem)] sm:max-w-2xl mx-auto mb-8 md:mb-9 leading-relaxed text-pretty animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            {AGENT.tagline}
          </p>
          <div
            className="flex w-full max-w-xl mx-auto flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up md:-translate-y-2"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <Link
              href="/propiedades"
              className="btn-gold w-full sm:flex-1 sm:min-w-0 min-h-[3rem] md:min-h-[3.25rem] px-8 py-3.5 md:py-4 text-sm md:text-base tracking-wide text-center border-2 border-transparent box-border"
            >
              Quiero comprar
            </Link>
            <ValoracionGratuitaModal
              triggerLabel="Quiero vender"
              triggerClassName="inline-flex w-full sm:flex-1 sm:min-w-0 min-h-[3rem] md:min-h-[3.25rem] items-center justify-center px-8 py-3.5 md:py-4 text-sm md:text-base tracking-wide font-medium border-2 border-gold text-gold box-border hover:bg-gold hover:text-brand-black transition-colors duration-200"
            />
          </div>
          </div>
        </div>

        <ScrollHint />
      </section>

      {/* SERVICES STRIP */}
      <section className="bg-brand-black py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.13em] text-gold">Servicios integrales</p>
            <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">
              Inmobiliaria y financiación en un solo equipo
            </h2>
            <p className="mt-4 text-sm text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Oficina en Martos (Jaén). Te acompañamos en vivienda, hipotecas y créditos con un trato cercano y profesional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                icon: HomeIcon,
                title: 'Compra y venta de viviendas',
                desc: 'Te guiamos en cada paso de la operación, de principio a fin.',
              },
              {
                icon: ChartIcon,
                title: 'Hipotecas',
                desc: 'Buscamos la mejor financiación adaptada a tu perfil y situación.',
              },
              {
                icon: HandshakeIcon,
                title: 'Asesoría personalizada',
                desc: 'Analizamos tu caso y te proponemos la mejor estrategia.',
              },
              {
                icon: BriefcaseIcon,
                title: 'Créditos empresariales y personales',
                desc: 'Soluciones de financiación para particulares y empresas.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-8 border border-stone-800 bg-stone-950/40 hover:border-gold transition-colors duration-300">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-stone-700 text-gold">
                  <item.icon />
                </span>
                <h3 className="mb-2 font-medium text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-stone-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsCarousel />

      {/* FEATURED PROPERTIES */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        {featured.length > 0 ? (
          <div className="space-y-7">
            <div className="relative min-h-10">
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-center">
                Nuevas <span className="text-gold">oportunidades</span>
              </h2>
              <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2">
                <Link href="/propiedades" className="btn-outline text-xs shrink-0">
                  Ver todas →
                </Link>
              </div>
            </div>
            <FeaturedPropertiesGrid properties={featured} />
            <div className="flex justify-end md:hidden">
              <Link href="/propiedades" className="btn-outline text-xs shrink-0">
                Ver todas →
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-stone-400">
            <p>Pronto añadiremos propiedades destacadas.</p>
          </div>
        )}
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light py-24 px-6 md:px-10 text-center">
        <div className="max-w-2xl mx-auto rounded-2xl border border-black/10 bg-black/10 px-6 py-10 md:px-10 md:py-12 flex flex-col items-center text-center">
          <h2 className="mb-6 font-display text-4xl font-semibold leading-tight text-brand-black md:text-5xl text-center w-full">
            ¿Listo para dar el<br />siguiente paso?
          </h2>
          <p className="mb-10 text-lg font-light leading-relaxed text-stone-900/80 text-center w-full max-w-lg mx-auto">
            Cuéntanos qué necesitas y te ayudaremos con la mejor solución inmobiliaria o financiera.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex min-h-[3rem] items-center justify-center gap-1.5 rounded-md border border-transparent bg-brand-black px-10 py-3 text-sm font-medium tracking-wide text-gold hover:bg-stone-900 transition-colors duration-200"
            >
              <span>Habla con</span>
              <BrandName />
            </Link>
            <Link
              href="/propiedades"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-md border border-brand-black px-10 py-3 text-sm font-medium tracking-wide text-brand-black hover:bg-brand-black hover:text-gold transition-colors duration-200"
            >
              Ver propiedades
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
