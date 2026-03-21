// ─── Resource hints component ─────────────────────────────────────────────────
// Inject preload/prefetch/dns-prefetch hints for critical resources.
// Place in layout.tsx or specific page <head> sections.

interface ResourceHintsProps {
  /** Preload these image URLs (use for LCP images — hero, above fold) */
  preloadImages?: string[]
  /** DNS-prefetch these external domains */
  dnsPrefetch?:   string[]
  /** Preconnect to these origins (use sparingly — max 2-3) */
  preconnect?:    string[]
}

export function ResourceHints({
  preloadImages = [],
  dnsPrefetch   = [],
  preconnect    = [],
}: ResourceHintsProps) {
  return (
    <>
      {/* Preconnect: high-priority external origins */}
      {preconnect.map(origin => (
        <link key={`pc-${origin}`} rel="preconnect" href={origin} crossOrigin="anonymous" />
      ))}

      {/* DNS prefetch: lower priority domains */}
      {dnsPrefetch.map(domain => (
        <link key={`dns-${domain}`} rel="dns-prefetch" href={domain} />
      ))}

      {/* Preload: LCP images only — over-preloading hurts performance */}
      {preloadImages.map((src, i) => (
        <link
          key={`preload-${i}`}
          rel="preload"
          as="image"
          href={src}
          // Modern browsers use imagesrcset/imagesizes for responsive preload
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore — valid HTML attribute, TypeScript types lag behind
          imagesizes="100vw"
        />
      ))}
    </>
  )
}

// ─── Standard resource hints for all pages ────────────────────────────────────
// Google Fonts are already handled by next/font — don't add manual preconnects.
// Add preconnects only for domains that deliver above-the-fold resources.

export const STANDARD_PRECONNECTS = [
  'https://images.unsplash.com',   // Product + hero images in development
]

export const STANDARD_DNS_PREFETCH = [
  'https://www.amazon.com',         // Affiliate links resolve faster
  'https://www.googletagmanager.com',
]

// ─── Lazy load utility — intersection observer hook ───────────────────────────
// Use in client components to defer non-critical below-the-fold work.
// This is the React hook version — call at the top of a client component.

// NOTE: This is exported as a string to paste into client components.
// Actual hook implementation lives in lib/hooks/useLazyLoad.ts

export const LAZY_LOAD_HOOK_SNIPPET = `
import { useEffect, useRef, useState } from 'react'

export function useLazyLoad(rootMargin = '200px') {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rootMargin, visible])

  return { ref, visible }
}
`
