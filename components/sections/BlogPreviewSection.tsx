import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { formatDateShort } from '@/lib/utils'
import type { BlogPost } from '@/lib/types'

interface BlogPreviewSectionProps {
  posts: BlogPost[]
}

const categoryLabel: Record<string, string> = {
  'how-to':       'How-To',
  'accessories':  'Accessories',
  'espresso-technique': 'Espresso',
  'origins':      'Origins',
  'gear-tips':    'Gear Tips',
}

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  return (
    <Section background="white" id="learn">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <SectionHeader
          label="From the Blog"
          heading="Learn to brew better"
          subheading="Practical guides and technique articles — no fluff."
          className="mb-0"
        />
        <Link
          href="/blog"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-espresso transition-colors flex-shrink-0 ml-8"
        >
          All articles
          <ArrowRight size={14} strokeWidth={1.75} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <BlogPreviewCard key={post.id} post={post} featured={index === 0} />
        ))}
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <Link href="/blog" className="btn btn-secondary">
          All Articles
          <ArrowRight size={14} strokeWidth={1.75} />
        </Link>
      </div>
    </Section>
  )
}

function BlogPreviewCard({
  post,
  featured,
}: {
  post: BlogPost
  featured: boolean
}) {
  return (
    <article className="group flex flex-col">
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden rounded-2xl">
        <div className="aspect-[3/2] bg-cream-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            loading="lazy"
          />
        </div>
        {featured && (
          <div className="absolute top-3 left-3 bg-espresso text-cream-100 text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full">
            Featured
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="pt-4 flex flex-col flex-1 gap-2">
        <p className="text-label">
          {categoryLabel[post.category] ?? post.category.replace(/-/g, ' ')}
        </p>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-heading font-semibold text-xl text-charcoal group-hover:text-espresso transition-colors leading-snug">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm text-warmgray leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 mt-auto border-t border-cream-200">
          <span className="text-xs text-warmgray">
            {formatDateShort(post.publishedAt)}
          </span>
          <span className="text-xs text-warmgray">
            {post.readingTimeMinutes} min read
          </span>
        </div>
      </div>
    </article>
  )
}
