import { useMemo } from 'react'

interface Props {
  gradient: [string, string, string]
  mist: number
  reduced: boolean
}

/** CSS-driven underwater atmosphere: gradient depth, light rays, caustics,
 *  drifting bubbles and optional cold mist. Cheap and GPU-friendly. */
export function AtmosphereOverlay({ gradient, mist, reduced }: Props) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        left: Math.random() * 100,
        size: 3 + Math.random() * 9,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 14,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Depth gradient */}
      <div
        className="absolute inset-0 transition-[background] duration-1000"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${gradient[0]} 0%, ${gradient[1]} 45%, ${gradient[2]} 100%)`,
        }}
      />

      {/* Light rays */}
      {!reduced && (
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <div
            className="absolute -top-1/2 left-1/4 h-[200%] w-40 rotate-12 blur-2xl animate-float-slow"
            style={{
              background:
                'linear-gradient(180deg, rgba(158,216,232,0.28), transparent 70%)',
            }}
          />
          <div
            className="absolute -top-1/2 left-1/2 h-[200%] w-24 -rotate-6 blur-2xl"
            style={{
              background:
                'linear-gradient(180deg, rgba(184,217,209,0.22), transparent 65%)',
              animation: 'float-slow 9s ease-in-out infinite',
            }}
          />
          <div
            className="absolute -top-1/2 right-1/4 h-[200%] w-32 rotate-6 blur-2xl"
            style={{
              background:
                'linear-gradient(180deg, rgba(158,216,232,0.18), transparent 60%)',
              animation: 'float-slow 11s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Caustic shimmer */}
      {!reduced && (
        <div
          className="absolute inset-0 opacity-[0.09] mix-blend-screen animate-shimmer"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, rgba(158,216,232,0.5) 0px, transparent 6px, transparent 26px, rgba(184,217,209,0.4) 32px)',
            backgroundSize: '400% 400%',
          }}
        />
      )}

      {/* Bubbles */}
      {!reduced &&
        bubbles.map((b, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full border border-ice-blue/30 bg-ice-blue/5 animate-drift"
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}

      {/* Cold mist */}
      {mist > 0 && (
        <div
          className="absolute inset-x-0 bottom-0 transition-opacity duration-1000"
          style={{
            height: '45%',
            opacity: mist,
            background:
              'linear-gradient(0deg, rgba(158,216,232,0.16), rgba(243,241,235,0.05) 40%, transparent)',
            filter: 'blur(8px)',
          }}
        />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_40%,rgba(5,8,11,0.85)_100%)]" />
    </div>
  )
}
