import { siteConfig } from '@/lib/config/site'
import type { Product, Review, BuyingGuide, BlogPost, SetupGuide, FAQItem } from '@/lib/types'

const BASE_URL = siteConfig.url.replace(/\/$/, '')

// ─── Types ────────────────────────────────────────────────────────────────────
type JsonLdObject = Record<string, unknown>

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export interface BreadcrumbItem { name: string; href?: string }

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type':   'ListItem',
      position:  index + 1,
      name:      item.name,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  }
}

// ─── Product schema ───────────────────────────────────────────────────────────
export function buildProductSchema(product: Product): JsonLdObject {
  const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)

  return {
    '@context':   'https://schema.org',
    '@type':      'Product',
    name:         `${product.brand} ${product.name}`,
    description:  product.description,
    brand: {
      '@type': 'Brand',
      name:    product.brand,
    },
    image:      [product.image, ...(product.images ?? [])],
    sku:        product.id,
    category:   product.category.replace(/-/g, ' '),
    ...(primaryLink?.displayPrice ? {
      offers: {
        '@type':        'Offer',
        priceCurrency:  'USD',
        price:          primaryLink.displayPrice.replace(/[^0-9.]/g, ''),
        priceValidUntil: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
        availability:   'https://schema.org/InStock',
        url:            primaryLink.url,
        seller: {
          '@type': 'Organization',
          name:    primaryLink.retailerName,
        },
      },
    } : {}),
    aggregateRating: {
      '@type':       'AggregateRating',
      ratingValue:   product.rating,
      bestRating:    5,
      worstRating:   1,
      reviewCount:   product.reviewCount ?? 1,
    },
  }
}

// ─── Review schema ────────────────────────────────────────────────────────────
export function buildReviewSchema(review: Review, product: Product): JsonLdObject {
  const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)

  return {
    '@context': 'https://schema.org',
    '@type':    'Review',
    name:       review.title,
    reviewBody: review.verdictSummary,
    datePublished: review.publishedAt,
    dateModified:  review.updatedAt,
    author: {
      '@type': 'Organization',
      name:    siteConfig.name,
      url:     BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name:    siteConfig.name,
      url:     BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url:     `${BASE_URL}/icons/favicon-32x32.png`,
      },
    },
    reviewRating: {
      '@type':       'Rating',
      ratingValue:   review.overallRating,
      bestRating:    5,
      worstRating:   1,
    },
    itemReviewed: {
      '@type':      'Product',
      name:         `${product.brand} ${product.name}`,
      brand:        { '@type': 'Brand', name: product.brand },
      image:        product.image,
      description:  product.description,
      ...(primaryLink?.displayPrice ? {
        offers: {
          '@type':       'Offer',
          priceCurrency: 'USD',
          price:         primaryLink.displayPrice.replace(/[^0-9.]/g, ''),
          availability:  'https://schema.org/InStock',
          url:           primaryLink.url,
        },
      } : {}),
    },
  }
}

// ─── Article schema (buying guide / blog post) ────────────────────────────────
export function buildArticleSchema(opts: {
  title:       string
  description: string
  url:         string
  image:       string
  authorName:  string
  datePublished: string
  dateModified:  string
  type?: 'Article' | 'BlogPosting' | 'TechArticle'
}): JsonLdObject {
  return {
    '@context':       'https://schema.org',
    '@type':          opts.type ?? 'Article',
    headline:         opts.title,
    description:      opts.description,
    url:              `${BASE_URL}${opts.url}`,
    image: {
      '@type':  'ImageObject',
      url:      opts.image,
      width:    1200,
      height:   630,
    },
    datePublished: opts.datePublished,
    dateModified:  opts.dateModified,
    author: {
      '@type': 'Organization',
      name:    opts.authorName,
      url:     BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name:    siteConfig.name,
      url:     BASE_URL,
      logo: {
        '@type':  'ImageObject',
        url:      `${BASE_URL}/icons/favicon-32x32.png`,
        width:    32,
        height:   32,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':   `${BASE_URL}${opts.url}`,
    },
  }
}

// ─── FAQ schema ───────────────────────────────────────────────────────────────
export function buildFaqSchema(items: FAQItem[]): JsonLdObject {
  return {
    '@context':   'https://schema.org',
    '@type':      'FAQPage',
    mainEntity:   items.map(item => ({
      '@type':          'Question',
      name:             item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    item.answer,
      },
    })),
  }
}

// ─── HowTo schema (for blog posts with step-by-step content) ─────────────────
export function buildHowToSchema(opts: {
  name:        string
  description: string
  image:       string
  steps:       Array<{ name: string; text: string }>
  totalTime?:  string   // ISO 8601, e.g. "PT30M"
}): JsonLdObject {
  return {
    '@context':  'https://schema.org',
    '@type':     'HowTo',
    name:        opts.name,
    description: opts.description,
    image:       opts.image,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((step, i) => ({
      '@type':   'HowToStep',
      position:  i + 1,
      name:      step.name,
      text:      step.text,
    })),
  }
}

// ─── ItemList schema (for hub pages / buying guides list) ─────────────────────
export function buildItemListSchema(items: Array<{
  name:     string
  url:      string
  position: number
  image?:   string
  description?: string
}>): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type':    'ItemList',
    itemListElement: items.map(item => ({
      '@type':   'ListItem',
      position:  item.position,
      url:       `${BASE_URL}${item.url}`,
      name:      item.name,
      ...(item.description ? { description: item.description } : {}),
      ...(item.image       ? { image: item.image }             : {}),
    })),
  }
}

// ─── WebSite schema (homepage only) ──────────────────────────────────────────
export function buildWebsiteSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:       siteConfig.name,
    url:        BASE_URL,
    description: siteConfig.description,
    potentialAction: {
      '@type':       'SearchAction',
      target: {
        '@type':   'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─── Organization schema ──────────────────────────────────────────────────────
export function buildOrganizationSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
    name:       siteConfig.name,
    url:        BASE_URL,
    description: siteConfig.description,
    logo: {
      '@type':  'ImageObject',
      url:      `${BASE_URL}/icons/apple-touch-icon.png`,
      width:    180,
      height:   180,
    },
    sameAs: Object.values(siteConfig.socialLinks).filter(Boolean),
  }
}

// ─── Aggregate multiple schemas into one script tag ───────────────────────────
export function combineSchemas(...schemas: JsonLdObject[]): string {
  if (schemas.length === 1) return JSON.stringify(schemas[0])
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph':   schemas.map(s => {
      // Remove @context from individual schemas when combining in @graph
      const { '@context': _, ...rest } = s
      return rest
    }),
  })
}
