'use client'

import Link from 'next/link'
import { SERVICE_ITEMS, WHY_CHOOSE_US } from '@/data/services'
import { BrandName } from '@/components/BrandName'
import { AGENT, hasPhone, phoneHref, CONTACT } from '@/lib/contact'
import { ScrollHint } from '@/components/home/ScrollHint'
import { HEADER_OFFSET_CLASS } from '@/lib/logo'
import { SiteLogo } from '@/components/SiteLogo'

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M3 11.25 12 4l9 7.25" />
      <path d="M5.25 10.5V20h13.5v-9.5" />
      <path d="M9.75 20v-5.5h4.5V20" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="M8 14v4M12 10v8M16 6v12" />
    </svg>
  )
}

function HandshakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M9.5 10.5 12 13l2.5-2.5a2 2 0 0 1 2.8 0l3.2 3.2a2 2 0 0 1 0 2.8l-1.4 1.4a2 2 0 0 1-2.8 0L12 13.7" />
      <path d="M14.5 10.5 12 8 9.5 10.5a2 2 0 0 1-2.8 0L3.5 7.3a2 2 0 0 1 0-2.8l1.4-1.4a2 2 0 0 1 2.8 0L12 7.3" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M3 21h18M5 21V5h14v16" />
      <path d="M9 9h2M13 9h2M9 13h2M13 13h2" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M3 7h18v12H3z" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  )
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
      <path d="M12 2 22 12 12 22 2 12 12 2Z" />
    </svg>
  )
}

const serviceIcons = [HomeIcon, ChartIcon, HandshakeIcon, BuildingIcon, BriefcaseIcon]

const services = SERVICE_ITEMS.map((service, index) => ({
  ...service,
  icon: serviceIcons[index] ?? HomeIcon,
}))

export default function SobreNosotrosPage() {
  return (
    <div className={HEADER_OFFSET_CLASS}>
      {/* Hero */}
      <section className="relative bg-brand-black text-white min-h-[calc(100svh-4.75rem)] md:min-h-[calc(100svh-5.75rem)] flex flex-col border-b border-gold/20">
        <div className="flex flex-1 flex-col items-center justify-center px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <SiteLogo variant="light" className="mb-8 text-2xl md:text-3xl" />
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">Servicios</p>
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-wide uppercase">
              <BrandName />
            </h1>
            <p className="mt-3 text-sm md:text-base tracking-[0.2em] uppercase text-gold/90">
              {AGENT.title}
            </p>
          </div>
        </div>
        <ScrollHint
          className="pb-8 text-gold/80"
          label="Sigue bajando"
        />
      </section>

      {/* Nuestros servicios */}
      <section className="bg-brand-black text-white py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-light tracking-[0.15em] uppercase text-center text-gold mb-12">
            Nuestros servicios
          </h2>
          <ul className="space-y-5 max-w-2xl mx-auto">
            {services.map((service) => (
              <li key={service.title} className="flex items-start gap-4 border-b border-gold/15 pb-5 last:border-0">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/30 text-gold">
                  <service.icon />
                </span>
                <div>
                  <h3 className="font-medium text-white tracking-wide">{service.title}</h3>
                  <p className="mt-1 text-sm text-stone-400 leading-relaxed">{service.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="bg-stone-950 text-white py-20 px-6 md:px-10 border-y border-gold/15">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-light tracking-[0.15em] uppercase text-center text-gold mb-12">
            Por qué elegirnos
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl mx-auto">
            {WHY_CHOOSE_US.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-1.5 text-gold">
                  <DiamondIcon />
                </span>
                <div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-stone-950 to-brand-black text-white py-20 px-6 md:px-10 text-center border-t border-gold/15">
        <h2 className="font-display text-3xl md:text-4xl font-light mb-4 tracking-wide uppercase text-gold">
          Contáctanos
        </h2>
        <p className="text-stone-400 mb-2">{AGENT.fullName}</p>
        {hasPhone && (
          <a href={phoneHref} className="text-2xl md:text-3xl font-display text-white hover:text-gold transition-colors">
            +34 {CONTACT.phone.display}
          </a>
        )}
        <div className="mt-10">
          <Link href="/contacto" className="btn-gold px-10 py-4 text-sm">
            Escríbenos
          </Link>
        </div>
      </section>
    </div>
  )
}
