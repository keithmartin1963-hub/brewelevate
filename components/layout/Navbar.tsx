'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Coffee } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mainNav } from '@/lib/config/site'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mobile on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 inset-x-0 z-50 bg-cream/95 backdrop-blur-sm border-b transition-all duration-200',
        scrolled ? 'border-cream-300 shadow-sm' : 'border-transparent'
      )}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="container-brew h-full flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 flex-shrink-0"
          onClick={() => { setMobileOpen(false); setActiveMenu(null) }}
        >
          <div className="w-7 h-7 rounded-lg bg-espresso flex items-center justify-center flex-shrink-0">
            <Coffee size={15} className="text-gold-400" strokeWidth={1.75} />
          </div>
          <div className="leading-none">
            <span className="font-heading font-semibold text-espresso text-lg tracking-tight">
              Brew<span className="text-gold-400">Elevate</span>
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {mainNav.map((item) => {
            const hasChildren = item.children && item.children.length > 0
            const isOpen = activeMenu === item.label

            return (
              <div key={item.label} className="relative">
                {hasChildren ? (
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150',
                      isOpen
                        ? 'text-espresso bg-cream-200'
                        : 'text-warmgray hover:text-charcoal hover:bg-cream-200'
                    )}
                    onClick={() => setActiveMenu(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn('transition-transform duration-150', isOpen && 'rotate-180')}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center px-3.5 py-2 text-sm font-medium text-warmgray hover:text-charcoal hover:bg-cream-200 rounded-lg transition-colors duration-150"
                    onClick={() => setActiveMenu(null)}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {hasChildren && isOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl border border-cream-200 shadow-premium-lg py-2 z-50">
                    <div className="px-3 py-2 border-b border-cream-100 mb-1">
                      <p className="text-[10px] uppercase tracking-widest font-medium text-warmgray/60">
                        {item.label}
                      </p>
                    </div>
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setActiveMenu(null)}
                        className="flex flex-col px-3 py-2.5 mx-1 rounded-xl hover:bg-cream-100 transition-colors duration-150 group"
                      >
                        <span className="text-sm font-medium text-charcoal group-hover:text-espresso">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="text-xs text-warmgray mt-0.5">{child.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/buying-guide/best-espresso-machines-under-1000"
            className="btn btn-gold btn-sm"
          >
            Top Picks
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-charcoal hover:bg-cream-200 rounded-lg transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-cream z-40 overflow-y-auto">
          <div className="container-brew py-6 flex flex-col gap-1">
            {mainNav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-charcoal hover:bg-cream-200 transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 border-l-2 border-cream-300 pl-4 mb-2 flex flex-col gap-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2 text-sm text-warmgray hover:text-charcoal hover:bg-cream-200 rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-cream-300">
              <Link
                href="/buying-guide/best-espresso-machines-under-1000"
                onClick={() => setMobileOpen(false)}
                className="btn btn-gold w-full justify-center"
              >
                View Top Picks
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── Spacer to offset fixed nav ───────────────────────────────────────────────
export function NavSpacer() {
  return <div style={{ height: 'var(--nav-height)' }} aria-hidden="true" />
}
