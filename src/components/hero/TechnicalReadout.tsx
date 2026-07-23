import { AnimatePresence, motion } from 'framer-motion'
import type { TemperatureState } from '../../data/types'
import { COMPONENTS } from '../../data/components'

interface Props {
  state: TemperatureState
  accent: string
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ice-blue/10 py-3 first:border-t-0">
      <div className="tech-label mb-1">{label}</div>
      <div className="font-display text-lg text-off-white">{children}</div>
    </div>
  )
}

export function TechnicalReadout({ state, accent }: Props) {
  const attachedLabels = state.attached
    .filter((id) => id !== 'core')
    .map((id) => COMPONENTS[id].short)

  return (
    <div className="glass-panel w-full rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="tech-label">Live Readout</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-seafoam/70">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: accent }}
          />
          ADAPTING
        </span>
      </div>

      <Row label="Water Temperature">
        <span style={{ color: accent }}>{state.temperature}°F</span>
      </Row>
      <Row label="Configuration">
        <AnimatePresence mode="wait">
          <motion.span
            key={state.configuration}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {state.configuration}
          </motion.span>
        </AnimatePresence>
      </Row>

      <div className="grid grid-cols-2 gap-4">
        <Row label="Warmth">{state.warmth}</Row>
        <Row label="Flexibility">{state.flexibility}</Row>
      </div>

      <Row label="Best For">{state.bestFor}</Row>

      <div className="border-t border-ice-blue/10 pt-3">
        <div className="tech-label mb-2">Attached Components</div>
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full border border-ice-blue/20 px-2.5 py-1 font-mono text-[10px] text-seafoam">
            Core
          </span>
          <AnimatePresence>
            {attachedLabels.map((label) => (
              <motion.span
                key={label}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                style={{
                  border: `1px solid ${accent}55`,
                  color: accent,
                }}
              >
                {label}
              </motion.span>
            ))}
          </AnimatePresence>
          {attachedLabels.length === 0 && (
            <span className="font-mono text-[10px] text-off-white/40">
              Sleeveless — nothing attached
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
