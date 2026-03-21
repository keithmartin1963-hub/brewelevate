import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProsConsProps {
  pros: string[]
  cons: string[]
  className?: string
  layout?: 'side-by-side' | 'stacked'
}

export function ProsCons({ pros, cons, className, layout = 'side-by-side' }: ProsConsProps) {
  return (
    <div className={cn(
      'grid gap-4',
      layout === 'side-by-side' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1',
      className
    )}>
      {/* Pros */}
      <div className="rounded-2xl border border-green-200 bg-green-50/50 p-5">
        <h4 className="text-sm font-semibold font-heading text-green-800 mb-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0">
            <Check size={11} className="text-green-700" strokeWidth={2.5} />
          </span>
          What We Like
        </h4>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
              <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5">
        <h4 className="text-sm font-semibold font-heading text-red-700 mb-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
            <X size={11} className="text-red-600" strokeWidth={2.5} />
          </span>
          Keep in Mind
        </h4>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
              <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
