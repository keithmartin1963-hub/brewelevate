import type { Metadata } from 'next'
import { ContentEditor } from '@/components/admin/ContentEditor'
export const metadata: Metadata = { title: 'New Buying Guide | BrewElevate Admin' }
export default function Page() {
  return <ContentEditor type="guide" typeLabel="Buying Guide" backHref="/admin/guides" viewBase="buying-guide" />
}
