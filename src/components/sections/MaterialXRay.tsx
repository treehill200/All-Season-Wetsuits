import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { MATERIAL_LAYERS } from '../../data/materials'
import { useCursorHover } from '../../context/CursorContext'

export function MaterialXRay() {
  const [reveal, setReveal] = useState(50)
  const [active, setActive] = useState(MATERIAL_LAYERS[0].id)
  const dragCursor = useCursorHover('drag')
  const viewCursor = useCursorHover('view')
  const layer = MATERIAL_LAYERS.find((l) => l.id === active)!

  return (
    <section id="materials" className="relative bg-deep-navy/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          label="Material X-Ray"
          title="Five layers, one shell"
          subtitle="Drag the reveal line across the suit to peel back the layers. Hover any layer to read its purpose, thickness and sustainability profile."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* X-ray viewer */}
          <div className="relative">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ice-blue/10 bg-ocean-black"
              {...dragCursor}
            >
              {/* Outer view */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-3/4 w-2/3 rounded-[40%] bg-gradient-to-br from-ocean-blue to-ocean-black" />
              </div>

              {/* Layered cross-section revealed on the right of the line */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 0 0 ${reveal}%)` }}
              >
                <div className="flex h-full items-center justify-center">
                  <div className="relative h-3/4 w-2/3 overflow-hidden rounded-[40%]">
                    {MATERIAL_LAYERS.map((l, i) => (
                      <motion.div
                        key={l.id}
                        onMouseEnter={() => {
                          setActive(l.id)
                          viewCursor.onMouseEnter()
                        }}
                        onMouseLeave={viewCursor.onMouseLeave}
                        className="absolute inset-0 flex items-center rounded-[40%] border"
                        style={{
                          margin: `${i * 9}%`,
                          borderColor: `${l.color}88`,
                          background: `${l.color}${active === l.id ? '44' : '22'}`,
                        }}
                      >
                        <span
                          className="ml-3 font-mono text-[9px] uppercase tracking-label"
                          style={{ color: l.color }}
                        >
                          {l.index}
                        </span>
                      </motion.div>
                    ))}
                    {/* contour lines */}
                    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30">
                      <defs>
                        <pattern id="contour" width="14" height="14" patternUnits="userSpaceOnUse">
                          <path d="M0 7 Q7 0 14 7" fill="none" stroke="#9ed8e8" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#contour)" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Reveal line */}
              <div
                className="absolute top-0 bottom-0 z-10 w-px bg-ice-blue"
                style={{ left: `${reveal}%` }}
              >
                <div className="absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ice-blue/60 bg-ocean-black/80" />
              </div>

              <input
                type="range"
                min={5}
                max={95}
                value={reveal}
                onChange={(e) => setReveal(Number(e.target.value))}
                aria-label="Reveal material layers"
                className="absolute inset-x-0 bottom-0 z-20 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-label text-off-white/40">
              Drag across the suit to reveal the interior
            </p>
          </div>

          {/* Layer list + detail */}
          <div>
            <div className="space-y-2">
              {MATERIAL_LAYERS.map((l) => (
                <button
                  key={l.id}
                  onMouseEnter={() => setActive(l.id)}
                  onFocus={() => setActive(l.id)}
                  onClick={() => setActive(l.id)}
                  className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all ${
                    active === l.id
                      ? 'border-ice-blue/40 bg-white/[0.04]'
                      : 'border-white/8 hover:border-ice-blue/20'
                  }`}
                >
                  <span
                    className="h-8 w-1 rounded-full"
                    style={{ background: l.color }}
                  />
                  <span className="font-mono text-xs text-off-white/50">{l.index}</span>
                  <span className="font-display text-sm text-off-white">{l.name}</span>
                </button>
              ))}
            </div>

            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border border-ice-blue/10 bg-white/[0.02] p-6"
            >
              <div className="tech-label mb-2" style={{ color: layer.color }}>
                {layer.name}
              </div>
              <p className="text-sm text-seafoam/80">{layer.purpose}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
                <div>
                  <div className="tech-label mb-1">Thickness</div>
                  <div className="font-mono text-off-white">{layer.thickness}</div>
                </div>
                <div>
                  <div className="tech-label mb-1">Durability</div>
                  <div className="font-mono text-off-white">{layer.durability}</div>
                </div>
                <div className="col-span-2">
                  <div className="tech-label mb-1">Sustainability</div>
                  <div className="text-seafoam/70">{layer.sustainability}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
