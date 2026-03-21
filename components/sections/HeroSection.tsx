import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-cream">

      {/* Background texture — subtle warm gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(201,168,76,0.07) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 50% 80% at 90% 20%, rgba(44,24,16,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container-brew relative z-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left: Editorial copy ─────────────────────── */}
          <div className="lg:col-span-6 xl:col-span-5">

            {/* Eyebrow */}
            <p className="text-label mb-6">
              Gear Guides for Home Baristas
            </p>

            {/* Headline — Playfair, large, tight */}
            <h1
              className="font-heading font-semibold text-charcoal leading-[1.08] tracking-tight"
              style={{ fontSize: 'clamp(2.75rem, 5vw, 4.25rem)' }}
            >
              Brew coffee
              <br />
              <em className="not-italic text-espresso">worth waking</em>
              <br />
              up for.
            </h1>

            {/* Subhead */}
            <p className="mt-6 text-warmgray text-lg leading-relaxed max-w-md">
              Expert buying guides, honest reviews, and setup inspiration
              for the home barista. We test everything so you can choose
              with confidence.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/guides"
                className="btn btn-primary btn-lg group"
              >
                Explore Gear Guides
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href="/setups"
                className="btn btn-secondary btn-lg"
              >
                Setup Inspiration
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="mt-12 flex items-center gap-6 pt-8 border-t border-cream-300">
              <Stat value="14" label="Machines Tested" />
              <div className="w-px h-8 bg-cream-300" />
              <Stat value="6 wks" label="Testing Period" />
              <div className="w-px h-8 bg-cream-300" />
              <Stat value="100%" label="Hands-On" />
            </div>
          </div>

          {/* ── Right: Hero visual grid ──────────────────── */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <HeroImageGrid />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-cream))' }}
        aria-hidden="true"
      />
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-heading font-semibold text-espresso text-xl leading-none">{value}</p>
      <p className="text-xs text-warmgray mt-1">{label}</p>
    </div>
  )
}

function HeroImageGrid() {
  return (
    <div className="relative grid grid-cols-12 grid-rows-10 gap-3 h-[520px] lg:h-[580px]">

      {/* Large main image — espresso machine */}
      <div className="col-span-7 row-span-7 rounded-2xl overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80"
          alt="Espresso being pulled from a professional machine"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Subtle label */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-medium uppercase tracking-widest bg-white/80 backdrop-blur-sm text-espresso px-2.5 py-1 rounded-full">
            Breville Barista Express
          </span>
        </div>
      </div>

      {/* Top-right: grinder */}
      <div className="col-span-5 row-span-4 rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&q=80"
          alt="Coffee grinder with fresh beans"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Middle-right: kettle */}
      <div className="col-span-5 row-span-3 rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1607868894064-2b6e7ed1b324?w=500&q=80"
          alt="Fellow Stagg EKG kettle"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Bottom-left: latte art */}
      <div className="col-span-4 row-span-3 rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80"
          alt="Latte art in a ceramic cup"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Bottom-middle: coffee beans */}
      <div className="col-span-4 row-span-3 rounded-2xl overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=400&q=80"
          alt="Fresh roasted coffee beans"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gold accent card */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent flex items-end p-3">
          <p className="text-[11px] font-medium text-gold-300 leading-snug">
            Tested &amp; ranked
          </p>
        </div>
      </div>

      {/* Bottom-right: floating score card */}
      <div className="col-span-4 row-span-3 rounded-2xl bg-espresso flex flex-col items-center justify-center gap-1 p-4">
        <p className="text-[10px] font-medium uppercase tracking-widest text-gold-400/80">
          Top Rated
        </p>
        <p className="font-heading font-semibold text-cream text-3xl leading-none">4.5</p>
        <div className="flex gap-0.5 mt-0.5">
          {[1,2,3,4].map(i => (
            <svg key={i} viewBox="0 0 20 20" className="w-3 h-3">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="#C9A84C"/>
            </svg>
          ))}
          <svg viewBox="0 0 20 20" className="w-3 h-3">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="rgba(201,168,76,0.3)"/>
          </svg>
        </div>
        <p className="text-[10px] text-cream/50 mt-1">Barista Express</p>
      </div>
    </div>
  )
}
