'use client'

import Link from 'next/link'
import { SERVICE_ITEMS } from '@/data/services'
import { BrandName } from '@/components/BrandName'
import { AGENT } from '@/lib/contact'
import { HEADER_OFFSET_CLASS } from '@/lib/logo'

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

const serviceIcons = [HomeIcon, ChartIcon, HandshakeIcon, BriefcaseIcon]

const services = SERVICE_ITEMS.map((service, index) => ({
  ...service,
  icon: serviceIcons[index] ?? HomeIcon,
}))

export default function SobreNosotrosPage() {
  return (
    <div className={HEADER_OFFSET_CLASS}>
      <section className="bg-brand-black text-white py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Quiénes somos</p>
          <h1 className="font-display text-5xl md:text-6xl font-light">
            Sobre <BrandName />
          </h1>
          <p className="text-stone-400 mt-4 text-lg font-light max-w-2xl leading-relaxed">
            {AGENT.fullName}. {AGENT.tagline}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 max-w-4xl mx-auto">
        <div className="space-y-6 text-stone-600 text-lg leading-relaxed text-justify">
          <p>
            En Olmo &amp; Cobo combinamos experiencia inmobiliaria y financiera para ofrecerte un servicio
            integral: desde la búsqueda o venta de tu vivienda hasta la gestión de hipotecas y créditos.
          </p>
          <p>
            Nuestra oficina en Martos (Jaén) es el punto de partida para un trato cercano, transparente y
            adaptado a cada cliente. Analizamos tu situación y te acompañamos en cada decisión.
          </p>
          <p>
            Ya sea que busques comprar, vender, financiar tu hogar o encontrar la mejor solución crediticia
            para tu empresa, estamos aquí para ayudarte con profesionalidad y confianza.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { value: 'Transparencia', desc: 'Información clara y honesta en cada paso del proceso.' },
            { value: 'Proximidad', desc: 'Trato personal en nuestra oficina de Martos.' },
            { value: 'Integralidad', desc: 'Inmobiliaria y financiación en un mismo equipo.' },
          ].map((item) => (
            <div key={item.value} className="p-8">
              <div className="w-1 h-8 bg-gold mx-auto mb-6" />
              <h3 className="font-display text-2xl font-light text-stone-900 mb-3">{item.value}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-50 py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Lo que hacemos</p>
            <h2 className="section-title">Servicios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 border border-stone-100 hover:border-gold transition-colors duration-300 group"
              >
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-stone-700 group-hover:text-gold transition-colors">
                  <service.icon />
                </span>
                <h3 className="font-medium text-stone-900 mb-3 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-black text-white py-20 px-6 md:px-10 text-center">
        <h2 className="font-display text-4xl font-light mb-6">¿Hablamos?</h2>
        <p className="text-stone-400 mb-10 max-w-md mx-auto">
          Cuéntanos tu situación y encontraremos la mejor solución para ti.
        </p>
        <Link href="/contacto" className="btn-gold px-10 py-4 text-sm">
          Contactar ahora
        </Link>
      </section>
    </div>
  )
}
