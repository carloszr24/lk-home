import { cn } from '@/lib/utils'

type Props = {
  className?: string
  label?: string
}

export function ScrollHint({ className, label = 'Descubre más' }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 pointer-events-none animate-fade-up',
        className
      )}
      style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-[0.22em] text-center">{label}</span>
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 animate-bounce"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
