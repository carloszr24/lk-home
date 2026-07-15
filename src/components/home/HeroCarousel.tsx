'use client'

export function HeroCarousel() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-stone-100/90" />
      <div className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-stone-200/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-[24rem] w-[24rem] rounded-full bg-stone-300/20 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(120,113,108,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,113,108,0.08) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />
      <svg
        className="absolute left-1/2 top-1/2 h-[min(70vw,32rem)] w-[min(70vw,32rem)] -translate-x-1/2 -translate-y-1/2 text-stone-300/40"
        viewBox="0 0 200 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M30 120V70L70 40v80" />
        <path d="M70 40 100 20l30 20" />
        <path d="M100 120V60l30-20v80" />
        <path d="M85 120h30" />
        <path d="M95 95h10v25" />
      </svg>
    </div>
  )
}
