'use client'

import { useState }    from 'react'
import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { Coffee, LayoutDashboard, BarChart2, BookOpen, Star, Grid, FileText, Tag, Link2, Settings, Plus, ExternalLink } from 'lucide-react'
import { cn }          from '@/lib/utils'
import { siteConfig }  from '@/lib/config/site'

const nav = [
  { group: 'Overview', items: [
    { label: 'Dashboard',        href: '/admin',          icon: LayoutDashboard },
    { label: 'Analytics',        href: '/admin/analytics', icon: BarChart2 },
  ]},
  { group: 'Content', items: [
    { label: 'Buying Guides',    href: '/admin/guides',   icon: BookOpen,  badge: '3' },
    { label: 'Reviews',          href: '/admin/reviews',  icon: Star,      badge: '3' },
    { label: 'Setup Guides',     href: '/admin/setups',   icon: Grid,      badge: '3' },
    { label: 'Blog Posts',       href: '/admin/posts',    icon: FileText,  badge: '3' },
  ]},
  { group: 'Products', items: [
    { label: 'Product Database', href: '/admin/products', icon: Tag },
    { label: 'Affiliate Links',  href: '/admin/links',    icon: Link2 },
  ]},
  { group: 'Settings', items: [
    { label: 'Settings',         href: '/admin/settings', icon: Settings },
  ]},
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">

      {/* ── Sidebar ── */}
      <aside className="w-[220px] bg-espresso flex flex-col flex-shrink-0 min-h-screen">

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-cream-100/8">
          <div className="w-7 h-7 rounded-lg bg-gold-400/15 flex items-center justify-center flex-shrink-0">
            <Coffee size={13} className="text-gold-400" strokeWidth={1.75} />
          </div>
          <span className="font-heading font-semibold text-[15px] text-cream-100">
            Brew<span className="text-gold-400">Elevate</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {nav.map(group => (
            <div key={group.group}>
              <p className="px-4 pt-3 pb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-cream-100/25">
                {group.group}
              </p>
              {group.items.map(item => {
                const Icon    = item.icon
                const active  = pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2.5 mx-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150',
                      active
                        ? 'bg-gold-400/18 text-gold-400'
                        : 'text-cream-100/50 hover:text-cream-100/85 hover:bg-cream-100/7'
                    )}
                  >
                    <Icon size={14} strokeWidth={1.75} className={cn('flex-shrink-0', active ? 'opacity-100' : 'opacity-70')} />
                    <span className="flex-1">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-cream-100/8 p-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="w-7 h-7 rounded-full bg-gold-400/20 flex items-center justify-center text-[11px] font-semibold text-gold-400 flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-cream-100/80 truncate">Admin</p>
              <p className="text-[9px] text-cream-100/35">Editor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-cream">

        {/* Topbar */}
        <header className="bg-white border-b border-cream-300 px-6 h-13 flex items-center justify-between flex-shrink-0" style={{ height: '52px' }}>
          <p className="text-sm font-semibold text-charcoal">
            {nav.flatMap(g => g.items).find(i =>
              i.href === pathname || (i.href !== '/admin' && pathname.startsWith(i.href))
            )?.label ?? 'Dashboard'}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="btn btn-secondary btn-sm flex items-center gap-1.5 text-xs"
            >
              <ExternalLink size={11} />
              View Site
            </Link>
            <Link href="/admin/guides/new" className="btn btn-gold btn-sm flex items-center gap-1.5 text-xs">
              <Plus size={11} />
              New Content
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
