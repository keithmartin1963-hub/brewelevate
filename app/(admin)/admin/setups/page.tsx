import type { Metadata } from 'next'
import { ContentList } from '@/components/admin/ContentList'
export const metadata: Metadata = { title: 'Setup Guides | BrewElevate Admin' }
export default function Page() {
  return <ContentList type="setup" typeLabel="Setup Guide" newHref="/admin/setups/new" editBase="/admin/setups" viewBase="setups" />
}
