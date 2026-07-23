import { useEffect, useState } from 'react'
import { Waves } from 'lucide-react'
import { NAV_LINKS } from '../data/nav'
import {
  getForcedReducedMotion,
  setForcedReducedMotion,
} from '../hooks/usePrefersReducedMotion'

export function Footer() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(getForcedReducedMotion())
  }, [])

  const toggle = () => {
    const next = !reduced
    setReduced(next)
    setForcedReducedMotion(next)
  }

  return (
    <footer className="border-t border-ice-blue/10 bg-ocean-black py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Waves className="h-5 w-5 text-ice-blue" strokeWidth={1.5} />
              <span className="font-display text-sm font-semibold uppercase tracking-[0.18em]">
                All Season
              </span>
            </div>
            <p className="mt-4 text-sm text-off-white/50">
              One modular wetsuit that adapts to every water temperature. Attach. Detach. Adapt.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3" aria-label="Footer">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-label text-off-white/50 transition-colors hover:text-off-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
          <span className="font-mono text-[10px] uppercase tracking-label text-off-white/30">
            © {new Date().getFullYear()} All Season Wetsuits · One suit. Every season.
          </span>
          <button
            onClick={toggle}
            aria-pressed={reduced}
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-label text-off-white/60 transition-colors hover:border-ice-blue/40 hover:text-off-white"
          >
            <span
              className={`h-2 w-2 rounded-full ${reduced ? 'bg-ice-blue' : 'bg-white/30'}`}
            />
            Reduced Motion {reduced ? 'On' : 'Off'}
          </button>
        </div>
      </div>
    </footer>
  )
}
