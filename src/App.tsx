import { Suspense, lazy, useState } from 'react'
import { CursorProvider } from './context/CursorContext'
import { CustomCursor } from './components/ui/CustomCursor'
import { LoadingSequence } from './components/ui/LoadingSequence'
import { Navigation } from './components/Navigation'
import { LivingWetsuitHero } from './components/hero/LivingWetsuitHero'
import { ProblemComparison } from './components/sections/ProblemComparison'
import { Footer } from './components/Footer'

// Below-the-fold sections are code-split so the hero paints first.
const WetsuitBuilder = lazy(() =>
  import('./components/sections/builder/WetsuitBuilder').then((m) => ({ default: m.WetsuitBuilder })),
)
const SeasonScroller = lazy(() =>
  import('./components/sections/SeasonScroller').then((m) => ({ default: m.SeasonScroller })),
)
const AquaAdaptExplorer = lazy(() =>
  import('./components/sections/AquaAdaptExplorer').then((m) => ({ default: m.AquaAdaptExplorer })),
)
const MaterialXRay = lazy(() =>
  import('./components/sections/MaterialXRay').then((m) => ({ default: m.MaterialXRay })),
)
const ConfigurationQuiz = lazy(() =>
  import('./components/sections/ConfigurationQuiz').then((m) => ({ default: m.ConfigurationQuiz })),
)
const PerformanceDashboard = lazy(() =>
  import('./components/sections/PerformanceDashboard').then((m) => ({ default: m.PerformanceDashboard })),
)
const SustainabilitySection = lazy(() =>
  import('./components/sections/SustainabilitySection').then((m) => ({ default: m.SustainabilitySection })),
)
const FieldTestMap = lazy(() =>
  import('./components/sections/FieldTestMap').then((m) => ({ default: m.FieldTestMap })),
)
const ProductConfigurator = lazy(() =>
  import('./components/sections/ProductConfigurator').then((m) => ({ default: m.ProductConfigurator })),
)
const ClosingSection = lazy(() =>
  import('./components/sections/ClosingSection').then((m) => ({ default: m.ClosingSection })),
)

const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden />

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <CursorProvider>
      {!loaded && <LoadingSequence onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <a
        href="#builder"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-off-white focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-ocean-black"
      >
        Skip to configurator
      </a>

      <Navigation />

      <main>
        <LivingWetsuitHero />
        <ProblemComparison />
        <Suspense fallback={<SectionFallback />}>
          <WetsuitBuilder />
          <SeasonScroller />
          <AquaAdaptExplorer />
          <MaterialXRay />
          <ConfigurationQuiz />
          <PerformanceDashboard />
          <SustainabilitySection />
          <FieldTestMap />
          <ProductConfigurator />
          <ClosingSection />
        </Suspense>
      </main>

      <Footer />
    </CursorProvider>
  )
}
