import Image from 'next/image'
import Link from 'next/link'
import {
  AGENT,
  CONTACT,
  OFFICES,
  OPENING_HOURS,
  emailHref,
  hasEmail,
  mapsHref,
  phoneHref,
  whatsappHref,
} from '@/lib/contact'
import { LOGO_IMAGE_CLASS, LOGO_RENDER, LOGO_SRC_WHITE } from '@/lib/logo'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-800 bg-brand-black text-stone-400">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Image
              src={LOGO_SRC_WHITE}
              alt={`${AGENT.name} logo`}
              width={LOGO_RENDER.width}
              height={LOGO_RENDER.height}
              className={LOGO_IMAGE_CLASS}
            />
            <p className="mt-4 text-sm leading-relaxed text-stone-300 max-w-md">
              {AGENT.fullName}
              <br />
              <br />
              {AGENT.tagline}
            </p>
          </div>
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/propiedades" className="transition-colors hover:text-gold">Propiedades</Link></li>
              <li><Link href="/sobre-nosotros" className="transition-colors hover:text-gold">Servicios</Link></li>
              <li><Link href="/contacto" className="transition-colors hover:text-gold">Contacto</Link></li>
              <li><Link href="/aviso-legal" className="transition-colors hover:text-gold">Aviso legal</Link></li>
              <li><Link href="/politica-privacidad" className="transition-colors hover:text-gold">Privacidad</Link></li>
              <li><Link href="/politica-cookies" className="transition-colors hover:text-gold">Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={phoneHref} className="transition-colors hover:text-gold">
                  {CONTACT.phone.label}: {CONTACT.phone.display}
                </a>
              </li>
              {hasEmail && (
                <li>
                  <a href={emailHref} className="transition-colors hover:text-gold">{CONTACT.email}</a>
                </li>
              )}
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  WhatsApp: +34 {CONTACT.phone.display}
                </a>
              </li>
              <li className="pt-2">
                <p className="text-stone-500 text-xs mb-0.5">{OFFICES.primary.label}</p>
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  {OFFICES.primary.full}
                </a>
              </li>
              <li className="pt-2">
                <p className="text-stone-500 text-xs mb-1">Horario</p>
                <ul className="space-y-0.5 text-xs text-stone-400">
                  {OPENING_HOURS.map((slot) => (
                    <li key={slot.day}>
                      <span className="text-stone-500">{slot.day}:</span> {slot.hours}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 text-xs text-stone-500">
          <span className="shrink-0">© {new Date().getFullYear()} {AGENT.fullName}. Todos los derechos reservados.</span>
          <p className="text-[10px] leading-snug text-stone-500 lg:whitespace-nowrap lg:text-right">
            Toda la información contenida en esta web carece de carácter contractual, siendo su contenido meramente informativo.
          </p>
        </div>
      </div>
    </footer>
  )
}
