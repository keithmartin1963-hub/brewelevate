'use client'

import { useState }  from 'react'
import { useRouter } from 'next/navigation'
import Link          from 'next/link'
import { ArrowLeft, Save, Eye, CheckCircle } from 'lucide-react'
import { slugify }   from '@/lib/utils'

type ContentType = 'guide' | 'review' | 'setup' | 'post'

interface ContentEditorProps {
  type:      ContentType
  typeLabel: string
  backHref:  string
  viewBase:  string
  initialData?: {
    title?: string; slug?: string; excerpt?: string
    category?: string; status?: string
    metaTitle?: string; metaDescription?: string
  }
}

const categories: Record<ContentType, string[]> = {
  guide:  ['Espresso Machines', 'Grinders', 'Milk Frothers', 'Kettles', 'Scales', 'Accessories'],
  review: ['Espresso Machines', 'Grinders', 'Kettles',       'Scales',  'Accessories'],
  setup:  ['Minimalist', 'Luxury', 'Small Space', 'Budget', 'Mid-range'],
  post:   ['How-To', 'Accessories', 'Espresso Technique', 'Origins', 'Gear Tips', 'Beginners'],
}

export function ContentEditor({ type, typeLabel, backHref, viewBase, initialData }: ContentEditorProps) {
  const router = useRouter()

  const [title,       setTitle]       = useState(initialData?.title ?? '')
  const [slug,        setSlug]        = useState(initialData?.slug ?? '')
  const [excerpt,     setExcerpt]     = useState(initialData?.excerpt ?? '')
  const [category,    setCategory]    = useState(initialData?.category ?? categories[type][0])
  const [status,      setStatus]      = useState<'draft' | 'published'>(initialData?.status === 'published' ? 'published' : 'draft')
  const [metaTitle,   setMetaTitle]   = useState(initialData?.metaTitle ?? initialData?.title ?? '')
  const [metaDesc,    setMetaDesc]    = useState(initialData?.metaDescription ?? '')
  const [hasPinImage, setHasPinImage] = useState(false)
  const [saved,       setSaved]       = useState(false)

  function handleTitleChange(val: string) {
    setTitle(val)
    if (!initialData?.slug) setSlug(slugify(val))
    if (!initialData?.metaTitle) setMetaTitle(val)
  }

  function handleSave(publish = false) {
    if (publish) setStatus('published')
    setSaved(true)
    setTimeout(() => { setSaved(false); router.push(backHref) }, 1500)
  }

  const charCount = (text: string, max: number) => (
    <span className={`text-[10px] ${text.length > max ? 'text-red-500' : 'text-warmgray/50'}`}>
      {text.length}/{max}
    </span>
  )

  return (
    <div className="max-w-[900px]">
      {/* Saved toast */}
      {saved && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-espresso text-cream-100 text-xs font-medium px-4 py-2.5 rounded-xl shadow-premium">
          <CheckCircle size={13} />
          {status === 'published' ? 'Published!' : 'Draft saved'}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href={backHref} className="flex items-center gap-1.5 text-xs text-warmgray hover:text-charcoal transition-colors">
            <ArrowLeft size={13} />
            Back to {typeLabel}s
          </Link>
          <span className="text-warmgray/30">·</span>
          <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${
            status === 'published' ? 'bg-green-50 text-green-700' : 'bg-cream-200 text-warmgray'
          }`}>
            {status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {slug && (
            <Link
              href={`/${viewBase}/${slug}`}
              target="_blank"
              className="btn btn-secondary btn-sm flex items-center gap-1.5 text-xs"
            >
              <Eye size={11} />
              Preview
            </Link>
          )}
          <button onClick={() => handleSave(false)} className="btn btn-secondary btn-sm flex items-center gap-1.5 text-xs">
            <Save size={11} />
            Save Draft
          </button>
          <button onClick={() => handleSave(true)} className="btn btn-primary btn-sm text-xs">
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">

        {/* Main fields */}
        <div className="col-span-8 space-y-5">
          <div className="bg-white rounded-2xl border border-cream-300 p-5 space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-charcoal mb-1.5 block">Title</label>
              <input
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder={`${typeLabel} title…`}
                className="w-full px-3 py-2.5 text-sm border border-cream-300 rounded-xl font-body text-charcoal outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/10"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-charcoal mb-1.5 block">Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-warmgray flex-shrink-0">/{viewBase}/</span>
                <input
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="url-friendly-slug"
                  className="flex-1 px-3 py-2 text-xs border border-cream-300 rounded-lg font-mono text-charcoal outline-none focus:border-gold-400"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-charcoal">Excerpt</label>
                {charCount(excerpt, 200)}
              </div>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Brief description shown in cards and search results…"
                className="w-full px-3 py-2.5 text-sm border border-cream-300 rounded-xl font-body text-charcoal outline-none focus:border-gold-400 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Body content placeholder */}
          <div className="bg-white rounded-2xl border border-cream-300 p-5">
            <label className="text-[11px] font-semibold text-charcoal mb-3 block">Content</label>
            <div className="border border-cream-300 rounded-xl overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-1 px-3 py-2 bg-cream-100 border-b border-cream-200">
                {['H2', 'H3', 'B', 'I', '""', '•'].map(t => (
                  <button key={t} className="w-6 h-6 text-xs font-medium text-warmgray hover:text-charcoal hover:bg-cream-200 rounded flex items-center justify-center transition-colors font-body">
                    {t}
                  </button>
                ))}
                <div className="w-px h-4 bg-cream-300 mx-1" />
                <button className="text-[10px] font-medium text-warmgray hover:text-charcoal px-2 py-0.5 rounded hover:bg-cream-200 transition-colors font-body">Link</button>
                <button className="text-[10px] font-medium text-warmgray hover:text-charcoal px-2 py-0.5 rounded hover:bg-cream-200 transition-colors font-body">Image</button>
                <button className="text-[10px] font-medium text-warmgray hover:text-charcoal px-2 py-0.5 rounded hover:bg-cream-200 transition-colors font-body">Product</button>
              </div>
              <textarea
                rows={12}
                placeholder="Write your content here… Use the toolbar above for formatting."
                className="w-full px-4 py-3 text-sm font-body text-charcoal outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Sidebar fields */}
        <div className="col-span-4 space-y-4">

          {/* Publish */}
          <div className="bg-white rounded-2xl border border-cream-300 p-4 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-warmgray">Publish</p>
            <div>
              <label className="text-[11px] font-semibold text-charcoal mb-1.5 block">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-cream-300 rounded-lg font-body text-charcoal outline-none focus:border-gold-400 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-charcoal mb-1.5 block">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-cream-300 rounded-lg font-body text-charcoal outline-none focus:border-gold-400 bg-white"
              >
                {categories[type].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl border border-cream-300 p-4 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-warmgray">SEO</p>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-charcoal">Meta Title</label>
                {charCount(metaTitle, 60)}
              </div>
              <input
                value={metaTitle}
                onChange={e => setMetaTitle(e.target.value)}
                placeholder="Title for search results…"
                className="w-full px-3 py-2 text-xs border border-cream-300 rounded-lg font-body text-charcoal outline-none focus:border-gold-400"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-charcoal">Meta Description</label>
                {charCount(metaDesc, 160)}
              </div>
              <textarea
                value={metaDesc}
                onChange={e => setMetaDesc(e.target.value)}
                rows={3}
                placeholder="Description for search results…"
                className="w-full px-3 py-2 text-xs border border-cream-300 rounded-lg font-body text-charcoal outline-none focus:border-gold-400 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Pinterest */}
          <div className="bg-white rounded-2xl border border-cream-300 p-4 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-warmgray">Pinterest</p>
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-xs font-medium text-charcoal">Pin image (2:3)</p>
                <p className="text-[10px] text-warmgray mt-0.5">Vertical image for Pinterest sharing</p>
              </div>
              <label className="relative inline-flex cursor-pointer">
                <input type="checkbox" checked={hasPinImage} onChange={e => setHasPinImage(e.target.checked)} className="sr-only" />
                <div className={`w-9 h-5 rounded-full transition-colors ${hasPinImage ? 'bg-gold-400' : 'bg-cream-300'}`} />
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${hasPinImage ? 'translate-x-4' : ''}`} />
              </label>
            </div>
            {hasPinImage && (
              <button className="w-full text-xs text-warmgray border border-dashed border-cream-300 rounded-xl py-4 hover:border-gold-300 hover:text-charcoal transition-colors font-body">
                + Upload pin image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
