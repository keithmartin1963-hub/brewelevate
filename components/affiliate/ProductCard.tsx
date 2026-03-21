import Link from 'next/link'
import { cn, budgetTierColor } from '@/lib/utils'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { AffiliateCTA } from '@/components/affiliate/AffiliateCTA'
import type { Product } from '@/lib/types'

type CardLayout = 'vertical' | 'horizontal' | 'compact'

interface ProductCardProps {
  product: Product
  layout?: CardLayout
  rank?: number
  badge?: string       // e.g. "Best Overall", "Editor's Pick"
  position?: string    // analytics position
  className?: string
  showCTA?: boolean
}

export function ProductCard({
  product,
  layout = 'vertical',
  rank,
  badge,
  position,
  className,
  showCTA = true,
}: ProductCardProps) {
  const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)

  if (layout === 'horizontal') {
    return <ProductCardHorizontal product={product} badge={badge} position={position} className={className} showCTA={showCTA} />
  }

  if (layout === 'compact') {
    return <ProductCardCompact product={product} rank={rank} position={position} className={className} />
  }

  // Default: vertical card
  return (
    <div className={cn('card group flex flex-col', className)}>
      {/* Image */}
      <Link href={`/review/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-product bg-cream-200 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {badge && <Badge variant="espresso">{badge}</Badge>}
          {product.isTopPick && !badge && <Badge variant="gold">Top Pick</Badge>}
          {rank && (
            <div className="w-7 h-7 rounded-full bg-espresso text-cream-100 flex items-center justify-center text-xs font-bold">
              {rank}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Brand + category */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-widest text-gold-500">
            {product.brand}
          </span>
          <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', budgetTierColor(product.budgetTier))}>
            {product.price}
          </span>
        </div>

        {/* Name */}
        <Link href={`/review/${product.slug}`}>
          <h3 className="heading-card text-charcoal group-hover:text-espresso transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-warmgray">{product.rating.toFixed(1)}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-warmgray leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Pros preview */}
        {product.pros.length > 0 && (
          <ul className="space-y-1">
            {product.pros.slice(0, 2).map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-warmgray">
                <span className="text-gold-500 mt-0.5 flex-shrink-0">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        {showCTA && primaryLink && (
          <div className="mt-auto pt-3">
            <AffiliateCTA
              link={primaryLink}
              productId={product.id}
              type="check-price"
              variant="primary"
              position={position ?? 'product-card'}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Horizontal layout — for lists / search results ──────────────────────────
function ProductCardHorizontal({
  product,
  badge,
  position,
  className,
  showCTA,
}: Omit<ProductCardProps, 'layout' | 'rank'>) {
  const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)

  return (
    <div className={cn('card flex flex-row gap-0 overflow-hidden', className)}>
      <Link
        href={`/review/${product.slug}`}
        className="flex-shrink-0 w-28 sm:w-36 bg-cream-200 relative"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge variant="espresso" size="sm">{badge}</Badge>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-gold-500 mb-0.5">
              {product.brand}
            </p>
            <Link href={`/review/${product.slug}`}>
              <h3 className="text-base font-semibold font-heading text-charcoal hover:text-espresso transition-colors leading-snug">
                {product.name}
              </h3>
            </Link>
          </div>
          <span className="text-sm font-semibold text-espresso flex-shrink-0">{product.price}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-warmgray">{product.rating.toFixed(1)}</span>
        </div>

        <p className="text-sm text-warmgray line-clamp-2">{product.description}</p>

        {showCTA && primaryLink && (
          <AffiliateCTA
            link={primaryLink}
            productId={product.id}
            type="check-price"
            variant="table"
            position={position ?? 'product-card-horizontal'}
            className="mt-auto self-start"
          />
        )}
      </div>
    </div>
  )
}

// ─── Compact layout — for sidebars, "also consider" sections ─────────────────
function ProductCardCompact({
  product,
  rank,
  position,
  className,
}: Omit<ProductCardProps, 'layout' | 'badge' | 'showCTA'>) {
  const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)

  return (
    <div className={cn('flex items-center gap-3 py-3 border-b border-cream-200 last:border-0', className)}>
      {rank && (
        <span className="text-xl font-bold font-heading text-cream-300 w-6 flex-shrink-0 text-center">
          {rank}
        </span>
      )}
      <div className="w-12 h-12 rounded-lg bg-cream-200 overflow-hidden flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-gold-500 font-medium">{product.brand}</p>
        <Link href={`/review/${product.slug}`} className="text-sm font-semibold text-charcoal hover:text-espresso transition-colors line-clamp-1">
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5 mt-0.5">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-[11px] text-warmgray">{product.price}</span>
        </div>
      </div>
      {primaryLink && (
        <AffiliateCTA
          link={primaryLink}
          productId={product.id}
          type="check-price"
          variant="table"
          position={position ?? 'compact-card'}
          showPrice={false}
          className="flex-shrink-0 text-[11px]"
        />
      )}
    </div>
  )
}
