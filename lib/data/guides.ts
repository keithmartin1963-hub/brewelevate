import type { BuyingGuide } from '@/lib/types'
import { products } from './products'

export const buyingGuides: BuyingGuide[] = [
  {
    id: 'best-espresso-machines-under-1000',
    slug: 'best-espresso-machines-under-1000',
    title: 'Best Espresso Machines Under $1,000',
    subtitle: 'We tested 14 machines. These 5 are worth your money.',
    excerpt:
      'After 6 weeks of daily shots across 14 machines, we found the best espresso makers for every type of home barista — from beginners to serious enthusiasts.',
    content: '',
    heroImage: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=1200&q=80',
    category: 'espresso-machines',
    budgetRange: { min: '$150', max: '$999' },
    topPicks: [
      {
        productId: 'breville-barista-express',
        rank: 1,
        badge: 'Best Overall',
        summary:
          'The Barista Express hits the sweet spot between capability and convenience. Built-in grinder, 9-bar extraction, and a workflow that doesn\'t punish beginners.',
        affiliateLink: products[0].affiliateLinks[0],
      },
      {
        productId: 'baratza-encore-esp',
        rank: 2,
        badge: 'Best Budget',
        summary:
          'Paired with a basic espresso machine, the Encore ESP makes a stronger foundation than any all-in-one under $400.',
        affiliateLink: products[1].affiliateLinks[0],
      },
    ],
    sections: [],
    faq: [
      {
        question: 'Do I need a separate grinder?',
        answer:
          'For the best espresso, yes — a quality standalone grinder makes a bigger difference than upgrading your machine. That said, all-in-one machines like the Breville Barista Express are a solid starting point.',
      },
      {
        question: 'What pressure should an espresso machine have?',
        answer:
          'Look for 9 bar of brew pressure. Many machines advertise 15–19 bar pump pressure, but the actual brew pressure should be regulated to 9 bar. This is where most of the flavour extraction happens.',
      },
      {
        question: 'How long do home espresso machines last?',
        answer:
          'A quality machine should last 7–10 years with regular descaling and maintenance. Brands like Breville and Gaggia have good parts availability, which matters.',
      },
      {
        question: "What's the difference between single and double boiler?",
        answer:
          'Single boiler machines share one boiler for brewing and steaming — you have to wait between each. Dual boiler machines run simultaneously, so you can brew and froth at the same time. For most home use, a single boiler with good thermoblock is fine.',
      },
    ],
    relatedGuideIds: ['best-burr-coffee-grinders', 'best-milk-frothers'],
    relatedProductIds: ['breville-barista-express', 'baratza-encore-esp'],
    author: {
      id: 'editorial',
      name: 'BrewElevate Editorial',
      slug: 'editorial',
      role: 'Coffee Gear Team',
    },
    status: 'published',
    seo: {
      title: 'Best Espresso Machines Under $1,000 (2025) — Tested & Ranked',
      description:
        'We tested 14 espresso machines under $1,000. Here are the 5 that genuinely impressed us, ranked by performance, value, and ease of use.',
      keywords: ['best espresso machines', 'espresso machine under 1000', 'home espresso'],
    },
    pinImage: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&q=80',
    publishedAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z',
    readingTimeMinutes: 12,
  },

  {
    id: 'best-burr-coffee-grinders',
    slug: 'best-burr-coffee-grinders',
    title: 'Best Burr Coffee Grinders',
    subtitle: 'The single biggest upgrade you can make to your coffee.',
    excerpt:
      'Your grinder matters more than your machine. We tested 10 burr grinders across price points to find the ones that genuinely improve your cup.',
    content: '',
    heroImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&q=80',
    category: 'grinders',
    budgetRange: { min: '$100', max: '$700' },
    topPicks: [
      {
        productId: 'baratza-encore-esp',
        rank: 1,
        badge: 'Best Overall',
        summary:
          'Reliable, consistent, and repairable. The Encore ESP hits espresso-grade grind quality at a price that won\'t make you wince.',
        affiliateLink: products[1].affiliateLinks[0],
      },
      {
        productId: 'niche-zero',
        rank: 2,
        badge: 'Best Premium',
        summary:
          'Single-dose perfection. The Niche Zero is the grinder for people who want to experiment with different coffees daily without retention headaches.',
        affiliateLink: products[4].affiliateLinks[0],
      },
    ],
    sections: [],
    faq: [
      {
        question: 'Burr vs blade grinder — does it really matter?',
        answer:
          'Significantly. Blade grinders produce inconsistent particle sizes that cause simultaneous over- and under-extraction. Burr grinders crush beans between two surfaces for a uniform grind that extracts evenly.',
      },
      {
        question: 'How many grind settings do I need for espresso?',
        answer:
          'For espresso, you want fine, precise adjustability in the espresso range. Stepless grinders give you infinite adjustment; stepped grinders with 40+ steps give enough range for most home baristas.',
      },
    ],
    relatedGuideIds: ['best-espresso-machines-under-1000'],
    relatedProductIds: ['baratza-encore-esp', 'niche-zero'],
    author: {
      id: 'editorial',
      name: 'BrewElevate Editorial',
      slug: 'editorial',
      role: 'Coffee Gear Team',
    },
    status: 'published',
    seo: {
      title: 'Best Burr Coffee Grinders (2025) — Ranked by Real-World Testing',
      description:
        'The best burr grinders for espresso and filter coffee, tested and ranked. From $100 budget picks to the Niche Zero.',
    },
    pinImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
    publishedAt: '2024-10-15T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    readingTimeMinutes: 10,
  },

  {
    id: 'best-milk-frothers',
    slug: 'best-milk-frothers',
    title: 'Best Milk Frothers',
    subtitle: 'From handheld wands to automatic frothers — ranked.',
    excerpt:
      'We frothed hundreds of lattes to find the milk frothers that actually produce café-quality microfoam at home, at every price point.',
    content: '',
    heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
    category: 'milk-frothers',
    budgetRange: { min: '$10', max: '$300' },
    topPicks: [],
    sections: [],
    faq: [
      {
        question: 'Can I make latte art with a handheld frother?',
        answer:
          'It\'s difficult but possible. Handheld frothers produce larger, less stable bubbles than steam wands. For latte art, a steam wand — manual or automatic — gives you the microfoam control you need.',
      },
    ],
    relatedGuideIds: ['best-espresso-machines-under-1000'],
    relatedProductIds: [],
    author: {
      id: 'editorial',
      name: 'BrewElevate Editorial',
      slug: 'editorial',
      role: 'Coffee Gear Team',
    },
    status: 'published',
    seo: {
      title: 'Best Milk Frothers (2025) — Every Type Tested and Ranked',
      description:
        'From $10 handheld frothers to $200 automatic pitchers — we tested them all so you know exactly what to buy.',
    },
    publishedAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-11-20T00:00:00Z',
    readingTimeMinutes: 8,
  },
]

export function getGuideBySlug(slug: string): BuyingGuide | undefined {
  return buyingGuides.find(g => g.slug === slug)
}

export function getPublishedGuides(): BuyingGuide[] {
  return buyingGuides.filter(g => g.status === 'published')
}
