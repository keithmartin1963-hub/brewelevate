'use client'

import { cn } from '@/lib/utils'

interface PinButtonProps {
  imageUrl: string
  description: string
  pageUrl?: string
  className?: string
  size?: 'sm' | 'md'
}

export function PinButton({ imageUrl, description, pageUrl, className, size = 'md' }: PinButtonProps) {
  function handlePin(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    const media   = encodeURIComponent(imageUrl)
    const desc    = encodeURIComponent(description)
    const pageref = encodeURIComponent(pageUrl ?? (typeof window !== 'undefined' ? window.location.href : ''))

    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${pageref}&media=${media}&description=${desc}`

    window.open(pinterestUrl, '_blank', 'width=750,height=550,scrollbars=yes')
  }

  return (
    <button
      onClick={handlePin}
      aria-label="Save to Pinterest"
      className={cn(
        'pin-button',
        size === 'sm' ? 'px-2 py-1 text-[10px] gap-1' : 'px-3 py-1.5 text-xs',
        className
      )}
    >
      {/* Pinterest P icon */}
      <svg
        viewBox="0 0 24 24"
        className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
      Save
    </button>
  )
}

// ─── Static Pin button for articles and blog footers ─────────────────────────
interface PinShareProps {
  imageUrl: string
  description: string
  className?: string
}

export function PinShare({ imageUrl, description, className }: PinShareProps) {
  function handlePin() {
    const media = encodeURIComponent(imageUrl)
    const desc  = encodeURIComponent(description)
    const page  = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')
    window.open(
      `https://pinterest.com/pin/create/button/?url=${page}&media=${media}&description=${desc}`,
      '_blank',
      'width=750,height=550'
    )
  }

  return (
    <button
      onClick={handlePin}
      className={cn(
        'flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90',
        className
      )}
      style={{ backgroundColor: '#E60023' }}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
      Save to Pinterest
    </button>
  )
}
