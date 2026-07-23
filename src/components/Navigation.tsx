import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Waves, X } from 'lucide-react'
import { NAV_LINKS } from '../data/nav'
import { MagneticButton } from './ui/MagneticButton'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-ice-blue/10 bg-ocean-black/70 backdrop-blur-lg'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 text-off-white"
            aria-label="All Season Wetsuits home"
          >
            <Waves className="h-5 w-5 text-ice-blue" strokeWidth={1.5} />
            <span className="font-display text-sm font-semibold uppercase tracking-[0.18em]">
              All Season
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-mono text-[11px] uppercase tracking-label text-off-white/70 transition-colors hover:text-off-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ice-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <MagneticButton href="#builder" variant="gold" ariaLabel="Configure your suit">
                Configure Your Suit
              </MagneticButton>
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ice-blue/20 text-off-white lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ocean-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.18em]">
                All Season
              </span>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ice-blue/20"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="border-b border-ice-blue/10 py-4 font-display text-2xl text-off-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-8">
                <MagneticButton
                  href="#builder"
                  variant="gold"
                  onClick={() => setOpen(false)}
                  ariaLabel="Configure your suit"
                >
                  Configure Your Suit
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
