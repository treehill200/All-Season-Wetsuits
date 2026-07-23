import { motion } from 'framer-motion'
import type { Rating } from '../../data/types'

const RATING_VALUE: Record<Rating, number> = {
  Low: 0.18,
  'Low–Medium': 0.36,
  Medium: 0.54,
  'Medium–High': 0.72,
  High: 0.86,
  Maximum: 1,
}

interface Props {
  label: string
  rating: Rating
  accent?: string
}

export function RatingMeter({ label, rating, accent = '#9ed8e8' }: Props) {
  const value = RATING_VALUE[rating]
  const segments = 12
  const active = Math.round(value * segments)

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="tech-label">{label}</span>
        <span className="font-mono text-xs text-off-white">{rating}</span>
      </div>
      <div className="flex gap-1" aria-hidden>
        {Array.from({ length: segments }).map((_, i) => (
          <motion.span
            key={i}
            className="h-3 flex-1 rounded-sm"
            initial={{ opacity: 0.15 }}
            animate={{
              opacity: i < active ? 1 : 0.15,
              backgroundColor: i < active ? accent : '#1c2b3a',
            }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            style={{ backgroundColor: '#1c2b3a' }}
          />
        ))}
      </div>
    </div>
  )
}
