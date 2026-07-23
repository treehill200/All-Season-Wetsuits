import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { MagneticButton } from '../ui/MagneticButton'
import {
  ACCESSORY_ATTACHMENTS,
  CASE_ITEMS,
  COLORS,
  CORE_PRICE,
  INCLUDED_ATTACHMENTS,
  REASSURANCE,
  SIZES,
  THICKNESSES,
} from '../../data/product'
import type { Option } from '../../data/product'

function OptionRow({
  label,
  options,
  selected,
  onSelect,
  swatches,
}: {
  label: string
  options: Option[]
  selected: string
  onSelect: (id: string) => void
  swatches?: boolean
}) {
  return (
    <div>
      <div className="tech-label mb-3">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o.id === selected
          return (
            <button
              key={o.id}
              onClick={() => onSelect(o.id)}
              aria-pressed={on}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-left transition-all ${
                on ? 'border-ice-blue/50 bg-ice-blue/10' : 'border-white/10 hover:border-ice-blue/30'
              }`}
            >
              {swatches && o.swatch && (
                <span
                  className="h-4 w-4 rounded-full border border-white/20"
                  style={{ background: o.swatch }}
                />
              )}
              <span>
                <span className="block font-display text-sm text-off-white">{o.label}</span>
                {o.sublabel && (
                  <span className="block font-mono text-[9px] text-off-white/40">{o.sublabel}</span>
                )}
              </span>
              {o.priceDelta > 0 && (
                <span className="font-mono text-[10px] text-gold">+${o.priceDelta}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ProductConfigurator() {
  const [size, setSize] = useState('m')
  const [thickness, setThickness] = useState('3mm')
  const [color, setColor] = useState('abyss')
  const [attachments, setAttachments] = useState<string[]>(['leftArm', 'leftLeg'])

  const toggleAttachment = (id: string) =>
    setAttachments((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))

  const total = useMemo(() => {
    let sum = CORE_PRICE
    sum += SIZES.find((s) => s.id === size)?.priceDelta ?? 0
    sum += THICKNESSES.find((t) => t.id === thickness)?.priceDelta ?? 0
    sum += COLORS.find((c) => c.id === color)?.priceDelta ?? 0
    ;[...INCLUDED_ATTACHMENTS, ...ACCESSORY_ATTACHMENTS].forEach((a) => {
      if (attachments.includes(a.id)) sum += a.price
    })
    return sum
  }, [size, thickness, color, attachments])

  return (
    <section id="shop" className="relative bg-ocean-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="09"
          label="Build & Buy"
          title="The complete modular system"
          subtitle="Everything ships in one technical case. Configure your core, then add the modules you need."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Equipment case */}
          <div className="rounded-3xl border border-ice-blue/15 bg-gradient-to-b from-deep-navy/50 to-ocean-black p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="tech-label">Equipment Case · ASW-01</span>
              <span className="font-mono text-[10px] text-off-white/40">MODULAR KIT</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {CASE_ITEMS.map((item) => {
                const isOpt = !item.included
                const chosen =
                  (item.id === 'hood' && attachments.includes('hood')) ||
                  (item.id === 'gloves' && attachments.includes('gloves')) ||
                  (item.id === 'boots' && attachments.includes('boots'))
                const filled = item.included || chosen
                return (
                  <div
                    key={item.id}
                    className={`flex aspect-square flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                      filled
                        ? 'border-ice-blue/30 bg-ice-blue/5'
                        : 'border-dashed border-white/10 bg-transparent'
                    }`}
                  >
                    <div
                      className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full ${
                        filled ? 'bg-ice-blue/15 text-ice-blue' : 'text-white/20'
                      }`}
                    >
                      {filled ? <Check className="h-4 w-4" /> : '+'}
                    </div>
                    <span className="font-mono text-[9px] leading-tight text-off-white/60">
                      {item.label}
                    </span>
                    {isOpt && !chosen && (
                      <span className="mt-1 font-mono text-[8px] text-off-white/30">optional</span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Reassurance */}
            <div className="mt-6 space-y-2 border-t border-white/10 pt-6">
              {REASSURANCE.map((r) => (
                <div key={r} className="flex items-center gap-2 text-sm text-seafoam/70">
                  <ShieldCheck className="h-4 w-4 text-seafoam/50" strokeWidth={1.5} />
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* Configurator */}
          <div className="space-y-7">
            <OptionRow label="Size" options={SIZES} selected={size} onSelect={setSize} />
            <OptionRow
              label="Core Thickness"
              options={THICKNESSES}
              selected={thickness}
              onSelect={setThickness}
            />
            <OptionRow label="Color" options={COLORS} selected={color} onSelect={setColor} swatches />

            <div>
              <div className="tech-label mb-3">Included Attachments</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {INCLUDED_ATTACHMENTS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggleAttachment(a.id)}
                    aria-pressed={attachments.includes(a.id)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                      attachments.includes(a.id)
                        ? 'border-ice-blue/50 bg-ice-blue/10'
                        : 'border-white/10 hover:border-ice-blue/30'
                    }`}
                  >
                    <span className="font-display text-sm text-off-white">{a.label}</span>
                    <span className="font-mono text-[10px] text-gold">+${a.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="tech-label mb-3">Optional Accessories</div>
              <div className="grid gap-2 sm:grid-cols-3">
                {ACCESSORY_ATTACHMENTS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggleAttachment(a.id)}
                    aria-pressed={attachments.includes(a.id)}
                    className={`flex flex-col items-start rounded-xl border px-4 py-3 transition-all ${
                      attachments.includes(a.id)
                        ? 'border-ice-blue/50 bg-ice-blue/10'
                        : 'border-white/10 hover:border-ice-blue/30'
                    }`}
                  >
                    <span className="font-display text-sm text-off-white">{a.label}</span>
                    <span className="font-mono text-[10px] text-gold">+${a.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="tech-label">Live Total</div>
                <motion.div
                  key={total}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-4xl text-off-white"
                >
                  ${total}
                </motion.div>
              </div>
              <MagneticButton variant="gold" ariaLabel="Build my all season suit">
                Build My All Season Suit
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
