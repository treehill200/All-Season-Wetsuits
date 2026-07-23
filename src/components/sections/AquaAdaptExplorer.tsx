import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Waves } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { AQUA_ADAPT_POINTS, AQUA_ADAPT_SPECS } from '../../data/aquaAdapt'
import { WetsuitSilhouette } from '../shared/WetsuitSilhouette'
import { useCursorHover } from '../../context/CursorContext'

const CORE = ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'hood'] as const

export function AquaAdaptExplorer() {
  const [active, setActive] = useState<string | null>(null)
  const viewCursor = useCursorHover('view')
  const point = AQUA_ADAPT_POINTS.find((p) => p.id === active)

  return (
    <section id="aquaadapt" className="relative overflow-hidden bg-ocean-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          label="AquaAdapt System"
          title="Connection technology"
          subtitle="Engineered to connect securely, move naturally, and remain sealed under pressure. Hover a connection point to see the joint separate."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Suit with hotspots */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
            <div className="absolute inset-0 rounded-2xl border border-ice-blue/10 bg-[radial-gradient(circle_at_50%_30%,rgba(13,53,83,0.4),transparent_70%)]" />
            <WetsuitSilhouette attached={[...CORE]} className="relative h-full w-full py-6" />

            {AQUA_ADAPT_POINTS.map((p) => (
              <button
                key={p.id}
                {...viewCursor}
                onMouseEnter={() => setActive(p.id)}
                onFocus={() => setActive(p.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(active === p.id ? null : p.id)}
                aria-label={`Inspect ${p.label}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className="relative flex h-4 w-4">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${
                      active === p.id ? 'bg-gold/40' : 'bg-ice-blue/40'
                    } ${active === p.id ? '' : 'animate-ping'}`}
                  />
                  <span
                    className={`relative inline-flex h-4 w-4 rounded-full border ${
                      active === p.id ? 'border-gold bg-gold/30' : 'border-ice-blue bg-ice-blue/20'
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="min-h-[22rem]">
            <AnimatePresence mode="wait">
              {point ? (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 text-gold">
                    <Lock className="h-4 w-4" strokeWidth={1.5} />
                    <span className="tech-label text-gold">{point.label}</span>
                  </div>
                  <p className="mt-3 text-lg text-off-white">{point.detail}</p>

                  {/* Exploded layers */}
                  <div className="mt-6 space-y-3">
                    {point.layers.map((layer, i) => (
                      <motion.div
                        key={layer.name}
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.12 }}
                        className="flex items-start gap-4 rounded-xl border border-ice-blue/10 bg-white/[0.02] p-4"
                      >
                        <span className="mt-0.5 font-mono text-xs text-ice-blue">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <div className="font-display text-sm text-off-white">{layer.name}</div>
                          <div className="mt-1 text-xs text-seafoam/60">{layer.note}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full flex-col justify-center"
                >
                  <div className="flex items-center gap-2 text-seafoam/70">
                    <Waves className="h-4 w-4" strokeWidth={1.5} />
                    <span className="tech-label">Hover a connection point</span>
                  </div>
                  <p className="mt-3 max-w-sm text-seafoam/60">
                    Each arm, leg and the hood lock to the core through a sealed AquaAdapt joint.
                    Inspect a point to see how the layers separate and seal.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spec chips */}
            <div className="mt-8 flex flex-wrap gap-2 border-t border-ice-blue/10 pt-6">
              {AQUA_ADAPT_SPECS.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ice-blue/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-seafoam/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
