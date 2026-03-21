import { notFound }          from 'next/navigation'
import { Navbar, NavSpacer } from '@/components/layout/Navbar'
import { Footer }            from '@/components/layout/Footer'
import { BlogPostTemplate }  from '@/components/templates/BlogPostTemplate'
import { MultiJsonLd }       from '@/components/seo/JsonLd'
import { buildPostMetadata } from '@/lib/seo/metadata'
import {
  buildArticleSchema, buildBreadcrumbSchema, buildHowToSchema,
} from '@/lib/seo/schemas'
import { getPostBySlug, getFeaturedPosts } from '@/lib/data/content'
import { getPublishedGuides } from '@/lib/data/guides'
import { products } from '@/lib/data/products'

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  return getFeaturedPosts().map(p => ({ slug: p.slug }))
}
export async function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return buildPostMetadata(post)
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const mentionedProducts = post.mentionedProductIds
    .map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products
  const relatedGuides = post.relatedGuideIds
    .map(id => getPublishedGuides().find(g => g.id === id)).filter(Boolean) as ReturnType<typeof getPublishedGuides>

  const isHowTo = post.category === 'how-to'
  const schemas = [
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: post.title },
    ]),
    buildArticleSchema({
      title: post.seo.title, description: post.seo.description,
      url: `/blog/${post.slug}`, image: post.heroImage,
      authorName: post.author.name,
      datePublished: post.publishedAt, dateModified: post.updatedAt,
      type: 'BlogPosting',
    }),
    ...(isHowTo ? [buildHowToSchema({
      name: post.title,
      description: post.excerpt,
      image: post.heroImage,
      totalTime: `PT${post.readingTimeMinutes}M`,
      steps: [
        { name: 'Set your dose',       text: 'Start at 18g for a standard double. Weigh every time.' },
        { name: 'Set your target yield', text: 'Aim for 36g out (1:2 ratio). Use a scale under your cup.' },
        { name: 'Run your first shot', text: 'Under 20s = grind finer. Over 35s = grind coarser.' },
        { name: 'Taste and refine',    text: 'Sour = finer grind. Bitter = coarser grind. One variable at a time.' },
      ],
    })] : []),
  ]

  return (
    <>
      <MultiJsonLd schemas={schemas} />
      <Navbar /><NavSpacer />
      <main>
        <BlogPostTemplate post={post} mentionedProducts={mentionedProducts} relatedGuides={relatedGuides} />
      </main>
      <Footer />
    </>
  )
}
