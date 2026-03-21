import Link from 'next/link'
import { Coffee } from 'lucide-react'
import { siteConfig, footerNav } from '@/lib/config/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-cream-200">
      {/* Main footer */}
      <div className="container-brew pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-espresso-400 border border-cream-100/10 flex items-center justify-center">
                <Coffee size={16} className="text-gold-400" strokeWidth={1.75} />
              </div>
              <span className="font-heading font-semibold text-xl text-cream-100">
                Brew<span className="text-gold-400">Elevate</span>
              </span>
            </Link>
            <p className="text-sm text-cream-300/70 leading-relaxed mb-5">
              {siteConfig.tagline}. Expert guides and honest reviews for home baristas.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {siteConfig.socialLinks.pinterest && (
                <SocialLink href={siteConfig.socialLinks.pinterest} label="Pinterest">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </SocialLink>
              )}
              {siteConfig.socialLinks.instagram && (
                <SocialLink href={siteConfig.socialLinks.instagram} label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </SocialLink>
              )}
              {siteConfig.socialLinks.youtube && (
                <SocialLink href={siteConfig.socialLinks.youtube} label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                  </svg>
                </SocialLink>
              )}
            </div>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream-100/50 mb-5">
              Buying Guides
            </h3>
            <ul className="space-y-3">
              {footerNav.guides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-300/70 hover:text-gold-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream-100/50 mb-5">
              Learn
            </h3>
            <ul className="space-y-3">
              {footerNav.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-300/70 hover:text-gold-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream-100/50 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-300/70 hover:text-gold-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Affiliate disclosure + copyright */}
      <div className="border-t border-cream-100/10">
        <div className="container-brew py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-cream-300/50 max-w-xl leading-relaxed">
            <strong className="text-cream-300/70 font-medium">Affiliate Disclosure:</strong>{' '}
            BrewElevate participates in affiliate programs including the Amazon Services LLC Associates Program.
            We may earn commissions from qualifying purchases at no additional cost to you.{' '}
            <Link href="/privacy#affiliate-disclosure" className="underline hover:text-gold-400 transition-colors">
              Learn more
            </Link>
          </p>
          <p className="text-xs text-cream-300/40 flex-shrink-0">
            © {year} BrewElevate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-cream-100/10 hover:bg-gold-400/20 flex items-center justify-center text-cream-300/70 hover:text-gold-400 transition-colors duration-150"
    >
      {children}
    </a>
  )
}
