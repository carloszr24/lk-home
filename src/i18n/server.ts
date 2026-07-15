import { cookies } from 'next/headers'
import { AGENT, CONTACT, LEGAL, hasEmail } from '@/lib/contact'
import { SITE_URL } from '@/lib/brand'
import { ADMIN_COOKIE_NAME } from '@/lib/admin-session'
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from './config'
import { getDictionary } from './get-dictionary'
import { interpolate } from './interpolate'
import type { Dictionary } from './types'

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get(LOCALE_COOKIE)?.value
  return isLocale(value) ? value : DEFAULT_LOCALE
}

export async function getServerI18n() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  return { locale, dict }
}

export function t(
  dict: Dictionary,
  template: string,
  vars?: Record<string, string | number | undefined | null>
): string {
  return vars ? interpolate(template, vars) : template
}

export function getLegalVars(dict: Dictionary, locale: Locale) {
  const emailLineEs = hasEmail ? `Correo de contacto: ${CONTACT.email}` : ''
  const emailLineEu = hasEmail ? `Harremanetarako posta: ${CONTACT.email}` : ''
  const emailRightsEs = hasEmail ? ` o al correo ${CONTACT.email}` : ''
  const emailRightsEu = hasEmail ? ` edo ${CONTACT.email} helbidera` : ''

  const ownerBlockEs = [
    LEGAL.ownerName,
    LEGAL.legalForm ? `, ${LEGAL.legalForm}.` : '.',
    LEGAL.taxId ? `\nDNI/NIF: ${LEGAL.taxId}.` : '',
    `\nDomicilio profesional: ${LEGAL.address}.`,
    `\nDenominación comercial: ${AGENT.name}.`,
    hasEmail ? `\nCorreo de contacto: ${CONTACT.email}` : '',
  ].join('')

  const ownerBlockEu = [
    LEGAL.ownerName,
    LEGAL.legalForm ? `, ${LEGAL.legalForm}.` : '.',
    LEGAL.taxId ? `\nDNI/NIF: ${LEGAL.taxId}.` : '',
    `\nHelbide profesionala: ${LEGAL.address}.`,
    `\nIzen komertziala: ${AGENT.name}.`,
    hasEmail ? `\nHarremanetarako posta: ${CONTACT.email}` : '',
  ].join('')

  const contactBlockEs = [
    `${LEGAL.ownerName} — ${AGENT.name}`,
    LEGAL.address,
    dict.common.spain,
    `${dict.common.web}: ${SITE_URL.replace(/^https?:\/\//, '')}`,
    hasEmail ? `Correo electrónico: ${CONTACT.email}` : '',
  ].filter(Boolean).join('\n')

  const contactBlockEu = [
    `${LEGAL.ownerName} — ${AGENT.name}`,
    LEGAL.address,
    dict.common.spain,
    `${dict.common.web}: ${SITE_URL.replace(/^https?:\/\//, '')}`,
    hasEmail ? `${dict.common.email}: ${CONTACT.email}` : '',
  ].filter(Boolean).join('\n')

  return {
    agentName: AGENT.name,
    ownerName: LEGAL.ownerName,
    legalForm: LEGAL.legalForm || '',
    taxIdLine: LEGAL.taxId ? ` DNI/NIF: ${LEGAL.taxId}.` : '',
    address: LEGAL.address,
    siteUrl: SITE_URL.replace(/^https?:\/\//, ''),
    emailLine: locale === 'eu' ? emailLineEu : emailLineEs,
    ownerBlock: locale === 'eu' ? ownerBlockEu : ownerBlockEs,
    emailRights: locale === 'eu' ? emailRightsEu : emailRightsEs,
    contactBlock: locale === 'eu' ? contactBlockEu : contactBlockEs,
    cookieName: ADMIN_COOKIE_NAME,
  }
}

export function getSiteMetadataVars(dict: Dictionary) {
  return {
    siteName: AGENT.name,
    tagline: dict.common.brandTagline,
  }
}
