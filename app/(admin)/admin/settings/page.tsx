'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'

export default function SettingsPage() {
  const [toast, setToast]   = useState<string | null>(null)
  const [amazonId, setAmazonId] = useState(siteConfig.amazonTrackingId ?? 'brewelevate-20')
  const [siteUrl, setSiteUrl]   = useState(siteConfig.url)

  function save(section: string) {
    setToast(`${section} saved`)
    setTimeout(() => setToast(null), 2500)
  }

  function Toggle({ defaultChecked = true }: { defaultChecked?: boolean }) {
    const [on, setOn] = useState(defaultChecked)
    return (
      <label className="relative inline-flex cursor-pointer" onClick={() => setOn(!on)}>
        <div className={`w-9 h-5 rounded-full transition-colors ${on ? 'bg-gold-400' : 'bg-cream-300'}`} />
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-4' : ''}`} />
      </label>
    )
  }

  function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
      <div>
        <label className="text-[11px] font-semibold text-charcoal block mb-1.5">{label}</label>
        {children}
        {hint && <p className="text-[10px] text-warmgray mt-1">{hint}</p>}
      </div>
    )
  }

  function Card({ title, onSave, children }: { title: string; onSave: () => void; children: React.ReactNode }) {
    return (
      <div className="bg-white rounded-2xl border border-cream-300 overflow-hidden">
        <div className="px-5 py-4 border-b border-cream-200">
          <h2 className="text-sm font-semibold text-charcoal">{title}</h2>
        </div>
        <div className="p-5 space-y-4">
          {children}
          <button onClick={onSave} className="btn btn-primary btn-sm text-xs">Save</button>
        </div>
      </div>
    )
  }

  const inputClass = "w-full px-3 py-2 text-xs border border-cream-300 rounded-lg font-body text-charcoal outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/10 bg-white"
  const textareaClass = `${inputClass} resize-none leading-relaxed`

  return (
    <div className="max-w-[640px] space-y-5">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-espresso text-cream-100 text-xs font-medium px-4 py-2.5 rounded-xl shadow-premium">
          <CheckCircle size={13} /> {toast}
        </div>
      )}

      <Card title="Site Settings" onSave={() => save('Site settings')}>
        <Field label="Site Name"><input defaultValue={siteConfig.name} className={inputClass} /></Field>
        <Field label="Tagline"><input defaultValue={siteConfig.tagline} className={inputClass} /></Field>
        <Field label="Site URL" hint="Used in canonical URLs and OG tags">
          <input value={siteUrl} onChange={e => setSiteUrl(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Default OG Image"><input defaultValue="/images/og-default.jpg" className={inputClass} /></Field>
      </Card>

      <Card title="Affiliate Configuration" onSave={() => save('Affiliate settings')}>
        <Field label="Amazon Tracking ID" hint="Appended as ?tag= to all Amazon links">
          <input value={amazonId} onChange={e => setAmazonId(e.target.value)} className={inputClass} placeholder="your-tag-20" />
        </Field>
        <Field label="Default Disclaimer Text">
          <textarea rows={2} defaultValue="Affiliate links — we may earn a commission at no cost to you" className={textareaClass} />
        </Field>
        <div className="flex items-center justify-between py-1.5 px-3 bg-cream-50 rounded-xl border border-cream-200">
          <div>
            <p className="text-xs font-medium text-charcoal">Show disclaimer on all CTAs</p>
            <p className="text-[10px] text-warmgray mt-0.5">Required for FTC compliance</p>
          </div>
          <Toggle defaultChecked />
        </div>
        <div className="flex items-center justify-between py-1.5 px-3 bg-cream-50 rounded-xl border border-cream-200">
          <div>
            <p className="text-xs font-medium text-charcoal">Track clicks to /api/affiliate/track</p>
            <p className="text-[10px] text-warmgray mt-0.5">Powers the Analytics dashboard</p>
          </div>
          <Toggle defaultChecked />
        </div>
      </Card>

      <Card title="SEO & Analytics" onSave={() => save('SEO settings')}>
        <Field label="Google Analytics ID">
          <input defaultValue="G-XXXXXXXXXX" className={inputClass} placeholder="G-XXXXXXXXXX" />
        </Field>
        <div className="space-y-2">
          {[
            { label: 'Auto-generate sitemap.xml',         hint: 'Rebuilt on every deploy' },
            { label: 'Enable structured data (JSON-LD)',  hint: 'Product, Review, Article, FAQ schemas' },
            { label: 'Breadcrumb schema on all pages',    hint: 'Improves search appearance' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-1.5 px-3 bg-cream-50 rounded-xl border border-cream-200">
              <div>
                <p className="text-xs font-medium text-charcoal">{item.label}</p>
                <p className="text-[10px] text-warmgray mt-0.5">{item.hint}</p>
              </div>
              <Toggle defaultChecked />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Social Links" onSave={() => save('Social links')}>
        {[
          { label: 'Pinterest', value: siteConfig.socialLinks.pinterest },
          { label: 'Instagram', value: siteConfig.socialLinks.instagram },
          { label: 'YouTube',   value: siteConfig.socialLinks.youtube   },
        ].map(s => (
          <Field key={s.label} label={s.label}>
            <input defaultValue={s.value ?? ''} className={inputClass} />
          </Field>
        ))}
      </Card>
    </div>
  )
}
