'use client'

import Image from 'next/image'

const HERO_IMAGE = '/images/deba.jpeg'

export function HeroCarousel() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/78 to-white/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/30" />
    </div>
  )
}
