'use client'

import Link from 'next/link'
import { ArrowUpRight, TrendingUp, FileText, Link2 } from 'lucide-react'
import { seedContent, seedLinks } from '@/lib/data/admin'

function StatCard({ label, value, delta, deltaUp, icon: Icon, color }: {
  label: string
  value: string | number
  delta?: string
  deltaUp?: boolean
  icon: any
  color: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-cream-300 p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-warmgray">{label}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={14} />
        </div>
      </div>

      <p className="font-bold text-3xl text-charcoal">{value}</p>

      {delta && (
        <p className={`text-xs mt-2 flex items-center gap-1 ${deltaUp ? 'text-green-600' : 'text-warmgray'}`}>
          {deltaUp && <TrendingUp size={11} />}
          {delta}
        </p>
      )}
    </div>
  )
}

export default function AdminClient() {
  const totalClicks = seedLinks.reduce((s, l) => s + l.clicks, 0)
  const published = seedContent.filter(c => c.status === 'published').length
  const drafts = seedContent.filter(c => c.status === 'draft').length
  const topLink = [...seedLinks].sort((a, b) => b.clicks - a.clicks)[0]

  const quickActions = [
    { icon: '📖', label: 'New Buying Guide', href: '/admin/guides/new' },
    { icon: '⭐', label: 'New Review', href: '/admin/reviews/new' },
    { icon: '🖼️', label: 'New Setup Guide', href: '/admin/setups/new' },
    { icon: '📝', label: 'New Blog Post', href: '/admin/posts/new' },
  ]

  return (
    <div className="space-y-6 max-w-[1200px]">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Clicks" value={totalClicks} delta="↑ this month" deltaUp icon={TrendingUp} color="bg-gold-50 text-gold-600" />
        <StatCard label="Published" value={published} delta="Active" deltaUp icon={FileText} color="bg-green-50 text-green-600" />
        <StatCard label="Drafts" value={drafts} delta="Needs work" icon={FileText} color="bg-cream-200 text-warmgray" />
        <StatCard label="Top Link" value={topLink?.clicks || 0} delta={topLink?.productName || ''} icon={Link2} color="bg-cream-200 text-charcoal" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
        <div className="px-5 py-4 border-b border-cream-200">
          <h2 className="text-sm font-semibold text-charcoal">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 hover:bg-cream-50"
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-xs text-charcoal">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
