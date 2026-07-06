'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Propiedades' },
  { href: '/admin/leads', label: 'Leads' },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1 ml-6">
      {links.map((link) => {
        const active = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-xs px-3 py-1.5 rounded transition-colors',
              active ? 'bg-white/10 text-white' : 'text-stone-400 hover:text-white'
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
