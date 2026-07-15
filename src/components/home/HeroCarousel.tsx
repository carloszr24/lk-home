'use client'

import Image from 'next/image'

const HERO_IMAGE = '/images/deba.jpeg'

export function HeroCarousel() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={HERO_IMAGE}
        alt="Vista de Deba, Gipuzkoa"
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover brightness-[0.92] saturate-[1.05]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-brand-charcoal-dark/30"
        aria-hidden="true"
      />
    </div>
  )
}
