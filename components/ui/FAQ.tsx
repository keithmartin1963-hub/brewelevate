'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/lib/types'

interface FAQProps {
  items: FAQItem[]
  className?: string
}

export function FAQ({ items, className }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div
      className={cn('divide-y divide-cream-200', className)}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              className="w-full flex items-start justify-between gap-4 py-5 text-left group"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span
                className="text-base font-medium font-heading text-charcoal group-hover:text-espresso transition-colors pr-4"
                itemProp="name"
              >
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  'flex-shrink-0 mt-0.5 text-warmgray transition-transform duration-200',
                  isOpen && 'rotate-180 text-espresso'
                )}
              />
            </button>

            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96 pb-5' : 'max-h-0'
              )}
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <p className="text-sm text-warmgray leading-relaxed" itemProp="text">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
