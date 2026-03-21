// PinterestMeta — injects Pinterest-specific Open Graph meta tags
// Pinterest reads og:image, og:title, og:description, and article: tags.
// This component ensures the 2:3 vertical image is the FIRST og:image,
// which Pinterest uses by default.
//
// Usage: render inside a page's <head> via Next.js generateMetadata,
// OR include this component in the page body for Pinterest's crawler.
//
// NOTE: Next.js 14 App Router handles og:image via generateMetadata().
// This component is the RUNTIME complement — it adds Pinterest-specific
// tags that Next.js metadata API doesn't natively expose.

interface PinterestMetaProps {
  title:       string
  description: string
  /** Vertical 2:3 image URL — Pinterest's preferred format */
  pinImage:    string
  /** Standard landscape OG image — fallback */
  ogImage?:    string
  url:         string
  /** Pinterest media type — defaults to 'article' for editorial content */
  mediaType?:  'article' | 'product' | 'recipe' | 'video'
}

export function PinterestMeta({
  title,
  description,
  pinImage,
  ogImage,
  url,
  mediaType = 'article',
}: PinterestMetaProps) {
  // In Next.js App Router, head meta is managed via generateMetadata().
  // Pinterest-specific tags that aren't part of standard Metadata API:
  return (
    <>
      {/* Pinterest validates these specific property strings */}
      {/* og:image MUST come before og:image:width/height for Pinterest to pick it up */}
      <meta property="og:image"        content={pinImage} />
      <meta property="og:image:width"  content="600" />
      <meta property="og:image:height" content="900" />
      <meta property="og:image:type"   content="image/jpeg" />

      {/* Standard OG as second image (for other platforms) */}
      {ogImage && (
        <>
          <meta property="og:image"        content={ogImage} />
          <meta property="og:image:width"  content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}

      {/* Pinterest Rich Pin verification tags */}
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:type"        content={mediaType === 'product' ? 'product' : 'article'} />

      {/* Pinterest-specific: tells Pinterest this is a Rich Pin */}
      {mediaType === 'article' && (
        <>
          <meta property="article:author"    content="BrewElevate Editorial" />
          <meta property="article:publisher" content="https://www.pinterest.com/brewelevate" />
        </>
      )}

      {/* Disable Pinterest's save button from auto-appearing (we add our own) */}
      <meta name="pinterest" content="nopin" />
    </>
  )
}

// ─── Pinterest verification meta (add to homepage or root layout) ─────────────
export function PinterestVerification({ id }: { id: string }) {
  return <meta name="p:domain_verify" content={id} />
}
