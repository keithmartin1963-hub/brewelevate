import type { Metadata } from 'next'
import { Navbar, NavSpacer } from '@/components/layout/Navbar'
import { Footer }            from '@/components/layout/Footer'
import { Section }           from '@/components/ui/Section'
import { Divider }           from '@/components/ui/Divider'
import { buildHubMetadata }  from '@/lib/seo/metadata'

export const metadata: Metadata = buildHubMetadata({
  title:       'About BrewElevate — Our Testing Methodology',
  description: 'How BrewElevate tests coffee gear, our editorial standards, affiliate disclosure, and the team behind the reviews.',
  path:        '/about',
})

const values = [
  { icon: '🔬', title: 'Hands-on only', body: 'We don\'t write about gear we haven\'t used. Every product in a buying guide has been tested — real shots, real beans, real workflows. No press releases turned into reviews.' },
  { icon: '📊', title: 'Consistent methodology', body: 'We test espresso machines with the same bean, the same dose, the same yield target across every machine. Grinders are compared on the same machine at the same settings. Variables are controlled.' },
  { icon: '💰', title: 'Honest about affiliate links', body: 'We earn commissions from affiliate links — that\'s how BrewElevate is funded. But our rankings aren\'t influenced by commission rates. A product that earns us less money gets the top spot if it\'s the best recommendation.' },
  { icon: '🔄', title: 'Updated regularly', body: 'Every buying guide shows its last-updated date. We revisit guides when new models launch, when prices change significantly, or when our long-term testing reveals something we missed.' },
]

const methodology = [
  { step: '01', title: 'Selection', body: 'We identify every significant product in a category, prioritising those with meaningful market presence or user interest. We don\'t test obscure products just to fill out a list.' },
  { step: '02', title: 'Testing period', body: 'Minimum 2 weeks of daily use per product. For espresso machines, that\'s 50+ shots across multiple bean origins and roast levels. For grinders, 1kg of coffee ground across the full adjustment range.' },
  { step: '03', title: 'Scoring', body: 'Each product is scored across 4–6 category-specific dimensions. The overall score is a weighted average that reflects what matters most for that category — not an equal average across all dimensions.' },
  { step: '04', title: 'Ranking', body: 'Final rankings consider score, price, availability, and real-world use case. A product with a slightly lower score may rank higher if it represents better value at its price point.' },
  { step: '05', title: 'Review', body: 'Every guide is reviewed by at least one other team member before publishing. We check factual claims, affiliate links, and that our recommendations are defensible to someone who follows them.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <NavSpacer />
      <main>
        {/* Hero */}
        <Section background="cream">
          <div className="max-w-2xl">
            <p className="text-label mb-4">About BrewElevate</p>
            <h1 className="heading-display text-charcoal mb-6">
              We test gear so you can choose with confidence.
            </h1>
            <p className="text-lg text-warmgray leading-relaxed">
              BrewElevate is an independent coffee gear review site. We test espresso machines,
              grinders, kettles, and accessories with a consistent methodology and publish
              honest recommendations — including when the expensive option isn't worth it.
            </p>
          </div>
        </Section>

        {/* Values */}
        <Section background="white">
          <h2 className="heading-section mb-10">How we work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(v => (
              <div key={v.title} className="p-6 rounded-2xl border border-cream-300 bg-cream-50">
                <span className="text-2xl mb-3 block">{v.icon}</span>
                <h3 className="font-heading font-semibold text-lg text-charcoal mb-2">{v.title}</h3>
                <p className="text-sm text-warmgray leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Methodology */}
        <Section background="dark-cream">
          <h2 className="heading-section mb-10">Our testing process</h2>
          <div className="space-y-6 max-w-2xl">
            {methodology.map(m => (
              <div key={m.step} className="flex gap-5">
                <span className="font-heading font-bold text-2xl text-cream-300 w-10 flex-shrink-0 mt-0.5">
                  {m.step}
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-charcoal mb-1">{m.title}</h3>
                  <p className="text-warmgray leading-relaxed text-[15px]">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Affiliate disclosure */}
        <Section background="espresso">
          <div className="max-w-2xl">
            <p className="text-label text-gold-400/80 mb-4">Affiliate Disclosure</p>
            <h2 className="heading-section text-cream-100 mb-4">
              How we're funded — and why it doesn't change our recommendations.
            </h2>
            <p className="text-cream-100/70 leading-relaxed mb-4">
              BrewElevate earns commissions from affiliate links — primarily through the Amazon
              Associates Program and direct brand affiliate programs. When you click a link on
              our site and make a purchase, we may earn a small commission at no additional
              cost to you.
            </p>
            <p className="text-cream-100/70 leading-relaxed mb-4">
              This is how the site is funded. We disclose it completely. What we don't do:
              rank products based on commission rates, accept payment for rankings, or write
              positive reviews in exchange for free products.
            </p>
            <p className="text-cream-100/70 leading-relaxed">
              If a product offers us zero commission and it's genuinely the best
              recommendation, it gets the top spot. That's the editorial standard we hold
              ourselves to — and the only standard that makes these recommendations worth
              reading.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
