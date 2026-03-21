import { cn } from '@/lib/utils'
import { StarRating } from '@/components/ui/StarRating'
import { AffiliateCTA } from '@/components/affiliate/AffiliateCTA'
import type { AffiliateLink } from '@/lib/types'

interface VerdictBoxProps {
  heading?: string
  verdict: string
  rating?: number
  pros?: string[]
  cons?: string[]
  primaryLink?: AffiliateLink
  productId?: string
  price?: string
  variant?: 'review' | 'guide'
  className?: string
}

export function VerdictBox({
  heading = 'Quick Verdict',
  verdict,
  rating,
  pros = [],
  cons = [],
  primaryLink,
  productId,
  price,
  variant = 'review',
  className,
}: VerdictBoxProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border-l-4 border-gold-400 bg-gold-50/60 p-6 md:p-8',
        'border border-gold-200',
        className
      )}
    >
      {/* Label */}
      <p className="text-label mb-3">{heading}</p>

      {/* Rating */}
      {rating !== undefined && (
        <div className="flex items-center gap-3 mb-4">
          <span className="font-heading font-bold text-4xl text-espresso leading-none">
            {rating.toFixed(1)}
          </span>
          <div>
            <StarRating rating={rating} size="md" />
            <p className="text-xs text-warmgray mt-1">out of 5</p>
          </div>
          {price && (
            <div className="ml-auto text-right">
              <p className="text-xs text-warmgray">Current price</p>
              <p className="font-heading font-bold text-2xl text-espresso">{price}</p>
            </div>
          )}
        </div>
      )}

      {/* Verdict text */}
      <p className="text-charcoal leading-relaxed mb-5 text-[15px]">{verdict}</p>

      {/* Pros / cons inline */}
      {(pros.length > 0 || cons.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {pros.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">
                Pros
              </p>
              <ul className="space-y-1.5">
                {pros.slice(0, 4).map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
                    <span className="text-green-500 flex-shrink-0 font-bold mt-0.5">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cons.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">
                Cons
              </p>
              <ul className="space-y-1.5">
                {cons.slice(0, 4).map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
                    <span className="text-red-400 flex-shrink-0 font-bold mt-0.5">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      {primaryLink && productId && (
        <div className="flex flex-col sm:flex-row gap-3">
          <AffiliateCTA
            link={primaryLink}
            productId={productId}
            type="check-price"
            variant="primary"
            position="verdict-box"
            className="flex-1"
          />
          {variant === 'review' && (
            <AffiliateCTA
              link={primaryLink}
              productId={productId}
              type="view-brand"
              variant="secondary"
              position="verdict-box-secondary"
              showPrice={false}
              className="flex-1"
            />
          )}
        </div>
      )}
    </div>
  )
}
