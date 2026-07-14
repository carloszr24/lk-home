import { SITE_NAME } from '@/lib/brand'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export function BrandName({ className }: Props) {
  return <span className={cn('font-brand', className)}>{SITE_NAME}</span>
}
