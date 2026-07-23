import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCursor } from '../../context/CursorContext'

/**
 * A restrained custom cursor: a soft dot with a faint outer ring that grows and
 * shows a context label (DRAG / ROTATE / VIEW / ATTACH / EXPLORE). Disabled on
 * touch / coarse-pointer devices.
 */
export function CustomCursor() {
  const { variant, label } = useCursor()
  const [enabled, setEnabled] = useState(false)
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = () => {
      const ok = fine.matches
      setEnabled(ok)
      document.body.classList.toggle('custom-cursor-active', ok)
    }
    apply()
    fine.addEventListener('change', apply)
    return () => {
      fine.removeEventListener('change', apply)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }
    const loop = () => {
      // Ring lags slightly for a fluid feel.
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }
      raf.current = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    raf.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  if (!enabled || variant === 'hidden') return null

  const hasLabel = label.length > 0
  const ringSize = hasLabel ? 68 : 34

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      <div
        ref={dot}
        className="fixed left-0 top-0"
        style={{ transform: 'translate(-100px,-100px)' }}
      >
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-off-white mix-blend-difference" />
      </div>
      <div
        ref={ring}
        className="fixed left-0 top-0"
        style={{ transform: 'translate(-100px,-100px)' }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-ice-blue/60"
          animate={{ width: ringSize, height: ringSize }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          style={{ marginLeft: -ringSize / 2, marginTop: -ringSize / 2 }}
        >
          <AnimatePresence>
            {hasLabel && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="font-mono text-[9px] uppercase tracking-label text-ice-blue"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
