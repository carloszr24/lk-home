import type { Metadata } from 'next'
import { LegalPageShell } from '@/components/legal/LegalPageShell'
import { LegalSections } from '@/components/legal/LegalSections'
import { getLegalVars, getServerI18n, getSiteMetadataVars } from '@/i18n/server'
import { interpolate } from '@/i18n/interpolate'

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getServerI18n()
  const vars = getSiteMetadataVars(dict)
  return {
    title: interpolate(dict.metadata.avisoLegal.title, vars),
    description: interpolate(dict.metadata.avisoLegal.description, vars),
  }
}

export default async function AvisoLegalPage() {
  const { dict, locale } = await getServerI18n()
  const vars = getLegalVars(dict, locale)
  const content = dict.legal.avisoLegal

  return (
    <LegalPageShell eyebrow={dict.legal.eyebrow} title={content.title} dict={dict}>
      <LegalSections
        sections={content.sections}
        vars={vars}
        privacyHref={dict.common.privacyPolicy}
        cookiesHref={dict.common.cookies}
      />
    </LegalPageShell>
  )
}
