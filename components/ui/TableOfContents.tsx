'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface TOCItem {
  id: string
  label: string
  level?: 1 | 2
}

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    )

    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={cn('', className)} aria-label="Table of contents">
      <p className="text-[10px] font-medium uppercase tracking-widest text-warmgray/60 mb-3 px-1">
        On this page
      </p>
      <ol className="space-y-0.5">
        {items.map(item => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150',
                item.level === 2 && 'pl-5',
                activeId === item.id
                  ? 'bg-gold-50 text-espresso font-medium border-l-2 border-gold-400 rounded-l-none'
                  : 'text-warmgray hover:text-charcoal hover:bg-cream-100'
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
