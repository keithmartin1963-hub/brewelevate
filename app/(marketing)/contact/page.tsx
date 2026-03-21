'use client'

import { useState }         from 'react'
import type { Metadata }    from 'next'
import { Navbar, NavSpacer } from '@/components/layout/Navbar'
import { Footer }            from '@/components/layout/Footer'
import { Section }           from '@/components/ui/Section'
import { CheckCircle }       from 'lucide-react'

// Note: metadata export must be in a server component.
// For a page using 'use client', move metadata to a parent layout
// or use a separate server component wrapper.

export default function ContactPage() {
  const [sent, setSent]   = useState(false)
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('general')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In production: POST to /api/contact
    setSent(true)
  }

  const inputClass = 'w-full px-4 py-3 border border-cream-300 rounded-xl font-body text-sm text-charcoal outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/10 bg-white transition-colors'

  return (
    <>
      <Navbar />
      <NavSpacer />
      <main>
        <Section background="cream">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">

            {/* Left: info */}
            <div>
              <p className="text-label mb-4">Get in Touch</p>
              <h1 className="heading-display text-charcoal mb-6">Contact us.</h1>
              <p className="text-lg text-warmgray leading-relaxed mb-8">
                We read every message. Response time is typically 1–3 business days.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Editorial enquiries',  body: 'Corrections, feedback on a guide, or suggesting a product we should test.' },
                  { title: 'Brand partnerships',   body: 'We consider long-term partnerships with brands whose products we already test and recommend.' },
                  { title: 'Affiliate enquiries',  body: 'Questions about our affiliate program participation or commission structures.' },
                  { title: 'Privacy requests',     body: 'Data requests, opt-outs, or privacy policy questions.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{item.title}</p>
                      <p className="text-warmgray text-sm leading-relaxed mt-0.5">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div>
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-8 bg-white rounded-2xl border border-cream-300">
                  <CheckCircle size={40} className="text-green-500 mb-4" />
                  <h2 className="font-heading font-semibold text-xl text-charcoal mb-2">Message sent</h2>
                  <p className="text-warmgray text-sm leading-relaxed">
                    Thanks for reaching out. We'll get back to you within 1–3 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-charcoal block mb-1.5">Name</label>
                      <input
                        required value={name} onChange={e => setName(e.target.value)}
                        placeholder="Your name" className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal block mb-1.5">Email</label>
                      <input
                        type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com" className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-charcoal block mb-1.5">Subject</label>
                    <select
                      value={subject} onChange={e => setSubject(e.target.value)}
                      className={inputClass}
                    >
                      <option value="general">General enquiry</option>
                      <option value="editorial">Editorial feedback</option>
                      <option value="brand">Brand partnership</option>
                      <option value="affiliate">Affiliate enquiry</option>
                      <option value="privacy">Privacy request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-charcoal block mb-1.5">Message</label>
                    <textarea
                      required rows={6} value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="Tell us what's on your mind…"
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full justify-center py-3.5">
                    Send Message
                  </button>

                  <p className="text-[11px] text-warmgray/60 text-center">
                    By submitting this form you agree to our privacy policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
