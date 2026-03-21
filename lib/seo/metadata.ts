import type { Metadata } from 'next'
import { siteConfig }   from '@/lib/config/site'
import type { BuyingGuide, Review, BlogPost, SetupGuide, Product } from '@/lib/types'

const BASE_URL = siteConfig.url.replace(/\/$/, '')

// ─── Canonical URL builder ────────────────────────────────────────────────────
export function canonicalUrl(path: string): string {
  return `${BASE_URL}/${path.replace(/^\//, '')}`
}

// ─── Base OG image (fallback) ─────────────────────────────────────────────────
const DEFAULT_OG: Metadata['openGraph'] = {
  siteName:  siteConfig.name,
  locale:    'en_US',
  type:      'website',
  images: [{
    url:    `${BASE_URL}/images/og-default.jpg`,
    width:  1200,
    height: 630,
    alt:    `${siteConfig.name} — ${siteConfig.tagline}`,
  }],
}

// ─── Buying Guide metadata ────────────────────────────────────────────────────
export function buildGuideMetadata(guide: BuyingGuide): Metadata {
  const title = guide.seo.title
  const desc  = guide.seo.description
  const url   = canonicalUrl(`/buying-guide/${guide.slug}`)

  // Pinterest-optimised: prefer 2:3 pinImage, fall back to hero
  const pinImage  = guide.pinImage  ?? guide.heroImage
  const heroImage = guide.heroImage

  return {
    title,
    description: desc,
    keywords:    guide.seo.keywords,
    alternates:  { canonical: url },
    openGraph: {
      ...DEFAULT_OG,
      type:        'article',
      url,
      title,
      description: desc,
      publishedTime: guide.publishedAt,
      modifiedTime:  guide.updatedAt,
      authors:     [guide.author.name],
      images: [
        // Pinterest-first: tall 2:3 image
        { url: pinImage, width: 600, height: 900, alt: guide.title },
        // Standard OG landscape
        { url: heroImage, width: 1200, height: 630, alt: guide.title },
      ],
    },
    twitter: {
      card:        'summary_large_image',
      site:        '@brewelevate',
      title,
      description: desc,
      images:      [heroImage],
    },
  }
}

// ─── Product Review metadata ──────────────────────────────────────────────────
export function buildReviewMetadata(review: Review, product: Product): Metadata {
  const title = review.seo.title
  const desc  = review.seo.description
  const url   = canonicalUrl(`/review/${product.slug}`)
  const image = review.pinImage ?? product.image

  return {
    title,
    description: desc,
    alternates:  { canonical: url },
    openGraph: {
      ...DEFAULT_OG,
      type:          'article',
      url,
      title,
      description:   desc,
      publishedTime: review.publishedAt,
      modifiedTime:  review.updatedAt,
      authors:       [review.author.name],
      images: [
        { url: image, width: 600, height: 900, alt: product.name },
        { url: product.image, width: 800, height: 800, alt: product.name },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@brewelevate',
      title,
      description: desc,
      images: [product.image],
    },
  }
}

// ─── Blog Post metadata ───────────────────────────────────────────────────────
export function buildPostMetadata(post: BlogPost): Metadata {
  const title = post.seo.title
  const desc  = post.seo.description
  const url   = canonicalUrl(`/blog/${post.slug}`)
  const pinImage = post.pinImage ?? post.heroImage

  return {
    title,
    description: desc,
    keywords:    post.seo.keywords,
    alternates:  { canonical: url },
    openGraph: {
      ...DEFAULT_OG,
      type:          'article',
      url,
      title,
      description:   desc,
      publishedTime: post.publishedAt,
      modifiedTime:  post.updatedAt,
      authors:       [post.author.name],
      tags:          post.tags,
      images: [
        { url: pinImage,      width: 600, height: 900, alt: post.title },
        { url: post.heroImage, width: 1200, height: 630, alt: post.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@brewelevate',
      title,
      description: desc,
      images: [post.heroImage],
    },
  }
}

// ─── Setup Guide metadata ─────────────────────────────────────────────────────
export function buildSetupMetadata(setup: SetupGuide): Metadata {
  const title    = setup.seo.title
  const desc     = setup.seo.description
  const url      = canonicalUrl(`/setups/${setup.slug}`)
  const pinImage = setup.pinImages?.[0] ?? setup.heroImage

  return {
    title,
    description: desc,
    alternates:  { canonical: url },
    openGraph: {
      ...DEFAULT_OG,
      type:          'article',
      url,
      title,
      description:   desc,
      publishedTime: setup.publishedAt,
      modifiedTime:  setup.updatedAt,
      authors:       [setup.author.name],
      images: [
        // Pinterest ALWAYS gets the 2:3 vertical image first
        { url: pinImage, width: 600, height: 900, alt: setup.title },
        { url: setup.heroImage, width: 1200, height: 630, alt: setup.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@brewelevate',
      title,
      description: desc,
      images: [pinImage],
    },
  }
}

// ─── Hub page metadata (guides, setups, blog index) ───────────────────────────
export function buildHubMetadata(opts: {
  title: string
  description: string
  path: string
  keywords?: string[]
}): Metadata {
  const url = canonicalUrl(opts.path)
  return {
    title:       opts.title,
    description: opts.description,
    keywords:    opts.keywords,
    alternates:  { canonical: url },
    openGraph: {
      ...DEFAULT_OG,
      type:        'website',
      url,
      title:       opts.title,
      description: opts.description,
    },
    twitter: {
      card:        'summary_large_image',
      site:        '@brewelevate',
      title:       opts.title,
      description: opts.description,
    },
  }
}
