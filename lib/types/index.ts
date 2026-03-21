// ─────────────────────────────────────────────────────────────────────────────
// BrewElevate — Core Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

// ─── Shared / Primitive Types ────────────────────────────────────────────────

export type ID = string

export type Slug = string

export interface SEOMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
  canonical?: string
  /** Pinterest-specific: vertical 2:3 image for Rich Pins */
  pinterestImage?: string
}

export interface Author {
  id: ID
  name: string
  slug: Slug
  bio?: string
  avatar?: string
  twitter?: string
  role?: string
}

export type ContentStatus = 'draft' | 'published' | 'archived'

export type Category =
  | 'espresso-machines'
  | 'grinders'
  | 'milk-frothers'
  | 'kettles'
  | 'scales'
  | 'accessories'
  | 'setup-guides'
  | 'buying-guides'
  | 'how-to'
  | 'news'

export type BudgetTier = 'budget' | 'mid-range' | 'premium' | 'luxury'

export type RatingValue = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5

// ─── Affiliate Link ───────────────────────────────────────────────────────────

export interface AffiliateLink {
  id: ID
  productId: ID
  retailer: 'amazon' | 'shareasale' | 'brand' | 'other'
  retailerName: string
  url: string
  /** Tracking parameter appended to URL */
  trackingId?: string
  /** Current price — manually updated */
  displayPrice?: string
  /** Whether this is the primary/recommended link */
  isPrimary: boolean
  isActive: boolean
  /** Click count for analytics */
  clicks?: number
  createdAt: string
  updatedAt: string
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: ID
  slug: Slug
  name: string
  brand: string
  category: Category
  tagline?: string
  description: string
  image: string
  images?: string[]
  budgetTier: BudgetTier
  /** MSRP as string e.g. "$699" */
  price: string
  priceRange?: { min: string; max: string }
  rating: RatingValue
  reviewCount?: number
  specs: ProductSpec[]
  pros: string[]
  cons: string[]
  affiliateLinks: AffiliateLink[]
  /** Whether this product is featured/recommended */
  isFeatured?: boolean
  isTopPick?: boolean
  /** Internal tags for filtering */
  tags: string[]
  seo: SEOMeta
  createdAt: string
  updatedAt: string
}

// ─── Buying Guide ─────────────────────────────────────────────────────────────

export interface BuyingGuideTopPick {
  productId: ID
  rank: number
  badge?: string // e.g. "Best Overall", "Best Budget"
  summary: string
  affiliateLink: AffiliateLink
}

export interface BuyingGuideSection {
  id: string
  title: string
  content: string // Rich text / MDX
}

export interface FAQItem {
  question: string
  answer: string
}

export interface BuyingGuide {
  id: ID
  slug: Slug
  title: string
  subtitle?: string
  excerpt: string
  content: string
  heroImage: string
  category: Category
  budgetRange?: { min: string; max: string }
  topPicks: BuyingGuideTopPick[]
  sections: BuyingGuideSection[]
  faq: FAQItem[]
  relatedGuideIds: ID[]
  relatedProductIds: ID[]
  author: Author
  status: ContentStatus
  seo: SEOMeta
  /** Pinterest pin image (2:3 vertical) */
  pinImage?: string
  publishedAt: string
  updatedAt: string
  readingTimeMinutes: number
}

// ─── Product Review ───────────────────────────────────────────────────────────

export interface ReviewRatingBreakdown {
  category: string
  score: RatingValue
  description?: string
}

export interface Review {
  id: ID
  slug: Slug
  title: string
  subtitle?: string
  excerpt: string
  content: string
  heroImage: string
  productId: ID
  product?: Product
  verdictSummary: string
  overallRating: RatingValue
  ratingBreakdown: ReviewRatingBreakdown[]
  pros: string[]
  cons: string[]
  /** Competing products to compare against */
  comparedProductIds: ID[]
  author: Author
  status: ContentStatus
  seo: SEOMeta
  pinImage?: string
  publishedAt: string
  updatedAt: string
  readingTimeMinutes: number
  /** Whether this review has been verified (tested in person) */
  isVerified?: boolean
}

// ─── Setup Guide ──────────────────────────────────────────────────────────────

export interface SetupGearItem {
  productId: ID
  role: string // e.g. "Espresso Machine", "Grinder"
  isEssential: boolean
  affiliateLink: AffiliateLink
}

export interface SetupBudgetTier {
  tier: BudgetTier
  totalEstimate: string
  items: SetupGearItem[]
  description?: string
}

export interface SetupGuide {
  id: ID
  slug: Slug
  title: string
  subtitle?: string
  excerpt: string
  content: string
  heroImage: string
  /** Multiple images for Pinterest (2:3 each) */
  galleryImages: string[]
  pinImages: string[]
  style: string // e.g. "Minimalist", "Luxury", "Industrial"
  budgetTiers: SetupBudgetTier[]
  allProducts: SetupGearItem[]
  tags: string[]
  author: Author
  status: ContentStatus
  seo: SEOMeta
  publishedAt: string
  updatedAt: string
  readingTimeMinutes: number
  /** Pinterest "Save" count (display only) */
  pinCount?: number
}

// ─── Blog Post ────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: ID
  slug: Slug
  title: string
  subtitle?: string
  excerpt: string
  content: string
  heroImage: string
  category: Category
  tags: string[]
  author: Author
  /** IDs of products mentioned inline */
  mentionedProductIds: ID[]
  /** IDs of guides to cross-link */
  relatedGuideIds: ID[]
  status: ContentStatus
  seo: SEOMeta
  pinImage?: string
  publishedAt: string
  updatedAt: string
  readingTimeMinutes: number
  isFeatured?: boolean
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
  badge?: string
  isExternal?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

// ─── Admin / CMS ──────────────────────────────────────────────────────────────

export type AdminSection =
  | 'dashboard'
  | 'blog-posts'
  | 'buying-guides'
  | 'reviews'
  | 'setup-guides'
  | 'products'
  | 'affiliate-links'
  | 'categories'
  | 'media'
  | 'navigation'
  | 'settings'

export interface AdminStats {
  totalPosts: number
  totalGuides: number
  totalReviews: number
  totalProducts: number
  totalAffiliateClicks: number
  publishedThisMonth: number
}

// ─── Analytics / Tracking ────────────────────────────────────────────────────

export interface AffiliateClickEvent {
  productId: ID
  linkId: ID
  retailer: string
  timestamp: string
  page: string
  position?: string // e.g. "top-picks", "inline-cta", "comparison-table"
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export interface SiteConfig {
  name: string
  tagline: string
  url: string
  description: string
  defaultOgImage: string
  socialLinks: {
    twitter?: string
    pinterest?: string
    instagram?: string
    youtube?: string
  }
  amazonTrackingId?: string
  googleAnalyticsId?: string
}
