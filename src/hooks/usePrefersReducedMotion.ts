import { useEffect, useState } from 'react'

/**
 * Tracks the user's prefers-reduced-motion setting and lets the app also force
 * reduced motion via a manual toggle (persisted in localStorage).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stored = localStorage.getItem('asw-reduced-motion')

    const update = () => {
      const forced = localStorage.getItem('asw-reduced-motion') === 'true'
      setReduced(media.matches || forced)
    }

    if (stored === null) setReduced(media.matches)
    else update()

    media.addEventListener('change', update)
    window.addEventListener('asw-motion-change', update)
    return () => {
      media.removeEventListener('change', update)
      window.removeEventListener('asw-motion-change', update)
    }
  }, [])

  return reduced
}

export function setForcedReducedMotion(value: boolean) {
  localStorage.setItem('asw-reduced-motion', String(value))
  window.dispatchEvent(new Event('asw-motion-change'))
}

export function getForcedReducedMotion(): boolean {
  return localStorage.getItem('asw-reduced-motion') === 'true'
}
