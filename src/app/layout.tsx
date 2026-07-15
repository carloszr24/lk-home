import type { Metadata } from 'next'
import { DM_Sans, Pinyon_Script } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/brand'

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
})

const display = DM_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

const script = Pinyon_Script({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: `${SITE_NAME} | ${SITE_TAGLINE}`,
  description:
    'Inmobiliaria en Deba, Gipuzkoa. Gestión inmobiliaria, home staging, reformas integrales y limpieza profesional.',
  keywords:
    'inmobiliaria deba, agencia inmobiliaria gipuzkoa, home staging, reformas integrales, limpieza profesional, lk home',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable} ${script.variable}`}>
      <body className="bg-white text-stone-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
