import type { Metadata } from 'next'
import { ContentList } from '@/components/admin/ContentList'
export const metadata: Metadata = { title: 'Reviews | BrewElevate Admin' }
export default function Page() {
  return <ContentList type="review" typeLabel="Review" newHref="/admin/reviews/new" editBase="/admin/reviews" viewBase="review" />
}
