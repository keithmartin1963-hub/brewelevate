import type { Metadata } from 'next'
import { ContentEditor } from '@/components/admin/ContentEditor'
export const metadata: Metadata = { title: 'New Setup Guide | BrewElevate Admin' }
export default function Page() {
  return <ContentEditor type="setup" typeLabel="Setup Guide" backHref="/admin/setups" viewBase="setups" />
}
