import Image from 'next/image'
import { SITE_NAME } from '@/lib/brand'
import { LOGO_IMAGE_CLASS, LOGO_RENDER, LOGO_SRC } from '@/lib/logo'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  priority?: boolean
}

export function SiteLogo({ className, priority = false }: Props) {
  return (
    <Image
      src={LOGO_SRC}
      alt={SITE_NAME}
      width={LOGO_RENDER.width}
      height={LOGO_RENDER.height}
      priority={priority}
      className={cn(LOGO_IMAGE_CLASS, className)}
    />
  )
}
