import Link from 'next/link'
import { Calendar, Clock, CheckCircle } from 'lucide-react'
import { Breadcrumb }        from '@/components/ui/Breadcrumb'
import { TableOfContents }   from '@/components/ui/TableOfContents'
import { StarRating }        from '@/components/ui/StarRating'
import { VerdictBox }        from '@/components/ui/VerdictBox'
import { WhoIsThisFor }      from '@/components/ui/WhoIsThisFor'
import { ProsCons }          from '@/components/ui/ProsCons'
import { RatingBreakdown }   from '@/components/ui/RatingBreakdown'
import { RelatedContent }    from '@/components/ui/RelatedContent'
import { ComparisonTable }   from '@/components/affiliate/ComparisonTable'
import { AffiliateCTA, AffiliateCTAGroup } from '@/components/affiliate/AffiliateCTA'
import { PinShare }          from '@/components/affiliate/PinButton'
import { formatDateShort }   from '@/lib/utils'
import type { Review, Product } from '@/lib/types'

interface ReviewTemplateProps {
  review: Review
  product: Product
  comparedProducts?: Product[]
}

const tocItems = [
  { id: 'verdict',        label: 'Quick Verdict'        },
  { id: 'who-for',        label: 'Who Is This For?'     },
  { id: 'performance',    label: 'Performance'           },
  { id: 'specs',          label: 'Specs & Features'      },
  { id: 'pros-cons',      label: 'Pros & Cons'          },
  { id: 'vs',             label: 'How It Compares'       },
  { id: 'bottom-line',    label: 'Bottom Line'           },
]

export function ReviewTemplate({ review, product, comparedProducts = [] }: ReviewTemplateProps) {
  const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)
  const allLinks    = product.affiliateLinks.filter(l => l.isActive)

  return (
    <article>
      {/* ── Hero header ─────────────────────────────────────────────── */}
      <header className="bg-cream border-b border-cream-300">
        <div className="container-brew pt-8 pb-0">
          <Breadcrumb
            items={[
              { label: 'Home',    href: '/'       },
              { label: 'Reviews', href: '/review' },
              { label: product.name },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-0">
            <div className="lg:col-span-8">
              {/* Verified badge */}
              {review.isVerified && (
                <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1 w-fit mb-4">
                  <CheckCircle size={12} />
                  Hands-on tested
                </div>
              )}

              <p className="text-label mb-3">{product.category.replace(/-/g, ' ')}</p>
              <h1 className="font-heading font-semibold text-charcoal leading-tight mb-3"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {review.title}
              </h1>

              {review.subtitle && (
                <p className="text-lg text-warmgray leading-relaxed mb-5">{review.subtitle}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-3xl text-espresso">{review.overallRating.toFixed(1)}</span>
                  <StarRating rating={review.overallRating} size="md" />
                </div>
                <div className="w-px h-6 bg-cream-300" />
                <span className="flex items-center gap-1.5 text-xs text-warmgray">
                  <Calendar size={12} />{formatDateShort(review.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-warmgray">
                  <Clock size={12} />{review.readingTimeMinutes} min read
                </span>
              </div>

              {/* Above-fold CTA */}
              {primaryLink && (
                <div className="flex flex-wrap gap-3">
                  <AffiliateCTA
                    link={primaryLink}
                    productId={product.id}
                    type="check-price"
                    variant="primary"
                    position="review-hero"
                  />
                  <AffiliateCTA
                    link={primaryLink}
                    productId={product.id}
                    type="view-brand"
                    variant="secondary"
                    position="review-hero-secondary"
                    showPrice={false}
                  />
                </div>
              )}
            </div>

            {/* Hero product image */}
            <div className="lg:col-span-4">
              <div className="aspect-square bg-cream-200 rounded-t-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="container-brew py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Main */}
          <div className="lg:col-span-8">

            {/* Quick verdict */}
            <section id="verdict" className="mb-12">
              <VerdictBox
                heading="Quick Verdict"
                verdict={review.verdictSummary}
                rating={review.overallRating}
                pros={review.pros}
                cons={review.cons}
                primaryLink={primaryLink}
                productId={product.id}
                price={product.price}
                variant="review"
              />
            </section>

            {/* Who is this for */}
            <section id="who-for" className="mb-12">
              <h2 className="heading-section mb-2">Who is the {product.name} for?</h2>
              <p className="text-warmgray mb-6">
                Before committing to any piece of gear, it's worth being honest about
                whether it matches your actual workflow.
              </p>
              <WhoIsThisFor
                productName={product.name}
                groups={[
                  {
                    label: 'Upgrading from a basic machine',
                    description: `The ${product.name} is a meaningful step up from entry-level machines — you'll notice the difference immediately.`,
                    fit: 'good',
                  },
                  {
                    label: 'You want one cohesive workflow',
                    description: 'Everything is designed to work together — grind, tamp, extract without switching between multiple appliances.',
                    fit: 'good',
                  },
                  {
                    label: 'You want professional barista-level control',
                    description: 'Consider a more advanced machine with PID temperature control and flow profiling.',
                    fit: 'bad',
                  },
                  {
                    label: 'You are a complete beginner',
                    description: 'The learning curve is real. Budget time for dialling in — it rewards patience.',
                    fit: 'maybe',
                  },
                ]}
              />
            </section>

            {/* Rating breakdown */}
            <section id="performance" className="mb-12">
              <h2 className="heading-section mb-6">Performance breakdown</h2>
              <RatingBreakdown
                overall={review.overallRating}
                breakdown={review.ratingBreakdown}
              />

              <div className="space-y-6 mt-6">
                {review.ratingBreakdown.map(item => (
                  <div key={item.category} className="flex gap-4">
                    <div className="w-1 flex-shrink-0 rounded-full bg-gold-300 mt-1" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-semibold text-lg text-charcoal">{item.category}</h3>
                        <span className="text-sm font-bold text-gold-500">{item.score}/5</span>
                      </div>
                      {item.description && (
                        <p className="text-warmgray leading-relaxed text-[15px]">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Specs */}
            <section id="specs" className="mb-12">
              <h2 className="heading-section mb-5">Specs & features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.specs.map(spec => (
                  <div key={spec.label} className="p-3 rounded-xl bg-cream-100 border border-cream-200">
                    <p className="text-[10px] uppercase tracking-wider text-warmgray/60 font-medium mb-0.5">
                      {spec.label}
                    </p>
                    <p className="text-sm font-semibold text-charcoal">{spec.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Mid-content CTA */}
            {primaryLink && (
              <div className="my-10 p-5 rounded-2xl bg-gold-50 border border-gold-200 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-heading font-semibold text-charcoal">{product.brand} {product.name}</p>
                  <p className="text-sm text-warmgray">{product.price} · {product.budgetTier} tier</p>
                </div>
                <AffiliateCTAGroup
                  links={allLinks}
                  productId={product.id}
                  position="review-mid-cta"
                  className="w-full sm:w-56"
                />
              </div>
            )}

            {/* Pros / cons */}
            <section id="pros-cons" className="mb-12">
              <h2 className="heading-section mb-5">Pros & cons</h2>
              <ProsCons pros={review.pros} cons={review.cons} />
            </section>

            {/* Comparison */}
            {comparedProducts.length > 0 && (
              <section id="vs" className="mb-12">
                <h2 className="heading-section mb-2">How it compares</h2>
                <p className="text-warmgray mb-6">
                  Wondering how the {product.name} stacks up against the alternatives?
                  Here's a quick side-by-side.
                </p>
                <ComparisonTable
                  products={[product, ...comparedProducts].slice(0, 3)}
                  highlightBest={product.id}
                />
              </section>
            )}

            {/* Bottom line */}
            <section id="bottom-line" className="mb-8">
              <h2 className="heading-section mb-5">Bottom line</h2>
              <VerdictBox
                heading="Our Verdict"
                verdict={review.verdictSummary}
                rating={review.overallRating}
                primaryLink={primaryLink}
                productId={product.id}
                price={product.price}
                variant="review"
              />
            </section>

            {/* Pinterest share */}
            {review.pinImage && (
              <div className="flex items-center gap-3 py-5 border-t border-cream-200">
                <p className="text-sm text-warmgray flex-1">
                  Save this review to reference when you're ready to buy.
                </p>
                <PinShare imageUrl={review.pinImage} description={review.title} />
              </div>
            )}

            <RelatedContent
              heading="Next steps"
              links={[
                {
                  type:  'guide',
                  title: 'Best Espresso Machines Under $1,000',
                  href:  '/buying-guide/best-espresso-machines-under-1000',
                  description: 'See how this machine ranks against all others.',
                },
                {
                  type:  'guide',
                  title: 'Best Burr Coffee Grinders',
                  href:  '/buying-guide/best-burr-coffee-grinders',
                  description: 'Pair it with the right grinder for best results.',
                },
                {
                  type:  'setup',
                  title: 'Minimalist Espresso Setup',
                  href:  '/setups/minimalist-espresso-setup',
                  description: 'See it in a complete home setup.',
                },
                {
                  type:  'blog',
                  title: 'How to Dial In Espresso',
                  href:  '/blog/how-to-dial-in-espresso',
                  description: 'Make the most of your new machine.',
                },
              ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {/* TOC */}
              <div className="card p-5">
                <TableOfContents items={tocItems} />
              </div>

              {/* Buy box */}
              {primaryLink && (
                <div className="card p-5 border-gold-200/60">
                  <div className="text-center mb-4">
                    <p className="text-[10px] uppercase tracking-widest text-gold-500 font-medium mb-1">{product.brand}</p>
                    <p className="font-heading font-bold text-xl text-charcoal">{product.name}</p>
                    <p className="font-heading font-bold text-3xl text-espresso mt-1">{product.price}</p>
                    <div className="flex justify-center mt-1.5">
                      <StarRating rating={product.rating} size="sm" showValue />
                    </div>
                  </div>
                  <AffiliateCTAGroup
                    links={allLinks}
                    productId={product.id}
                    position="review-sidebar-buy-box"
                  />
                </div>
              )}

              {/* Spec summary */}
              <div className="card p-5">
                <p className="text-label mb-3">Key specs</p>
                <div className="space-y-2">
                  {product.specs.slice(0, 5).map(spec => (
                    <div key={spec.label} className="flex items-center justify-between text-sm">
                      <span className="text-warmgray">{spec.label}</span>
                      <span className="font-medium text-charcoal text-right max-w-[55%]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
