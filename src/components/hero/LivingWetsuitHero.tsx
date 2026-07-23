import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AtmosphereOverlay } from './AtmosphereOverlay'
import { TemperatureSlider } from './TemperatureSlider'
import { TechnicalReadout } from './TechnicalReadout'
import { AmbienceControl } from './AmbienceControl'
import { temperatureState } from '../../data/configEngine'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useDeviceQuality } from '../../hooks/useDeviceQuality'
import { useCursor } from '../../context/CursorContext'

const HeroScene = lazy(() =>
  import('./HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function LivingWetsuitHero() {
  const [temp, setTemp] = useState(65)
  const reduced = usePrefersReducedMotion()
  const quality = useDeviceQuality()
  const { setCursor, reset } = useCursor()
  const pointer = useRef({ x: 0, y: 0 })
  const [, force] = useState(0)

  const state = temperatureState(temp)
  const accent = state.environment.light

  // Track pointer for the 3D model to react to (throttled via rAF flag).
  useEffect(() => {
    if (reduced) return
    let ticking = false
    const onMove = (e: MouseEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          force((n) => n + 1)
          ticking = false
        })
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced])

  const enter3D = useCallback(() => setCursor('rotate'), [setCursor])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Living wetsuit hero"
    >
      <AtmosphereOverlay
        gradient={state.environment.gradient}
        mist={state.environment.mist}
        reduced={reduced}
      />

      {/* 3D layer */}
      <div
        className="absolute inset-0"
        onMouseEnter={enter3D}
        onMouseLeave={reset}
        aria-hidden
      >
        <Suspense fallback={<div className="absolute inset-0" />}>
          <HeroScene
            attached={state.attached}
            accent={accent}
            turbulence={state.environment.turbulence}
            pointer={pointer.current}
            reduced={reduced}
            quality={quality}
          />
        </Suspense>
      </div>

      {/* Top ambience control */}
      <div className="relative z-20 flex justify-end px-5 pt-24 sm:px-8">
        <AmbienceControl />
      </div>

      {/* Headline */}
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-shadow-soft font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          ONE SUIT.
          <br />
          EVERY SEASON.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-6 font-mono text-sm uppercase tracking-label text-seafoam/80 sm:text-base"
        >
          Attach. Detach. Adapt.
        </motion.p>
      </div>

      {/* Bottom control cluster */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-6 px-5 pb-10 sm:px-8 lg:grid-cols-[1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col items-center gap-4 lg:items-start"
        >
          <TemperatureSlider value={temp} onChange={setTemp} accent={accent} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="w-full lg:w-80"
        >
          <TechnicalReadout state={state} accent={accent} />
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5 text-off-white/40" />
        </motion.div>
      )}
    </section>
  )
}
