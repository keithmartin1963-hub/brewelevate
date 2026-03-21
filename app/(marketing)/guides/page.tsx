import type { Metadata } from 'next'
import Link              from 'next/link'
import { Navbar, NavSpacer } from '@/components/layout/Navbar'
import { Footer }            from '@/components/layout/Footer'
import { Section, SectionHeader } from '@/components/ui/Section'
import { GuideCard }         from '@/components/sections/ContentCards'
import { MultiJsonLd }       from '@/components/seo/JsonLd'
import { buildHubMetadata }  from '@/lib/seo/metadata'
import { buildBreadcrumbSchema, buildItemListSchema } from '@/lib/seo/schemas'
import { getPublishedGuides } from '@/lib/data/guides'

export const metadata: Metadata = buildHubMetadata({
  title:       'Coffee Gear Buying Guides — BrewElevate',
  description: 'Expert, hands-on buying guides for every coffee category. Espresso machines, grinders, milk frothers, kettles, and accessories — tested and ranked.',
  path:        '/guides',
  keywords:    ['coffee buying guides', 'best espresso machines', 'best coffee grinders', 'coffee gear recommendations'],
})

export default function GuidesPage() {
  const guides = getPublishedGuides()

  const schemas = [
    buildBreadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'Buying Guides' }]),
    buildItemListSchema(guides.map((g, i) => ({
      position:    i + 1,
      name:        g.title,
      url:         `/buying-guide/${g.slug}`,
      description: g.excerpt,
      image:       g.heroImage,
    }))),
  ]

  return (
    <>
      <MultiJsonLd schemas={schemas} />
      <Navbar />
      <NavSpacer />
      <main>
        <Section background="cream">
          <SectionHeader
            label="Buying Guides"
            heading="Find the right gear faster"
            subheading="Every guide is tested hands-on, updated regularly, and written to help you make a confident decision — not to sell you the most expensive option."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map(guide => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </Section>

        {/* Category quick-links */}
        <Section background="white">
          <SectionHeader label="By Category" heading="Browse by type" align="center" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-3xl mx-auto">
            {[
              { label: 'Espresso Machines', emoji: '☕', href: '/guides/espresso-machines' },
              { label: 'Grinders',          emoji: '⚙️', href: '/guides/grinders' },
              { label: 'Milk Frothers',     emoji: '🥛', href: '/guides/milk-frothers' },
              { label: 'Kettles',           emoji: '🫖', href: '/guides/kettles-scales' },
              { label: 'Accessories',       emoji: '🔧', href: '/guides/accessories' },
            ].map(cat => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-cream-300 bg-white hover:border-gold-300 hover:bg-gold-50/40 transition-all text-center group"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-medium text-charcoal group-hover:text-espresso transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
