import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AudienceGroup {
  label: string
  description: string
  fit: 'good' | 'bad' | 'maybe'
}

interface WhoIsThisForProps {
  groups: AudienceGroup[]
  className?: string
  productName?: string
}

const fitConfig = {
  good:  { icon: Check, color: 'text-green-600', bg: 'bg-green-50 border-green-200',  label: 'Great fit'    },
  bad:   { icon: X,     color: 'text-red-500',   bg: 'bg-red-50 border-red-100',     label: 'Not for you'  },
  maybe: { icon: Check, color: 'text-gold-600',  bg: 'bg-gold-50 border-gold-200',   label: 'Maybe'        },
}

export function WhoIsThisFor({ groups, className, productName }: WhoIsThisForProps) {
  const goodFits  = groups.filter(g => g.fit === 'good')
  const badFits   = groups.filter(g => g.fit === 'bad')
  const maybeFits = groups.filter(g => g.fit === 'maybe')

  return (
    <div className={cn('', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Buy if */}
        {goodFits.length > 0 && (
          <div className="rounded-2xl border border-green-200 bg-green-50/50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-700 mb-4 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0">
                <Check size={9} strokeWidth={3} className="text-green-700" />
              </span>
              {productName ? `Buy ${productName} if…` : 'Buy this if…'}
            </p>
            <ul className="space-y-3">
              {goodFits.map((g, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={14} className="text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div>
                    <p className="text-sm font-medium text-charcoal">{g.label}</p>
                    <p className="text-xs text-warmgray mt-0.5">{g.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skip if */}
        {badFits.length > 0 && (
          <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-4 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
                <X size={9} strokeWidth={3} className="text-red-600" />
              </span>
              Skip it if…
            </p>
            <ul className="space-y-3">
              {badFits.map((g, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div>
                    <p className="text-sm font-medium text-charcoal">{g.label}</p>
                    <p className="text-xs text-warmgray mt-0.5">{g.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Maybe */}
        {maybeFits.length > 0 && (
          <div className="sm:col-span-2 rounded-2xl border border-gold-200 bg-gold-50/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-700 mb-3">
              Consider it if…
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {maybeFits.map((g, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-gold-400 flex-shrink-0 mt-0.5 text-sm font-bold">→</span>
                  <div>
                    <p className="text-sm font-medium text-charcoal">{g.label}</p>
                    <p className="text-xs text-warmgray mt-0.5">{g.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
