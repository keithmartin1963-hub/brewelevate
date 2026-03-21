'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { PinButton } from '@/components/affiliate/PinButton'
import type { SetupGuide } from '@/lib/types'

interface SetupInspirationSectionProps {
  setups: SetupGuide[]
}

export function SetupInspirationSection({ setups }: SetupInspirationSectionProps) {
  return (
    <Section background="cream" id="setup-inspiration">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <SectionHeader
          label="Setup Inspiration"
          heading="Build your dream coffee station"
          subheading="Every setup includes a full gear list and budget breakdown — from essentials to luxury."
          className="mb-0"
        />
        <Link
          href="/setups"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-espresso transition-colors flex-shrink-0 ml-8"
        >
          All setups
          <ArrowRight size={14} strokeWidth={1.75} />
        </Link>
      </div>

      {/* Pinterest-native masonry-style grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {setups.map((setup, index) => (
          <SetupCard key={setup.id} setup={setup} priority={index === 0} />
        ))}
      </div>

      {/* Pinterest follow prompt */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-6 rounded-2xl bg-cream-200 border border-cream-300">
        <div>
          <p className="font-heading font-semibold text-charcoal">
            Save setups to Pinterest
          </p>
          <p className="text-sm text-warmgray mt-0.5">
            Every setup has a shareable pin — hover any image to save it.
          </p>
        </div>
        <a
          href="https://pinterest.com/brewelevate"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium flex-shrink-0 transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#E60023' }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
          Follow on Pinterest
        </a>
      </div>
    </Section>
  )
}

function SetupCard({
  setup,
  priority,
}: {
  setup: SetupGuide
  priority: boolean
}) {
  const pinImg = setup.pinImages?.[0] ?? setup.heroImage

  // Vary the card height slightly to create a natural staggered look
  const isLong = setup.style === 'Luxury'

  return (
    <article className="group">
      {/* Image — Pinterest 2:3 ratio */}
      <Link href={`/setups/${setup.slug}`} className="block relative overflow-hidden rounded-2xl">
        <div
          className="bg-cream-200 overflow-hidden"
          style={{ aspectRatio: isLong ? '2/3.2' : '2/3' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={setup.heroImage}
            alt={setup.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent pointer-events-none rounded-2xl" />

        {/* Style badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="espresso">{setup.style}</Badge>
        </div>

        {/* Pinterest save button — appears on hover */}
        <PinButton
          imageUrl={pinImg}
          description={`${setup.title} — ${setup.excerpt}`}
        />

        {/* Bottom content */}
        <div className="absolute bottom-0 inset-x-0 p-4 rounded-b-2xl">
          <h3 className="font-heading font-semibold text-white text-xl leading-snug">
            {setup.title}
          </h3>
          {/* Budget tiers */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {setup.budgetTiers.map(tier => (
              <span
                key={tier.tier}
                className="text-[10px] font-medium text-white/80 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20"
              >
                {tier.tier} · {tier.totalEstimate}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Below-image meta */}
      <div className="px-1 pt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-warmgray leading-relaxed line-clamp-2">
            {setup.excerpt}
          </p>
        </div>
        {setup.pinCount && (
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-medium text-warmgray">
              {setup.pinCount.toLocaleString()} saves
            </p>
          </div>
        )}
      </div>
    </article>
  )
}
