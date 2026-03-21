'use client'

import { seedLinks } from '@/lib/data/admin'

export default function AnalyticsClient() {
  const totalClicks = seedLinks.reduce((s, l) => s + l.clicks, 0)
  const sortedLinks = [...seedLinks].sort((a, b) => b.clicks - a.clicks)
  const maxClicks = Math.max(...seedLinks.map(l => l.clicks))

  return (
    <div>
      <h1>Analytics</h1>
      <p>Total Clicks: {totalClicks}</p>

      {sortedLinks.map(link => (
        <div key={link.id}>
          {link.retailerName} - {link.clicks}
        </div>
      ))}
    </div>
  )
}
