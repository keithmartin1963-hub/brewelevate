import Link from 'next/link'
import { cn, formatDateShort } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { PinButton } from '@/components/affiliate/PinButton'
import type { BlogPost, SetupGuide, BuyingGuide } from '@/lib/types'

// ─── Blog Post Card ───────────────────────────────────────────────────────────
interface BlogCardProps {
  post: BlogPost
  layout?: 'vertical' | 'horizontal' | 'featured'
  className?: string
}

export function BlogCard({ post, layout = 'vertical', className }: BlogCardProps) {
  if (layout === 'featured') {
    return (
      <Link href={`/blog/${post.slug}`} className={cn('group block card overflow-hidden', className)}>
        <div className="aspect-[16/9] relative overflow-hidden bg-cream-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6">
            <Badge variant="gold" className="mb-3">{post.category.replace('-', ' ')}</Badge>
            <h2 className="text-2xl font-heading font-semibold text-white leading-snug line-clamp-2 group-hover:text-gold-300 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-white/70 mt-2">{formatDateShort(post.publishedAt)} · {post.readingTimeMinutes} min read</p>
          </div>
        </div>
      </Link>
    )
  }

  if (layout === 'horizontal') {
    return (
      <Link href={`/blog/${post.slug}`} className={cn('group flex gap-4 card p-4 items-start', className)}>
        <div className="w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-cream-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.heroImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-widest text-gold-500 font-medium mb-1">{post.category.replace('-', ' ')}</p>
          <h3 className="text-sm font-semibold font-heading text-charcoal group-hover:text-espresso transition-colors line-clamp-2 leading-snug">{post.title}</h3>
          <p className="text-xs text-warmgray mt-1.5">{post.readingTimeMinutes} min read</p>
        </div>
      </Link>
    )
  }

  // Vertical (default) — Pinterest-friendly proportions
  return (
    <div className={cn('card group flex flex-col', className)}>
      <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] bg-cream-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        {/* Pinterest save overlay */}
        {post.pinImage && (
          <PinButton
            imageUrl={post.pinImage}
            description={post.title}
            size="sm"
          />
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1 gap-2">
        <p className="text-label">{post.category.replace(/-/g, ' ')}</p>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="heading-card group-hover:text-espresso transition-colors line-clamp-2">{post.title}</h3>
        </Link>
        <p className="text-sm text-warmgray line-clamp-2 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-2 border-t border-cream-200 mt-auto">
          <span className="text-xs text-warmgray">{formatDateShort(post.publishedAt)}</span>
          <span className="text-xs text-warmgray">{post.readingTimeMinutes} min read</span>
        </div>
      </div>
    </div>
  )
}

// ─── Setup Guide Card — Pinterest-first vertical format ───────────────────────
interface SetupCardProps {
  setup: SetupGuide
  className?: string
}

export function SetupCard({ setup, className }: SetupCardProps) {
  const pinImg = setup.pinImages?.[0] ?? setup.heroImage

  return (
    <div className={cn('card group flex flex-col', className)}>
      <Link href={`/setups/${setup.slug}`} className="block relative overflow-hidden">
        {/* 2:3 Pinterest ratio */}
        <div className="aspect-[2/3] bg-cream-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={setup.heroImage} alt={setup.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent pointer-events-none" />
        {/* Style badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="espresso">{setup.style}</Badge>
        </div>
        {/* Pinterest button */}
        <PinButton imageUrl={pinImg} description={setup.title} />
      </Link>
      <div className="p-4 flex flex-col gap-1.5">
        <Link href={`/setups/${setup.slug}`}>
          <h3 className="heading-card group-hover:text-espresso transition-colors">{setup.title}</h3>
        </Link>
        <p className="text-sm text-warmgray line-clamp-2">{setup.excerpt}</p>
        <div className="flex items-center gap-2 mt-1">
          {setup.budgetTiers.slice(0, 2).map(tier => (
            <Badge key={tier.tier} variant="outline" size="sm">{tier.tier}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Buying Guide Card ────────────────────────────────────────────────────────
interface GuideCardProps {
  guide: BuyingGuide
  className?: string
}

export function GuideCard({ guide, className }: GuideCardProps) {
  return (
    <div className={cn('card group flex flex-col', className)}>
      <Link href={`/buying-guide/${guide.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[3/2] bg-cream-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={guide.heroImage} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3">
          <Badge variant="gold">{guide.topPicks.length} Top Picks</Badge>
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1 gap-2">
        <p className="text-label">{guide.category.replace(/-/g, ' ')}</p>
        <Link href={`/buying-guide/${guide.slug}`}>
          <h3 className="heading-card group-hover:text-espresso transition-colors line-clamp-2">{guide.title}</h3>
        </Link>
        <p className="text-sm text-warmgray line-clamp-2 flex-1">{guide.excerpt}</p>
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-cream-200">
          <span className="text-xs text-warmgray">Updated {formatDateShort(guide.updatedAt)}</span>
          <Link href={`/buying-guide/${guide.slug}`} className="text-xs font-medium text-gold-600 hover:text-espresso transition-colors">
            Read guide →
          </Link>
        </div>
      </div>
    </div>
  )
}
