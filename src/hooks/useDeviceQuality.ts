import { useEffect, useState } from 'react'

/**
 * Picks a rendering quality tier from device signals so weaker devices get a
 * lighter 3D scene. Errs toward 'low' on small screens and low core counts.
 */
export function useDeviceQuality(): 'high' | 'low' {
  const [quality, setQuality] = useState<'high' | 'low'>('high')

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4
    const small = window.matchMedia('(max-width: 768px)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const weak = cores <= 4 || mem <= 4
    setQuality(small || (coarse && weak) ? 'low' : 'high')
  }, [])

  return quality
}
