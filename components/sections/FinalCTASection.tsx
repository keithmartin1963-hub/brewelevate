import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function FinalCTASection() {
  return (
    <section className="bg-espresso py-20 md:py-28">
      <div className="container-brew">
        <div className="max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <p className="text-[10px] font-medium uppercase tracking-widest text-gold-400/80 mb-6">
            Ready to upgrade?
          </p>

          {/* Headline */}
          <h2
            className="font-heading font-semibold text-cream leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            Find your perfect
            <br />
            <em className="not-italic text-gold-400">espresso setup.</em>
          </h2>

          {/* Subhead */}
          <p className="mt-6 text-cream/60 text-lg leading-relaxed max-w-xl mx-auto">
            Start with our buying guides — each one includes tested recommendations,
            a comparison table, and honest pros and cons.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/buying-guide/best-espresso-machines-under-1000"
              className="btn btn-gold btn-lg group"
            >
              Best Espresso Machines
              <ArrowRight size={16} strokeWidth={1.75} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/buying-guide/best-burr-coffee-grinders"
              className="btn btn-sm px-6 py-3.5 text-sm rounded-full text-cream/70 border border-cream/20 hover:text-cream hover:border-cream/40 transition-colors"
            >
              Best Grinders
            </Link>
            <Link
              href="/setups"
              className="btn btn-sm px-6 py-3.5 text-sm rounded-full text-cream/70 border border-cream/20 hover:text-cream hover:border-cream/40 transition-colors"
            >
              Setup Ideas
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-xs text-cream/30">
            All recommendations are independently tested. Affiliate links help support BrewElevate at no cost to you.
          </p>
        </div>
      </div>
    </section>
  )
}
