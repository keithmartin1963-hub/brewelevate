'use client'

// ─── Types ────────────────────────────────────────────────────────────────────
export type ContentStatus = 'published' | 'draft' | 'archived'
export type ContentType   = 'guide' | 'review' | 'setup' | 'post' | 'product' | 'link'

export interface AdminContent {
  id:          string
  type:        ContentType
  title:       string
  slug:        string
  status:      ContentStatus
  category:    string
  updatedAt:   string
  publishedAt?: string
  author:      string
}

export interface AdminProduct {
  id:          string
  name:        string
  brand:       string
  category:    string
  price:       string
  rating:      number
  status:      ContentStatus
  updatedAt:   string
  affiliateLinks: number  // count
}

export interface AdminAffiliateLink {
  id:          string
  productId:   string
  productName: string
  retailer:    string
  retailerName:string
  url:         string
  trackingId?: string
  displayPrice:string
  isPrimary:   boolean
  isActive:    boolean
  clicks:      number
  updatedAt:   string
}

export interface ClickStat {
  productName: string
  retailer:    string
  clicks:      number
  position:    string
  lastClick:   string
}

// ─── Seed data ────────────────────────────────────────────────────────────────
export const seedContent: AdminContent[] = [
  { id: 'g1',  type: 'guide',   title: 'Best Espresso Machines Under $1,000', slug: 'best-espresso-machines-under-1000', status: 'published', category: 'Espresso Machines', updatedAt: '2024-12-15', publishedAt: '2024-11-01', author: 'Editorial' },
  { id: 'g2',  type: 'guide',   title: 'Best Burr Coffee Grinders',           slug: 'best-burr-coffee-grinders',         status: 'published', category: 'Grinders',          updatedAt: '2024-12-01', publishedAt: '2024-10-15', author: 'Editorial' },
  { id: 'g3',  type: 'guide',   title: 'Best Milk Frothers',                  slug: 'best-milk-frothers',                status: 'published', category: 'Milk Frothers',     updatedAt: '2024-11-20', publishedAt: '2024-09-01', author: 'Editorial' },
  { id: 'r1',  type: 'review',  title: 'Breville Barista Express Review',     slug: 'breville-barista-express',          status: 'published', category: 'Espresso Machines', updatedAt: '2024-11-01', publishedAt: '2024-01-15', author: 'Editorial' },
  { id: 'r2',  type: 'review',  title: 'Baratza Encore ESP Review',           slug: 'baratza-encore-esp',                status: 'published', category: 'Grinders',          updatedAt: '2024-10-15', publishedAt: '2024-02-01', author: 'Editorial' },
  { id: 'r3',  type: 'review',  title: 'Fellow Stagg EKG Review',             slug: 'fellow-stagg-ekg',                  status: 'published', category: 'Kettles',           updatedAt: '2024-11-01', publishedAt: '2024-02-15', author: 'Editorial' },
  { id: 's1',  type: 'setup',   title: 'Minimalist Espresso Setup',           slug: 'minimalist-espresso-setup',         status: 'published', category: 'Minimalist',        updatedAt: '2024-11-15', publishedAt: '2024-10-01', author: 'Editorial' },
  { id: 's2',  type: 'setup',   title: 'Luxury Coffee Station',               slug: 'luxury-coffee-station',             status: 'published', category: 'Luxury',            updatedAt: '2024-11-01', publishedAt: '2024-09-15', author: 'Editorial' },
  { id: 's3',  type: 'setup',   title: 'Small Space Coffee Setup',            slug: 'small-space-setup',                 status: 'draft',     category: 'Small Space',       updatedAt: '2024-10-15',                            author: 'Editorial' },
  { id: 'p1',  type: 'post',    title: 'How to Dial In Espresso',             slug: 'how-to-dial-in-espresso',           status: 'published', category: 'How-To',            updatedAt: '2024-11-15', publishedAt: '2024-11-15', author: 'Editorial' },
  { id: 'p2',  type: 'post',    title: 'Single Origin vs Blends',             slug: 'single-origin-vs-blends',           status: 'published', category: 'How-To',            updatedAt: '2024-10-20', publishedAt: '2024-10-20', author: 'Editorial' },
  { id: 'p3',  type: 'post',    title: 'Best Coffee Accessories Under $50',   slug: 'best-coffee-accessories-under-50',  status: 'draft',     category: 'Accessories',       updatedAt: '2024-10-01',                            author: 'Editorial' },
]

export const seedProducts: AdminProduct[] = [
  { id: 'breville-barista-express', name: 'Barista Express',  brand: 'Breville', category: 'Espresso Machines', price: '$799', rating: 4.5, status: 'published', updatedAt: '2024-11-01', affiliateLinks: 2 },
  { id: 'baratza-encore-esp',       name: 'Encore ESP',       brand: 'Baratza',  category: 'Grinders',          price: '$230', rating: 4.3, status: 'published', updatedAt: '2024-10-15', affiliateLinks: 1 },
  { id: 'fellow-stagg-ekg',         name: 'Stagg EKG',        brand: 'Fellow',   category: 'Kettles',           price: '$165', rating: 4.7, status: 'published', updatedAt: '2024-11-01', affiliateLinks: 1 },
  { id: 'acaia-pearl',              name: 'Pearl',            brand: 'Acaia',    category: 'Scales',            price: '$229', rating: 4.6, status: 'published', updatedAt: '2024-10-01', affiliateLinks: 1 },
  { id: 'niche-zero',               name: 'Niche Zero',       brand: 'Niche',    category: 'Grinders',          price: '$630', rating: 4.8, status: 'published', updatedAt: '2024-11-01', affiliateLinks: 1 },
]

export const seedLinks: AdminAffiliateLink[] = [
  { id: 'bbe-amazon',    productId: 'breville-barista-express', productName: 'Barista Express',  retailer: 'amazon',    retailerName: 'Amazon',       url: 'https://amazon.com/dp/B06X9QXQX1', trackingId: 'brewelevate-20', displayPrice: '$799', isPrimary: true,  isActive: true,  clicks: 847, updatedAt: '2024-12-01' },
  { id: 'bbe-breville',  productId: 'breville-barista-express', productName: 'Barista Express',  retailer: 'brand',     retailerName: 'Breville',     url: 'https://breville.com/barista-express',                          displayPrice: '$799', isPrimary: false, isActive: true,  clicks: 213, updatedAt: '2024-12-01' },
  { id: 'benc-amazon',   productId: 'baratza-encore-esp',       productName: 'Encore ESP',        retailer: 'amazon',    retailerName: 'Amazon',       url: 'https://amazon.com/dp/B093QLXM9F', trackingId: 'brewelevate-20', displayPrice: '$230', isPrimary: true,  isActive: true,  clicks: 423, updatedAt: '2024-11-15' },
  { id: 'stagg-amazon',  productId: 'fellow-stagg-ekg',         productName: 'Stagg EKG',         retailer: 'amazon',    retailerName: 'Amazon',       url: 'https://amazon.com/dp/B07DTMXND4', trackingId: 'brewelevate-20', displayPrice: '$165', isPrimary: true,  isActive: true,  clicks: 612, updatedAt: '2024-12-01' },
  { id: 'acaia-amazon',  productId: 'acaia-pearl',              productName: 'Pearl Scale',        retailer: 'amazon',    retailerName: 'Amazon',       url: 'https://amazon.com/dp/B00W3D4VC0', trackingId: 'brewelevate-20', displayPrice: '$229', isPrimary: true,  isActive: true,  clicks: 289, updatedAt: '2024-11-01' },
  { id: 'niche-brand',   productId: 'niche-zero',               productName: 'Niche Zero',         retailer: 'brand',     retailerName: 'Niche Coffee', url: 'https://nichecoffee.co.uk/niche-zero',                          displayPrice: '$630', isPrimary: true,  isActive: true,  clicks: 178, updatedAt: '2024-11-01' },
]

export const seedClickStats: ClickStat[] = [
  { productName: 'Barista Express',  retailer: 'Amazon',       clicks: 847, position: 'top-picks',        lastClick: '2 hours ago' },
  { productName: 'Barista Express',  retailer: 'Breville',     clicks: 213, position: 'verdict-box',      lastClick: '5 hours ago' },
  { productName: 'Stagg EKG',        retailer: 'Amazon',       clicks: 612, position: 'comparison-table', lastClick: '1 hour ago'  },
  { productName: 'Encore ESP',       retailer: 'Amazon',       clicks: 423, position: 'product-card',     lastClick: '3 hours ago' },
  { productName: 'Pearl Scale',      retailer: 'Amazon',       clicks: 289, position: 'inline-callout',   lastClick: '6 hours ago' },
  { productName: 'Niche Zero',       retailer: 'Niche Coffee', clicks: 178, position: 'sidebar',          lastClick: '1 day ago'   },
]
