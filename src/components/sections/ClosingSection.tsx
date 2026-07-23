import { motion } from 'framer-motion'
import { MagneticButton } from '../ui/MagneticButton'
import { WetsuitSilhouette } from '../shared/WetsuitSilhouette'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function ClosingSection() {
  const reduced = usePrefersReducedMotion()
  return (
    <section
      id="closing"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
    >
      {/* Sunset / underwater gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2c40] via-[#0d3553] to-[#05080b]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_120%,rgba(201,168,93,0.25),transparent_60%)]" />

      {/* Horizon light */}
      <div className="absolute bottom-1/3 left-1/2 h-40 w-[120%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(243,241,235,0.15),transparent)] blur-2xl" />

      {/* Floating suit */}
      <motion.div
        className="absolute right-[8%] top-1/2 hidden -translate-y-1/2 opacity-40 md:block"
        animate={reduced ? {} : { y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <WetsuitSilhouette
          attached={['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg']}
          accent="#c9a85d"
          className="h-[60vh] w-auto"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display text-4xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          READY FOR EVERY
          <br />
          TEMPERATURE.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg text-seafoam/80"
        >
          One adaptable system for every season, coastline, and session.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#builder" variant="gold">
            Configure Your Suit
          </MagneticButton>
          <MagneticButton href="#aquaadapt" variant="outline">
            Explore AquaAdapt
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
