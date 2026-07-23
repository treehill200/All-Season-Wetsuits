import { useRef } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface Props {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'gold' | 'outline' | 'solid'
  className?: string
  ariaLabel?: string
  type?: 'button' | 'submit'
}

/**
 * A button that subtly pulls toward the cursor (magnetic effect) with a liquid
 * hover sheen. Falls back to a static button under reduced motion.
 */
export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'gold',
  className = '',
  ariaLabel,
  type = 'button',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    ref.current.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 font-mono text-xs uppercase tracking-label transition-colors duration-300 will-change-transform'

  const variants = {
    gold: 'bg-gold/90 text-ocean-black hover:bg-gold',
    outline:
      'border border-ice-blue/40 text-off-white hover:border-ice-blue hover:text-ice-blue bg-white/0',
    solid: 'bg-off-white/95 text-ocean-black hover:bg-off-white',
  }

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </>
  )

  const common = {
    ref: ref as never,
    className: `${base} ${variants[variant]} ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    'aria-label': ariaLabel,
  }

  if (href) {
    return (
      <motion.a href={href} {...common} onClick={onClick}>
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} {...common} onClick={onClick}>
      {content}
    </motion.button>
  )
}
