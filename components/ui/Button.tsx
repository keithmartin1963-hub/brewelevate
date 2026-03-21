import { cn } from '@/lib/utils'
import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'ghost' | 'link'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never }

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

type ButtonAsNextLink = ButtonBaseProps & { as: 'link'; href: string; className?: string }

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsNextLink

const base =
  'inline-flex items-center justify-center gap-2 font-body font-medium rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer'

const variants: Record<ButtonVariant, string> = {
  primary:   'bg-espresso text-cream-100 hover:bg-espresso-400 active:scale-[0.98]',
  secondary: 'bg-transparent text-espresso border border-espresso/20 hover:border-espresso/40 hover:bg-espresso/5 active:scale-[0.98]',
  gold:      'bg-gold-400 text-espresso font-semibold hover:bg-gold-300 active:scale-[0.98] shadow-gold',
  ghost:     'bg-transparent text-warmgray hover:text-charcoal hover:bg-cream-200',
  link:      'bg-transparent text-gold-600 hover:text-gold-500 underline-offset-4 hover:underline p-0 rounded-none',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

function getClasses(variant: ButtonVariant, size: ButtonSize, fullWidth?: boolean, className?: string) {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    fullWidth,
    className,
    children,
    ...rest
  } = props

  const classes = getClasses(variant, size, fullWidth, className)

  const content = (
    <>
      {Icon && iconPosition === 'left'  && <Icon size={16} strokeWidth={1.75} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={16} strokeWidth={1.75} />}
    </>
  )

  if (props.as === 'link') {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    )
  }

  if (props.as === 'a') {
    const { as: _as, icon: _icon, iconPosition: _ip, fullWidth: _fw, ...anchorRest } = rest as any
    return (
      <a className={classes} {...anchorRest}>
        {content}
      </a>
    )
  }

  const { as: _as, icon: _icon, iconPosition: _ip, fullWidth: _fw, href: _href, ...btnRest } = rest as any
  return (
    <button className={classes} {...btnRest}>
      {content}
    </button>
  )
}
