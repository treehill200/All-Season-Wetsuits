import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { PERFORMANCE_METRICS, FIELD_REPORTS } from '../../data/performance'
import { useInView } from '../../hooks/useInView'

function RadialMeter({
  value,
  label,
  display,
  note,
  delay,
  active,
}: {
  value: number
  label: string
  display: string
  note: string
  delay: number
  active: boolean
}) {
  const R = 42
  const circ = 2 * Math.PI * R
  return (
    <div className="flex flex-col items-center rounded-2xl border border-ice-blue/10 bg-white/[0.02] p-5 text-center">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="#122c40" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="#9ed8e8"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: active ? circ * (1 - value / 100) : circ }}
            transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl text-off-white">{display}</span>
        </div>
      </div>
      <div className="mt-3 tech-label">{label}</div>
      <div className="mt-1 font-mono text-[10px] leading-tight text-off-white/40">{note}</div>
    </div>
  )
}

export function PerformanceDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref, { threshold: 0.2 })
  const [report, setReport] = useState(0)
  const current = FIELD_REPORTS[report]

  return (
    <section id="performance" className="relative bg-ocean-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          label="Product Performance"
          title="Measured, not marketed"
          subtitle="Every configuration is lab-tested and field-verified. Warmth, flexibility, durability and seal integrity across the full temperature range."
        />

        <div ref={ref} className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {PERFORMANCE_METRICS.map((m, i) => (
            <RadialMeter
              key={m.id}
              value={m.value}
              label={m.label}
              display={m.display}
              note={m.note}
              delay={i * 0.1}
              active={active}
            />
          ))}
        </div>

        {/* Field test terminal */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-ice-blue/15 bg-gradient-to-b from-deep-navy/60 to-ocean-black p-6 font-mono">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 text-ice-blue">
                <Activity className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-label">Field Test {current.id}</span>
              </span>
              <span className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-gold/60" />
                <span className="h-2 w-2 rounded-full bg-ice-blue/60" />
                <span className="h-2 w-2 rounded-full bg-seafoam/60" />
              </span>
            </div>
            <motion.dl
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3 text-sm"
            >
              {[
                ['Location', current.location],
                ['Water', current.water],
                ['Session', current.session],
                ['Configuration', current.configuration],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-off-white/40">{k}</dt>
                  <dd className="text-off-white">{v}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1">
                <dt className="text-off-white/40">Result</dt>
                <dd className="text-ice-blue">{current.result}</dd>
              </div>
            </motion.dl>
            <div className="mt-5 flex gap-2">
              {FIELD_REPORTS.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setReport(i)}
                  aria-label={`View field test ${r.id}`}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i === report ? 'bg-ice-blue' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Temperature arc */}
          <div className="flex flex-col justify-center rounded-2xl border border-ice-blue/10 bg-white/[0.02] p-8">
            <span className="tech-label mb-6">Operating Temperature Range</span>
            <svg viewBox="0 0 400 200" className="w-full">
              <defs>
                <linearGradient id="tempArc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9ed8e8" />
                  <stop offset="50%" stopColor="#b8d9d1" />
                  <stop offset="100%" stopColor="#c9a85d" />
                </linearGradient>
              </defs>
              <path d="M40 180 A160 160 0 0 1 360 180" fill="none" stroke="#122c40" strokeWidth="10" strokeLinecap="round" />
              <motion.path
                d="M40 180 A160 160 0 0 1 360 180"
                fill="none"
                stroke="url(#tempArc)"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: active ? 1 : 0 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
              <text x="40" y="198" className="fill-ice-blue font-mono" fontSize="13">42°F</text>
              <text x="330" y="198" className="fill-gold font-mono" fontSize="13">84°F</text>
              <text x="175" y="120" className="fill-off-white font-mono" fontSize="15">42–84°F</text>
              <text x="150" y="145" className="fill-seafoam/60 font-mono" fontSize="10">TOTAL ADAPTABLE SPAN</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
