'use client'

import { ExternalLink, ShoppingCart, Tag, Eye } from 'lucide-react'
import { cn, buildAffiliateUrl, trackAffiliateClick } from '@/lib/utils'
import type { AffiliateLink } from '@/lib/types'

type CTAVariant = 'primary' | 'secondary' | 'inline' | 'table'
type CTAType    = 'check-price' | 'view-brand' | 'see-details' | 'buy-now'

interface AffiliateCTAProps {
  link: AffiliateLink
  productId: string
  type?: CTAType
  variant?: CTAVariant
  position?: string     // analytics: where on page this CTA sits
  className?: string
  showPrice?: boolean
  showRetailer?: boolean
  fullWidth?: boolean
}

const ctaLabels: Record<CTAType, string> = {
  'check-price':  'Check Current Price',
  'view-brand':   'View on Brand Site',
  'see-details':  'See Full Details',
  'buy-now':      'Buy Now',
}

const ctaIcons: Record<CTAType, React.ElementType> = {
  'check-price': Tag,
  'view-brand':  ExternalLink,
  'see-details': Eye,
  'buy-now':     ShoppingCart,
}

const variantClasses: Record<CTAVariant, string> = {
  primary:   'btn btn-gold w-full justify-center py-3.5 text-sm',
  secondary: 'btn btn-secondary py-2.5 text-sm',
  inline:    'affiliate-cta text-sm font-medium text-gold-600 hover:text-espresso underline underline-offset-2',
  table:     'btn btn-ghost py-2 px-3 text-xs border border-cream-300 rounded-lg hover:border-gold-300 hover:text-gold-600',
}

export function AffiliateCTA({
  link,
  productId,
  type = 'check-price',
  variant = 'primary',
  position,
  className,
  showPrice = true,
  showRetailer = false,
  fullWidth = false,
}: AffiliateCTAProps) {
  const Icon = ctaIcons[type]
  const label = ctaLabels[type]
  const href = buildAffiliateUrl(
    link.url,
    link.trackingId,
    { ref: 'brewelevate' }
  )

  function handleClick() {
    trackAffiliateClick(productId, link.id, link.retailer, position)
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      onClick={handleClick}
      className={cn(
        variantClasses[variant],
        fullWidth && 'w-full',
        className
      )}
    >
      <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
      <span>
        {label}
        {showPrice && link.displayPrice && (
          <span className="ml-1.5 opacity-80">— {link.displayPrice}</span>
        )}
      </span>
      {showRetailer && (
        <span className="ml-auto text-[10px] opacity-60 uppercase tracking-wider">
          {link.retailerName}
        </span>
      )}
    </a>
  )
}

// ─── Stacked CTA group (primary + secondary retailer links) ──────────────────
interface AffiliateCTAGroupProps {
  links: AffiliateLink[]
  productId: string
  position?: string
  className?: string
}

export function AffiliateCTAGroup({ links, productId, position, className }: AffiliateCTAGroupProps) {
  const primary   = links.find(l => l.isPrimary && l.isActive)
  const secondary = links.filter(l => !l.isPrimary && l.isActive).slice(0, 2)

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {primary && (
        <AffiliateCTA
          link={primary}
          productId={productId}
          type="check-price"
          variant="primary"
          position={position}
        />
      )}
      {secondary.map(link => (
        <AffiliateCTA
          key={link.id}
          link={link}
          productId={productId}
          type="view-brand"
          variant="secondary"
          position={position}
          showRetailer
        />
      ))}
      <p className="text-[10px] text-warmgray/60 text-center mt-1">
        Affiliate links — we may earn a commission at no cost to you
      </p>
    </div>
  )
}

// ─── Inline text CTA for use inside prose ────────────────────────────────────
interface InlineAffiliateLinkProps {
  href: string
  productId: string
  linkId: string
  retailer: string
  children: React.ReactNode
  position?: string
}

export function InlineAffiliateLink({
  href,
  productId,
  linkId,
  retailer,
  children,
  position = 'inline',
}: InlineAffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      onClick={() => trackAffiliateClick(productId, linkId, retailer, position)}
      className="text-gold-600 hover:text-espresso underline underline-offset-2 transition-colors duration-150"
    >
      {children}
    </a>
  )
}
