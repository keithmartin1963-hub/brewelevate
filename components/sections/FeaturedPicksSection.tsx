import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { AffiliateCTA } from '@/components/affiliate/AffiliateCTA'
import type { Product } from '@/lib/types'

interface FeaturedPicksSectionProps {
  products: Product[]
}

const pickBadges: Record<string, string> = {
  'breville-barista-express': 'Best Overall',
  'baratza-encore-esp':       'Best Grinder',
  'fellow-stagg-ekg':         'Best Kettle',
}

export function FeaturedPicksSection({ products }: FeaturedPicksSectionProps) {
  return (
    <Section background="white" id="featured-picks">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <SectionHeader
          label="Editor's Top Picks"
          heading="The gear we recommend most"
          subheading="Tested hands-on. Chosen without bias. Ranked by real-world performance."
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

      {/* Cards — responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <FeaturedPickCard
            key={product.id}
            product={product}
            badge={pickBadges[product.id]}
          />
        ))}
      </div>

      {/* Mobile "all guides" link */}
      <div className="mt-8 flex justify-center md:hidden">
        <Link href="/guides" className="btn btn-secondary">
          View All Guides
          <ArrowRight size={14} strokeWidth={1.75} />
        </Link>
      </div>
    </Section>
  )
}

function FeaturedPickCard({
  product,
  badge,
}: {
  product: Product
  badge?: string
}) {
  const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)

  return (
    <article className="card group flex flex-col">
      {/* Image */}
      <Link href={`/review/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] bg-cream-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
        </div>
        {badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="espresso">{badge}</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <span className="text-xs font-semibold text-espresso">{product.price}</span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-gold-500 mb-1">
            {product.brand}
          </p>
          <Link href={`/review/${product.slug}`}>
            <h3 className="font-heading font-semibold text-lg text-charcoal group-hover:text-espresso transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-warmgray">{product.rating.toFixed(1)}</span>
        </div>

        <p className="text-sm text-warmgray leading-relaxed flex-1">
          {product.tagline}
        </p>

        {/* Top 2 pros */}
        <ul className="space-y-1.5 py-3 border-y border-cream-200">
          {product.pros.slice(0, 2).map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-warmgray">
              <span className="text-gold-400 flex-shrink-0 mt-0.5 font-bold">✓</span>
              {pro}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto">
          {primaryLink ? (
            <AffiliateCTA
              link={primaryLink}
              productId={product.id}
              type="check-price"
              variant="primary"
              position="homepage-featured-picks"
              fullWidth
            />
          ) : (
            <Link
              href={`/review/${product.slug}`}
              className="btn btn-secondary w-full justify-center"
            >
              Read Review
            </Link>
          )}
          <Link
            href={`/review/${product.slug}`}
            className="flex justify-center mt-2 text-xs text-warmgray/60 hover:text-warmgray transition-colors"
          >
            Read our full review →
          </Link>
        </div>
      </div>
    </article>
  )
}
