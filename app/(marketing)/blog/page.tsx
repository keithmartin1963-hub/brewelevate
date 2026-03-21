import type { Metadata } from 'next'
import { Navbar, NavSpacer }      from '@/components/layout/Navbar'
import { Footer }                 from '@/components/layout/Footer'
import { Section, SectionHeader } from '@/components/ui/Section'
import { BlogCard }               from '@/components/sections/ContentCards'
import { MultiJsonLd }            from '@/components/seo/JsonLd'
import { buildHubMetadata }       from '@/lib/seo/metadata'
import { buildBreadcrumbSchema }  from '@/lib/seo/schemas'
import { blogPosts }              from '@/lib/data/content'

export const metadata: Metadata = buildHubMetadata({
  title:       'Coffee Blog — Guides, Technique & Education | BrewElevate',
  description: 'Practical espresso technique guides, coffee education, and honest gear tips. No fluff — just useful articles that make your home coffee better.',
  path:        '/blog',
  keywords:    ['coffee guides', 'espresso technique', 'how to make espresso', 'coffee education', 'home barista tips'],
})

const categories = [
  { label: 'How-To',     value: 'how-to'     },
  { label: 'Technique',  value: 'technique'  },
  { label: 'Gear Tips',  value: 'gear-tips'  },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Origins',    value: 'origins'    },
]

export default function BlogPage() {
  const published = blogPosts.filter(p => p.status === 'published')
  const featured  = published.filter(p => p.isFeatured)
  const rest      = published.filter(p => !p.isFeatured)

  const schemas = [
    buildBreadcrumbSchema([{ name: 'Home', href: '/' }, { name: 'Blog' }]),
  ]

  return (
    <>
      <MultiJsonLd schemas={schemas} />
      <Navbar />
      <NavSpacer />
      <main>
        {/* Header */}
        <div className="bg-cream border-b border-cream-300 py-12">
          <div className="container-brew">
            <p className="text-label mb-3">From the Blog</p>
            <h1 className="heading-display text-charcoal max-w-2xl mb-4">
              Learn to brew better.
            </h1>
            <p className="text-lg text-warmgray max-w-xl leading-relaxed">
              Practical guides and technique articles. No gear ads dressed up as editorial —
              just useful content that makes your home coffee better.
            </p>
          </div>
        </div>

        {/* Featured posts */}
        {featured.length > 0 && (
          <Section background="white">
            <SectionHeader label="Featured" heading="Start here" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((post, i) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  layout={i === 0 ? 'featured' : 'vertical'}
                  className={i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                />
              ))}
            </div>
          </Section>
        )}

        {/* All posts */}
        {rest.length > 0 && (
          <Section background="dark-cream">
            <SectionHeader label="All Articles" heading="Every post" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(post => (
                <BlogCard key={post.id} post={post} layout="vertical" />
              ))}
            </div>
          </Section>
        )}
      </main>
      <Footer />
    </>
  )
}
