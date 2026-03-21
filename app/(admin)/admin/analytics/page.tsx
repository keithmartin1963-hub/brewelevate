import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Analytics | BrewElevate Admin' }

import AnalyticsClient from './AnalyticsClient'

export default function AnalyticsPage() {
  return <AnalyticsClient />
}
