import type { Metadata } from 'next'
import { TrendingUp }  from 'lucide-react'
import { seedLinks }   from '@/lib/data/admin'

export const metadata: Metadata = { title: 'Analytics | BrewElevate Admin' }

const byPosition = [
  { pos: 'Top Picks List',       clicks: 412 },
  { pos: 'Comparison Table',     clicks: 298 },
  { pos: 'Verdict Box',          clicks: 261 },
  { pos: 'Product Card',         clicks: 234 },
  { pos: 'Sidebar Buy Box',      clicks: 189 },
  { pos: 'Inline Callout',       clicks: 167 },
  { pos: 'Homepage Featured',    clicks: 143 },
  { pos: 'Hero CTA',             clicks: 89  },
]

export default function AnalyticsPage() {
  const totalClicks = seedLinks.reduce((s, l) => s + l.clicks, 0)
  const sortedLinks = [...seedLinks].sort((a, b) => b.clicks - a.clicks)
  const maxClicks   = Math.max(...seedLinks.map(l => l.clicks))
  const maxPos      = Math.max(...byPosition.map(p => p.clicks))

  const retailerClass: Record<string, string> = {
    amazon: 'bg-amber-50 text-amber-700',
    brand:  'bg-green-50 text-green-700',
  }

  return (
    <div className="max-w-[1100px] space-y-5">

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Clicks',  value: totalClicks.toLocaleString(), delta: '↑ 12% this month',  up: true  },
          { label: 'Avg Click Rate', value: '3.2%',  delta: '↑ from 2.8% last month',              up: true  },
          { label: 'Top Product',   value: 'Barista Express', delta: '847 total clicks'                        },
          { label: 'Top Retailer',  value: 'Amazon', delta: '78% of all clicks'                                },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-cream-300 p-5">
            <p className="text-[10px] font-medium uppercase tracking-wider text-warmgray mb-2">{s.label}</p>
            <p className="font-heading font-bold text-2xl text-charcoal leading-none">{s.value}</p>
            {s.delta && (
              <p className={`text-xs mt-2 flex items-center gap-1 ${s.up ? 'text-green-600' : 'text-warmgray'}`}>
                {s.up && <TrendingUp size={11} />}
                {s.delta}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Clicks by product */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-cream-300 overflow-hidden">
          <div className="px-5 py-4 border-b border-cream-200">
            <h2 className="text-sm font-semibold text-charcoal">Clicks by Product & Retailer</h2>
            <p className="text-xs text-warmgray mt-0.5">All time. Sorted by total clicks.</p>
          </div>
          <div className="divide-y divide-cream-100">
            {sortedLinks.map((link, i) => (
              <div key={link.id} className="flex items-center gap-4 px-5 py-3">
                <span className="text-sm font-heading font-bold text-cream-300 w-4 text-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-charcoal">{link.productName}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${retailerClass[link.retailer] ?? 'bg-cream-200 text-warmgray'}`}>
                      {link.retailerName}
                    </span>
                    {link.isPrimary && (
                      <span className="text-[9px] text-gold-600 font-medium">Primary</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-24 h-1.5 bg-cream-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-400 rounded-full"
                      style={{ width: `${Math.round(link.clicks / maxClicks * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-charcoal w-8 text-right">{link.clicks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clicks by position + insight */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden flex-1">
            <div className="px-5 py-4 border-b border-cream-200">
              <h2 className="text-sm font-semibold text-charcoal">Clicks by Page Position</h2>
              <p className="text-xs text-warmgray mt-0.5">Where on the page users click CTAs most.</p>
            </div>
            <div className="p-5 space-y-3">
              {byPosition.map(p => (
                <div key={p.pos} className="flex items-center gap-3">
                  <span className="text-xs text-charcoal flex-1">{p.pos}</span>
                  <div className="w-24 h-1.5 bg-cream-300 rounded-full overflow-hidden flex-shrink-0">
                    <div className="h-full bg-gold-400 rounded-full" style={{ width: `${Math.round(p.clicks / maxPos * 100)}%` }} />
                  </div>
                  <span className="text-xs font-bold text-charcoal w-6 text-right flex-shrink-0">{p.clicks}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insight card */}
          <div className="bg-espresso rounded-2xl p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-400/70 mb-2">💡 Insight</p>
            <p className="text-sm font-heading font-semibold text-cream-100 mb-2 leading-snug">
              Top Picks drives 23% of all affiliate clicks
            </p>
            <p className="text-xs text-cream-100/55 leading-relaxed">
              Prioritise strong CTA placement in the Top Picks section of buying guides. Consider adding a second "Check Price" button at the start of each product breakdown.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
