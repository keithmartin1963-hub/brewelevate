import type { Metadata } from 'next'
import { Navbar, NavSpacer }      from '@/components/layout/Navbar'
import { Footer }                 from '@/components/layout/Footer'
import { Section, SectionHeader } from '@/components/ui/Section'
import { SetupCard }              from '@/components/sections/ContentCards'
import { PinShare }               from '@/components/affiliate/PinButton'
import { MultiJsonLd }            from '@/components/seo/JsonLd'
import { buildHubMetadata }       from '@/lib/seo/metadata'
import { buildBreadcrumbSchema, buildItemListSchema } from '@/lib/seo/schemas'
import { setupGuides }            from '@/lib/data/content'

export const metadata: Metadata = buildHubMetadata({
  title:       'Coffee Setup Ideas & Station Inspiration | BrewElevate',
  description: 'Beautiful home coffee station setups at every budget. Minimalist espresso stations, luxury builds, small-space solutions — with full gear lists and buy links.',
  path:        '/setups',
  keywords:    ['coffee station ideas', 'home espresso setup', 'coffee bar ideas', 'coffee station design', 'home barista setup'],
})

export default function SetupsPage() {
  const published = setupGuides.filter(s => s.status === 'published')

  const schemas = [
    buildBreadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'Setup Ideas' }]),
    buildItemListSchema(published.map((s, i) => ({
      position:    i + 1,
      name:        s.title,
      url:         `/setups/${s.slug}`,
      description: s.excerpt,
      image:       s.pinImages?.[0] ?? s.heroImage,
    }))),
  ]

  return (
    <>
      <MultiJsonLd schemas={schemas} />
      <Navbar />
      <NavSpacer />
      <main>
        {/* Pinterest-optimised header */}
        <div className="bg-cream border-b border-cream-300 py-12">
          <div className="container-brew flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <p className="text-label mb-3">Setup Inspiration</p>
              <h1 className="heading-display text-charcoal max-w-2xl mb-4">
                Build your dream coffee station.
              </h1>
              <p className="text-lg text-warmgray max-w-xl leading-relaxed">
                Every setup includes a complete gear list, budget breakdown, and real product links.
                Save any setup to Pinterest and revisit when you're ready to build.
              </p>
            </div>
            <a
              href="https://pinterest.com/brewelevate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium flex-shrink-0 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#E60023' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
              Follow on Pinterest
            </a>
          </div>
        </div>

        {/* Pinterest-style grid */}
        <Section background="cream">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {published.map((setup, i) => (
              <SetupCard key={setup.id} setup={setup} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
