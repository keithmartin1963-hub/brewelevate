import Link from 'next/link'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { Breadcrumb }       from '@/components/ui/Breadcrumb'
import { TableOfContents }  from '@/components/ui/TableOfContents'
import { VerdictBox }       from '@/components/ui/VerdictBox'
import { WhoIsThisFor }     from '@/components/ui/WhoIsThisFor'
import { ProsCons }         from '@/components/ui/ProsCons'
import { FAQ }              from '@/components/ui/FAQ'
import { RelatedContent }   from '@/components/ui/RelatedContent'
import { TopPicksList }     from '@/components/affiliate/TopPicksList'
import { ComparisonTable }  from '@/components/affiliate/ComparisonTable'
import { AffiliateCTA, AffiliateCTAGroup } from '@/components/affiliate/AffiliateCTA'
import { PinShare }         from '@/components/affiliate/PinButton'
import { formatDateShort }  from '@/lib/utils'
import type { BuyingGuide, Product } from '@/lib/types'

interface BuyingGuideTemplateProps {
  guide: BuyingGuide
  products: Product[]          // top-pick products, in rank order
  allProducts?: Product[]      // for comparison table
}

const tocItems = [
  { id: 'top-picks',        label: 'Our Top Picks'         },
  { id: 'who-is-this-for',  label: 'Who Is This For?'      },
  { id: 'comparison',       label: 'Full Comparison'        },
  { id: 'product-details',  label: 'Product Breakdowns'    },
  { id: 'buying-guide',     label: "Buyer's Guide"         },
  { id: 'faq',              label: 'FAQs'                  },
  { id: 'verdict',          label: 'Final Recommendation'  },
]

export function BuyingGuideTemplate({
  guide,
  products,
  allProducts,
}: BuyingGuideTemplateProps) {
  const topPick      = products[0]
  const primaryLink  = topPick?.affiliateLinks.find(l => l.isPrimary && l.isActive)
  const compareProds = allProducts ?? products

  const topPickItems = guide.topPicks.map(tp => {
    const product = products.find(p => p.id === tp.productId)
    if (!product) return null
    return { product, rank: tp.rank, badge: tp.badge, summary: tp.summary }
  }).filter(Boolean) as { product: Product; rank: number; badge: string; summary: string }[]

  return (
    <article>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="bg-cream border-b border-cream-300">
        <div className="container-brew pt-8 pb-10">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home',         href: '/' },
              { label: 'Buying Guides', href: '/guides' },
              { label: guide.title },
            ]}
            className="mb-6"
          />

          {/* Category + updated */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-label">{guide.category.replace(/-/g, ' ')}</span>
            <span className="text-warmgray/30">·</span>
            <span className="flex items-center gap-1.5 text-xs text-warmgray">
              <Calendar size={12} />
              Updated {formatDateShort(guide.updatedAt)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-warmgray">
              <Clock size={12} />
              {guide.readingTimeMinutes} min read
            </span>
          </div>

          <h1 className="heading-display text-charcoal max-w-3xl mb-4">
            {guide.title}
          </h1>
          {guide.subtitle && (
            <p className="text-xl text-warmgray max-w-2xl leading-relaxed mb-6">
              {guide.subtitle}
            </p>
          )}

          {/* Above-fold CTA — conversion 1 */}
          {primaryLink && topPick && (
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-gold-50 border border-gold-200 max-w-xl">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-warmgray mb-0.5">Our top pick</p>
                <p className="font-heading font-semibold text-charcoal text-sm">
                  {topPick.brand} {topPick.name} — {topPick.price}
                </p>
              </div>
              <AffiliateCTA
                link={primaryLink}
                productId={topPick.id}
                type="check-price"
                variant="primary"
                position="guide-hero-cta"
                showPrice={false}
                className="flex-shrink-0"
              />
            </div>
          )}
        </div>

        {/* Hero image */}
        <div className="aspect-[16/6] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={guide.heroImage}
            alt={guide.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </header>

      {/* ── Body: sidebar layout ──────────────────────────────────────── */}
      <div className="container-brew py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Main content ── */}
          <div className="lg:col-span-8 xl:col-span-9">

            {/* Excerpt / intro */}
            <p className="text-lg text-warmgray leading-relaxed mb-10 pb-10 border-b border-cream-200">
              {guide.excerpt}
            </p>

            {/* ── TOP PICKS ─────────────────────────── */}
            <section id="top-picks" className="mb-14">
              {topPickItems.length > 0 && (
                <TopPicksList items={topPickItems} />
              )}
            </section>

            {/* ── WHO IS THIS FOR ───────────────────── */}
            <section id="who-is-this-for" className="mb-14">
              <h2 className="heading-section mb-2">Who is this guide for?</h2>
              <p className="text-warmgray mb-6">
                The right espresso machine depends heavily on your situation.
                Here's how to quickly figure out where you fall.
              </p>
              <WhoIsThisFor
                productName="an espresso machine"
                groups={[
                  {
                    label: 'You want café-quality espresso at home',
                    description: 'Any machine in this guide will get you there. Focus on your budget and how much you want to learn.',
                    fit: 'good',
                  },
                  {
                    label: 'You prefer convenience over craft',
                    description: 'An all-in-one like the Barista Express gives you great espresso without manual dialling-in.',
                    fit: 'good',
                  },
                  {
                    label: "You're not willing to learn any technique",
                    description: 'Consider a super-automatic machine — they handle grinding, tamping, and extraction automatically.',
                    fit: 'bad',
                  },
                  {
                    label: 'You drink mostly drip or filter coffee',
                    description: 'A quality grinder + drip setup will serve you better than an espresso machine you use once a week.',
                    fit: 'bad',
                  },
                  {
                    label: 'You want to experiment with different beans',
                    description: 'A machine with a separate grinder gives you more flexibility — the Baratza Encore ESP pairs well with any machine here.',
                    fit: 'maybe',
                  },
                  {
                    label: "You're upgrading from a pod machine",
                    description: 'The Breville Barista Express is the most natural step up — familiar workflow, significant quality jump.',
                    fit: 'maybe',
                  },
                ]}
              />
            </section>

            {/* ── Mid-content CTA ────────────────────── */}
            {primaryLink && topPick && (
              <div className="my-10 p-5 rounded-2xl bg-espresso/5 border border-espresso/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-widest text-gold-600 mb-1">
                    Our recommendation
                  </p>
                  <p className="font-heading font-semibold text-charcoal">
                    {topPick.brand} {topPick.name}
                  </p>
                  <p className="text-sm text-warmgray mt-0.5">
                    {topPick.tagline}
                  </p>
                </div>
                <AffiliateCTA
                  link={primaryLink}
                  productId={topPick.id}
                  type="check-price"
                  variant="primary"
                  position="guide-mid-cta"
                  className="flex-shrink-0"
                />
              </div>
            )}

            {/* ── COMPARISON TABLE ───────────────────── */}
            <section id="comparison" className="mb-14">
              <h2 className="heading-section mb-2">Full comparison</h2>
              <p className="text-warmgray mb-6">
                All key specs side by side. Click any "Check Price" button to see the current price.
              </p>
              <ComparisonTable
                products={compareProds.slice(0, 4)}
                highlightBest={topPick?.id}
                caption="Prices may vary. Last verified December 2024."
              />
            </section>

            {/* ── PRODUCT DETAILS ────────────────────── */}
            <section id="product-details" className="mb-14">
              <h2 className="heading-section mb-8">Product breakdowns</h2>
              <div className="space-y-10">
                {topPickItems.map(({ product, rank, badge, summary }) => {
                  const link = product.affiliateLinks.find(l => l.isPrimary && l.isActive)
                  return (
                    <div key={product.id} className="pb-10 border-b border-cream-200 last:border-0">
                      {/* Product header */}
                      <div className="flex items-start gap-4 mb-5">
                        <span className="text-3xl font-heading font-bold text-cream-300 w-8 flex-shrink-0">
                          {rank}
                        </span>
                        <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-cream-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-medium uppercase tracking-widest text-gold-500">{badge}</p>
                          <h3 className="font-heading font-semibold text-2xl text-charcoal mb-1">
                            {product.brand} {product.name}
                          </h3>
                          <p className="text-warmgray text-sm">{summary}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-heading font-bold text-2xl text-espresso">{product.price}</p>
                          {link && (
                            <AffiliateCTA
                              link={link}
                              productId={product.id}
                              type="check-price"
                              variant="table"
                              position={`product-detail-${rank}`}
                              showPrice={false}
                              className="mt-1"
                            />
                          )}
                        </div>
                      </div>

                      {/* Specs grid */}
                      {product.specs.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5 p-4 bg-cream-100 rounded-xl">
                          {product.specs.map(spec => (
                            <div key={spec.label}>
                              <p className="text-[10px] uppercase tracking-wider text-warmgray/60 font-medium">
                                {spec.label}
                              </p>
                              <p className="text-sm font-medium text-charcoal mt-0.5">{spec.value}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pros / cons */}
                      <ProsCons pros={product.pros} cons={product.cons} layout="side-by-side" />

                      {/* Product CTA */}
                      {link && (
                        <div className="mt-5">
                          <AffiliateCTAGroup
                            links={product.affiliateLinks.filter(l => l.isActive)}
                            productId={product.id}
                            position={`product-breakdown-${rank}`}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* ── BUYER'S GUIDE ──────────────────────── */}
            <section id="buying-guide" className="mb-14">
              <h2 className="heading-section mb-6">What to look for</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Boiler type',
                    body: 'Single boiler machines share one chamber for brewing and steaming — you wait between each. Thermoblock heats water on demand (faster heat-up, less consistent). Dual boiler runs both simultaneously, giving you café workflow at home. For most home baristas, a quality thermoblock is fine.',
                  },
                  {
                    title: 'Grinder quality',
                    body: 'An all-in-one machine\'s built-in grinder is almost always a compromise. If you\'re serious about espresso, a dedicated burr grinder paired with a simpler machine will outperform a mid-range all-in-one. The Baratza Encore ESP is the entry point we recommend.',
                  },
                  {
                    title: 'Pressure',
                    body: 'You want 9 bar of brew pressure. Marketing materials often cite 15–19 bar pump pressure — that\'s the pump\'s maximum, not the actual brew pressure. Quality machines regulate down to 9 bar where extraction happens.',
                  },
                  {
                    title: 'Steam wand',
                    body: 'Manual steam wands give you the most control for latte art and microfoam texture — essential if you want proper flat whites or cappuccinos. Automatic frothers are easier but produce less refined results.',
                  },
                ].map(section => (
                  <div key={section.title} className="flex gap-4">
                    <div className="w-1 flex-shrink-0 bg-gold-300 rounded-full mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-charcoal mb-1">
                        {section.title}
                      </h3>
                      <p className="text-warmgray leading-relaxed text-[15px]">{section.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ ────────────────────────────────── */}
            <section id="faq" className="mb-14">
              <h2 className="heading-section mb-6">Frequently asked questions</h2>
              <FAQ items={guide.faq} />
            </section>

            {/* ── FINAL VERDICT / CTA ────────────────── */}
            <section id="verdict" className="mb-10">
              <h2 className="heading-section mb-6">Final recommendation</h2>
              {topPick && (
                <VerdictBox
                  heading="Bottom Line"
                  verdict={`For most home baristas, the ${topPick.brand} ${topPick.name} is the best starting point. It hits the right balance of capability, price, and ease of use. If budget is your primary concern, the combination of a standalone machine and the Baratza Encore ESP grinder will beat any all-in-one under $500.`}
                  pros={topPick.pros}
                  cons={topPick.cons}
                  primaryLink={topPick.affiliateLinks.find(l => l.isPrimary && l.isActive)}
                  productId={topPick.id}
                  price={topPick.price}
                  variant="guide"
                />
              )}
            </section>

            {/* Pinterest share */}
            {guide.pinImage && (
              <div className="flex items-center gap-3 py-4 border-t border-cream-200">
                <p className="text-sm text-warmgray flex-1">
                  Found this guide useful? Save it for later.
                </p>
                <PinShare
                  imageUrl={guide.pinImage}
                  description={guide.title}
                />
              </div>
            )}

            {/* ── RELATED CONTENT ─────────────────────── */}
            <RelatedContent
              heading="Keep researching"
              links={[
                {
                  type: 'guide',
                  title: 'Best Burr Coffee Grinders',
                  href: '/buying-guide/best-burr-coffee-grinders',
                  description: 'Your grinder matters more than your machine.',
                },
                {
                  type: 'guide',
                  title: 'Best Milk Frothers',
                  href: '/buying-guide/best-milk-frothers',
                  description: 'From steam wands to electric frothers, ranked.',
                },
                {
                  type: 'setup',
                  title: 'Minimalist Espresso Setup',
                  href: '/setups/minimalist-espresso-setup',
                  description: 'See how the gear comes together in a real setup.',
                },
                {
                  type: 'blog',
                  title: 'How to Dial In Espresso',
                  href: '/blog/how-to-dial-in-espresso',
                  description: 'Once you have the machine — use it properly.',
                },
              ]}
            />
          </div>

          {/* ── Sticky sidebar ── */}
          <aside className="lg:col-span-4 xl:col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* TOC */}
              <div className="card p-5">
                <TableOfContents items={tocItems} />
              </div>

              {/* Top pick sticky widget */}
              {topPick && primaryLink && (
                <div className="card p-5 border-gold-200/60">
                  <p className="text-label mb-3">Our #1 Pick</p>
                  <div className="flex gap-3 mb-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={topPick.image} alt={topPick.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gold-500 font-medium">{topPick.brand}</p>
                      <p className="font-heading font-semibold text-sm text-charcoal leading-snug">{topPick.name}</p>
                      <p className="font-bold text-espresso mt-0.5">{topPick.price}</p>
                    </div>
                  </div>
                  <AffiliateCTA
                    link={primaryLink}
                    productId={topPick.id}
                    type="check-price"
                    variant="primary"
                    position="sidebar-top-pick"
                    fullWidth
                  />
                  <Link
                    href={`/review/${topPick.slug}`}
                    className="flex justify-center mt-2 text-xs text-warmgray/60 hover:text-warmgray transition-colors"
                  >
                    Read full review →
                  </Link>
                </div>
              )}

              {/* All picks quick list */}
              {products.length > 1 && (
                <div className="card p-5">
                  <p className="text-label mb-3">All top picks</p>
                  <div className="space-y-0">
                    {topPickItems.map(({ product, rank, badge }) => {
                      const lnk = product.affiliateLinks.find(l => l.isPrimary && l.isActive)
                      return (
                        <div key={product.id} className="flex items-center gap-2.5 py-2.5 border-b border-cream-100 last:border-0">
                          <span className="text-base font-heading font-bold text-cream-300 w-5 text-center flex-shrink-0">
                            {rank}
                          </span>
                          <div className="w-8 h-8 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-charcoal leading-snug truncate">{product.name}</p>
                            <p className="text-[10px] text-warmgray">{badge}</p>
                          </div>
                          {lnk && (
                            <AffiliateCTA
                              link={lnk}
                              productId={product.id}
                              type="check-price"
                              variant="table"
                              position="sidebar-picks-list"
                              showPrice={false}
                              className="text-[10px] flex-shrink-0"
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
