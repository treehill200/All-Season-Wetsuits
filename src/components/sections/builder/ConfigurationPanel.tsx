import { motion } from 'framer-motion'
import type { DerivedSpec } from '../../../data/configEngine'
import { formatRange } from '../../../data/configEngine'
import { RatingMeter } from '../../ui/RatingMeter'

interface Props {
  spec: DerivedSpec
}

export function ConfigurationPanel({ spec }: Props) {
  return (
    <div className="glass-panel flex flex-col gap-5 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <span className="tech-label">Configuration</span>
        <motion.span
          key={spec.price}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl text-gold"
        >
          ${spec.price}
        </motion.span>
      </div>

      <div>
        <div className="tech-label mb-1">Current Setup</div>
        <div className="font-display text-lg text-off-white">{spec.configurationLabel}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="tech-label mb-1">Water Range</div>
          <div className="font-mono text-sm text-ice-blue">{formatRange(spec.waterRange)}</div>
        </div>
        <div>
          <div className="tech-label mb-1">Pieces</div>
          <div className="font-mono text-sm text-off-white">{spec.pieceCount}</div>
        </div>
      </div>

      <div className="space-y-4">
        <RatingMeter label="Warmth" rating={spec.warmth} accent="#c9a85d" />
        <RatingMeter label="Flexibility" rating={spec.flexibility} accent="#9ed8e8" />
      </div>

      <div>
        <div className="tech-label mb-1">Recommended For</div>
        <div className="text-sm text-seafoam/80">{spec.bestFor}</div>
      </div>
    </div>
  )
}
