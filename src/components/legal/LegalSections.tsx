import Link from 'next/link'
import type { LegalSection } from '@/i18n/types'
import { interpolate } from '@/i18n/interpolate'

type Props = {
  sections: LegalSection[]
  vars: Record<string, string>
  privacyHref?: string
  cookiesHref?: string
}

function renderParagraph(text: string, vars: Record<string, string>, links?: { privacy?: string; cookies?: string }) {
  let content = interpolate(text, vars)
  if (links?.privacy && content.includes('Política de privacidad')) {
    content = content.replace(
      'Política de privacidad',
      `__PRIVACY__`
    )
  }
  if (links?.cookies && content.includes('Política de cookies')) {
    content = content.replace('Política de cookies', `__COOKIES__`)
  }
  if (links?.privacy && content.includes('Pribatutasun-politika')) {
    content = content.replace('Pribatutasun-politika', `__PRIVACY__`)
  }
  if (links?.cookies && content.includes('Cookie-politika')) {
    content = content.replace('Cookie-politika', `__COOKIES__`)
  }

  const parts = content.split(/(__PRIVACY__|__COOKIES__)/)
  return (
    <p>
      {parts.map((part, i) => {
        if (part === '__PRIVACY__') {
          return (
            <Link key={i} href="/politica-privacidad" className="text-brand-red hover:underline">
              {links?.privacy}
            </Link>
          )
        }
        if (part === '__COOKIES__') {
          return (
            <Link key={i} href="/politica-cookies" className="text-brand-red hover:underline">
              {links?.cookies}
            </Link>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

export function LegalSections({ sections, vars, privacyHref, cookiesHref }: Props) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-display text-xl md:text-2xl text-stone-900 mb-4 text-left">{interpolate(section.title, vars)}</h2>
          <div className="space-y-3">
            {section.paragraphs?.map((p, i) => (
              <div key={i}>
                {renderParagraph(p, vars, {
                  privacy: privacyHref,
                  cookies: cookiesHref,
                })}
              </div>
            ))}
            {section.list && (
              <ul className="list-disc pl-5 space-y-2 text-left">
                {section.list.map((item, i) => {
                  const text = interpolate(item, vars)
                  if (i === 0 && privacyHref && (text.includes('privacidad') || text.includes('Pribatutasun'))) {
                    return (
                      <li key={i}>
                        <Link href="/politica-privacidad" className="text-brand-red hover:underline">
                          {text}
                        </Link>
                      </li>
                    )
                  }
                  if (i === 1 && cookiesHref && (text.includes('cookies') || text.includes('Cookie'))) {
                    return (
                      <li key={i}>
                        <Link href="/politica-cookies" className="text-brand-red hover:underline">
                          {text}
                        </Link>
                      </li>
                    )
                  }
                  return <li key={i}>{text}</li>
                })}
              </ul>
            )}
            {section.subsections?.map((sub) => (
              <div key={sub.title}>
                <h3 className="font-medium text-stone-900 text-left pt-2">{interpolate(sub.title, vars)}</h3>
                {sub.paragraphs.map((p, i) => (
                  <p key={i}>{interpolate(p, vars)}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
