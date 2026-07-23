import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type CursorVariant =
  | 'default'
  | 'drag'
  | 'rotate'
  | 'view'
  | 'attach'
  | 'explore'
  | 'hidden'

interface CursorState {
  variant: CursorVariant
  label: string
  setCursor: (variant: CursorVariant) => void
  reset: () => void
}

const LABELS: Record<CursorVariant, string> = {
  default: '',
  drag: 'DRAG',
  rotate: 'ROTATE',
  view: 'VIEW',
  attach: 'ATTACH',
  explore: 'EXPLORE',
  hidden: '',
}

const CursorContext = createContext<CursorState | null>(null)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default')

  const setCursor = useCallback((v: CursorVariant) => setVariant(v), [])
  const reset = useCallback(() => setVariant('default'), [])

  const value = useMemo<CursorState>(
    () => ({ variant, label: LABELS[variant], setCursor, reset }),
    [variant, setCursor, reset],
  )

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}

export function useCursor(): CursorState {
  const ctx = useContext(CursorContext)
  if (!ctx) {
    // Safe fallback so components work outside the provider (e.g. tests).
    return {
      variant: 'default',
      label: '',
      setCursor: () => {},
      reset: () => {},
    }
  }
  return ctx
}

/** Convenience props to make any element set the cursor on hover. */
export function useCursorHover(variant: CursorVariant) {
  const { setCursor, reset } = useCursor()
  return {
    onMouseEnter: () => setCursor(variant),
    onMouseLeave: () => reset(),
  }
}
