import type { Metadata } from 'next'
import Link from 'next/link'
import { HEADER_OFFSET_CLASS } from '@/lib/logo'
import { getServerI18n, getSiteMetadataVars } from '@/i18n/server'
import { interpolate } from '@/i18n/interpolate'

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getServerI18n()
  const vars = getSiteMetadataVars(dict)
  return {
    title: interpolate(dict.metadata.notFound.title, vars),
    description: dict.metadata.notFound.description,
  }
}

export default async function NotFound() {
  const { dict } = await getServerI18n()
  const n = dict.notFound

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${HEADER_OFFSET_CLASS}`}>
      <div className="text-center">
        <p className="font-display text-8xl font-light text-stone-200 mb-6">404</p>
        <h1 className="font-display text-3xl font-light text-stone-900 mb-4">{n.title}</h1>
        <p className="text-stone-500 mb-10">{n.description}</p>
        <Link href="/" className="btn-primary px-8 py-3 text-sm">
          {n.backHome}
        </Link>
      </div>
    </div>
  )
}
