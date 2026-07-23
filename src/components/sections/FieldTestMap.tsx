import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Quote } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { FIELD_TESTS } from '../../data/fieldTests'
import { useCursorHover } from '../../context/CursorContext'

export function FieldTestMap() {
  const [active, setActive] = useState(FIELD_TESTS[1].id)
  const viewCursor = useCursorHover('view')
  const test = FIELD_TESTS.find((t) => t.id === active)!

  return (
    <section id="reviews" className="relative bg-deep-navy/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="08"
          label="Field Stories"
          title="Tested on every coastline"
          subtitle="Real sessions from real water. Select a marker to read how the suit was configured and how it held up."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          {/* Map */}
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-ice-blue/10 bg-[radial-gradient(circle_at_50%_50%,rgba(13,53,83,0.35),#04101c)]">
            {/* stylized continents */}
            <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
              <g fill="#0d3553" stroke="#9ed8e8" strokeWidth="0.15" strokeOpacity="0.4">
                <path d="M4 12 L22 8 L26 20 L18 34 L8 30 L3 20 Z" />
                <path d="M26 30 L34 26 L38 44 L28 46 Z" />
                <path d="M40 8 L58 6 L60 16 L50 22 L42 18 Z" />
                <path d="M50 24 L64 22 L66 36 L54 40 Z" />
                <path d="M74 60 M76 66 L86 64 L88 76 L78 80 L72 72 Z" />
                <path d="M72 30 L88 28 L90 40 L76 44 Z" />
              </g>
            </svg>
            {/* latitude grid */}
            <div className="absolute inset-0 opacity-20">
              {[25, 50, 75].map((y) => (
                <div key={y} className="absolute inset-x-0 h-px bg-ice-blue/20" style={{ top: `${y}%` }} />
              ))}
              {[25, 50, 75].map((x) => (
                <div key={x} className="absolute inset-y-0 w-px bg-ice-blue/20" style={{ left: `${x}%` }} />
              ))}
            </div>

            {FIELD_TESTS.map((t) => (
              <button
                key={t.id}
                {...viewCursor}
                onClick={() => setActive(t.id)}
                onMouseEnter={() => setActive(t.id)}
                aria-label={`${t.name}, ${t.location}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
              >
                <span className="relative flex flex-col items-center">
                  {active === t.id && (
                    <span className="absolute -top-1 h-8 w-8 animate-pulse-ring rounded-full bg-gold/40" />
                  )}
                  <MapPin
                    className={`h-6 w-6 drop-shadow transition-colors ${
                      active === t.id ? 'text-gold' : 'text-ice-blue'
                    }`}
                    strokeWidth={2}
                    fill={active === t.id ? '#c9a85d' : 'transparent'}
                  />
                </span>
              </button>
            ))}
          </div>

          {/* Review card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-2xl p-7"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="font-display text-2xl text-off-white">{test.name}</div>
                  <div className="tech-label mt-1">{test.location}</div>
                </div>
                <span className="font-display text-3xl text-ice-blue">{test.water}°F</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-4 text-center">
                <div>
                  <div className="tech-label mb-1">Config</div>
                  <div className="font-mono text-[11px] text-off-white">{test.configuration}</div>
                </div>
                <div>
                  <div className="tech-label mb-1">Activity</div>
                  <div className="font-mono text-[11px] text-off-white">{test.activity}</div>
                </div>
                <div>
                  <div className="tech-label mb-1">Session</div>
                  <div className="font-mono text-[11px] text-off-white">{test.duration}</div>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <Quote className="h-5 w-5 flex-shrink-0 text-gold/60" strokeWidth={1.5} />
                <p className="text-seafoam/90">{test.quote}</p>
              </div>
              <div className="mt-5 inline-flex rounded-full border border-ice-blue/20 bg-ice-blue/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-ice-blue">
                {test.result}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
