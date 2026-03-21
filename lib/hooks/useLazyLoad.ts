'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useLazyLoad — defer rendering until element is near the viewport.
 *
 * Usage:
 *   const { ref, visible } = useLazyLoad()
 *   return <div ref={ref}>{visible ? <ExpensiveComponent /> : <Skeleton />}</div>
 *
 * @param rootMargin  IntersectionObserver rootMargin — how early to start loading
 *                    Default: '200px' loads 200px before entering viewport
 */
export function useLazyLoad(rootMargin = '200px') {
  const ref     = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || visible) return

    // Fallback: if IntersectionObserver not available (old browsers), show immediately
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rootMargin, visible])

  return { ref, visible }
}

/**
 * useImageLoaded — track when an <img> finishes loading.
 * Useful for fade-in effects without needing a library.
 *
 * Usage:
 *   const { imgRef, loaded } = useImageLoaded()
 *   return <img ref={imgRef} className={loaded ? 'opacity-100' : 'opacity-0'} ... />
 */
export function useImageLoaded() {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!imgRef.current) return
    if (imgRef.current.complete) { setVisible(true); return }
    imgRef.current.onload  = () => setLoaded(true)
    imgRef.current.onerror = () => setLoaded(true) // don't hang on error
    return () => {
      if (imgRef.current) {
        imgRef.current.onload  = null
        imgRef.current.onerror = null
      }
    }
  }, [])

  // Fix: use setLoaded not setVisible
  function setVisible(val: boolean) { setLoaded(val) }

  return { imgRef, loaded }
}
