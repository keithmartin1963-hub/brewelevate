import type { Metadata } from 'next'
import { ContentList } from '@/components/admin/ContentList'
export const metadata: Metadata = { title: 'Buying Guides | BrewElevate Admin' }
export default function Page() {
  return <ContentList type="guide" typeLabel="Buying Guide" newHref="/admin/guides/new" editBase="/admin/guides" viewBase="buying-guide" />
}
