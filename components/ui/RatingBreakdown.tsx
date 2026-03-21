import { cn } from '@/lib/utils'
import type { ReviewRatingBreakdown } from '@/lib/types'

interface RatingBreakdownProps {
  overall: number
  breakdown: ReviewRatingBreakdown[]
  className?: string
}

export function RatingBreakdown({ overall, breakdown, className }: RatingBreakdownProps) {
  return (
    <div className={cn('', className)}>
      {/* Overall score */}
      <div className="flex items-center gap-5 mb-6 pb-6 border-b border-cream-200">
        <div className="flex-shrink-0 text-center">
          <p className="text-5xl font-bold font-heading text-espresso leading-none">{overall.toFixed(1)}</p>
          <p className="text-xs text-warmgray mt-1 uppercase tracking-wider">Overall</p>
          <div className="flex justify-center mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="w-4 h-4">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  fill={i + 1 <= overall ? '#C9A84C' : i + 0.5 <= overall ? 'url(#half)' : '#E8DDD0'}
                />
              </svg>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {breakdown.map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <span className="text-xs text-warmgray w-28 flex-shrink-0 truncate">{item.category}</span>
              <div className="flex-1 h-1.5 bg-cream-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-400 rounded-full transition-all duration-500"
                  style={{ width: `${(item.score / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-charcoal w-6 text-right flex-shrink-0">
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
