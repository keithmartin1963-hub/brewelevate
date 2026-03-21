import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number          // 0–5, supports .5
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  showLabel?: boolean
  className?: string
}

const sizeMap = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

const textSizeMap = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

function StarIcon({
  fill,
  size,
}: {
  fill: 'full' | 'half' | 'empty'
  size: 'sm' | 'md' | 'lg'
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={cn(sizeMap[size], 'flex-shrink-0')}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="half-fill" x1="0" x2="100%" y1="0" y2="0">
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="50%" stopColor="#E8DDD0" />
        </linearGradient>
      </defs>
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        fill={
          fill === 'full'
            ? '#C9A84C'
            : fill === 'half'
            ? 'url(#half-fill)'
            : '#E8DDD0'
        }
      />
    </svg>
  )
}

function ratingLabel(rating: number): string {
  if (rating >= 4.5) return 'Exceptional'
  if (rating >= 4.0) return 'Excellent'
  if (rating >= 3.5) return 'Very Good'
  if (rating >= 3.0) return 'Good'
  if (rating >= 2.5) return 'Fair'
  return 'Poor'
}

export function StarRating({
  rating,
  max = 5,
  size = 'md',
  showValue = false,
  showLabel = false,
  className,
}: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const pos = i + 1
    if (pos <= rating) return 'full' as const
    if (pos - 0.5 <= rating) return 'half' as const
    return 'empty' as const
  })

  return (
    <div
      className={cn('inline-flex items-center gap-1', className)}
      role="img"
      aria-label={`${rating} out of ${max} stars — ${ratingLabel(rating)}`}
    >
      <div className="flex items-center gap-0.5">
        {stars.map((fill, i) => (
          <StarIcon key={i} fill={fill} size={size} />
        ))}
      </div>
      {showValue && (
        <span className={cn('font-medium text-charcoal ml-1', textSizeMap[size])}>
          {rating.toFixed(1)}
        </span>
      )}
      {showLabel && (
        <span className={cn('text-warmgray', textSizeMap[size])}>
          {ratingLabel(rating)}
        </span>
      )}
    </div>
  )
}
