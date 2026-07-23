import { motion } from 'framer-motion'
import type { ComponentId } from '../../data/types'

interface Props {
  attached: ComponentId[]
  accent?: string
  bodyColor?: string
  className?: string
  animate?: boolean
  /** Component id currently pulsing a connection (just attached). */
  pulsing?: ComponentId | null
}

const has = (list: ComponentId[], id: ComponentId) => list.includes(id)

/**
 * A stylized, engineered-looking wetsuit rendered from SVG paths. Full arms and
 * legs fade/scale in when attached; the sleeveless core and short legs are
 * always present. This is the shared product visual for the 2D sections.
 */
export function WetsuitSilhouette({
  attached,
  accent = '#9ed8e8',
  bodyColor = '#0d3553',
  className,
  animate = true,
  pulsing = null,
}: Props) {
  const t = animate ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } : { duration: 0 }

  const piece = (visible: boolean) => ({
    initial: false,
    animate: {
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0.82,
    },
    transition: t,
  })

  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role="img"
      aria-label={`Wetsuit configuration with ${attached.length} attached components`}
    >
      <defs>
        <linearGradient id="suitBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bodyColor} stopOpacity="0.95" />
          <stop offset="55%" stopColor={bodyColor} stopOpacity="0.75" />
          <stop offset="100%" stopColor="#05080b" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="suitSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ---- Legs ---- */}
      {/* Short core legs (always present) */}
      <path
        d="M78 196 q-4 24 -6 44 l-3 26 q10 5 20 0 l4 -30 q3 30 7 -0 l4 30 q10 5 20 0 l-3 -26 q-2 -20 -6 -44 z"
        fill="url(#suitBody)"
        stroke={accent}
        strokeOpacity="0.25"
        strokeWidth="1"
      />

      {/* Full leg extensions */}
      <motion.g {...piece(has(attached, 'leftLeg'))}>
        <path
          d="M72 262 l-6 44 q9 5 18 1 l4 -46 z"
          fill="url(#suitBody)"
          stroke={accent}
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <line x1="70" y1="264" x2="90" y2="262" stroke={accent} strokeOpacity="0.5" strokeWidth="1.2" />
      </motion.g>
      <motion.g {...piece(has(attached, 'rightLeg'))}>
        <path
          d="M128 262 l6 44 q-9 5 -18 1 l-4 -46 z"
          fill="url(#suitBody)"
          stroke={accent}
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <line x1="130" y1="264" x2="110" y2="262" stroke={accent} strokeOpacity="0.5" strokeWidth="1.2" />
      </motion.g>

      {/* Boots */}
      <motion.g {...piece(has(attached, 'boots'))}>
        <path d="M60 306 q-4 8 4 10 l16 0 q4 -4 0 -12 z" fill="#05080b" stroke={accent} strokeOpacity="0.4" />
        <path d="M140 306 q4 8 -4 10 l-16 0 q-4 -4 0 -12 z" fill="#05080b" stroke={accent} strokeOpacity="0.4" />
      </motion.g>

      {/* ---- Torso ---- */}
      <path
        d="M100 70
           q-22 2 -30 18
           q-6 12 -6 30
           q0 34 6 60
           q2 12 30 12
           q28 0 30 -12
           q6 -26 6 -60
           q0 -18 -6 -30
           q-8 -16 -30 -18 z"
        fill="url(#suitBody)"
        stroke={accent}
        strokeOpacity="0.3"
        strokeWidth="1.2"
      />
      <path
        d="M100 70 q-22 2 -30 18 q-6 12 -6 30 q0 8 1 16 q14 -50 35 -60 z"
        fill="url(#suitSheen)"
      />
      {/* seam line */}
      <line x1="100" y1="74" x2="100" y2="188" stroke={accent} strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 4" />

      {/* Shoulders / sleeveless caps (always present) */}
      <path d="M70 88 q-8 4 -8 16 q6 -6 14 -10 z" fill="url(#suitBody)" stroke={accent} strokeOpacity="0.25" />
      <path d="M130 88 q8 4 8 16 q-6 -6 -14 -10 z" fill="url(#suitBody)" stroke={accent} strokeOpacity="0.25" />

      {/* ---- Full arms ---- */}
      <motion.g {...piece(has(attached, 'leftArm'))}>
        <path
          d="M64 96 q-16 6 -22 30 q-4 18 -4 36 q6 4 14 2 q2 -20 8 -36 q6 -18 14 -26 z"
          fill="url(#suitBody)"
          stroke={accent}
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        {/* connection seam */}
        <line x1="62" y1="96" x2="78" y2="104" stroke={accent} strokeOpacity="0.6" strokeWidth="1.4" />
      </motion.g>
      <motion.g {...piece(has(attached, 'rightArm'))}>
        <path
          d="M136 96 q16 6 22 30 q4 18 4 36 q-6 4 -14 2 q-2 -20 -8 -36 q-6 -18 -14 -26 z"
          fill="url(#suitBody)"
          stroke={accent}
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <line x1="138" y1="96" x2="122" y2="104" stroke={accent} strokeOpacity="0.6" strokeWidth="1.4" />
      </motion.g>

      {/* Gloves */}
      <motion.g {...piece(has(attached, 'gloves'))}>
        <circle cx="48" cy="166" r="7" fill="#05080b" stroke={accent} strokeOpacity="0.5" />
        <circle cx="152" cy="166" r="7" fill="#05080b" stroke={accent} strokeOpacity="0.5" />
      </motion.g>

      {/* ---- Head / Hood ---- */}
      <circle cx="100" cy="46" r="20" fill="url(#suitBody)" stroke={accent} strokeOpacity="0.25" strokeWidth="1" opacity="0.5" />
      <motion.g {...piece(has(attached, 'hood'))}>
        <path
          d="M100 22
             q-22 0 -24 24
             q-1 14 6 22
             q4 -18 18 -22
             q14 4 18 22
             q7 -8 6 -22
             q-2 -24 -24 -24 z"
          fill="url(#suitBody)"
          stroke={accent}
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
        <path d="M84 64 q16 8 32 0" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
      </motion.g>

      {/* ---- Connection glow points ---- */}
      {(['leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'hood'] as ComponentId[]).map((id) => {
        if (!has(attached, id)) return null
        const points: Record<string, { x: number; y: number }> = {
          leftArm: { x: 70, y: 100 },
          rightArm: { x: 130, y: 100 },
          leftLeg: { x: 80, y: 263 },
          rightLeg: { x: 120, y: 263 },
          hood: { x: 100, y: 64 },
        }
        const p = points[id]
        const isPulsing = pulsing === id
        return (
          <g key={id}>
            <circle cx={p.x} cy={p.y} r="2.4" fill={accent} filter="url(#softGlow)" />
            {isPulsing && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="2.4"
                fill="none"
                stroke={accent}
                strokeWidth="1.5"
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ scale: 5, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}
