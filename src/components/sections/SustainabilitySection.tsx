import { motion } from 'framer-motion'
import { ArrowRight, Recycle } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { LIFECYCLE, SUSTAINABILITY_POINTS } from '../../data/nav'

export function SustainabilitySection() {
  return (
    <section
      id="sustainability"
      className="relative overflow-hidden bg-gradient-to-b from-ocean-black via-deep-navy/40 to-ocean-black py-24 sm:py-32"
    >
      {/* Quiet atmospheric current lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg className="h-full w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M0 ${80 + i * 70} Q 400 ${40 + i * 70}, 800 ${80 + i * 70} T 1600 ${80 + i * 70}`}
              fill="none"
              stroke="#9ed8e8"
              strokeWidth="1"
              animate={{ x: [0, -100, 0] }}
              transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <SectionHeading
          index="07"
          label="Sustainability"
          title="Replace the part, not the entire suit."
          subtitle="Damage an arm or a leg and you replace that one component — not a whole wetsuit. Fewer suits made, fewer suits landfilled, longer life on the water."
          align="center"
        />

        {/* Lifecycle */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {LIFECYCLE.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-3"
            >
              <div
                className={`rounded-full border px-4 py-2.5 font-mono text-xs uppercase tracking-label ${
                  stage === 'Replace a Part'
                    ? 'border-gold/50 bg-gold/10 text-gold'
                    : 'border-ice-blue/25 text-seafoam/80'
                }`}
              >
                {stage}
              </div>
              {i < LIFECYCLE.length - 1 && (
                <ArrowRight className="h-4 w-4 text-off-white/30" strokeWidth={1.5} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Points */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
          {SUSTAINABILITY_POINTS.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 text-left"
            >
              <Recycle className="h-4 w-4 flex-shrink-0 text-seafoam/60" strokeWidth={1.5} />
              <span className="text-sm text-off-white/70">{p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
