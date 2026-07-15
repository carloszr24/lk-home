import { SITE_NAME } from '@/lib/brand'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export function BrandName({ className }: Props) {
  const [prefix, suffix] = SITE_NAME.includes(' ')
    ? SITE_NAME.split(' ', 2)
    : [SITE_NAME.slice(0, 2).toUpperCase(), SITE_NAME.slice(2).toLowerCase() || 'home']

  return (
    <span className={cn('inline-flex items-baseline gap-1', className)}>
      <span className="font-display font-semibold uppercase tracking-wide">{prefix}</span>
      {suffix && <span className="font-display font-semibold lowercase tracking-wide">{suffix}</span>}
    </span>
  )
}
