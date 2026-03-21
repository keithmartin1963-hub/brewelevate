import { cn } from '@/lib/utils'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { AffiliateCTA } from '@/components/affiliate/AffiliateCTA'
import Link from 'next/link'
import type { Product } from '@/lib/types'

interface TopPickItem {
  product: Product
  rank: number
  badge: string   // e.g. "Best Overall", "Best Budget"
  summary: string
}

interface TopPicksListProps {
  items: TopPickItem[]
  heading?: string
  className?: string
}

export function TopPicksList({ items, heading = 'Our Top Picks', className }: TopPicksListProps) {
  return (
    <div className={cn('', className)}>
      {heading && (
        <h2 className="heading-section mb-8">{heading}</h2>
      )}

      <div className="flex flex-col divide-y divide-cream-200 border border-cream-200 rounded-2xl overflow-hidden bg-white">
        {items.map((item) => (
          <TopPickRow key={item.product.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function TopPickRow({ item }: { item: TopPickItem }) {
  const { product, rank, badge, summary } = item
  const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)
  const isTopRank   = rank === 1

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row gap-0 group',
        isTopRank && 'bg-gold-50/40'
      )}
    >
      {/* Rank number */}
      <div
        className={cn(
          'hidden sm:flex items-center justify-center w-14 flex-shrink-0 text-2xl font-bold font-heading border-r border-cream-200',
          isTopRank ? 'text-gold-400' : 'text-cream-300'
        )}
      >
        {rank}
      </div>

      {/* Product image */}
      <Link href={`/review/${product.slug}`} className="flex-shrink-0">
        <div className="w-full sm:w-28 h-40 sm:h-auto bg-cream-200 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Mobile rank */}
          <span className="sm:hidden absolute top-2 left-2 w-7 h-7 rounded-full bg-espresso text-cream-100 flex items-center justify-center text-xs font-bold">
            {rank}
          </span>
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 p-5 flex flex-col gap-2 min-w-0">
        <div className="flex flex-wrap items-start gap-2">
          <Badge variant={isTopRank ? 'gold' : 'default'}>{badge}</Badge>
          <span className="text-[11px] uppercase tracking-widest text-gold-500 font-medium mt-0.5">
            {product.brand}
          </span>
        </div>

        <Link href={`/review/${product.slug}`}>
          <h3 className="text-lg font-semibold font-heading text-charcoal hover:text-espresso transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} size="sm" showValue />
        </div>

        <p className="text-sm text-warmgray leading-relaxed">{summary}</p>

        {/* Pros */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-1">
          {product.pros.slice(0, 4).map((pro, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-warmgray">
              <span className="text-gold-400 flex-shrink-0 mt-0.5">✓</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Price + CTA */}
      <div className="flex flex-row sm:flex-col items-center sm:items-stretch justify-between sm:justify-center gap-3 p-5 sm:w-44 flex-shrink-0 border-t sm:border-t-0 sm:border-l border-cream-200">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-wider text-warmgray mb-0.5">Price</p>
          <p className="text-xl font-bold font-heading text-espresso">{product.price}</p>
        </div>
        {primaryLink && (
          <AffiliateCTA
            link={primaryLink}
            productId={product.id}
            type="check-price"
            variant="primary"
            position="top-picks"
            showPrice={false}
            className="sm:w-full"
          />
        )}
      </div>
    </div>
  )
}
