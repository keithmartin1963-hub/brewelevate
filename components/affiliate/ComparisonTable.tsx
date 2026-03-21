import { Check, X, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StarRating } from '@/components/ui/StarRating'
import { AffiliateCTA } from '@/components/affiliate/AffiliateCTA'
import type { Product } from '@/lib/types'

interface ComparisonRow {
  label: string
  key: string
  render?: (value: unknown, product: Product) => React.ReactNode
}

interface ComparisonTableProps {
  products: Product[]
  rows?: ComparisonRow[]
  highlightBest?: string  // product ID to highlight
  className?: string
  caption?: string
}

// Default comparison rows for coffee gear
const defaultRows: ComparisonRow[] = [
  { label: 'Price',       key: 'price' },
  { label: 'Rating',      key: 'rating',      render: (v) => <StarRating rating={v as number} size="sm" /> },
  { label: 'Brand',       key: 'brand' },
  { label: 'Best For',    key: 'tagline' },
]

function CellValue({ value }: { value: unknown }) {
  if (value === true  || value === 'yes') return <Check size={16} className="text-green-600 mx-auto" />
  if (value === false || value === 'no')  return <X    size={16} className="text-red-400   mx-auto" />
  if (value === null  || value === undefined || value === '') return <Minus size={16} className="text-warmgray/40 mx-auto" />
  if (typeof value === 'number' || typeof value === 'string') return <>{value}</>
  return null
}

export function ComparisonTable({
  products,
  rows = defaultRows,
  highlightBest,
  className,
  caption,
}: ComparisonTableProps) {
  if (!products.length) return null

  return (
    <div className={cn('w-full overflow-x-auto rounded-2xl border border-cream-300', className)}>
      <table
        className="w-full text-sm border-collapse"
        itemScope
        itemType="https://schema.org/Table"
      >
        {caption && (
          <caption className="text-left text-xs text-warmgray px-4 py-2 border-b border-cream-200">
            {caption}
          </caption>
        )}

        {/* Product headers */}
        <thead>
          <tr>
            {/* Label column */}
            <th className="bg-espresso/5 text-left px-4 py-4 text-xs font-medium text-warmgray uppercase tracking-wider w-32 border-r border-cream-200">
              Compare
            </th>

            {products.map((product) => {
              const isHighlighted = product.id === highlightBest
              return (
                <th
                  key={product.id}
                  className={cn(
                    'px-4 py-4 text-center border-r border-cream-200 last:border-r-0',
                    isHighlighted && 'bg-gold-50'
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* Product image */}
                    <div className="w-16 h-16 rounded-xl bg-cream-200 overflow-hidden mx-auto">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {isHighlighted && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200">
                        Best Pick
                      </span>
                    )}

                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gold-500 font-medium">
                        {product.brand}
                      </p>
                      <p className="text-xs font-semibold text-charcoal leading-snug mt-0.5">
                        {product.name}
                      </p>
                    </div>
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>

        {/* Comparison rows */}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.key}
              className={cn(
                'border-t border-cream-200',
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-cream-100/50'
              )}
            >
              <td className="px-4 py-3.5 text-xs font-medium text-warmgray border-r border-cream-200 bg-espresso/3">
                {row.label}
              </td>

              {products.map((product) => {
                const raw   = (product as Record<string, unknown>)[row.key]
                const value = row.render ? row.render(raw, product) : raw
                const isHighlighted = product.id === highlightBest

                return (
                  <td
                    key={product.id}
                    className={cn(
                      'px-4 py-3.5 text-center text-sm text-charcoal border-r border-cream-200 last:border-r-0',
                      isHighlighted && 'bg-gold-50/50'
                    )}
                  >
                    {row.render ? value : <CellValue value={value} />}
                  </td>
                )
              })}
            </tr>
          ))}

          {/* Specs rows — pulled from product.specs */}
          {products[0]?.specs?.map((spec, specIndex) => (
            <tr
              key={spec.label}
              className={cn(
                'border-t border-cream-200',
                (rows.length + specIndex) % 2 === 0 ? 'bg-white' : 'bg-cream-100/50'
              )}
            >
              <td className="px-4 py-3.5 text-xs font-medium text-warmgray border-r border-cream-200 bg-espresso/3">
                {spec.label}
              </td>
              {products.map((product) => {
                const matchSpec = product.specs?.find(s => s.label === spec.label)
                const isHighlighted = product.id === highlightBest
                return (
                  <td
                    key={product.id}
                    className={cn(
                      'px-4 py-3.5 text-center text-sm text-charcoal border-r border-cream-200 last:border-r-0',
                      isHighlighted && 'bg-gold-50/50'
                    )}
                  >
                    {matchSpec?.value ?? <Minus size={14} className="text-warmgray/30 mx-auto" />}
                  </td>
                )
              })}
            </tr>
          ))}

          {/* Buy row */}
          <tr className="border-t-2 border-cream-300 bg-cream-50">
            <td className="px-4 py-4 text-xs font-medium text-warmgray border-r border-cream-200">
              Buy
            </td>
            {products.map((product) => {
              const primaryLink = product.affiliateLinks.find(l => l.isPrimary && l.isActive)
              const isHighlighted = product.id === highlightBest
              return (
                <td
                  key={product.id}
                  className={cn(
                    'px-4 py-4 text-center border-r border-cream-200 last:border-r-0',
                    isHighlighted && 'bg-gold-50/50'
                  )}
                >
                  {primaryLink ? (
                    <AffiliateCTA
                      link={primaryLink}
                      productId={product.id}
                      type="check-price"
                      variant={isHighlighted ? 'primary' : 'table'}
                      position="comparison-table"
                      showPrice={false}
                      className="mx-auto"
                    />
                  ) : (
                    <span className="text-xs text-warmgray/40">—</span>
                  )}
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
