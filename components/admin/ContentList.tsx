'use client'

import { useState }  from 'react'
import Link          from 'next/link'
import { Plus, Search, Pencil, Trash2, CheckCircle } from 'lucide-react'
import { seedContent, type AdminContent, type ContentStatus, type ContentType } from '@/lib/data/admin'
import { formatDateShort } from '@/lib/utils'

interface ContentListProps {
  type:      ContentType
  typeLabel: string
  newHref:   string
  editBase:  string
  viewBase:  string
}

const statusConfig: Record<ContentStatus, { label: string; classes: string }> = {
  published: { label: 'Published', classes: 'bg-green-50 text-green-700 ring-1 ring-green-200' },
  draft:     { label: 'Draft',     classes: 'bg-cream-200 text-warmgray ring-1 ring-cream-300' },
  archived:  { label: 'Archived',  classes: 'bg-red-50 text-red-600 ring-1 ring-red-100' },
}

export function ContentList({ type, typeLabel, newHref, editBase, viewBase }: ContentListProps) {
  const [items, setItems] = useState<AdminContent[]>(
    seedContent.filter(c => c.type === type)
  )
  const [query,  setQuery]  = useState('')
  const [status, setStatus] = useState<'all' | ContentStatus>('all')
  const [saved, setSaved]   = useState<string | null>(null)

  const filtered = items
    .filter(i => status === 'all' || i.status === status)
    .filter(i => !query || i.title.toLowerCase().includes(query.toLowerCase()))

  function publish(id: string) {
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, status: 'published', updatedAt: new Date().toISOString().slice(0, 10) } : i
    ))
    setSaved('Published successfully')
    setTimeout(() => setSaved(null), 2500)
  }

  function remove(id: string) {
    if (!window.confirm('Delete this content? This cannot be undone.')) return
    setItems(prev => prev.filter(i => i.id !== id))
    setSaved('Deleted')
    setTimeout(() => setSaved(null), 2500)
  }

  return (
    <div className="max-w-[1100px] space-y-4">

      {/* Toast */}
      {saved && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-espresso text-cream-100 text-xs font-medium px-4 py-2.5 rounded-xl shadow-premium">
          <CheckCircle size={13} />
          {saved}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`Search ${typeLabel.toLowerCase()}s…`}
            className="w-full pl-8 pr-3 py-2 text-xs border border-cream-300 rounded-lg bg-white text-charcoal outline-none focus:border-gold-400 font-body"
          />
        </div>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as any)}
          className="px-3 py-2 text-xs border border-cream-300 rounded-lg bg-white text-charcoal outline-none font-body"
        >
          <option value="all">All status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <div className="ml-auto">
          <Link href={newHref} className="btn btn-primary btn-sm flex items-center gap-1.5 text-xs">
            <Plus size={11} />
            New {typeLabel}
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-warmgray bg-cream-100/60 border-b border-cream-200">Title</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-warmgray bg-cream-100/60 border-b border-cream-200">Category</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-warmgray bg-cream-100/60 border-b border-cream-200">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-warmgray bg-cream-100/60 border-b border-cream-200">Updated</th>
              <th className="px-4 py-3 bg-cream-100/60 border-b border-cream-200"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {filtered.length > 0 ? filtered.map(item => (
              <tr key={item.id} className="hover:bg-cream-50 transition-colors">
                <td className="px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-charcoal">{item.title}</p>
                    <p className="text-[11px] text-warmgray/60 font-mono mt-0.5">
                      /{viewBase}/{item.slug}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-warmgray">{item.category}</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${statusConfig[item.status].classes}`}>
                    {statusConfig[item.status].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-warmgray">{item.updatedAt}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    {item.status === 'draft' && (
                      <button
                        onClick={() => publish(item.id)}
                        className="text-[10px] font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        Publish
                      </button>
                    )}
                    <Link
                      href={`${editBase}/${item.id}`}
                      className="flex items-center gap-1 text-[10px] font-medium text-warmgray hover:text-charcoal bg-cream-100 hover:bg-cream-200 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <Pencil size={10} />
                      Edit
                    </Link>
                    <button
                      onClick={() => remove(item.id)}
                      className="flex items-center gap-1 text-[10px] font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-warmgray">
                  <p className="text-2xl mb-2 opacity-30">📄</p>
                  <p className="text-sm font-medium text-charcoal mb-1">No {typeLabel.toLowerCase()}s found</p>
                  <p className="text-xs">Try adjusting your search or filter</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
