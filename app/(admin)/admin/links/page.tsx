'use client'

import { useState }  from 'react'
import Link          from 'next/link'
import { Search, Plus, Pencil, Trash2, CheckCircle, Info } from 'lucide-react'
import { seedLinks, type AdminAffiliateLink } from '@/lib/data/admin'

export default function LinksPage() {
  const [links, setLinks]     = useState<AdminAffiliateLink[]>(seedLinks)
  const [query, setQuery]     = useState('')
  const [editing, setEditing] = useState<AdminAffiliateLink | null>(null)
  const [toast, setToast]     = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  const filtered = links.filter(l =>
    !query || l.productName.toLowerCase().includes(query.toLowerCase()) ||
    l.retailerName.toLowerCase().includes(query.toLowerCase())
  )

  const totalClicks = links.reduce((s, l) => s + l.clicks, 0)
  const maxClicks   = Math.max(...links.map(l => l.clicks))

  function showToast(msg: string) {
    setToast(msg); setTimeout(() => setToast(null), 2500)
  }

  function toggleActive(id: string, active: boolean) {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, isActive: active } : l))
    showToast(active ? 'Link activated' : 'Link deactivated')
  }

  function deleteLink(id: string) {
    if (!window.confirm('Delete this affiliate link?')) return
    setLinks(prev => prev.filter(l => l.id !== id))
    showToast('Link deleted')
  }

  function saveLink(link: AdminAffiliateLink) {
    setLinks(prev => prev.map(l => l.id === link.id ? { ...link, updatedAt: new Date().toISOString().slice(0, 10) } : l))
    setEditing(null)
    showToast('Link saved — updates everywhere it\'s used')
  }

  const retailerClass: Record<string, string> = {
    amazon: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    brand:  'bg-green-50 text-green-700 ring-1 ring-green-200',
    other:  'bg-cream-200 text-warmgray ring-1 ring-cream-300',
  }

  return (
    <div className="max-w-[1100px] space-y-4">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-espresso text-cream-100 text-xs font-medium px-4 py-2.5 rounded-xl shadow-premium">
          <CheckCircle size={13} /> {toast}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Clicks', value: totalClicks.toLocaleString() },
          { label: 'Active Links', value: links.filter(l => l.isActive).length },
          { label: 'Products',     value: new Set(links.map(l => l.productId)).size },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-cream-300 p-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-warmgray mb-1">{s.label}</p>
            <p className="font-heading font-bold text-2xl text-charcoal">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Global edit notice */}
      <div className="flex items-start gap-3 p-3.5 bg-gold-50 border border-gold-200 rounded-xl">
        <Info size={14} className="text-gold-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gold-800 leading-relaxed">
          <strong>Global editing:</strong> Editing a link here updates it everywhere it appears — buying guides, reviews, product cards, and blog posts. You never need to hunt down individual pages.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by product or retailer…"
            className="w-full pl-8 pr-3 py-2 text-xs border border-cream-300 rounded-lg bg-white text-charcoal outline-none focus:border-gold-400 font-body"
          />
        </div>
        <div className="ml-auto">
          <button onClick={() => setShowAdd(true)} className="btn btn-primary btn-sm flex items-center gap-1.5 text-xs">
            <Plus size={11} /> Add Link
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {['Product', 'Retailer', 'URL', 'Price', 'Tracking ID', 'Clicks', 'Active', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-warmgray bg-cream-100/60 border-b border-cream-200">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {filtered.map(link => (
              <tr key={link.id} className="hover:bg-cream-50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-xs font-medium text-charcoal">{link.productName}</p>
                    {link.isPrimary && (
                      <span className="text-[9px] bg-gold-50 text-gold-700 border border-gold-200 px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                        Primary
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md ${retailerClass[link.retailer] ?? retailerClass.other}`}>
                    {link.retailerName}
                  </span>
                </td>
                <td className="px-4 py-3 max-w-[140px]">
                  <p className="text-[11px] text-warmgray font-mono truncate">{link.url}</p>
                </td>
                <td className="px-4 py-3 text-xs font-bold text-espresso">{link.displayPrice}</td>
                <td className="px-4 py-3">
                  <span className="text-[11px] font-mono text-warmgray">{link.trackingId ?? '—'}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-1.5 bg-cream-300 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-400 rounded-full" style={{ width: `${Math.round(link.clicks / maxClicks * 100)}%` }} />
                    </div>
                    <span className="text-xs font-bold text-charcoal w-7 text-right">{link.clicks}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <label className="relative inline-flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={link.isActive}
                      onChange={e => toggleActive(link.id, e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-8 h-4 rounded-full transition-colors ${link.isActive ? 'bg-gold-400' : 'bg-cream-300'}`} />
                    <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${link.isActive ? 'translate-x-4' : ''}`} />
                    <span className="text-[10px] text-warmgray">{link.isActive ? 'On' : 'Off'}</span>
                  </label>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => setEditing(link)}
                      className="flex items-center gap-1 text-[10px] font-medium text-warmgray hover:text-charcoal bg-cream-100 hover:bg-cream-200 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <Pencil size={10} /> Edit
                    </button>
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="flex items-center gap-1 text-[10px] font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-16 px-4" onClick={e => { if (e.target === e.currentTarget) setEditing(null) }}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-premium-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
              <h3 className="text-sm font-semibold text-charcoal">Edit Affiliate Link</h3>
              <button onClick={() => setEditing(null)} className="text-warmgray hover:text-charcoal transition-colors">
                <span className="text-lg leading-none">×</span>
              </button>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: 'Retailer Name', key: 'retailerName' as const, type: 'text' },
                { label: 'Affiliate URL', key: 'url' as const, type: 'text' },
                { label: 'Tracking ID',  key: 'trackingId' as const, type: 'text' },
                { label: 'Display Price', key: 'displayPrice' as const, type: 'text' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-[11px] font-semibold text-charcoal mb-1.5 block">{field.label}</label>
                  <input
                    type={field.type}
                    value={(editing as any)[field.key] ?? ''}
                    onChange={e => setEditing(prev => prev ? { ...prev, [field.key]: e.target.value } : null)}
                    className="w-full px-3 py-2 text-xs border border-cream-300 rounded-lg font-body text-charcoal outline-none focus:border-gold-400"
                  />
                </div>
              ))}
              <div className="flex items-center justify-between py-1.5">
                <span className="text-xs font-medium text-charcoal">Primary link</span>
                <label className="relative inline-flex cursor-pointer">
                  <input type="checkbox" checked={editing.isPrimary} onChange={e => setEditing(prev => prev ? { ...prev, isPrimary: e.target.checked } : null)} className="sr-only" />
                  <div className={`w-8 h-4 rounded-full transition-colors ${editing.isPrimary ? 'bg-gold-400' : 'bg-cream-300'}`} />
                  <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${editing.isPrimary ? 'translate-x-4' : ''}`} />
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 bg-cream-50 border-t border-cream-200">
              <button onClick={() => setEditing(null)} className="btn btn-secondary btn-sm text-xs">Cancel</button>
              <button onClick={() => saveLink(editing)} className="btn btn-primary btn-sm text-xs">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
