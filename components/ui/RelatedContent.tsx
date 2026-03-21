import Link from 'next/link'
import { ArrowRight, BookOpen, Star, Layout } from 'lucide-react'
import { cn } from '@/lib/utils'

type LinkType = 'guide' | 'review' | 'setup' | 'blog'

interface RelatedLink {
  type: LinkType
  title: string
  href: string
  description?: string
  badge?: string
}

interface RelatedContentProps {
  links: RelatedLink[]
  heading?: string
  className?: string
}

const typeConfig: Record<LinkType, { icon: React.ElementType; label: string; color: string }> = {
  guide:  { icon: BookOpen, label: 'Buying Guide', color: 'text-blue-600 bg-blue-50'   },
  review: { icon: Star,     label: 'Review',        color: 'text-gold-600 bg-gold-50'   },
  setup:  { icon: Layout,   label: 'Setup Guide',   color: 'text-green-600 bg-green-50' },
  blog:   { icon: BookOpen, label: 'Article',        color: 'text-purple-600 bg-purple-50' },
}

export function RelatedContent({ links, heading = 'Related Reading', className }: RelatedContentProps) {
  if (!links.length) return null

  return (
    <aside className={cn('mt-12 pt-8 border-t border-cream-200', className)}>
      <p className="text-label mb-5">{heading}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => {
          const { icon: Icon, label, color } = typeConfig[link.type]
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-start gap-3 p-4 rounded-xl border border-cream-200 bg-white hover:border-gold-200 hover:shadow-card transition-all duration-200"
            >
              <span className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', color)}>
                <Icon size={14} strokeWidth={1.75} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-warmgray/60 mb-0.5">
                  {link.badge ?? label}
                </p>
                <p className="text-sm font-semibold text-charcoal group-hover:text-espresso transition-colors leading-snug">
                  {link.title}
                </p>
                {link.description && (
                  <p className="text-xs text-warmgray mt-1 line-clamp-1">{link.description}</p>
                )}
              </div>
              <ArrowRight
                size={14}
                className="text-warmgray/30 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
              />
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
