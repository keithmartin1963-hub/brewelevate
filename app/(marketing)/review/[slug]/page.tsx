import { notFound }          from 'next/navigation'
import { Navbar, NavSpacer } from '@/components/layout/Navbar'
import { Footer }            from '@/components/layout/Footer'
import { ReviewTemplate }    from '@/components/templates/ReviewTemplate'
import { MultiJsonLd }       from '@/components/seo/JsonLd'
import { buildReviewMetadata } from '@/lib/seo/metadata'
import {
  buildProductSchema, buildReviewSchema,
  buildBreadcrumbSchema, buildArticleSchema,
} from '@/lib/seo/schemas'
import { getProductBySlug, products } from '@/lib/data/products'
import type { Review } from '@/lib/types'

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}
export async function generateMetadata({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  const review: Review = {
    id: `review-${product.id}`, slug: product.slug,
    title: `${product.brand} ${product.name} Review`,
    subtitle: product.tagline, excerpt: product.description, content: '',
    heroImage: product.image, productId: product.id, product,
    verdictSummary: product.description,
    overallRating: product.rating,
    ratingBreakdown: [
      { category: 'Brew Quality',  score: Math.min(5, product.rating + 0.2) as any },
      { category: 'Ease of Use',   score: Math.max(1, product.rating - 0.3) as any },
      { category: 'Build Quality', score: product.rating as any },
      { category: 'Value',         score: Math.max(1, product.rating - 0.2) as any },
    ],
    pros: product.pros, cons: product.cons, comparedProductIds: [],
    author: { id: 'editorial', name: 'BrewElevate Editorial', slug: 'editorial', role: 'Coffee Gear Team' },
    status: 'published', seo: product.seo, pinImage: product.image,
    publishedAt: product.createdAt, updatedAt: product.updatedAt,
    readingTimeMinutes: 10, isVerified: true,
  }
  return buildReviewMetadata(review, product)
}

export default function ReviewPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const review: Review = {
    id: `review-${product.id}`, slug: product.slug,
    title: `${product.brand} ${product.name} Review`,
    subtitle: product.tagline, excerpt: product.description, content: '',
    heroImage: product.image, productId: product.id, product,
    verdictSummary: `The ${product.brand} ${product.name} is ${product.rating >= 4.5 ? 'one of the best in its class — we recommend it without hesitation for the right buyer.' : 'an excellent choice for most home baristas, with only minor trade-offs.'} ${product.tagline}.`,
    overallRating: product.rating,
    ratingBreakdown: [
      { category: 'Brew Quality', score: Math.min(5, product.rating + 0.2) as any, description: 'Extraction consistency and cup quality across different beans and techniques.' },
      { category: 'Ease of Use', score: Math.max(1, product.rating - 0.3) as any, description: 'Intuitive for daily use and first-time setup.' },
      { category: 'Build Quality', score: product.rating as any, description: 'Materials, finish quality, and long-term durability assessment.' },
      { category: 'Value', score: Math.max(1, product.rating - 0.2) as any, description: 'Performance relative to asking price and alternatives.' },
    ],
    pros: product.pros, cons: product.cons, comparedProductIds: [],
    author: { id: 'editorial', name: 'BrewElevate Editorial', slug: 'editorial', role: 'Coffee Gear Team' },
    status: 'published', seo: product.seo, pinImage: product.image,
    publishedAt: product.createdAt, updatedAt: product.updatedAt,
    readingTimeMinutes: 10, isVerified: true,
  }

  const compared = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 2)

  const schemas = [
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Reviews', href: '/review' },
      { name: product.name },
    ]),
    buildProductSchema(product),
    buildReviewSchema(review, product),
    buildArticleSchema({
      title: review.seo.title, description: review.seo.description,
      url: `/review/${product.slug}`, image: product.image,
      authorName: 'BrewElevate Editorial',
      datePublished: review.publishedAt, dateModified: review.updatedAt,
      type: 'Article',
    }),
  ]

  return (
    <>
      <MultiJsonLd schemas={schemas} />
      <Navbar /><NavSpacer />
      <main>
        <ReviewTemplate review={review} product={product} comparedProducts={compared} />
      </main>
      <Footer />
    </>
  )
}
