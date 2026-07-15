import Link from 'next/link'
import { HEADER_OFFSET_CLASS } from '@/lib/logo'
import type { Dictionary } from '@/i18n/types'

type Props = {
  eyebrow: string
  title: string
  dict: Dictionary
  children: React.ReactNode
}

export function LegalPageShell({ eyebrow, title, dict, children }: Props) {
  return (
    <div className={HEADER_OFFSET_CLASS}>
      <div className="bg-stone-950 text-white py-16 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-stone-400 text-xs tracking-[0.3em] uppercase mb-4">{eyebrow}</p>
          <h1 className="font-display text-4xl md:text-5xl font-light">{title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 text-stone-600 text-sm leading-relaxed text-justify space-y-10">
        {children}
        <p className="text-stone-500 text-sm text-left">
          <Link href="/contacto" className="text-brand-red hover:underline">
            {dict.common.backToContact}
          </Link>
          {' · '}
          <Link href="/aviso-legal" className="text-brand-red hover:underline">
            {dict.common.legalNotice}
          </Link>
        </p>
      </div>
    </div>
  )
}
