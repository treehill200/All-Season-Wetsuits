export interface FieldTest {
  id: string
  name: string
  location: string
  /** Position on the stylized world map, as % of the map frame. */
  x: number
  y: number
  water: number
  configuration: string
  activity: string
  duration: string
  quote: string
  result: string
}

export const FIELD_TESTS: FieldTest[] = [
  {
    id: 'socal',
    name: 'Diego M.',
    location: 'Southern California',
    x: 17,
    y: 46,
    water: 63,
    configuration: 'Full legs + sleeveless',
    activity: 'Surfing',
    duration: '64 minutes',
    quote: 'Pulled the arms off at the car and paddled out light. Perfect for an evening glass-off.',
    result: 'Comfortable, no overheating',
  },
  {
    id: 'norcal',
    name: 'Maya R.',
    location: 'Northern California',
    x: 15,
    y: 40,
    water: 54,
    configuration: 'Full arms + full legs',
    activity: 'Surfing',
    duration: '92 minutes',
    quote: 'I stayed warm without feeling restricted through my shoulders.',
    result: 'Stable thermal protection',
  },
  {
    id: 'hawaii',
    name: 'Kai L.',
    location: 'Hawaii',
    x: 6,
    y: 55,
    water: 78,
    configuration: 'Sleeveless core',
    activity: 'Swimming',
    duration: '48 minutes',
    quote: 'Barely knew I had it on. All movement, zero drag.',
    result: 'Maximum flexibility',
  },
  {
    id: 'oregon',
    name: 'Elena P.',
    location: 'Oregon Coast',
    x: 14,
    y: 35,
    water: 51,
    configuration: 'Full suit + hood',
    activity: 'Surfing',
    duration: '78 minutes',
    quote: 'The hood sealed clean. Longest winter session I have done in years.',
    result: 'Warm through the set waits',
  },
  {
    id: 'iceland',
    name: 'Bjorn T.',
    location: 'Iceland',
    x: 46,
    y: 24,
    water: 42,
    configuration: 'Max protection + gloves',
    activity: 'Diving',
    duration: '55 minutes',
    quote: 'Everything locked and sealed. No cold flush at the seams, even down deep.',
    result: 'Sealed against cold flush',
  },
  {
    id: 'australia',
    name: 'Ruby N.',
    location: 'Australia',
    x: 82,
    y: 74,
    water: 68,
    configuration: 'Full legs + short sleeves',
    activity: 'Paddleboarding',
    duration: '110 minutes',
    quote: 'Reconfigured on the beach when the wind picked up. One suit did the whole trip.',
    result: 'Adapted mid-session',
  },
]
