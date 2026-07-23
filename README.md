# All Season Wetsuits

**One suit. Every season.** — an immersive product website for a modular wetsuit
with detachable arms and legs that adapts to any water temperature.

The homepage is a living product experience: a 3D wetsuit floats in an underwater
scene and physically transforms as you drag a water-temperature slider — attaching
and detaching arms, legs, a hood and more, while a live technical readout updates
warmth, flexibility, configuration and recommended activity.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

No backend, database, authentication, API keys or external accounts are required.

## Tech stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** — design system + ocean color palette
- **Three.js + React Three Fiber** — the living 3D wetsuit hero
- **Framer Motion** — interface animation
- **GSAP + ScrollTrigger** — the pinned cinematic season scroll
- **Lucide React** — interface icons

## Experience map

| # | Section | Interaction |
|---|---------|-------------|
| 1 | Living Wetsuit Hero | 3D suit + temperature slider + live readout |
| 2 | The Problem | Draggable comparison divider |
| 3 | Wetsuit Builder | Attach/detach pieces, presets, save to `localStorage` |
| 4 | Scroll Through the Seasons | GSAP-pinned cinematic scroll |
| 5 | AquaAdapt System | Hover-to-explode connection joints |
| 6 | Material X-Ray | Drag-to-reveal layer inspector |
| 7 | Find Your Configuration | Four-question quiz → assembled recommendation |
| 8 | Product Performance | Radial meters + field-test terminal |
| 9 | Sustainability | Lifecycle graphic |
| 10 | Field Stories | Interactive coastal map |
| 11 | Build & Buy | Live-priced product configurator |
| 12 | Closing | Final call to action |

## Architecture

```
src/
  data/          Domain data + the temperature → configuration engine
  hooks/         Reduced motion, localStorage, in-view, device quality
  context/       Custom cursor state
  components/
    hero/        3D scene, slider, readout, atmosphere, ambience
    sections/    Sections 2–11 (each code-split)
    shared/      Reusable SVG wetsuit silhouette
    ui/          Cursor, loader, nav button, meters, headings
```

The single source of truth for product behaviour is
`src/data/configEngine.ts`, which derives warmth, flexibility, price, water
range and recommendations from any set of attached components. Every interactive
section reads from it, so the suit stays consistent everywhere.

## Accessibility & performance

- Respects `prefers-reduced-motion` (with an in-app toggle in the footer) —
  heavy motion is replaced by simple fades and static states.
- Keyboard-accessible controls, focus-visible outlines, ARIA labels, semantic
  landmarks and a skip link.
- Custom cursor is disabled on touch / coarse-pointer devices.
- Below-the-fold sections are lazy-loaded and code-split; the 3D scene scales its
  quality down on weaker devices and limits particle counts.
- Fully self-contained: no remote images, models or runtime API calls.
