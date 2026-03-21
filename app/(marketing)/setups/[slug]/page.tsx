import { notFound }           from 'next/navigation'
import { Navbar, NavSpacer }  from '@/components/layout/Navbar'
import { Footer }             from '@/components/layout/Footer'
import { SetupGuideTemplate } from '@/components/templates/SetupGuideTemplate'
import { MultiJsonLd }        from '@/components/seo/JsonLd'
import { buildSetupMetadata } from '@/lib/seo/metadata'
import { buildArticleSchema, buildBreadcrumbSchema, buildItemListSchema } from '@/lib/seo/schemas'
import { getSetupBySlug, getPublishedSetups } from '@/lib/data/content'
import { products } from '@/lib/data/products'

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  return getPublishedSetups().map(s => ({ slug: s.slug }))
}
export async function generateMetadata({ params }: PageProps) {
  const setup = getSetupBySlug(params.slug)
  if (!setup) return {}
  return buildSetupMetadata(setup)
}

export default function SetupPage({ params }: PageProps) {
  const setup = getSetupBySlug(params.slug)
  if (!setup) notFound()

  const setupProducts = products.filter(p => p.isFeatured).slice(0, 3)

  const schemas = [
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Setup Ideas', href: '/setups' },
      { name: setup.title },
    ]),
    buildArticleSchema({
      title: setup.seo.title, description: setup.seo.description,
      url: `/setups/${setup.slug}`, image: setup.heroImage,
      authorName: setup.author.name,
      datePublished: setup.publishedAt, dateModified: setup.updatedAt,
      type: 'Article',
    }),
    ...(setupProducts.length > 0 ? [buildItemListSchema(
      setupProducts.map((p, i) => ({
        position: i + 1,
        name: `${p.brand} ${p.name}`,
        url: `/review/${p.slug}`,
        image: p.image,
        description: p.tagline,
      }))
    )] : []),
  ]

  return (
    <>
      <MultiJsonLd schemas={schemas} />
      <Navbar /><NavSpacer />
      <main>
        <SetupGuideTemplate setup={setup} products={setupProducts} />
      </main>
      <Footer />
    </>
  )
}
