import type { Metadata } from 'next'

export const metadata: Metadata = {}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  // Each page in this group manages its own Navbar/Footer
  // so it can control header treatment (transparent, fixed, etc.)
  return <>{children}</>
}
