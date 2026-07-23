import { COMPONENTS } from './components'
import type { ComponentId, EnvironmentTheme, Rating, TemperatureState } from './types'

export const TEMP_MIN = 45
export const TEMP_MAX = 84

// ---- Rating helpers ---------------------------------------------------------

const RATING_SCALE: Rating[] = [
  'Low',
  'Low–Medium',
  'Medium',
  'Medium–High',
  'High',
  'Maximum',
]

export function scoreToRating(score: number): Rating {
  const clamped = Math.max(0, Math.min(100, score))
  const idx = Math.min(
    RATING_SCALE.length - 1,
    Math.floor((clamped / 100) * RATING_SCALE.length),
  )
  return RATING_SCALE[idx]
}

// ---- Derived metrics from a set of attached pieces --------------------------

export interface DerivedSpec {
  warmthScore: number
  flexScore: number
  warmth: Rating
  flexibility: Rating
  price: number
  pieceCount: number
  waterRange: [number, number]
  configurationLabel: string
  bestFor: string
}

const CONFIG_ACTIVITY: Array<{ test: (a: Set<ComponentId>) => boolean; label: string; activity: string }> = [
  {
    test: (a) => a.has('hood') && a.size >= 6,
    label: 'Maximum protection',
    activity: 'Ice-water surfing & long cold sessions',
  },
  {
    test: (a) => a.has('leftArm') && a.has('rightArm') && a.has('leftLeg') && a.has('rightLeg'),
    label: 'Full arms + full legs',
    activity: 'Cold-water surfing',
  },
  {
    test: (a) => a.has('leftLeg') && a.has('rightLeg'),
    label: 'Full legs + sleeveless',
    activity: 'Cool-water surfing & diving',
  },
  {
    test: (a) => a.has('leftArm') && a.has('rightArm'),
    label: 'Full arms + short legs',
    activity: 'Breezy paddle & swim sessions',
  },
  {
    test: () => true,
    label: 'Sleeveless core',
    activity: 'Warm-water surf & swim',
  },
]

export function deriveSpec(attached: ComponentId[]): DerivedSpec {
  const set = new Set<ComponentId>(attached)
  set.add('core')

  let warmthScore = 0
  let flexPenalty = 0
  let price = 0

  set.forEach((id) => {
    const c = COMPONENTS[id]
    warmthScore += c.warmth
    flexPenalty += c.flexPenalty
    price += c.price
  })

  // Base core is highly flexible; each attached piece reduces flexibility.
  const flexScore = Math.max(8, 100 - flexPenalty * 3.6)
  const warmth = scoreToRating(warmthScore)
  const flexibility = scoreToRating(flexScore)

  // Map warmth to a recommended water range (warmer suit → colder water).
  const center = 82 - (warmthScore / 100) * 40 // 82°F down to ~42°F
  const waterRange: [number, number] = [
    Math.round(center - 4),
    Math.round(center + 4),
  ]

  const match = CONFIG_ACTIVITY.find((r) => r.test(set))!

  return {
    warmthScore,
    flexScore,
    warmth,
    flexibility,
    price,
    pieceCount: set.size,
    waterRange,
    configurationLabel: match.label,
    bestFor: match.activity,
  }
}

// ---- Environment theming ----------------------------------------------------

export function environmentForTemp(temp: number): EnvironmentTheme {
  // Normalised 0 (cold) → 1 (warm)
  const t = (temp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)

  if (temp >= 70) {
    return {
      gradient: ['#0a4a5c', '#0d6f7a', '#12363f'],
      light: '#7fe3d6',
      turbulence: 0.28,
      mood: 'tropical',
      mist: 0,
    }
  }
  if (temp >= 60) {
    return {
      gradient: ['#083047', '#0d3553', '#061826'],
      light: '#4fb6c9',
      turbulence: 0.45,
      mood: 'coastal',
      mist: 0.1,
    }
  }
  if (temp >= 52) {
    return {
      gradient: ['#06243a', '#082a44', '#050f1c'],
      light: '#6fa8c9',
      turbulence: 0.62,
      mood: 'temperate',
      mist: 0.28,
    }
  }
  return {
    gradient: ['#04121f', '#071a2c', '#03080f'],
    light: '#9ed8e8',
    turbulence: 0.82,
    mood: 'icy',
    mist: 0.55 + (1 - t) * 0.2,
  }
}

// ---- Temperature → recommended configuration --------------------------------

export function attachedForTemp(temp: number): ComponentId[] {
  if (temp >= 72) return ['core']
  if (temp >= 66) return ['core', 'leftLeg', 'rightLeg']
  if (temp >= 60) return ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg']
  if (temp >= 52)
    return ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'boots']
  return [
    'core',
    'leftArm',
    'rightArm',
    'leftLeg',
    'rightLeg',
    'hood',
    'gloves',
    'boots',
  ]
}

export function bandForTemp(temp: number): 'warm' | 'moderate' | 'cold' {
  if (temp >= 66) return 'warm'
  if (temp >= 56) return 'moderate'
  return 'cold'
}

export function temperatureState(temp: number): TemperatureState {
  const rounded = Math.round(temp)
  const attached = attachedForTemp(rounded)
  const spec = deriveSpec(attached)
  const band = bandForTemp(rounded)

  const bestFor =
    band === 'warm'
      ? rounded >= 72
        ? 'Warm-water surf & swim'
        : 'Sub-tropical surfing'
      : band === 'moderate'
        ? 'Coastal surfing & diving'
        : 'Cold-water surfing'

  return {
    temperature: rounded,
    band,
    configuration: spec.configurationLabel,
    attached,
    warmth: spec.warmth,
    flexibility: spec.flexibility,
    bestFor,
    activity: spec.bestFor,
    environment: environmentForTemp(rounded),
  }
}

export function formatRange([lo, hi]: [number, number]): string {
  return `${lo}°F–${hi}°F`
}
