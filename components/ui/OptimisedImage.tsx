import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { cn } from '@/lib/utils'

// ─── Shared sizes strings ─────────────────────────────────────────────────────
// Pre-defined sizes attributes for every common usage pattern.
// Using accurate sizes prevents the browser downloading oversized images.

export const IMAGE_SIZES = {
  hero:          '100vw',
  heroGrid:      '(max-width: 768px) 100vw, 50vw',
  card:          '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  cardWide:      '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  pinterest:     '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  sidebar:       '(max-width: 1024px) 0px, 280px',
  thumbnail:     '(max-width: 640px) 96px, 128px',
  productHero:   '(max-width: 1024px) 100vw, 40vw',
  fullBleed:     '100vw',
  og:            '1200px',   // Never lazy-loaded, just for reference
} as const

// ─── Blur placeholder — brand cream colour ────────────────────────────────────
// A tiny inline SVG avoids a network request and matches brand palette.
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><rect width="8" height="8" fill="#F2EDE5"/></svg>'
  ).toString('base64')

// ─── Aspect ratio helpers ─────────────────────────────────────────────────────
type AspectRatio = 'pinterest' | 'square' | 'video' | 'hero' | 'product' | 'guide' | 'blog'

const aspectClasses: Record<AspectRatio, string> = {
  pinterest: 'aspect-[2/3]',
  square:    'aspect-square',
  video:     'aspect-video',
  hero:      'aspect-[16/7]',
  product:   'aspect-[4/5]',
  guide:     'aspect-[3/2]',
  blog:      'aspect-[3/2]',
}

// ─── Overlay variants ─────────────────────────────────────────────────────────
type Overlay = 'none' | 'bottom' | 'dark' | 'full'

const overlayClasses: Record<Overlay, string> = {
  none:   '',
  bottom: 'after:absolute after:inset-x-0 after:bottom-0 after:h-3/5 after:bg-gradient-to-t after:from-black/60 after:to-transparent after:pointer-events-none',
  dark:   'after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/75 after:via-black/20 after:to-transparent after:pointer-events-none',
  full:   'after:absolute after:inset-0 after:bg-black/30 after:pointer-events-none',
}

// ─── Main component ───────────────────────────────────────────────────────────
interface OptimisedImageProps extends Omit<NextImageProps, 'placeholder' | 'blurDataURL'> {
  /** When provided wraps in a sized container with correct aspect ratio */
  aspectRatio?:       AspectRatio
  containerClassName?: string
  overlay?:           Overlay
  /** Override the default cream blur placeholder colour */
  blurColor?:         string
}

export function OptimisedImage({
  src,
  alt,
  aspectRatio,
  containerClassName,
  overlay = 'none',
  className,
  fill,
  sizes,
  priority,
  ...props
}: OptimisedImageProps) {
  // If aspectRatio provided, wrap in a relative container
  if (aspectRatio || fill) {
    return (
      <div
        className={cn(
          'relative overflow-hidden',
          aspectRatio && aspectClasses[aspectRatio],
          overlay !== 'none' && overlayClasses[overlay],
          containerClassName
        )}
      >
        <NextImage
          src={src}
          alt={alt}
          fill={fill ?? true}
          sizes={sizes ?? IMAGE_SIZES.card}
          className={cn('object-cover', className)}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          {...props}
        />
      </div>
    )
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      sizes={sizes}
      className={className}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      {...props}
    />
  )
}

// ─── Pinterest image — always 2:3, always optimised ──────────────────────────
interface PinImageProps {
  src:    string
  alt:    string
  sizes?: string
  priority?: boolean
  className?: string
  containerClassName?: string
  overlay?: Overlay
  children?: React.ReactNode
}

export function PinImage({
  src, alt, sizes, priority, className, containerClassName, overlay = 'none', children
}: PinImageProps) {
  return (
    <div className={cn(
      'relative aspect-[2/3] overflow-hidden',
      overlay !== 'none' && overlayClasses[overlay],
      containerClassName
    )}>
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? IMAGE_SIZES.pinterest}
        className={cn('object-cover', className)}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
      />
      {children}
    </div>
  )
}

// ─── Hero image — above the fold, always eager-loaded ────────────────────────
interface HeroImageProps {
  src:    string
  alt:    string
  className?: string
  containerClassName?: string
  overlay?: Overlay
  children?: React.ReactNode
}

export function HeroImage({ src, alt, className, containerClassName, overlay = 'none', children }: HeroImageProps) {
  return (
    <div className={cn(
      'relative overflow-hidden',
      overlay !== 'none' && overlayClasses[overlay],
      containerClassName
    )}>
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={IMAGE_SIZES.fullBleed}
        className={cn('object-cover', className)}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        priority   // Always eager for hero images
        loading="eager"
      />
      {children}
    </div>
  )
}

// ─── Thumbnail — small, lazy, square ─────────────────────────────────────────
interface ThumbnailProps {
  src:   string
  alt:   string
  size?: number
  className?: string
}

export function Thumbnail({ src, alt, size = 48, className }: ThumbnailProps) {
  return (
    <div
      className={cn('relative overflow-hidden flex-shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={IMAGE_SIZES.thumbnail}
        className="object-cover"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        loading="lazy"
      />
    </div>
  )
}
