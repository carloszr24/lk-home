import type { Metadata } from 'next'
import { LegalPageShell } from '@/components/legal/LegalPageShell'
import { LegalSections } from '@/components/legal/LegalSections'
import { getLegalVars, getServerI18n, getSiteMetadataVars } from '@/i18n/server'
import { interpolate } from '@/i18n/interpolate'

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getServerI18n()
  const vars = getSiteMetadataVars(dict)
  return {
    title: interpolate(dict.metadata.contact.title, vars),
    description: dict.metadata.contact.description,
  }
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children
}
