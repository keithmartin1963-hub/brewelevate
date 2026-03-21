import type { BlogPost, SetupGuide } from '@/lib/types'

export const blogPosts: BlogPost[] = [
  {
    id: 'how-to-dial-in-espresso',
    slug: 'how-to-dial-in-espresso',
    title: 'How to Dial In Espresso',
    subtitle: 'Stop guessing. Here\'s a systematic approach that works.',
    excerpt:
      'Dialling in espresso doesn\'t have to feel like alchemy. This step-by-step framework gets you to a great shot in under 30 minutes — and keeps you there.',
    content: '',
    heroImage: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=1200&q=80',
    category: 'how-to',
    tags: ['espresso', 'technique', 'beginner', 'dialling-in'],
    author: {
      id: 'editorial',
      name: 'BrewElevate Editorial',
      slug: 'editorial',
      role: 'Coffee Gear Team',
    },
    mentionedProductIds: ['breville-barista-express', 'baratza-encore-esp'],
    relatedGuideIds: ['best-espresso-machines-under-1000', 'best-burr-coffee-grinders'],
    status: 'published',
    seo: {
      title: 'How to Dial In Espresso — A Step-by-Step Framework',
      description:
        'A clear, systematic approach to dialling in espresso. Stop pulling sour or bitter shots — this guide gets you to a balanced extraction every time.',
    },
    pinImage: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80',
    publishedAt: '2024-11-15T00:00:00Z',
    updatedAt: '2024-11-15T00:00:00Z',
    readingTimeMinutes: 9,
    isFeatured: true,
  },
  {
    id: 'single-origin-vs-blends',
    slug: 'single-origin-vs-blends',
    title: 'Single Origin vs Blends',
    subtitle: 'Which is better for espresso — and does it matter?',
    excerpt:
      'The specialty coffee world has strong opinions. Here\'s the honest answer on when single origins shine, when blends win, and how to choose for your setup.',
    content: '',
    heroImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80',
    category: 'how-to',
    tags: ['coffee', 'beans', 'single-origin', 'blends'],
    author: {
      id: 'editorial',
      name: 'BrewElevate Editorial',
      slug: 'editorial',
      role: 'Coffee Gear Team',
    },
    mentionedProductIds: ['niche-zero'],
    relatedGuideIds: ['best-burr-coffee-grinders'],
    status: 'published',
    seo: {
      title: 'Single Origin vs Blends for Espresso — The Honest Answer',
      description:
        'Should you use single origin or blended coffee for espresso? We break down the differences and when each makes sense.',
    },
    pinImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
    publishedAt: '2024-10-20T00:00:00Z',
    updatedAt: '2024-10-20T00:00:00Z',
    readingTimeMinutes: 7,
    isFeatured: true,
  },
  {
    id: 'best-coffee-accessories-under-50',
    slug: 'best-coffee-accessories-under-50',
    title: 'Best Coffee Accessories Under $50',
    subtitle: 'Small upgrades that make a real difference.',
    excerpt:
      'You don\'t need to spend hundreds to meaningfully improve your home coffee setup. These are the accessories that have the highest impact per dollar spent.',
    content: '',
    heroImage: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&q=80',
    category: 'accessories',
    tags: ['accessories', 'budget', 'gifts', 'upgrades'],
    author: {
      id: 'editorial',
      name: 'BrewElevate Editorial',
      slug: 'editorial',
      role: 'Coffee Gear Team',
    },
    mentionedProductIds: ['fellow-stagg-ekg', 'acaia-pearl'],
    relatedGuideIds: ['best-espresso-machines-under-1000'],
    status: 'published',
    seo: {
      title: 'Best Coffee Accessories Under $50 — High Impact, Low Cost',
      description:
        'The coffee accessories worth buying under $50. We focus on items that genuinely improve your daily brew, not gimmicks.',
    },
    pinImage: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80',
    publishedAt: '2024-09-10T00:00:00Z',
    updatedAt: '2024-10-01T00:00:00Z',
    readingTimeMinutes: 6,
    isFeatured: false,
  },
]

export const setupGuides: SetupGuide[] = [
  {
    id: 'minimalist-espresso-setup',
    slug: 'minimalist-espresso-setup',
    title: 'Minimalist Espresso Setup',
    subtitle: 'Everything you need, nothing you don\'t.',
    excerpt:
      'A clean, intentional espresso station that performs as beautifully as it looks. Three core pieces, zero clutter.',
    content: '',
    heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80',
    ],
    pinImages: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    ],
    style: 'Minimalist',
    budgetTiers: [
      {
        tier: 'mid-range',
        totalEstimate: '$800–$1,200',
        items: [],
        description: 'The core three-piece setup',
      },
      {
        tier: 'premium',
        totalEstimate: '$1,500–$2,000',
        items: [],
        description: 'Upgrade to a dedicated espresso grinder',
      },
    ],
    allProducts: [],
    tags: ['minimalist', 'espresso', 'clean', 'compact'],
    author: {
      id: 'editorial',
      name: 'BrewElevate Editorial',
      slug: 'editorial',
      role: 'Coffee Gear Team',
    },
    status: 'published',
    seo: {
      title: 'Minimalist Espresso Setup — Clean, Intentional, Beautiful',
      description:
        'Build a beautiful minimalist espresso station at home. Three core pieces, clear counter space, and coffee that tastes as good as it looks.',
    },
    publishedAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-11-15T00:00:00Z',
    readingTimeMinutes: 6,
    pinCount: 2400,
  },
  {
    id: 'luxury-coffee-station',
    slug: 'luxury-coffee-station',
    title: 'Luxury Coffee Station',
    subtitle: 'The ultimate home café build.',
    excerpt:
      'No compromises. This is the setup for serious enthusiasts who want café-grade results at home — every single morning.',
    content: '',
    heroImage: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=800&q=80',
    ],
    pinImages: [
      'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&q=80',
    ],
    style: 'Luxury',
    budgetTiers: [
      {
        tier: 'luxury',
        totalEstimate: '$3,000–$5,000',
        items: [],
        description: 'Full professional-grade build',
      },
    ],
    allProducts: [],
    tags: ['luxury', 'espresso', 'premium', 'dream-setup'],
    author: {
      id: 'editorial',
      name: 'BrewElevate Editorial',
      slug: 'editorial',
      role: 'Coffee Gear Team',
    },
    status: 'published',
    seo: {
      title: 'Luxury Home Coffee Station — The Ultimate Setup Guide',
      description:
        'Build the ultimate home coffee station. Pro-grade espresso machine, precision grinder, and everything in between.',
    },
    publishedAt: '2024-09-15T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
    readingTimeMinutes: 8,
    pinCount: 4100,
  },
  {
    id: 'small-space-setup',
    slug: 'small-space-setup',
    title: 'Small Space Coffee Setup',
    subtitle: 'Great coffee doesn\'t need a big kitchen.',
    excerpt:
      'Apartment-friendly, counter-space-conscious, and still capable of producing genuinely excellent espresso. Here\'s how to set it up right.',
    content: '',
    heroImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80',
    ],
    pinImages: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
    ],
    style: 'Small Space',
    budgetTiers: [
      {
        tier: 'budget',
        totalEstimate: '$400–$700',
        items: [],
        description: 'Compact, capable, affordable',
      },
      {
        tier: 'mid-range',
        totalEstimate: '$800–$1,200',
        items: [],
        description: 'Small footprint, big performance',
      },
    ],
    allProducts: [],
    tags: ['small-space', 'apartment', 'compact', 'budget'],
    author: {
      id: 'editorial',
      name: 'BrewElevate Editorial',
      slug: 'editorial',
      role: 'Coffee Gear Team',
    },
    status: 'published',
    seo: {
      title: 'Small Space Coffee Setup — Big Coffee in a Tiny Kitchen',
      description:
        'The best compact coffee setups for small kitchens and apartments. Smart gear choices that don\'t sacrifice quality for size.',
    },
    publishedAt: '2024-08-20T00:00:00Z',
    updatedAt: '2024-10-15T00:00:00Z',
    readingTimeMinutes: 5,
    pinCount: 3200,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(p => p.isFeatured && p.status === 'published')
}

export function getSetupBySlug(slug: string): SetupGuide | undefined {
  return setupGuides.find(s => s.slug === slug)
}

export function getPublishedSetups(): SetupGuide[] {
  return setupGuides.filter(s => s.status === 'published')
}
