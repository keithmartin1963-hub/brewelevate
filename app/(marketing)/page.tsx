import type { Metadata } from 'next'
import { HeroSection }        from '@/components/sections/HeroSection'
import { FeaturedPicksSection } from '@/components/sections/FeaturedPicksSection'
import { GuidesSection }      from '@/components/sections/GuidesSection'
import { SetupInspirationSection } from '@/components/sections/SetupInspirationSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { FinalCTASection }    from '@/components/sections/FinalCTASection'
import { Navbar, NavSpacer }  from '@/components/layout/Navbar'
import { Footer }             from '@/components/layout/Footer'
import { getFeaturedProducts }  from '@/lib/data/products'
import { getPublishedGuides }   from '@/lib/data/guides'
import { getFeaturedPosts, getPublishedSetups } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'BrewElevate — Elevate Your Home Coffee Experience',
  description:
    'Expert coffee gear guides, honest product reviews, and setup inspiration for home baristas. Find the best espresso machines, grinders, and accessories.',
  openGraph: {
    title: 'BrewElevate — Elevate Your Home Coffee Experience',
    description:
      'Expert guides and honest reviews for home baristas. From espresso machines to grinders, we help you brew better.',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const guides           = getPublishedGuides()
  const setups           = getPublishedSetups()
  const posts            = getFeaturedPosts()

  return (
    <>
      <Navbar />
      <NavSpacer />
      <main>
        <HeroSection />
        <FeaturedPicksSection products={featuredProducts} />
        <GuidesSection guides={guides} />
        <SetupInspirationSection setups={setups} />
        <BlogPreviewSection posts={posts} />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
