import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { JsonLd }                  from '@/components/seo/JsonLd'
import { buildWebsiteSchema, buildOrganizationSchema, combineSchemas } from '@/lib/seo/schemas'
import { siteConfig } from '@/lib/config/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'], variable: '--font-inter', display: 'swap',
  weight: ['300', '400', '500', '600'], preload: true,
})
const playfair = Playfair_Display({
  subsets: ['latin'], variable: '--font-playfair', display: 'swap',
  weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ['coffee gear', 'espresso machine reviews', 'coffee grinder guide', 'home barista', 'coffee setup ideas', 'best espresso machines', 'coffee accessories', 'specialty coffee'],
  authors: [{ name: `${siteConfig.name} Editorial Team` }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'website', locale: 'en_US', url: siteConfig.url, siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.tagline}` }],
  },
  twitter: {
    card: 'summary_large_image', site: '@brewelevate', creator: '@brewelevate',
    title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description,
    images: ['/images/og-default.jpg'],
  },
  alternates: { canonical: siteConfig.url },
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' }, { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
    apple: '/icons/apple-touch-icon.png', shortcut: '/icons/favicon.ico',
  },
  other: { 'p:domain_verify': 'YOUR_PINTEREST_VERIFICATION_ID' },
}

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)',  color: '#2C1810' },
  ],
}

const rootSchema = combineSchemas(buildWebsiteSchema(), buildOrganizationSchema())

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.amazon.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd schema={rootSchema} id="ld-root" />
      </head>
      <body className="bg-cream text-charcoal font-body antialiased">
        {children}
      </body>
    </html>
  )
}
