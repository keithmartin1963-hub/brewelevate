import type { MetadataRoute } from 'next'
import { siteConfig }         from '@/lib/config/site'

const BASE = siteConfig.url.replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/api/*',
          '/_next/',
        ],
      },
      // Block AI scrapers from content (optional — remove if you want AI indexing)
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web'],
        disallow:  '/',
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host:    BASE,
  }
}
