import { notFound }            from 'next/navigation'
import { Navbar, NavSpacer }   from '@/components/layout/Navbar'
import { Footer }              from '@/components/layout/Footer'
import { BuyingGuideTemplate } from '@/components/templates/BuyingGuideTemplate'
import { MultiJsonLd }         from '@/components/seo/JsonLd'
import { buildGuideMetadata }  from '@/lib/seo/metadata'
import {
  buildArticleSchema, buildFaqSchema,
  buildBreadcrumbSchema, buildItemListSchema,
} from '@/lib/seo/schemas'
import { getGuideBySlug, getPublishedGuides } from '@/lib/data/guides'
import { products } from '@/lib/data/products'

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  return getPublishedGuides().map(g => ({ slug: g.slug }))
}
export async function generateMetadata({ params }: PageProps) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) return {}
  return buildGuideMetadata(guide)
}

export default function BuyingGuidePage({ params }: PageProps) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const guideProducts = guide.topPicks
    .sort((a, b) => a.rank - b.rank)
    .map(tp => products.find(p => p.id === tp.productId))
    .filter(Boolean) as typeof products

  const schemas = [
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Buying Guides', href: '/guides' },
      { name: guide.title },
    ]),
    buildArticleSchema({
      title: guide.seo.title, description: guide.seo.description,
      url: `/buying-guide/${guide.slug}`, image: guide.heroImage,
      authorName: guide.author.name, datePublished: guide.publishedAt,
      dateModified: guide.updatedAt, type: 'Article',
    }),
    ...(guide.faq.length > 0 ? [buildFaqSchema(guide.faq)] : []),
    ...(guideProducts.length > 0 ? [buildItemListSchema(
      guide.topPicks.map(tp => {
        const prod = products.find(p => p.id === tp.productId)
        return {
  position: tp.rank,
  name: prod
    ? `${prod.brand ?? ''} ${prod.name ?? ''}`.trim()
    : (tp.badge ?? 'Item'),
  url: prod ? `/review/${prod.slug}` : `/buying-guide/${guide.slug}`,
  description: tp.summary ?? '',
  image: prod?.image ?? ''
}
      })
    )] : []),
  ]

  return (
    <>
      <MultiJsonLd schemas={schemas} />
      <Navbar /><NavSpacer />
      <main>
        <BuyingGuideTemplate
          guide={guide}
          products={guideProducts.length > 0 ? guideProducts : products.slice(0, 2)}
          allProducts={guideProducts.length > 0 ? guideProducts : products.slice(0, 3)}
        />
      </main>
      <Footer />
    </>
  )
}
