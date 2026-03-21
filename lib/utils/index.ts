import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─── Class Name Utility ───────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Date Formatting ──────────────────────────────────────────────────────────
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

export function formatDateShort(dateString: string): string {
  return formatDate(dateString, { month: 'short', day: 'numeric', year: 'numeric' })
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now  = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 60_000)
  const hours   = Math.floor(diff / 3_600_000)
  const days    = Math.floor(diff / 86_400_000)
  const months  = Math.floor(days / 30)
  const years   = Math.floor(days / 365)

  if (minutes < 60) return `${minutes}m ago`
  if (hours   < 24) return `${hours}h ago`
  if (days    < 30) return `${days}d ago`
  if (months  < 12) return `${months}mo ago`
  return `${years}y ago`
}

// ─── Reading Time ─────────────────────────────────────────────────────────────
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 220
  const wordCount = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

// ─── Slug Utilities ───────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function deslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// ─── Affiliate Link Tracking ──────────────────────────────────────────────────
export function buildAffiliateUrl(
  baseUrl: string,
  trackingId?: string,
  extraParams?: Record<string, string>
): string {
  try {
    const url = new URL(baseUrl)
    if (trackingId) url.searchParams.set('tag', trackingId)
    if (extraParams) {
      Object.entries(extraParams).forEach(([key, val]) => {
        url.searchParams.set(key, val)
      })
    }
    return url.toString()
  } catch {
    return baseUrl
  }
}

export async function trackAffiliateClick(
  productId: string,
  linkId: string,
  retailer: string,
  position?: string
): Promise<void> {
  try {
    // In production, send to your analytics endpoint
    // For now, log to console and store in sessionStorage
    const event = {
      productId,
      linkId,
      retailer,
      position,
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString(),
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[BrewElevate] Affiliate click:', event)
    }

    // Store click in session for analytics
    if (typeof window !== 'undefined') {
      const clicks = JSON.parse(sessionStorage.getItem('affiliate_clicks') ?? '[]')
      clicks.push(event)
      sessionStorage.setItem('affiliate_clicks', JSON.stringify(clicks.slice(-50)))
    }

    // Fire to analytics API (non-blocking)
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/affiliate/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        keepalive: true,
      }).catch(() => {/* silently fail */})
    }
  } catch {
    // Never throw — affiliate tracking must not break the user journey
  }
}

// ─── Rating Utilities ─────────────────────────────────────────────────────────
export function ratingToStars(rating: number): string {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

export function ratingLabel(rating: number): string {
  if (rating >= 4.5) return 'Exceptional'
  if (rating >= 4.0) return 'Excellent'
  if (rating >= 3.5) return 'Very Good'
  if (rating >= 3.0) return 'Good'
  if (rating >= 2.5) return 'Fair'
  return 'Poor'
}

// ─── Price Formatting ─────────────────────────────────────────────────────────
export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function parsePriceString(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, ''))
}

// ─── Budget Tier ──────────────────────────────────────────────────────────────
export function budgetTierLabel(tier: string): string {
  const labels: Record<string, string> = {
    'budget':     'Under $200',
    'mid-range':  '$200 – $600',
    'premium':    '$600 – $1,500',
    'luxury':     '$1,500+',
  }
  return labels[tier] ?? tier
}

export function budgetTierColor(tier: string): string {
  const colors: Record<string, string> = {
    'budget':    'bg-green-100 text-green-800',
    'mid-range': 'bg-blue-100 text-blue-800',
    'premium':   'bg-gold-50 text-gold-800',
    'luxury':    'bg-espresso/10 text-espresso',
  }
  return colors[tier] ?? 'bg-cream-200 text-warmgray'
}

// ─── SEO Utilities ────────────────────────────────────────────────────────────
export function truncateExcerpt(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}

export function buildCanonicalUrl(path: string, baseUrl?: string): string {
  const base = baseUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brewelevate.com'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

// ─── Array Utilities ─────────────────────────────────────────────────────────
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  )
}

export function unique<T>(array: T[], key?: keyof T): T[] {
  if (!key) return [...new Set(array)]
  const seen = new Set()
  return array.filter(item => {
    const k = item[key]
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

// ─── Image Utilities ──────────────────────────────────────────────────────────
export function getPinterestImageUrl(
  baseImage: string,
  pinterestImage?: string
): string {
  // Return dedicated Pinterest image if available, else the main image
  return pinterestImage ?? baseImage
}

export function getImageBlurDataUrl(color = '#F2EDE5'): string {
  // Return a base64 blur placeholder in brand color
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><rect width="8" height="8" fill="${color}"/></svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}
