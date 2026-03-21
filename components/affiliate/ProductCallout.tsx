import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'
import { AffiliateCTA } from '@/components/affiliate/AffiliateCTA'
import type { Product } from '@/lib/types'

interface ProductCalloutProps {
  product: Product
  context?: string   // e.g. "If you're looking for the best grinder at this price point…"
  position?: string
  className?: string
  compact?: boolean
}

export function ProductCallout({
  product,
  context,
  position = 'inline-callout',
  className,
  compact = false,
}: ProductCalloutProps) {
  const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)

  if (compact) {
    return (
      <div className={`flex items-center gap-4 p-4 rounded-xl bg-cream-100 border border-cream-300 my-6 ${className ?? ''}`}>
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-widest text-gold-500">{product.brand}</p>
          <Link href={`/review/${product.slug}`} className="text-sm font-semibold text-charcoal hover:text-espresso transition-colors">
            {product.name}
          </Link>
          <p className="text-xs text-warmgray">{product.price}</p>
        </div>
        {primaryLink && (
          <AffiliateCTA
            link={primaryLink}
            productId={product.id}
            type="check-price"
            variant="table"
            position={position}
            showPrice={false}
            className="flex-shrink-0 text-xs"
          />
        )}
      </div>
    )
  }

  return (
    <div className={`my-8 rounded-2xl border border-cream-300 bg-white overflow-hidden shadow-card ${className ?? ''}`}>
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <Link href={`/review/${product.slug}`} className="block sm:w-40 flex-shrink-0">
          <div className="h-40 sm:h-full bg-cream-200 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-400"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col gap-2">
          {context && (
            <p className="text-xs text-warmgray italic border-l-2 border-gold-300 pl-3 mb-1">
              {context}
            </p>
          )}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-gold-500 mb-0.5">
              {product.brand}
            </p>
            <Link href={`/review/${product.slug}`}>
              <h4 className="font-heading font-semibold text-lg text-charcoal hover:text-espresso transition-colors leading-snug">
                {product.name}
              </h4>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-warmgray">{product.rating.toFixed(1)}</span>
            <span className="text-sm font-semibold text-espresso ml-auto">{product.price}</span>
          </div>

          <p className="text-sm text-warmgray leading-relaxed">{product.tagline}</p>

          <div className="flex items-center gap-3 mt-auto pt-2">
            {primaryLink && (
              <AffiliateCTA
                link={primaryLink}
                productId={product.id}
                type="check-price"
                variant="primary"
                position={position}
                showPrice={false}
                className="flex-1"
              />
            )}
            <Link
              href={`/review/${product.slug}`}
              className="flex items-center gap-1 text-xs text-warmgray hover:text-charcoal transition-colors whitespace-nowrap"
            >
              Full review
              <ArrowRight size={12} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
