import Link from 'next/link'
import {
  AGENT,
  CONTACT,
  OFFICES,
  emailHref,
  hasEmail,
  mapsHref,
  phoneHref,
  whatsappHref,
} from '@/lib/contact'
import { SiteLogo } from '@/components/SiteLogo'
import type { Dictionary } from '@/i18n/types'
import { getOpeningHours } from '@/i18n/utils'

type Props = {
  dict: Dictionary
}

export function Footer({ dict }: Props) {
  const openingHours = getOpeningHours(dict)

  return (
    <footer className="mt-24 border-t border-stone-200 bg-stone-50 text-stone-600">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <SiteLogo />
            <p className="mt-4 text-sm leading-relaxed text-stone-600 max-w-md">
              {AGENT.fullName}
              <br />
              <br />
              {dict.common.agentTagline}
            </p>
          </div>
          <div>
            <h4 className="text-brand-charcoal text-xs tracking-widest uppercase mb-4">{dict.common.navigation}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/propiedades" className="transition-colors hover:text-brand-charcoal">{dict.nav.properties}</Link></li>
              <li><Link href="/sobre-nosotros" className="transition-colors hover:text-brand-charcoal">{dict.nav.services}</Link></li>
              <li><Link href="/contacto" className="transition-colors hover:text-brand-charcoal">{dict.nav.contact}</Link></li>
              <li><Link href="/aviso-legal" className="transition-colors hover:text-brand-charcoal">{dict.common.legalNotice}</Link></li>
              <li><Link href="/politica-privacidad" className="transition-colors hover:text-brand-charcoal">{dict.common.privacyShort}</Link></li>
              <li><Link href="/politica-cookies" className="transition-colors hover:text-brand-charcoal">{dict.common.cookies}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-brand-charcoal text-xs tracking-widest uppercase mb-4">{dict.common.contactSection}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={phoneHref} className="transition-colors hover:text-brand-charcoal">
                  {dict.common.phone}: {CONTACT.phone.display}
                </a>
              </li>
              {hasEmail && (
                <li>
                  <a href={emailHref} className="transition-colors hover:text-brand-charcoal">{CONTACT.email}</a>
                </li>
              )}
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-charcoal">
                  {dict.common.whatsapp}: +34 {CONTACT.phone.display}
                </a>
              </li>
              <li className="pt-2">
                <p className="text-stone-400 text-xs mb-0.5">{dict.common.office}</p>
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-charcoal">
                  {OFFICES.primary.full}
                </a>
              </li>
              <li className="pt-2">
                <p className="text-stone-400 text-xs mb-1">{dict.common.schedule}</p>
                <ul className="space-y-0.5 text-xs text-stone-500">
                  {openingHours.map((slot) => (
                    <li key={slot.day}>
                      <span className="text-stone-400">{slot.day}:</span> {slot.hours}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-200 pt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 text-xs text-stone-400">
          <span className="shrink-0">© {new Date().getFullYear()} {AGENT.fullName}. {dict.common.allRightsReserved}</span>
          <p className="text-[10px] leading-snug lg:text-right">
            {dict.common.legalDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
