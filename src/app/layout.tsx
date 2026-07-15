import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher'
import { I18nProvider } from '@/i18n/client'
import { getLocale, getServerI18n, getSiteMetadataVars } from '@/i18n/server'
import { interpolate } from '@/i18n/interpolate'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getServerI18n()
  const vars = getSiteMetadataVars(dict)
  return {
    title: interpolate(dict.metadata.site.title, vars),
    description: dict.metadata.site.description,
    keywords: dict.metadata.site.keywords,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const { dict } = await getServerI18n()

  return (
    <html lang={locale} className={montserrat.variable}>
      <body className="bg-white text-stone-900 antialiased">
        <I18nProvider locale={locale}>
          <Navbar />
          <LanguageSwitcher />
          <main className="min-h-screen">{children}</main>
          <Footer dict={dict} />
        </I18nProvider>
      </body>
    </html>
  )
}
