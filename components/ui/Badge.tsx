import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'gold' | 'espresso' | 'success' | 'outline' | 'tier'
type BadgeSize    = 'sm' | 'md'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default:  'bg-cream-200 text-warmgray-600 border-transparent',
  gold:     'bg-gold-50 text-gold-700 border-gold-200',
  espresso: 'bg-espresso text-cream-100 border-transparent',
  success:  'bg-green-50 text-green-700 border-green-200',
  outline:  'bg-transparent text-warmgray border-cream-300',
  tier:     'bg-cream-200 text-espresso-400 border-cream-300',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px] tracking-wider',
  md: 'px-2.5 py-1 text-xs tracking-wide',
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium uppercase',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
