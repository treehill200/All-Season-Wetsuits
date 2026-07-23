import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface Props {
  onDone: () => void
}

/**
 * Branded loading sequence: a thin circular water-pressure gauge fills while a
 * line traces a simple wetsuit outline, then the whole overlay lifts away.
 */
export function LoadingSequence({ onDone }: Props) {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const duration = reduced ? 500 : 2100
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setProgress(p)
      if (p < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setExiting(true)
        setTimeout(onDone, reduced ? 100 : 700)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone, reduced])

  const R = 54
  const circ = 2 * Math.PI * R
  const pct = Math.round(progress * 100)

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ocean-black"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg viewBox="0 0 140 140" className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="70" cy="70" r={R} fill="none" stroke="#0d3553" strokeWidth="1.5" />
              <circle
                cx="70"
                cy="70"
                r={R}
                fill="none"
                stroke="#9ed8e8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - progress)}
              />
            </svg>

            {/* Wetsuit outline traced by a line */}
            <svg viewBox="0 0 60 90" className="h-20 w-20">
              <motion.path
                d="M30 6 q-9 0 -10 9 l-8 6 q-3 3 -1 8 l4 -2 l2 34 q1 8 13 8 q12 0 13 -8 l2 -34 l4 2 q2 -5 -1 -8 l-8 -6 q-1 -9 -10 -9 z"
                fill="none"
                stroke="#c9a85d"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="1"
                style={{ pathLength: 1 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
              />
            </svg>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="tech-label">Preparing your conditions</span>
            <span className="font-mono text-2xl text-off-white tabular-nums">{pct}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
