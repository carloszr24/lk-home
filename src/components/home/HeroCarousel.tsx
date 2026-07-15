'use client'

export function HeroCarousel() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-black via-stone-900 to-brand-gold-dark/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,160,53,0.12),transparent_65%)]"
        aria-hidden="true"
      />
    </div>
  )
}
