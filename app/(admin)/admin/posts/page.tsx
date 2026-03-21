import type { Metadata } from 'next'
import { ContentList } from '@/components/admin/ContentList'
export const metadata: Metadata = { title: 'Blog Posts | BrewElevate Admin' }
export default function Page() {
  return <ContentList type="post" typeLabel="Blog Post" newHref="/admin/posts/new" editBase="/admin/posts" viewBase="blog" />
}
