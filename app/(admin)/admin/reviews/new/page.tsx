import type { Metadata } from 'next'
import { ContentEditor } from '@/components/admin/ContentEditor'
export const metadata: Metadata = { title: 'New Review | BrewElevate Admin' }
export default function Page() {
  return <ContentEditor type="review" typeLabel="Review" backHref="/admin/reviews" viewBase="review" />
}
