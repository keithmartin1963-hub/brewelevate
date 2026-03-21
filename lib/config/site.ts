import type { SiteConfig } from '@/lib/types'

export const siteConfig: SiteConfig = {
  name: 'BrewElevate',
  tagline: 'Elevate Your Home Coffee Experience',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brewelevate.com',
  description:
    'Expert coffee gear guides, honest product reviews, and beautiful setup inspiration for home baristas. Find the best espresso machines, grinders, and accessories.',
  defaultOgImage: '/images/og-default.jpg',
  socialLinks: {
    twitter:   'https://twitter.com/brewelevate',
    pinterest: 'https://pinterest.com/brewelevate',
    instagram: 'https://instagram.com/brewelevate',
    youtube:   'https://youtube.com/@brewelevate',
  },
  amazonTrackingId: process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID ?? 'brewelevate-20',
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? '',
}

// ─── Navigation Structure ────────────────────────────────────────────────────
export const mainNav = [
  {
    label: 'Gear Guides',
    href: '/guides',
    description: 'Expert buying guides for every coffee category',
    children: [
      { label: 'Espresso Machines', href: '/guides/espresso-machines', description: 'From entry-level to pro' },
      { label: 'Coffee Grinders',   href: '/guides/grinders',           description: 'Burr grinders ranked & reviewed' },
      { label: 'Milk Frothers',     href: '/guides/milk-frothers',      description: 'Steam wands to electric frothers' },
      { label: 'Kettles & Scales',  href: '/guides/kettles-scales',     description: 'Precision tools for better brews' },
      { label: 'Accessories',       href: '/guides/accessories',        description: 'Tampers, pitchers, and more' },
    ],
  },
  {
    label: 'Setup Ideas',
    href: '/setups',
    description: 'Inspiring coffee station designs for every space',
    children: [
      { label: 'Minimalist Setups',  href: '/setups/minimalist',  description: 'Clean, efficient, beautiful' },
      { label: 'Luxury Stations',    href: '/setups/luxury',      description: 'The ultimate home café' },
      { label: 'Small Space Setups', href: '/setups/small-space', description: 'Big coffee in tight quarters' },
      { label: 'Budget Builds',      href: '/setups/budget',      description: 'Great coffee without breaking the bank' },
    ],
  },
  {
    label: 'Learn',
    href: '/blog',
    description: 'Brew techniques, guides, and coffee education',
    children: [
      { label: 'Espresso Technique', href: '/blog/category/espresso-technique', description: 'Dial in your shot' },
      { label: 'Coffee Origins',     href: '/blog/category/origins',            description: 'Single origin deep dives' },
      { label: 'Gear Tips',          href: '/blog/category/gear-tips',          description: 'Get more from your equipment' },
      { label: 'Beginners Guide',    href: '/blog/category/beginners',          description: 'Start your journey here' },
    ],
  },
  {
    label: 'Reviews',
    href: '/review',
    description: 'In-depth, hands-on product reviews',
  },
  {
    label: 'About',
    href: '/about',
    description: 'Our testing methodology and team',
  },
]

export const footerNav = {
  guides: [
    { label: 'Best Espresso Machines',      href: '/buying-guide/best-espresso-machines-under-1000' },
    { label: 'Best Burr Grinders',          href: '/buying-guide/best-burr-coffee-grinders' },
    { label: 'Best Milk Frothers',          href: '/buying-guide/best-milk-frothers' },
    { label: 'All Buying Guides',           href: '/guides' },
  ],
  learn: [
    { label: 'How to Dial In Espresso',    href: '/blog/how-to-dial-in-espresso' },
    { label: 'Single Origin vs Blends',    href: '/blog/single-origin-vs-blends' },
    { label: 'Coffee Accessories Under $50', href: '/blog/best-coffee-accessories-under-50' },
    { label: 'All Blog Posts',             href: '/blog' },
  ],
  company: [
    { label: 'About BrewElevate',          href: '/about' },
    { label: 'Contact',                    href: '/contact' },
    { label: 'Privacy Policy',             href: '/privacy' },
    { label: 'Terms of Service',           href: '/terms' },
    { label: 'Affiliate Disclosure',       href: '/privacy#affiliate-disclosure' },
  ],
}
