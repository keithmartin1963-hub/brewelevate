import type { MetadataRoute } from 'next'
import { siteConfig }         from '@/lib/config/site'
import { getPublishedGuides } from '@/lib/data/guides'
import { products }           from '@/lib/data/products'
import { getFeaturedPosts, getPublishedSetups } from '@/lib/data/content'

const BASE = siteConfig.url.replace(/\/$/, '')
const NOW   = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  const guides  = getPublishedGuides()
  const posts   = getFeaturedPosts()
  const setups  = getPublishedSetups()

  // ── Static pages ───────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url:            `${BASE}/`,
      lastModified:   NOW,
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:            `${BASE}/guides`,
      lastModified:   NOW,
      changeFrequency: 'weekly',
      priority:        0.9,
    },
    {
      url:            `${BASE}/setups`,
      lastModified:   NOW,
      changeFrequency: 'weekly',
      priority:        0.9,
    },
    {
      url:            `${BASE}/blog`,
      lastModified:   NOW,
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    {
      url:            `${BASE}/about`,
      lastModified:   NOW,
      changeFrequency: 'monthly',
      priority:        0.5,
    },
    {
      url:            `${BASE}/contact`,
      lastModified:   NOW,
      changeFrequency: 'monthly',
      priority:        0.4,
    },
    {
      url:            `${BASE}/privacy`,
      lastModified:   NOW,
      changeFrequency: 'yearly',
      priority:        0.3,
    },
  ]

  // ── Buying guides ──────────────────────────────────────────────────────
  const guidePages: MetadataRoute.Sitemap = guides.map(guide => ({
    url:            `${BASE}/buying-guide/${guide.slug}`,
    lastModified:   new Date(guide.updatedAt).toISOString(),
    changeFrequency: 'weekly' as const,
    priority:        0.95,   // Highest priority — money pages
  }))

  // ── Product reviews ────────────────────────────────────────────────────
  const reviewPages: MetadataRoute.Sitemap = products.map(product => ({
    url:            `${BASE}/review/${product.slug}`,
    lastModified:   new Date(product.updatedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority:        0.85,
  }))

  // ── Setup guides ───────────────────────────────────────────────────────
  const setupPages: MetadataRoute.Sitemap = setups.map(setup => ({
    url:            `${BASE}/setups/${setup.slug}`,
    lastModified:   new Date(setup.updatedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority:        0.80,
  }))

  // ── Blog posts ─────────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = posts.map(post => ({
    url:            `${BASE}/blog/${post.slug}`,
    lastModified:   new Date(post.updatedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority:        0.70,
  }))

  return [
    ...staticPages,
    ...guidePages,    // Priority order: money pages first
    ...reviewPages,
    ...setupPages,
    ...blogPages,
  ]
}
