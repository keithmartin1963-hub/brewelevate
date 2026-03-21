import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'
import { Breadcrumb }      from '@/components/ui/Breadcrumb'
import { Badge }           from '@/components/ui/Badge'
import { RelatedContent }  from '@/components/ui/RelatedContent'
import { ProductCallout }  from '@/components/affiliate/ProductCallout'
import { PinShare }        from '@/components/affiliate/PinButton'
import { formatDateShort } from '@/lib/utils'
import type { BlogPost, Product, BuyingGuide } from '@/lib/types'

interface BlogPostTemplateProps {
  post: BlogPost
  mentionedProducts: Product[]
  relatedGuides: BuyingGuide[]
}

export function BlogPostTemplate({ post, mentionedProducts, relatedGuides }: BlogPostTemplateProps) {

  return (
    <article>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="bg-cream border-b border-cream-300">
        <div className="container-brew pt-8 pb-0">
          <Breadcrumb
            items={[
              { label: 'Home',  href: '/'     },
              { label: 'Blog',  href: '/blog' },
              { label: post.title },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl mb-8">
            <Badge variant="gold" className="mb-4">
              {post.category.replace(/-/g, ' ')}
            </Badge>
            <h1
              className="font-heading font-semibold text-charcoal leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-xl text-warmgray leading-relaxed mb-6">{post.subtitle}</p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-warmgray pb-6 border-b border-cream-200">
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {post.author.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDateShort(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readingTimeMinutes} min read
              </span>
            </div>
          </div>
        </div>

        {/* Hero image — editorial 16:9 */}
        <div className="aspect-[16/7] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="container-brew py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Main content — narrow for readability */}
          <div className="lg:col-span-7 xl:col-span-8">

            {/* Excerpt as lead */}
            <p className="text-xl text-charcoal font-medium leading-relaxed mb-8 pb-8 border-b border-cream-200">
              {post.excerpt}
            </p>

            {/* ── Simulated rich content body ──────────────────────── */}
            {/* In production this would be MDX/Sanity/CMS-rendered content */}
            <div className="prose-brew space-y-6 text-[15px] leading-[1.85] text-warmgray">

              <p>
                Whether you've been pulling shots for years or just pulled your first,
                the principles behind great espresso are consistent. The challenge isn't
                the theory — it's translating theory into practice with your specific gear,
                your specific beans, and your specific water.
              </p>

              <h2 className="heading-section text-charcoal mt-10 mb-4" id="what-is-dialling-in">
                What does "dialling in" actually mean?
              </h2>

              <p>
                Dialling in is the process of adjusting your grind size, dose, and yield
                until you consistently produce a shot that tastes balanced — not sour
                (under-extracted) or bitter (over-extracted). Every change in bean,
                roast level, or humidity requires a fresh dial-in.
              </p>

              <p>
                The three variables you're always balancing are:
              </p>

              {/* Visual callout block */}
              <div className="grid grid-cols-3 gap-3 my-6 not-prose">
                {[
                  { label: 'Dose', value: 'g of coffee in', detail: 'Typically 17–21g for a double shot' },
                  { label: 'Yield', value: 'g of espresso out', detail: 'Usually 1:2 ratio (36–42g out)' },
                  { label: 'Time', value: 'seconds of extraction', detail: 'Aiming for 25–35 seconds' },
                ].map(v => (
                  <div key={v.label} className="rounded-xl bg-cream-100 border border-cream-200 p-4 text-center">
                    <p className="text-xs font-medium uppercase tracking-widest text-gold-500 mb-1">{v.label}</p>
                    <p className="font-heading font-semibold text-charcoal text-sm leading-tight">{v.value}</p>
                    <p className="text-[11px] text-warmgray mt-1">{v.detail}</p>
                  </div>
                ))}
              </div>

              <h2 className="heading-section text-charcoal mt-10 mb-4" id="step-by-step">
                Step-by-step framework
              </h2>

              <p>
                Start with the manufacturer's recommended grind setting and work outward
                from there. Don't chase flavour descriptors on your first attempt —
                chase the numbers first, then refine by taste.
              </p>

              {/* Numbered steps */}
              <div className="space-y-4 not-prose">
                {[
                  { n: 1, title: 'Set your dose',        body: 'Start at 18g for a standard double. Weigh every time — eyeballing defeats the purpose of this process entirely.' },
                  { n: 2, title: 'Set your target yield', body: 'Aim for 36g out (1:2 ratio). Use a scale under your cup — every shot, not just when practising.' },
                  { n: 3, title: 'Run your first shot',   body: 'If it pulls in under 20 seconds, grind finer. Over 35 seconds, grind coarser. Adjust in small increments.' },
                  { n: 4, title: 'Taste and refine',     body: 'Once time is in range, taste it. Sour = extract longer (finer grind). Bitter = extract shorter (coarser grind).' },
                ].map(step => (
                  <div key={step.n} className="flex gap-4 p-4 rounded-xl bg-cream-100 border border-cream-200">
                    <span className="w-7 h-7 rounded-full bg-espresso text-cream-100 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      {step.n}
                    </span>
                    <div>
                      <p className="font-semibold text-charcoal mb-0.5">{step.title}</p>
                      <p className="text-sm text-warmgray leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Natural product callout — editorial placement */}
              {mentionedProducts[0] && (
                <div className="not-prose my-8">
                  <ProductCallout
                    product={mentionedProducts[0]}
                    context="A good scale makes dialling in dramatically easier. If you don't have one, this is the one we use."
                    position="blog-post-callout-1"
                  />
                </div>
              )}

              <h2 className="heading-section text-charcoal mt-10 mb-4" id="common-mistakes">
                The three most common mistakes
              </h2>

              <p>
                Most espresso problems come back to one of three things: grind inconsistency,
                tamping unevenness, or trying to adjust too many variables at once.
              </p>

              <ul className="space-y-3 list-none not-prose">
                {[
                  { issue: 'Adjusting grind and dose at the same time', fix: 'Change one variable per shot. If you change both, you can\'t know which one fixed the problem.' },
                  { issue: 'Inconsistent tamping pressure', fix: 'Tamp until resistance is felt, then apply level pressure. Angle matters more than force.' },
                  { issue: 'Not accounting for bean freshness', fix: 'Freshly roasted beans off-gas CO₂. Grind finer as beans age (usually 2–4 weeks post-roast).' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 p-4 rounded-xl border border-cream-300 bg-white">
                    <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✗</span>
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{item.issue}</p>
                      <p className="text-sm text-warmgray mt-1">
                        <span className="font-medium text-green-700">Fix: </span>
                        {item.fix}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Second product callout */}
              {mentionedProducts[1] && (
                <div className="not-prose my-8">
                  <ProductCallout
                    product={mentionedProducts[1]}
                    context="If grind consistency is your bottleneck, this grinder removes it entirely."
                    position="blog-post-callout-2"
                    compact
                  />
                </div>
              )}

              <h2 className="heading-section text-charcoal mt-10 mb-4" id="when-youre-there">
                How do you know when you're there?
              </h2>

              <p>
                A dialled-in shot is recognisable: it tastes balanced — sweetness, some
                acidity, and no harsh bitterness. It pulls in the right time window.
                The crema is thick, reddish-brown, and persists for 30+ seconds.
                And you can repeat it from the next morning's first shot.
              </p>

              <p>
                That last point matters most. Repeatability is the goal, not a perfect
                single shot. When your process is tight enough to pull the same shot
                three days in a row, you've dialled in.
              </p>
            </div>
            {/* End content body */}

            {/* Related buying guides — editorial CTA */}
            {relatedGuides.length > 0 && (
              <div className="mt-10 p-5 rounded-2xl bg-cream-200 border border-cream-300">
                <p className="text-xs font-medium uppercase tracking-widest text-warmgray/60 mb-3">
                  Relevant buying guides
                </p>
                <div className="space-y-2">
                  {relatedGuides.map(guide => (
                    <Link
                      key={guide.id}
                      href={`/buying-guide/${guide.slug}`}
                      className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl hover:border-gold-200 border border-transparent transition-colors group"
                    >
                      <span className="text-sm font-medium text-charcoal group-hover:text-espresso transition-colors">
                        {guide.title}
                      </span>
                      <span className="text-xs text-gold-500 flex-shrink-0">Read guide →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Pinterest share */}
            {post.pinImage && (
              <div className="flex items-center gap-3 py-5 mt-8 border-t border-cream-200">
                <p className="text-sm text-warmgray flex-1">
                  Useful article? Save it for your next brew session.
                </p>
                <PinShare imageUrl={post.pinImage} description={post.title} />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-cream-200">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>

            <RelatedContent
              heading="Read next"
              links={[
                { type: 'blog',  title: 'Single Origin vs Blends',              href: '/blog/single-origin-vs-blends',               description: 'Does it matter which beans you use?' },
                { type: 'blog',  title: 'Best Coffee Accessories Under $50',    href: '/blog/best-coffee-accessories-under-50',       description: 'Small upgrades, big difference.' },
                { type: 'guide', title: 'Best Espresso Machines Under $1,000',  href: '/buying-guide/best-espresso-machines-under-1000', description: 'Not sure if your machine is the problem?' },
                { type: 'guide', title: 'Best Burr Coffee Grinders',            href: '/buying-guide/best-burr-coffee-grinders',      description: 'The grinder is usually the bottleneck.' },
              ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="sticky top-24 space-y-5">

              {/* In this article */}
              <div className="card p-5">
                <p className="text-label mb-3">In this article</p>
                <nav className="space-y-1">
                  {[
                    { id: 'what-is-dialling-in', label: 'What is dialling in?' },
                    { id: 'step-by-step',         label: 'Step-by-step framework' },
                    { id: 'common-mistakes',       label: 'Common mistakes' },
                    { id: 'when-youre-there',      label: "How to know you're there" },
                  ].map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-warmgray hover:text-charcoal px-3 py-1.5 rounded-lg hover:bg-cream-100 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Gear mentioned */}
              {mentionedProducts.length > 0 && (
                <div className="card p-5">
                  <p className="text-label mb-3">Gear mentioned</p>
                  <div className="space-y-3">
                    {mentionedProducts.map(product => {
                      const link = product.affiliateLinks.find(l => l.isPrimary && l.isActive)
                      return (
                        <div key={product.id} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link href={`/review/${product.slug}`} className="text-xs font-semibold text-charcoal hover:text-espresso transition-colors line-clamp-1">
                              {product.name}
                            </Link>
                            <p className="text-xs text-espresso font-bold">{product.price}</p>
                          </div>
                          {link && (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow sponsored"
                              className="text-[10px] font-medium text-gold-600 hover:text-espresso border border-gold-200 bg-gold-50 px-2 py-1 rounded-lg transition-colors flex-shrink-0"
                            >
                              Buy
                            </a>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Pinterest card */}
              {post.pinImage && (
                <div className="card overflow-hidden">
                  <div className="aspect-[2/3] bg-cream-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.pinImage} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-warmgray mb-2">Save to read later</p>
                    <PinShare imageUrl={post.pinImage} description={post.title} />
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
