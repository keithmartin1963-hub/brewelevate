import { cn } from '@/lib/utils'

type SectionBackground = 'cream' | 'white' | 'espresso' | 'dark-cream'

interface SectionProps {
  children: React.ReactNode
  background?: SectionBackground
  className?: string
  containerClassName?: string
  id?: string
  /** Skip the inner container — useful when you need full-bleed children */
  noContainer?: boolean
}

const bgClasses: Record<SectionBackground, string> = {
  cream:      'bg-cream',
  white:      'bg-white',
  espresso:   'bg-espresso text-cream-100',
  'dark-cream': 'bg-cream-200',
}

export function Section({
  children,
  background = 'cream',
  className,
  containerClassName,
  id,
  noContainer = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('section-padding', bgClasses[background], className)}
    >
      {noContainer ? children : (
        <div className={cn('container-brew', containerClassName)}>
          {children}
        </div>
      )}
    </section>
  )
}

// ─── Section header — consistent label + heading + subtext pattern ────────────
interface SectionHeaderProps {
  label?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  label,
  heading,
  subheading,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center mx-auto max-w-2xl',
        className
      )}
    >
      {label && (
        <p className="text-label mb-3">{label}</p>
      )}
      <h2 className="heading-section text-charcoal">{heading}</h2>
      {subheading && (
        <p className="mt-4 text-warmgray text-lg leading-relaxed">{subheading}</p>
      )}
    </div>
  )
}
