import Link from 'next/link'
import { getFeaturedPropertiesForHome } from '@/lib/properties-store'
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel'
import { FeaturedPropertiesGrid } from '@/components/home/FeaturedPropertiesGrid'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import { ScrollHint } from '@/components/home/ScrollHint'
import { ValoracionGratuitaModal } from '@/components/home/ValoracionGratuitaModal'
import { BrandName } from '@/components/BrandName'
import { AGENT } from '@/lib/contact'
import { SERVICE_ITEMS } from '@/data/services'
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '@/data/reviews'

export const dynamic = 'force-dynamic'

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
      <path d="M3 21h18M5 21V5h14v16" />
      <path d="M9 9h2M13 9h2M9 13h2M13 13h2" />
    </svg>
  )
}

function StagingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
      <path d="M4 10h16M6 10V6h12v4" />
      <path d="M8 14h8v8H8z" />
      <path d="M12 6V4" />
    </svg>
  )
}

function ReformIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </svg>
  )
}

function CleanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
      <path d="M12 3 4 9v12h16V9l-8-6Z" />
      <path d="M9 21v-6h6v6" />
    </svg>
  )
}

const serviceIcons = [BuildingIcon, StagingIcon, ReformIcon, CleanIcon]

export default async function HomePage() {
  const featured = await getFeaturedPropertiesForHome()

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100svh-4.75rem)] md:min-h-[calc(100svh-5.75rem)] flex flex-col items-center justify-center overflow-hidden bg-white pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="absolute inset-0">
          <HeroCarousel />
        </div>

        <div className="relative z-10 flex flex-1 w-full items-center justify-center px-4 min-[400px]:px-6">
          <div className="text-center max-w-4xl mx-auto w-full">
            <p className="text-stone-500 text-xs tracking-[0.25em] uppercase mb-4 animate-fade-up">
              {AGENT.title}
            </p>
            <h1 className="font-display text-stone-900 text-balance max-md:tracking-[-0.02em] text-[calc(clamp(2rem,6.5vw+0.25rem,3.2rem)+2pt)] md:text-[calc(clamp(2.5rem,4.8vw+0.9rem,4.5rem)+2pt)] leading-[1.12] md:leading-[1.06] mb-5 md:mb-6 animate-fade-up">
              Tu inmueble,
              <span className="hidden md:inline"> </span>
              <br className="md:hidden" aria-hidden="true" />
              <span className="font-script font-normal text-brand-charcoal">en las mejores manos</span>
            </h1>
            <p
              className="text-stone-600 text-base sm:text-lg md:text-xl font-normal max-w-[min(100%,22rem)] sm:max-w-2xl mx-auto mb-8 md:mb-9 leading-relaxed text-pretty animate-fade-up"
              style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
            >
              {AGENT.tagline}
            </p>
            {GOOGLE_REVIEW_COUNT > 0 && (
              <p
                className="text-sm text-stone-500 mb-8 animate-fade-up"
                style={{ animationDelay: '0.15s', opacity: 0, animationFillMode: 'forwards' }}
              >
                {GOOGLE_RATING} en Google · {GOOGLE_REVIEW_COUNT.toLocaleString('es-ES')} opiniones
              </p>
            )}
            <div
              className="flex w-full max-w-xl mx-auto flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up"
              style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
            >
              <Link
                href="/propiedades"
                className="btn-primary w-full sm:flex-1 sm:min-w-0 min-h-[3rem] md:min-h-[3.25rem] px-8 py-3.5 md:py-4 text-sm md:text-base tracking-wide text-center"
              >
                Ver propiedades
              </Link>
              <ValoracionGratuitaModal
                triggerLabel="Valoración gratuita"
                triggerClassName="inline-flex w-full sm:flex-1 sm:min-w-0 min-h-[3rem] md:min-h-[3.25rem] items-center justify-center px-8 py-3.5 md:py-4 text-sm md:text-base tracking-wide font-medium border-2 border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        <ScrollHint className="absolute inset-x-0 bottom-4 z-10 text-stone-400 md:bottom-6" />
      </section>

      {/* SERVICES */}
      <section className="bg-stone-50 py-20 md:py-24 px-6 md:px-10 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.13em] text-stone-500">Nuestros servicios</p>
            <h2 className="mt-3 font-display text-3xl text-stone-900 md:text-4xl">
              Todo lo que tu propiedad necesita
            </h2>
            <p className="mt-4 text-sm text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Gestión, presentación, reforma y limpieza con un equipo local en Deba.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SERVICE_ITEMS.map((item, index) => {
              const Icon = serviceIcons[index] ?? BuildingIcon
              return (
                <div
                  key={item.title}
                  className="rounded-2xl p-8 border border-stone-200 bg-white hover:border-stone-300 hover:shadow-md transition-all duration-300"
                >
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-stone-200 text-brand-charcoal">
                    <Icon />
                  </span>
                  <h3 className="service-script mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/sobre-nosotros" className="btn-outline text-xs">
              Conoce todos los servicios →
            </Link>
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
                Propiedades <span className="font-script font-normal text-brand-charcoal">destacadas</span>
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

      {/* CTA */}
      <section className="bg-brand-charcoal py-24 px-6 md:px-10 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <h2 className="mb-6 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            ¿Hablamos de tu proyecto?
          </h2>
          <p className="mb-10 text-lg font-light leading-relaxed text-stone-300 max-w-lg">
            Visítanos en Lersundi Kalea, 31, Deba, o llámanos al 688 76 32 89.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex min-h-[3rem] items-center justify-center gap-1.5 rounded-md bg-white px-10 py-3 text-sm font-medium tracking-wide text-brand-charcoal hover:bg-stone-100 transition-colors duration-200"
            >
              <span>Contacta con</span>
              <BrandName />
            </Link>
            <a
              href="tel:+34688763289"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-md border border-white/60 px-10 py-3 text-sm font-medium tracking-wide text-white hover:bg-white/10 transition-colors duration-200"
            >
              688 76 32 89
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
