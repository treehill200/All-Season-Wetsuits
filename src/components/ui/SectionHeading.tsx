import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  label: string
  index?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export function SectionHeading({
  label,
  index,
  title,
  subtitle,
  align = 'left',
  className = '',
}: Props) {
  return (
    <motion.div
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      <motion.div
        variants={fade}
        transition={{ duration: 0.6 }}
        className={`mb-4 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        {index && <span className="font-mono text-xs text-gold/80">{index}</span>}
        <span className="tech-label">{label}</span>
        <span className="h-px w-10 bg-ice-blue/30" />
      </motion.div>
      <motion.h2
        variants={fade}
        transition={{ duration: 0.7 }}
        className="font-display text-3xl font-medium leading-tight text-off-white sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fade}
          transition={{ duration: 0.7 }}
          className={`mt-5 max-w-xl text-base leading-relaxed text-seafoam/70 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
