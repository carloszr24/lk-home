import type { Metadata } from 'next'
import Link from 'next/link'
import { AGENT, CONTACT, phoneHref } from '@/lib/contact'
import { ScrollHint } from '@/components/home/ScrollHint'
import { HEADER_OFFSET_CLASS } from '@/lib/logo'
import { SiteLogo } from '@/components/SiteLogo'
import { getServerI18n, getSiteMetadataVars } from '@/i18n/server'
import { interpolate } from '@/i18n/interpolate'

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M3 21h18M5 21V5h14v16" />
      <path d="M9 9h2M13 9h2M9 13h2M13 13h2" />
    </svg>
  )
}

function StagingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M4 10h16M6 10V6h12v4" />
      <path d="M8 14h8v8H8z" />
    </svg>
  )
}

function ReformIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </svg>
  )
}

function CleanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3 4 9v12h16V9l-8-6Z" />
      <path d="M9 21v-6h6v6" />
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

const serviceIcons = [BuildingIcon, StagingIcon, ReformIcon, CleanIcon]

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getServerI18n()
  const vars = getSiteMetadataVars(dict)
  return {
    title: interpolate(dict.metadata.services.title, vars),
    description: dict.metadata.services.description,
  }
}

export default async function SobreNosotrosPage() {
  const { dict } = await getServerI18n()
  const s = dict.services

  const services = s.items.map((service, index) => ({
    ...service,
    icon: serviceIcons[index] ?? BuildingIcon,
  }))

  return (
    <div className={HEADER_OFFSET_CLASS}>
      <section className="relative bg-stone-50 min-h-[calc(100svh-4.75rem)] md:min-h-[calc(100svh-5.75rem)] flex flex-col border-b border-stone-200">
        <div className="flex flex-1 flex-col items-center justify-center px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <SiteLogo className="mx-auto mb-8" />
            <p className="text-stone-500 text-xs tracking-[0.35em] uppercase mb-4">{s.hero.eyebrow}</p>
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-wide text-stone-900">
              {AGENT.fullName}
            </h1>
            <p className="mt-3 text-sm md:text-base tracking-[0.15em] uppercase text-stone-500">
              {s.hero.subtitle}
            </p>
          </div>
        </div>
        <ScrollHint className="pb-8 text-stone-400" label={s.scrollHint} />
      </section>

      <section className="bg-white py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-center text-stone-900 mb-12">
            {s.sectionTitle}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service) => (
              <li key={service.title} className="rounded-2xl border border-stone-200 p-6 bg-stone-50/50">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-stone-200 text-brand-charcoal mb-4">
                  <service.icon />
                </span>
                <h3 className="service-script mb-2">{service.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{service.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-stone-50 py-20 px-6 md:px-10 border-y border-stone-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-center text-stone-900 mb-12">
            {s.whyTitle}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl mx-auto">
            {s.whyChooseUs.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-1.5 text-brand-charcoal">
                  <DiamondIcon />
                </span>
                <div>
                  <h3 className="font-medium text-stone-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 px-6 md:px-10 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-light mb-4 tracking-wide text-stone-900">
          {s.contactTitle}
        </h2>
        <p className="text-stone-500 mb-2">{CONTACT.address.full}</p>
        <a href={phoneHref} className="text-2xl md:text-3xl font-display text-brand-charcoal hover:text-stone-600 transition-colors">
          +34 {CONTACT.phone.display}
        </a>
        <div className="mt-10">
          <Link href="/contacto" className="btn-primary px-10 py-4 text-sm">
            {s.writeUs}
          </Link>
        </div>
      </section>
    </div>
  )
}
