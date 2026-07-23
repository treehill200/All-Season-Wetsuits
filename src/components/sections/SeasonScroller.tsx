import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SEASONS } from '../../data/seasons'
import { WetsuitSilhouette } from '../shared/WetsuitSilhouette'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

export function SeasonScroller() {
  const wrapper = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const reduced = usePrefersReducedMotion()
  const { setCursor, reset } = useCursor()

  useEffect(() => {
    if (reduced) return
    const el = wrapper.current
    if (!el) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${SEASONS.length * 100}%`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const i = Math.min(
            SEASONS.length - 1,
            Math.floor(self.progress * SEASONS.length),
          )
          setIndex(i)
        },
      })
    }, el)

    return () => ctx.revert()
  }, [reduced])

  const season = SEASONS[index]

  // Reduced-motion fallback: simple stacked cards.
  if (reduced) {
    return (
      <section id="seasons" className="bg-ocean-black py-24">
        <div className="mx-auto max-w-5xl space-y-8 px-5 sm:px-8">
          {SEASONS.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-ice-blue/10 p-8"
              style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[2]})` }}
            >
              <span className="tech-label" style={{ color: s.accent }}>
                {s.name}
              </span>
              <h3 className="mt-2 font-display text-3xl">{s.headline}</h3>
              <p className="mt-3 max-w-xl text-seafoam/70">{s.copy}</p>
              <p className="mt-3 font-mono text-xs text-off-white/50">{s.configuration}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="seasons"
      ref={wrapper}
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setCursor('explore')}
      onMouseLeave={reset}
    >
      {/* Environment background cross-fade */}
      <AnimatePresence>
        <motion.div
          key={season.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 50% 20%, ${season.gradient[0]}, ${season.gradient[1]} 45%, ${season.gradient[2]})`,
          }}
        />
      </AnimatePresence>

      {/* Wave / ripple transition layer */}
      <div
        className="absolute inset-x-0 top-0 h-full opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            'repeating-linear-gradient(100deg, rgba(255,255,255,0.06) 0px, transparent 8px, transparent 40px)',
        }}
      />

      {/* Fixed section label */}
      <div className="absolute left-5 top-24 z-10 sm:left-8">
        <span className="tech-label">Scroll Through the Seasons</span>
      </div>

      {/* Progress rail */}
      <div className="absolute right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3 sm:right-8">
        {SEASONS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <span
              className={`font-mono text-[10px] uppercase tracking-label transition-colors ${
                i === index ? 'text-off-white' : 'text-off-white/30'
              }`}
            >
              {s.name}
            </span>
            <span
              className="h-px transition-all duration-500"
              style={{
                width: i === index ? 28 : 12,
                background: i === index ? s.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="grid w-full max-w-5xl items-center gap-8 md:grid-cols-2">
          {/* Suit stays centered/pinned; config morphs per season */}
          <div className="flex justify-center">
            <motion.div
              animate={reduced ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <WetsuitSilhouette
                attached={season.attached}
                accent={season.accent}
                className="h-[46vh] w-auto"
              />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={season.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-display text-6xl font-semibold sm:text-7xl" style={{ color: season.accent }}>
                {season.name}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-snug text-off-white sm:text-3xl">
                {season.headline}
              </h3>
              <p className="mt-4 max-w-md text-seafoam/70">{season.copy}</p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                <div>
                  <div className="tech-label mb-1">Setup</div>
                  <div className="font-mono text-xs text-off-white">{season.configuration}</div>
                </div>
                <div>
                  <div className="tech-label mb-1">Warmth</div>
                  <div className="font-mono text-xs text-off-white">{season.warmth}</div>
                </div>
                <div>
                  <div className="tech-label mb-1">Flex</div>
                  <div className="font-mono text-xs text-off-white">{season.flexibility}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
