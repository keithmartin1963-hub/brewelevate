import { cn } from '@/lib/utils'

interface DividerProps {
  label?: string
  variant?: 'default' | 'gold' | 'subtle'
  className?: string
}

export function Divider({ label, variant = 'default', className }: DividerProps) {
  const lineClass = cn(
    'flex-1 h-px',
    variant === 'gold'   && 'bg-gradient-to-r from-transparent via-gold-300 to-transparent',
    variant === 'subtle' && 'bg-cream-300',
    variant === 'default' && 'bg-cream-300'
  )

  if (!label) {
    return <hr className={cn('border-0', lineClass, className)} />
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className={lineClass} />
      <span className="text-xs font-medium tracking-widest uppercase text-warmgray flex-shrink-0">
        {label}
      </span>
      <div className={lineClass} />
    </div>
  )
}
