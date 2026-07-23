// Shared domain types for the All Season Wetsuits configurator.

export type ComponentId =
  | 'core'
  | 'leftArm'
  | 'rightArm'
  | 'leftLeg'
  | 'rightLeg'
  | 'hood'
  | 'gloves'
  | 'boots'

export interface WetsuitComponent {
  id: ComponentId
  label: string
  short: string
  /** Detachable pieces can be toggled; the core is always present. */
  detachable: boolean
  price: number
  /** Contribution to warmth (0-100 scale points). */
  warmth: number
  /** Flexibility penalty applied when attached (negative points). */
  flexPenalty: number
  description: string
}

export type Rating = 'Low' | 'Low–Medium' | 'Medium' | 'Medium–High' | 'High' | 'Maximum'

export interface Configuration {
  attached: ComponentId[]
}

export interface EnvironmentTheme {
  /** Background gradient stops, top → bottom. */
  gradient: [string, string, string]
  /** Accent light color used by 3D lights / caustics. */
  light: string
  /** Water movement intensity 0-1. */
  turbulence: number
  /** Named atmosphere for copy + particle behaviour. */
  mood: 'tropical' | 'coastal' | 'temperate' | 'icy'
  mist: number
}

export interface TemperatureState {
  temperature: number
  band: 'warm' | 'moderate' | 'cold'
  configuration: string
  attached: ComponentId[]
  warmth: Rating
  flexibility: Rating
  bestFor: string
  activity: string
  environment: EnvironmentTheme
}
