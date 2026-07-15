import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPageShell } from '@/components/legal/LegalPageShell'
import { LegalSections } from '@/components/legal/LegalSections'
import { getLegalVars, getServerI18n, getSiteMetadataVars } from '@/i18n/server'
import { interpolate } from '@/i18n/interpolate'

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getServerI18n()
  const vars = getSiteMetadataVars(dict)
  return {
    title: interpolate(dict.metadata.cookies.title, vars),
    description: interpolate(dict.metadata.cookies.description, vars),
  }
}

export default async function PoliticaCookiesPage() {
  const { dict, locale } = await getServerI18n()
  const vars = getLegalVars(dict, locale)
  const content = dict.legal.cookies
  const table = content.cookieTable
  const beforeTable = content.sections.filter((s) => s.title.startsWith('1.') || s.title.startsWith('2.') || s.title.startsWith('3.') || s.title.startsWith('4.') || s.title.startsWith('5.'))
  const section6 = content.sections.find((s) => s.title.startsWith('6.'))
  const afterTable = content.sections.filter((s) => !beforeTable.includes(s) && s !== section6)

  return (
    <LegalPageShell eyebrow={dict.legal.eyebrow} title={content.title} dict={dict}>
      <p className="text-stone-500 text-left -mt-4">{content.lastUpdated}</p>
      <LegalSections
        sections={beforeTable}
        vars={vars}
        privacyHref={dict.common.privacyPolicy}
        cookiesHref={dict.common.cookies}
      />
      {section6 && (
        <section>
          <h2 className="font-display text-xl md:text-2xl text-stone-900 mb-4 text-left">{section6.title}</h2>
          <div className="overflow-x-auto text-left mb-3">
            <table className="w-full border-collapse border border-stone-200 text-xs md:text-sm">
              <thead>
                <tr className="bg-stone-50">
                  <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">{table.headers.name}</th>
                  <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">{table.headers.type}</th>
                  <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">{table.headers.purpose}</th>
                  <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">{table.headers.duration}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-stone-200 px-3 py-2 align-top">{interpolate(table.row.name, vars)}</td>
                  <td className="border border-stone-200 px-3 py-2 align-top">{table.row.type}</td>
                  <td className="border border-stone-200 px-3 py-2 align-top">{table.row.purpose}</td>
                  <td className="border border-stone-200 px-3 py-2 align-top">{table.row.duration}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            {(section6.paragraphs ?? []).map((p, i) => (
              <p key={i}>{interpolate(p, vars)}</p>
            ))}
          </div>
        </section>
      )}
      <LegalSections
        sections={afterTable}
        vars={vars}
        privacyHref={dict.common.privacyPolicy}
        cookiesHref={dict.common.cookies}
      />
      <p>
        <Link href="/politica-privacidad" className="text-brand-red hover:underline">
          {dict.common.privacyPolicy}
        </Link>
      </p>
    </LegalPageShell>
  )
}
