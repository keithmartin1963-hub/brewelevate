import type { Metadata } from 'next'
import { Navbar, NavSpacer } from '@/components/layout/Navbar'
import { Footer }            from '@/components/layout/Footer'
import { Section }           from '@/components/ui/Section'
import { buildHubMetadata }  from '@/lib/seo/metadata'

export const metadata: Metadata = buildHubMetadata({
  title:       'Privacy Policy | BrewElevate',
  description: 'BrewElevate privacy policy — how we collect, use, and protect your data.',
  path:        '/privacy',
})

const sections = [
  {
    id: 'affiliate-disclosure',
    title: 'Affiliate Disclosure',
    body: `BrewElevate participates in affiliate programs including the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.

When you click on affiliate links on our site and make a qualifying purchase, we may earn a commission. This comes at no additional cost to you. We disclose affiliate relationships on all relevant pages and CTAs.

Our editorial recommendations are not influenced by affiliate commission rates. We recommend products based on testing and merit, not on which products pay us more.`,
  },
  {
    id: 'data-collection',
    title: 'What data we collect',
    body: `BrewElevate does not collect personal information unless you voluntarily provide it (for example, via a contact form).

We use Google Analytics to understand how visitors interact with our content. This collects anonymous data including: pages visited, time on page, referral source, and general geographic region. This data is aggregated and cannot be used to identify individuals.

We do not sell your data to third parties. We do not build personal profiles. We do not run advertising.`,
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: `We use first-party cookies for basic site functionality and Google Analytics tracking (anonymised). Affiliate links may set third-party cookies when you visit retailer sites.

You can disable cookies in your browser settings. This will not affect your ability to read our content but may affect analytics tracking.`,
  },
  {
    id: 'external-links',
    title: 'External links',
    body: `Our site contains links to third-party sites (primarily Amazon and brand websites). We are not responsible for the privacy practices of these sites. We recommend reviewing the privacy policy of any site you visit through our affiliate links.`,
  },
  {
    id: 'contact',
    title: 'Contact',
    body: `For privacy-related questions, contact us via the contact page. We respond to all privacy inquiries within 5 business days.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <NavSpacer />
      <main>
        <Section background="cream">
          <div className="max-w-2xl">
            <p className="text-label mb-3">Legal</p>
            <h1 className="heading-display text-charcoal mb-4">Privacy Policy</h1>
            <p className="text-warmgray mb-8">Last updated: December 2024</p>

            <div className="space-y-10">
              {sections.map(s => (
                <div key={s.id} id={s.id}>
                  <h2 className="font-heading font-semibold text-xl text-charcoal mb-3 pb-3 border-b border-cream-300">
                    {s.title}
                  </h2>
                  <div className="space-y-3">
                    {s.body.split('\n\n').map((para, i) => (
                      <p key={i} className="text-warmgray leading-relaxed text-[15px]">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
