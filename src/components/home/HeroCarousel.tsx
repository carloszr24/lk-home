'use client'

export function HeroCarousel() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-gradient-to-br from-stone-100 via-white to-stone-200/80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(51,51,51,0.04),transparent_60%)]"
        aria-hidden="true"
      />
    </div>
  )
}
