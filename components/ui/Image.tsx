import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type AspectRatio = 'pinterest' | 'square' | 'video' | 'hero' | 'product' | 'auto'

interface ImageProps extends Omit<NextImageProps, 'className'> {
  aspectRatio?: AspectRatio
  containerClassName?: string
  className?: string
  /** Gradient overlay for text legibility */
  overlay?: 'none' | 'bottom' | 'full' | 'dark'
}

const ratioClasses: Record<AspectRatio, string> = {
  pinterest: 'aspect-[2/3]',
  square:    'aspect-square',
  video:     'aspect-video',
  hero:      'aspect-[16/7]',
  product:   'aspect-[4/5]',
  auto:      '',
}

const overlayClasses: Record<string, string> = {
  none:   '',
  bottom: 'after:absolute after:inset-x-0 after:bottom-0 after:h-2/3 after:bg-gradient-to-t after:from-black/60 after:to-transparent',
  full:   'after:absolute after:inset-0 after:bg-black/30',
  dark:   'after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:via-black/20 after:to-transparent',
}

export function Image({
  src,
  alt,
  aspectRatio = 'auto',
  containerClassName,
  className,
  overlay = 'none',
  fill,
  ...props
}: ImageProps) {
  const hasRatio = aspectRatio !== 'auto'

  if (hasRatio || fill) {
    return (
      <div
        className={cn(
          'relative overflow-hidden',
          ratioClasses[aspectRatio],
          overlay !== 'none' && overlayClasses[overlay],
          containerClassName
        )}
      >
        <NextImage
          src={src}
          alt={alt}
          fill={fill ?? true}
          className={cn('object-cover', className)}
          sizes={props.sizes ?? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          {...props}
        />
      </div>
    )
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      className={className}
      {...props}
    />
  )
}

// ─── Pinterest-optimised image card ──────────────────────────────────────────
interface PinImageProps {
  src: string
  alt: string
  className?: string
  overlay?: ImageProps['overlay']
  children?: React.ReactNode
}

export function PinImage({ src, alt, className, overlay = 'none', children }: PinImageProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl group', className)}>
      <Image
        src={src}
        alt={alt}
        aspectRatio="pinterest"
        overlay={overlay}
      />
      {children}
    </div>
  )
}
