import Link from 'next/link'
import { Calendar, Pin } from 'lucide-react'
import { Breadcrumb }       from '@/components/ui/Breadcrumb'
import { Badge }            from '@/components/ui/Badge'
import { RelatedContent }   from '@/components/ui/RelatedContent'
import { ProductCallout }   from '@/components/affiliate/ProductCallout'
import { AffiliateCTA }     from '@/components/affiliate/AffiliateCTA'
import { PinShare, PinButton } from '@/components/affiliate/PinButton'
import { budgetTierLabel, formatDateShort } from '@/lib/utils'
import type { SetupGuide, Product } from '@/lib/types'

interface SetupGuideTemplateProps {
  setup: SetupGuide
  products: Product[]  // all products referenced in this setup
}

export function SetupGuideTemplate({ setup, products }: SetupGuideTemplateProps) {
  const pinImg = setup.pinImages?.[0] ?? setup.heroImage

  function getProduct(id: string) {
    return products.find(p => p.id === id)
  }

  return (
    <article>
      {/* ── Hero — full-bleed visual ─────────────────────────────────── */}
      <header className="relative">
        {/* Pinterest-format hero image */}
        <div className="relative max-h-[70vh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={setup.heroImage}
            alt={setup.title}
            className="w-full h-full object-cover"
            style={{ maxHeight: '70vh' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />

          {/* Pinterest save — visible on load */}
          <div className="absolute top-5 right-5">
            <PinShare
              imageUrl={pinImg}
              description={`${setup.title} — ${setup.excerpt}`}
            />
          </div>

          {/* Style badge */}
          <div className="absolute top-5 left-5">
            <Badge variant="espresso">{setup.style}</Badge>
          </div>

          {/* Hero text overlaid */}
          <div className="absolute bottom-0 inset-x-0 p-8 md:p-12">
            <div className="container-brew">
              <Breadcrumb
                items={[
                  { label: 'Home',   href: '/' },
                  { label: 'Setups', href: '/setups' },
                  { label: setup.title },
                ]}
                className="mb-4 [&_*]:text-white/60 [&_a]:hover:text-white"
              />
              <h1
                className="font-heading font-semibold text-white leading-tight mb-3 max-w-2xl"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                {setup.title}
              </h1>
              {setup.subtitle && (
                <p className="text-white/80 text-lg max-w-xl leading-relaxed">{setup.subtitle}</p>
              )}
              {/* Save count */}
              {setup.pinCount && (
                <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
                  <Pin size={14} />
                  {setup.pinCount.toLocaleString()} saves on Pinterest
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="container-brew py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Main */}
          <div className="lg:col-span-8">

            {/* Meta + intro */}
            <div className="flex items-center gap-4 text-xs text-warmgray mb-6 pb-6 border-b border-cream-200">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {formatDateShort(setup.publishedAt)}
              </span>
              <span>{setup.readingTimeMinutes} min read</span>
              <span>By {setup.author.name}</span>
            </div>

            <p className="text-lg text-warmgray leading-relaxed mb-10">{setup.excerpt}</p>

            {/* Gallery — secondary images */}
            {setup.galleryImages.length > 1 && (
              <div className="grid grid-cols-2 gap-3 mb-10">
                {setup.galleryImages.slice(1, 3).map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3] relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${setup.title} detail ${i + 2}`} className="w-full h-full object-cover" loading="lazy" />
                    <PinButton imageUrl={img} description={setup.title} />
                  </div>
                ))}
              </div>
            )}

            {/* Budget tiers */}
            <section id="budget-tiers" className="mb-12">
              <h2 className="heading-section mb-2">Build options</h2>
              <p className="text-warmgray mb-6">
                Every setup can be built at multiple price points. Start where you are
                — you can always upgrade one piece at a time.
              </p>

              <div className="space-y-4">
                {setup.budgetTiers.map((tier, index) => (
                  <div
                    key={tier.tier}
                    className="rounded-2xl border border-cream-300 bg-white overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-5 py-4 bg-cream-100/60 border-b border-cream-200">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-espresso text-cream-100 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-heading font-semibold text-charcoal capitalize">
                            {tier.tier} build
                          </p>
                          {tier.description && (
                            <p className="text-xs text-warmgray">{tier.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-warmgray uppercase tracking-wider">Estimated</p>
                        <p className="font-heading font-bold text-lg text-espresso">{tier.totalEstimate}</p>
                      </div>
                    </div>

                    {/* Tier products */}
                    {tier.items.length > 0 ? (
                      <div className="divide-y divide-cream-100">
                        {tier.items.map(item => {
                          const product = getProduct(item.productId)
                          if (!product) return null
                          const link = product.affiliateLinks.find(l => l.isPrimary && l.isActive)
                          return (
                            <div key={item.productId} className="flex items-center gap-3 px-5 py-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gold-500 font-medium uppercase tracking-wider">{item.role}</p>
                                <Link href={`/review/${product.slug}`} className="text-sm font-semibold text-charcoal hover:text-espresso transition-colors">
                                  {product.brand} {product.name}
                                </Link>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-sm font-bold text-espresso">{product.price}</p>
                                {item.isEssential && (
                                  <p className="text-[10px] text-warmgray">Essential</p>
                                )}
                              </div>
                              {link && (
                                <AffiliateCTA
                                  link={link}
                                  productId={product.id}
                                  type="check-price"
                                  variant="table"
                                  position={`setup-tier-${tier.tier}`}
                                  showPrice={false}
                                  className="flex-shrink-0 text-xs ml-2"
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      /* Show sample products if tier.items is empty (demo data) */
                      <div className="px-5 py-4">
                        <p className="text-sm text-warmgray italic">
                          Full gear list available in the complete setup guide.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Featured product callouts — natural, editorial placement */}
            {products.length > 0 && (
              <section id="gear-breakdown" className="mb-12">
                <h2 className="heading-section mb-6">The gear breakdown</h2>
                <p className="text-warmgray leading-relaxed mb-6">
                  Every piece in this setup was chosen for how it functions, how it looks,
                  and how it works with the rest of the station.
                </p>

                {products.slice(0, 3).map((product, i) => (
                  <ProductCallout
                    key={product.id}
                    product={product}
                    context={
                      i === 0 ? 'The anchor piece — everything else is built around this.' :
                      i === 1 ? 'The most impactful upgrade you can make after the machine.' :
                      'The detail that separates a good setup from a great one.'
                    }
                    position={`setup-gear-callout-${i + 1}`}
                  />
                ))}
              </section>
            )}

            {/* Pinterest gallery prompt */}
            <div className="my-10 p-6 rounded-2xl bg-cream-200 border border-cream-300 text-center">
              <p className="font-heading font-semibold text-charcoal mb-1">
                Save this setup for later
              </p>
              <p className="text-sm text-warmgray mb-4">
                Pin the image below to revisit when you're ready to build.
              </p>
              <div className="flex justify-center">
                <PinShare
                  imageUrl={pinImg}
                  description={`${setup.title} — ${setup.excerpt} See the full gear list on BrewElevate.`}
                />
              </div>
            </div>

            <RelatedContent
              heading="More to explore"
              links={[
                { type: 'setup',  title: 'Luxury Coffee Station',       href: '/setups/luxury-coffee-station',       description: 'The next level up.' },
                { type: 'setup',  title: 'Small Space Coffee Setup',    href: '/setups/small-space-setup',           description: 'Great coffee in tight quarters.' },
                { type: 'guide',  title: 'Best Espresso Machines',       href: '/buying-guide/best-espresso-machines-under-1000', description: 'Find the right machine for your setup.' },
                { type: 'guide',  title: 'Best Burr Coffee Grinders',   href: '/buying-guide/best-burr-coffee-grinders', description: 'The grinder is the most important choice.' },
              ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {/* Pinterest vertical image */}
              <div className="rounded-2xl overflow-hidden relative group">
                <div className="aspect-[2/3] bg-cream-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pinImg} alt={setup.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <PinButton imageUrl={pinImg} description={setup.title} />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-espresso/50 to-transparent">
                  <p className="text-white font-heading font-semibold text-sm">{setup.title}</p>
                </div>
              </div>

              {/* Budget summary */}
              <div className="card p-5">
                <p className="text-label mb-3">Build budgets</p>
                <div className="space-y-3">
                  {setup.budgetTiers.map(tier => (
                    <div key={tier.tier} className="flex items-center justify-between">
                      <span className="text-sm capitalize text-charcoal font-medium">{tier.tier}</span>
                      <span className="text-sm font-bold text-espresso">{tier.totalEstimate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="card p-5">
                <p className="text-label mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {setup.tags.map(tag => (
                    <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
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
