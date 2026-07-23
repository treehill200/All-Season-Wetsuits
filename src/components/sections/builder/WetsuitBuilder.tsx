import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Plus, RotateCcw, Save, Sparkles } from 'lucide-react'
import { SectionHeading } from '../../ui/SectionHeading'
import { ConfigurationPanel } from './ConfigurationPanel'
import { WetsuitSilhouette } from '../../shared/WetsuitSilhouette'
import { COMPONENTS, DETACHABLE_COMPONENTS } from '../../../data/components'
import { deriveSpec } from '../../../data/configEngine'
import { PRESETS } from '../../../data/presets'
import type { ComponentId } from '../../../data/types'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import { useCursor, useCursorHover } from '../../../context/CursorContext'

const RECOMMENDED: ComponentId[] = ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg']

export function WetsuitBuilder() {
  const [attached, setAttached] = useLocalStorage<ComponentId[]>('asw-builder', RECOMMENDED)
  const [pulsing, setPulsing] = useState<ComponentId | null>(null)
  const [saved, setSaved] = useState(false)
  const [rotation, setRotation] = useState(0)
  const dragging = useRef<{ active: boolean; startX: number; base: number }>({
    active: false,
    startX: 0,
    base: 0,
  })
  const reduced = usePrefersReducedMotion()
  const { setCursor, reset } = useCursor()
  const attachCursor = useCursorHover('attach')

  const spec = deriveSpec(attached)

  const toggle = useCallback(
    (id: ComponentId) => {
      if (id === 'core') return
      setAttached((prev) => {
        if (prev.includes(id)) return prev.filter((c) => c !== id)
        setPulsing(id)
        setTimeout(() => setPulsing(null), 900)
        return [...prev, id]
      })
      setSaved(false)
    },
    [setAttached],
  )

  const reModel = useCallback(
    (list: ComponentId[]) => {
      setAttached(list)
      setSaved(false)
    },
    [setAttached],
  )

  const save = () => {
    // useLocalStorage already persists; this confirms + timestamps.
    localStorage.setItem('asw-builder-saved-at', new Date().toISOString())
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  // Drag-to-rotate the suit.
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragging.current.active) return
      const dx = e.clientX - dragging.current.startX
      setRotation(dragging.current.base + dx * 0.5)
    }
    const up = () => (dragging.current.active = false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <section id="builder" className="relative bg-deep-navy/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="Build Your Suit"
          title="The interactive wetsuit builder"
          subtitle="Click a component to attach or detach it. Watch the specs, water range and price update in real time — then save your configuration."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[280px_1fr_320px]">
          {/* Component tray */}
          <div className="order-2 lg:order-1">
            <div className="mb-3 tech-label">Components</div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {DETACHABLE_COMPONENTS.map((c) => {
                const on = attached.includes(c.id)
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    {...attachCursor}
                    aria-pressed={on}
                    className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                      on
                        ? 'border-ice-blue/50 bg-ice-blue/10'
                        : 'border-white/10 bg-white/[0.02] hover:border-ice-blue/30'
                    }`}
                  >
                    <div>
                      <div className="font-display text-sm text-off-white">{c.label}</div>
                      <div className="font-mono text-[10px] text-off-white/40">+${c.price}</div>
                    </div>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        on ? 'border-ice-blue bg-ice-blue/20 text-ice-blue' : 'border-white/20 text-white/40'
                      }`}
                    >
                      {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Suit stage */}
          <div className="order-1 lg:order-2">
            <div
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-ice-blue/10 bg-[radial-gradient(circle_at_50%_30%,rgba(13,53,83,0.5),transparent_70%)]"
              onMouseEnter={() => setCursor('rotate')}
              onMouseLeave={reset}
              onMouseDown={(e) => {
                dragging.current = { active: true, startX: e.clientX, base: rotation }
              }}
              role="img"
              aria-label={`Wetsuit preview, ${spec.configurationLabel}`}
            >
              {/* connection anchors for detachable pieces not attached */}
              <motion.div
                className="h-full w-full"
                style={{ transform: `perspective(900px) rotateY(${reduced ? 0 : rotation}deg)` }}
              >
                <WetsuitSilhouette
                  attached={attached}
                  pulsing={pulsing}
                  className="mx-auto h-full w-auto py-8"
                  animate={!reduced}
                />
              </motion.div>

              <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-label text-off-white/30">
                Drag to rotate
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => reModel(RECOMMENDED)}
                className="flex items-center gap-2 rounded-full border border-ice-blue/30 px-4 py-2 font-mono text-[11px] uppercase tracking-label text-ice-blue transition-colors hover:bg-ice-blue/10"
              >
                <Sparkles className="h-3.5 w-3.5" /> Recommended
              </button>
              <button
                onClick={() => reModel(['core'])}
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-label text-off-white/70 transition-colors hover:bg-white/5"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <button
                onClick={save}
                className="ml-auto flex items-center gap-2 rounded-full bg-gold/90 px-4 py-2 font-mono text-[11px] uppercase tracking-label text-ocean-black transition-colors hover:bg-gold"
              >
                {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                {saved ? 'Saved' : 'Save This Configuration'}
              </button>
            </div>

            {/* Presets */}
            <div className="mt-6">
              <div className="mb-3 tech-label">Presets</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => reModel(p.attached)}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-left transition-colors hover:border-ice-blue/30"
                  >
                    <div className="font-display text-sm text-off-white">{p.name}</div>
                    <div className="mt-0.5 font-mono text-[9px] leading-tight text-off-white/40">
                      {p.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live panel */}
          <div className="order-3">
            <ConfigurationPanel spec={spec} />
          </div>
        </div>
      </div>
    </section>
  )
}
