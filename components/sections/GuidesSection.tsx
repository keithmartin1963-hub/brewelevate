import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { formatDateShort } from '@/lib/utils'
import type { BuyingGuide } from '@/lib/types'

interface GuidesSectionProps {
  guides: BuyingGuide[]
}

export function GuidesSection({ guides }: GuidesSectionProps) {
  const [primary, ...secondary] = guides

  return (
    <Section background="dark-cream" id="buying-guides">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <SectionHeader
          label="Buying Guides"
          heading="Find the right gear faster"
          subheading="We do the testing. You make the decision. Every guide is updated regularly."
          className="mb-0"
        />
        <Link
          href="/guides"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-espresso transition-colors flex-shrink-0 ml-8"
        >
          All guides
          <ArrowRight size={14} strokeWidth={1.75} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Primary — large featured guide */}
        {primary && (
          <div className="lg:col-span-7">
            <PrimaryGuideCard guide={primary} />
          </div>
        )}

        {/* Secondary guides — stacked */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {secondary.map(guide => (
            <SecondaryGuideCard key={guide.id} guide={guide} />
          ))}

          {/* CTA card */}
          <div className="card p-5 bg-espresso text-cream-100 flex flex-col gap-3 mt-auto">
            <BookOpen size={20} className="text-gold-400" strokeWidth={1.5} />
            <div>
              <p className="font-heading font-semibold text-lg leading-snug">
                Not sure where to start?
              </p>
              <p className="text-sm text-cream-300/70 mt-1 leading-relaxed">
                Our beginner's guide walks you through building a setup from scratch.
              </p>
            </div>
            <Link
              href="/blog/category/beginners"
              className="btn btn-gold btn-sm self-start"
            >
              Start here →
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile link */}
      <div className="mt-8 flex justify-center md:hidden">
        <Link href="/guides" className="btn btn-secondary">
          All Buying Guides
          <ArrowRight size={14} strokeWidth={1.75} />
        </Link>
      </div>
    </Section>
  )
}

function PrimaryGuideCard({ guide }: { guide: BuyingGuide }) {
  return (
    <Link href={`/buying-guide/${guide.slug}`} className="group block card h-full overflow-hidden">
      {/* Image */}
      <div className="aspect-[16/9] bg-cream-200 overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={guide.heroImage}
          alt={guide.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />

        {/* Overlaid picks count */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          {guide.topPicks.length > 0 && (
            <Badge variant="gold">{guide.topPicks.length} Top Picks</Badge>
          )}
          <Badge variant="espresso">{guide.category.replace(/-/g, ' ')}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-xs text-warmgray mb-2">
          Updated {formatDateShort(guide.updatedAt)} · {guide.readingTimeMinutes} min read
        </p>
        <h3 className="font-heading font-semibold text-2xl text-charcoal group-hover:text-espresso transition-colors leading-snug mb-3">
          {guide.title}
        </h3>
        <p className="text-warmgray text-sm leading-relaxed line-clamp-2">
          {guide.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-gold-600 group-hover:text-espresso transition-colors">
          Read the guide
          <ArrowRight size={14} strokeWidth={1.75} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

function SecondaryGuideCard({ guide }: { guide: BuyingGuide }) {
  return (
    <Link href={`/buying-guide/${guide.slug}`} className="group card flex gap-0 overflow-hidden h-28">
      {/* Thumbnail */}
      <div className="w-28 flex-shrink-0 bg-cream-200 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={guide.heroImage}
          alt={guide.title}
          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
          loading="lazy"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col justify-center px-4 py-3 min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-gold-500 font-medium mb-1">
          {guide.category.replace(/-/g, ' ')}
        </p>
        <h3 className="font-heading font-semibold text-base text-charcoal group-hover:text-espresso transition-colors leading-snug line-clamp-2">
          {guide.title}
        </h3>
        <p className="text-xs text-warmgray mt-1">
          {guide.readingTimeMinutes} min read
        </p>
      </div>
    </Link>
  )
}
