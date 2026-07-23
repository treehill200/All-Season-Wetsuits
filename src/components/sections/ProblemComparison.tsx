import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Archive, DollarSign, Layers, Package } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { useCursorHover } from '../../context/CursorContext'

interface Stat {
  icon: typeof Archive
  label: string
  traditional: string
  system: string
}

const STATS: Stat[] = [
  { icon: Layers, label: 'Wetsuits needed', traditional: '4 separate suits', system: '1 adaptable suit' },
  { icon: Archive, label: 'Storage space', traditional: 'More storage required', system: 'Compact modular kit' },
  { icon: DollarSign, label: 'Total cost', traditional: '$1,180 est.', system: '$289 + modules' },
  { icon: Package, label: 'Products to manage', traditional: '7+ items', system: 'One system' },
]

export function ProblemComparison() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const cursor = useCursorHover('drag')

  const updateFromClient = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(6, Math.min(94, p)))
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => dragging.current && updateFromClient(e.clientX)
    const touch = (e: TouchEvent) => dragging.current && updateFromClient(e.touches[0].clientX)
    const stop = () => (dragging.current = false)
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', touch, { passive: true })
    window.addEventListener('mouseup', stop)
    window.addEventListener('touchend', stop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', touch)
      window.removeEventListener('mouseup', stop)
      window.removeEventListener('touchend', stop)
    }
  }, [updateFromClient])

  return (
    <section id="problem" className="relative bg-ocean-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          label="The Problem"
          title={
            <>
              Why buy four wetsuits
              <br />
              when one can adapt?
            </>
          }
          subtitle="Most surfers own a summer suit, a spring suit, a winter suit and a bag of accessories. All Season replaces the whole rack with one modular system."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          {/* Interactive divider */}
          <div
            ref={containerRef}
            className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-ice-blue/10"
            {...cursor}
          >
            {/* Traditional side */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1512] to-[#0a0806] p-6 sm:p-8">
              <span className="tech-label text-gold/70">Traditional Setup</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Summer', 'Spring', 'Winter', 'Hood', 'Gloves', 'Boots', 'Bag'].map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-off-white/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                <div className="font-display text-2xl text-off-white/80">4 separate wetsuits</div>
                <div className="mt-1 font-mono text-xs text-gold/70">Higher total cost · More storage</div>
              </div>
            </div>

            {/* System side (clipped) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-deep-navy to-ocean-black p-6 sm:p-8"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <div className="flex justify-end">
                <span className="tech-label text-ice-blue/80">All Season System</span>
              </div>
              <div className="mt-4 flex flex-wrap justify-end gap-2">
                {['Core suit', '+ Arms', '+ Legs', '+ Hood'].map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-ice-blue/25 bg-ice-blue/5 px-3 py-2 font-mono text-xs text-ice-blue"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-right sm:bottom-8 sm:right-8">
                <div className="font-display text-2xl text-off-white">1 adaptable wetsuit</div>
                <div className="mt-1 font-mono text-xs text-ice-blue/70">One complete solution</div>
              </div>
            </div>

            {/* Divider handle */}
            <div
              className="absolute top-0 bottom-0 z-10 w-0.5 bg-ice-blue/70"
              style={{ left: `${pos}%` }}
            >
              <button
                className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ice-blue/60 bg-ocean-black/90 backdrop-blur"
                onMouseDown={() => (dragging.current = true)}
                onTouchStart={() => (dragging.current = true)}
                aria-label="Drag to compare setups"
              >
                <span className="font-mono text-ice-blue">⇄</span>
              </button>
            </div>
          </div>

          {/* Live stats */}
          <div className="space-y-3">
            {STATS.map((stat, i) => {
              const showSystem = pos < 55
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between rounded-xl border border-ice-blue/10 bg-white/[0.02] px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-seafoam/70" strokeWidth={1.5} />
                    <span className="tech-label">{stat.label}</span>
                  </div>
                  <motion.span
                    key={showSystem ? 'sys' : 'trad'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-sm"
                    style={{ color: showSystem ? '#9ed8e8' : '#c9a85d' }}
                  >
                    {showSystem ? stat.system : stat.traditional}
                  </motion.span>
                </motion.div>
              )
            })}
            <p className="pt-2 font-mono text-xs text-off-white/40">
              Drag the divider. The numbers update as you move toward the modular system.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
