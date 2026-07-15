import { SITE_NAME } from '@/lib/brand'
import { cn } from '@/lib/utils'

type Props = {
  variant?: 'light' | 'dark'
  className?: string
}

export function SiteLogo({ variant = 'dark', className }: Props) {
  return (
    <span
      className={cn(
        'font-display text-lg font-semibold uppercase tracking-[0.18em] md:text-xl',
        variant === 'light' ? 'text-white' : 'text-stone-900',
        className
      )}
    >
      {SITE_NAME}
    </span>
  )
}
