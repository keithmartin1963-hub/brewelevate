import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, TrendingUp, FileText, BookOpen, Star, Grid, Tag, Link2 } from 'lucide-react'
import { seedContent, seedLinks, seedProducts } from '@/lib/data/admin'

export const metadata: Metadata = { title: 'Dashboard | BrewElevate Admin' }

function StatCard({ label, value, delta, deltaUp, icon: Icon, color }: {
  label: string; value: string | number; delta?: string
  deltaUp?: boolean; icon: React.ElementType; color: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-cream-300 p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-warmgray">{label}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={14} strokeWidth={1.75} />
        </div>
      </div>
      <p className="font-heading font-bold text-3xl text-charcoal leading-none">{value}</p>
      {delta && (
        <p className={`text-xs mt-2 flex items-center gap-1 ${deltaUp ? 'text-green-600' : 'text-warmgray'}`}>
          {deltaUp && <TrendingUp size={11} />}
          {delta}
        </p>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const totalClicks  = seedLinks.reduce((s, l) => s + l.clicks, 0)
  const published    = seedContent.filter(c => c.status === 'published').length
  const drafts       = seedContent.filter(c => c.status === 'draft').length
  const topLink      = [...seedLinks].sort((a, b) => b.clicks - a.clicks)[0]
  const recentContent = [...seedContent]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6)

  const statusClass = {
    published: 'bg-green-50 text-green-700',
    draft:     'bg-cream-200 text-warmgray',
    archived:  'bg-red-50 text-red-600',
  }

  const quickActions = [
    { icon: '📖', label: 'New Buying Guide', href: '/admin/guides/new' },
    { icon: '⭐', label: 'New Review',       href: '/admin/reviews/new' },
    { icon: '🖼️', label: 'New Setup Guide', href: '/admin/setups/new'  },
    { icon: '📝', label: 'New Blog Post',    href: '/admin/posts/new'   },
  ]

  return (
    <div className="space-y-6 max-w-[1200px]">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Clicks"  value={totalClicks.toLocaleString()} delta="↑ 12% this month" deltaUp icon={TrendingUp} color="bg-gold-50 text-gold-600" />
        <StatCard label="Published"     value={published}   delta="↑ 2 this month" deltaUp icon={FileText}  color="bg-green-50 text-green-600" />
        <StatCard label="Drafts"        value={drafts}      delta="Ready to publish"       icon={FileText}  color="bg-cream-200 text-warmgray" />
        <StatCard label="Top Link"      value={topLink.clicks} delta={`${topLink.productName} · Amazon`} icon={Link2} color="bg-espresso/8 text-espresso" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent content */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-cream-300 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
            <h2 className="text-sm font-semibold text-charcoal">Recent Content</h2>
            <Link href="/admin/guides" className="text-xs text-gold-600 hover:text-espresso transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-cream-100">
            {recentContent.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">{item.title}</p>
                  <p className="text-xs text-warmgray mt-0.5">{item.type} · {item.category}</p>
                </div>
                <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${statusClass[item.status]}`}>
                  {item.status}
                </span>
                <span className="text-xs text-warmgray/60">{item.updatedAt}</span>
                <Link href={`/admin/${item.type}s`} className="text-warmgray hover:text-charcoal transition-colors">
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Top links + quick actions */}
        <div className="flex flex-col gap-5">

          {/* Top affiliate links */}
          <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden flex-1">
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
              <h2 className="text-sm font-semibold text-charcoal">Top Links</h2>
              <Link href="/admin/links" className="text-xs text-gold-600 hover:text-espresso transition-colors">
                Manage →
              </Link>
            </div>
            <div className="divide-y divide-cream-100">
              {seedLinks.slice(0, 4).map(link => (
                <div key={link.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-charcoal truncate">{link.productName}</p>
                    <p className="text-[10px] text-warmgray">{link.retailerName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-cream-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold-400 rounded-full"
                        style={{ width: `${Math.round(link.clicks / 847 * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-charcoal w-8 text-right">{link.clicks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
            <div className="px-5 py-4 border-b border-cream-200">
              <h2 className="text-sm font-semibold text-charcoal">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-cream-100">
              {quickActions.map((action, i) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex flex-col items-center gap-1.5 p-4 hover:bg-cream-50 transition-colors text-center"
                >
                  <span className="text-xl">{action.icon}</span>
                  <span className="text-[11px] font-medium text-charcoal leading-tight">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
