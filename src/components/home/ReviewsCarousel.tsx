'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, PROPERTIES_SOLD_COUNT, REVIEWS } from '@/data/reviews'
import { useI18n } from '@/i18n/client'
import { interpolate } from '@/i18n/interpolate'

function StarRow({ ariaLabel }: { ariaLabel: string }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          viewBox="0 0 24 24"
          className={`h-5 w-5 ${idx === 4 ? 'text-brand-charcoal/70' : 'text-brand-charcoal'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.93 5.94 6.56.95-4.74 4.62 1.12 6.53L12 17.46 6.13 20.54l1.12-6.53L2.5 9.39l6.56-.95L12 2.5z" />
        </svg>
      ))}
    </div>
  )
}

export function ReviewsCarousel() {
  if (GOOGLE_REVIEW_COUNT === 0 && REVIEWS.length === 0) return null
  return <ReviewsCarouselContent />
}

function ReviewsCarouselContent() {
  const { dict, locale } = useI18n()
  const r = dict.reviews
  const localeTag = locale === 'eu' ? 'eu-ES' : 'es-ES'

  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastFrameRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const loopWidthRef = useRef(0)
  const pointerXRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const resumeTimerRef = useRef<number | null>(null)
  const loopedReviews = useMemo(() => [...REVIEWS, ...REVIEWS], [])
  const hasReviews = REVIEWS.length > 0

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMediaChange = () => setReducedMotion(media.matches)
    onMediaChange()
    media.addEventListener('change', onMediaChange)
    return () => media.removeEventListener('change', onMediaChange)
  }, [])

  useEffect(() => {
    if (!rootRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasReviews || !isVisible || !trackRef.current) return
    loopWidthRef.current = trackRef.current.scrollWidth / 2
  }, [hasReviews, isVisible, loopedReviews])

  useEffect(() => {
    if (!hasReviews || !isVisible || reducedMotion || !trackRef.current) return

    const speedPxPerSecond = 22
    const tick = (timestamp: number) => {
      if (lastFrameRef.current === null) lastFrameRef.current = timestamp
      const delta = timestamp - lastFrameRef.current
      lastFrameRef.current = timestamp

      if (!isPaused && !isDraggingRef.current && loopWidthRef.current > 0) {
        offsetRef.current += (speedPxPerSecond * delta) / 1000
        if (offsetRef.current >= loopWidthRef.current) {
          offsetRef.current -= loopWidthRef.current
        }
        trackRef.current!.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastFrameRef.current = null
    }
  }, [hasReviews, isVisible, reducedMotion, isPaused])

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    }
  }, [])

  const resumeAutoplay = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), 1200)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerXRef.current = event.clientX
    isDraggingRef.current = true
    setIsPaused(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || pointerXRef.current === null || loopWidthRef.current <= 0) return
    const deltaX = event.clientX - pointerXRef.current
    pointerXRef.current = event.clientX
    offsetRef.current -= deltaX

    while (offsetRef.current < 0) offsetRef.current += loopWidthRef.current
    while (offsetRef.current >= loopWidthRef.current) offsetRef.current -= loopWidthRef.current

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
    }
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
    pointerXRef.current = null
    resumeAutoplay()
  }

  const stats = [
    GOOGLE_REVIEW_COUNT > 0
      ? { value: GOOGLE_REVIEW_COUNT.toLocaleString(localeTag), label: r.googleReviews }
      : null,
    GOOGLE_RATING
      ? { value: GOOGLE_RATING, label: r.onGoogle }
      : null,
    PROPERTIES_SOLD_COUNT > 0
      ? { value: `+${PROPERTIES_SOLD_COUNT}`, label: r.propertiesSold }
      : null,
  ].filter(Boolean) as { value: string; label: string }[]

  return (
    <section ref={rootRef} className="bg-white py-20 md:py-24 px-6 md:px-10 overflow-hidden border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-12 md:mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className={`mx-auto grid max-w-4xl grid-cols-1 gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3 sm:gap-0 sm:p-2 ${
              stats.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
            }`}
          >
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center rounded-xl px-6 py-5 text-center ${
                  idx !== stats.length - 1 ? 'sm:border-r sm:border-stone-200' : ''
                }`}
              >
                <p className="font-display text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`text-center max-w-3xl mx-auto mb-10 md:mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-stone-500 text-xs tracking-[0.3em] uppercase mb-3">{r.eyebrow}</p>
          <h2 className="section-title mb-5">{r.title}</h2>
          <div className="flex flex-col items-center gap-2 text-stone-700">
            <StarRow ariaLabel={r.excellentRating} />
            <p className="text-base md:text-lg font-medium">
              {interpolate(r.subtitle, { label: r.soldLabel })}
            </p>
          </div>
        </div>

        {hasReviews && (
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div
              className="overflow-hidden select-none touch-pan-y"
              aria-label={r.carouselAria}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => {
                if (!isDraggingRef.current) resumeAutoplay()
              }}
            >
              <div ref={trackRef} className="flex items-stretch gap-4 md:gap-6 will-change-transform">
                {loopedReviews.map((review, idx) => (
                  <div key={`${review.id}-${idx}`} className="shrink-0 w-[86vw] sm:w-[68vw] md:w-[44vw] lg:w-[31vw]">
                    <article className="card-hover h-full min-h-56 bg-white border border-stone-200 p-6 md:p-7 rounded-lg shadow-sm hover:shadow-lg">
                      <StarRow ariaLabel={r.excellentRating} />
                      <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-4">&ldquo;{review.text}&rdquo;</p>
                      <p className="mt-6 text-stone-900 font-semibold">{review.name}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
