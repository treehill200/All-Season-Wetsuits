import { motion } from 'framer-motion'
import { Snowflake, Sun } from 'lucide-react'
import { TEMP_MAX, TEMP_MIN } from '../../data/configEngine'
import { useCursorHover } from '../../context/CursorContext'

interface Props {
  value: number
  onChange: (value: number) => void
  accent: string
}

export function TemperatureSlider({ value, onChange, accent }: Props) {
  const pct = ((value - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100
  const cursor = useCursorHover('drag')

  return (
    <div className="w-full max-w-xl">
      <div className="mb-3 flex items-end justify-between">
        <div className="flex items-center gap-2 text-seafoam/80">
          <Sun className="h-4 w-4" strokeWidth={1.5} />
          <span className="tech-label">Warm Water</span>
        </div>
        <motion.div
          key={value}
          initial={{ scale: 0.94, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <span
            className="font-display text-4xl font-semibold tabular-nums sm:text-5xl"
            style={{ color: accent }}
          >
            {value}°F
          </span>
        </motion.div>
        <div className="flex items-center gap-2 text-ice-blue/80">
          <span className="tech-label">Cold Water</span>
          <Snowflake className="h-4 w-4" strokeWidth={1.5} />
        </div>
      </div>

      <div className="relative" {...cursor}>
        {/* Track */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-150"
            style={{
              width: `${100 - pct}%`,
              marginLeft: `${pct}%`,
              background:
                'linear-gradient(90deg, rgba(158,216,232,0.9), rgba(184,217,209,0.7))',
            }}
          />
        </div>

        {/* Note: warm is left (low pct/high temp), cold is right. We invert so
            moving right = colder. Value maps directly; visual fill above shows
            the "cold" portion from the thumb rightward. */}
        <input
          type="range"
          min={TEMP_MIN}
          max={TEMP_MAX}
          value={TEMP_MAX + TEMP_MIN - value}
          onChange={(e) => onChange(TEMP_MAX + TEMP_MIN - Number(e.target.value))}
          aria-label="Water temperature"
          aria-valuetext={`${value} degrees Fahrenheit`}
          className="absolute inset-0 h-6 w-full cursor-pointer opacity-0"
          style={{ top: '-10px' }}
        />

        {/* Thumb */}
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
          style={{ left: `calc(${pct}% )` }}
        >
          <div className="relative -ml-3">
            <div
              className="h-6 w-6 rounded-full border-2 shadow-lg"
              style={{ borderColor: accent, background: '#05080b' }}
            />
            <div
              className="absolute inset-0 -z-10 animate-pulse-ring rounded-full"
              style={{ background: accent, opacity: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-between font-mono text-[10px] text-off-white/40">
        <span>{TEMP_MAX}°F</span>
        <span>Drag to adapt the suit</span>
        <span>{TEMP_MIN}°F</span>
      </div>
    </div>
  )
}
