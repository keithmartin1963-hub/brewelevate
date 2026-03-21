import type { Metadata } from 'next'
import { ContentEditor } from '@/components/admin/ContentEditor'
export const metadata: Metadata = { title: 'New Blog Post | BrewElevate Admin' }
export default function Page() {
  return <ContentEditor type="post" typeLabel="Blog Post" backHref="/admin/posts" viewBase="blog" />
}
