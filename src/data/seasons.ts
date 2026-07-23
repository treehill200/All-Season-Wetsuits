import type { ComponentId } from './types'

export interface Season {
  id: string
  name: string
  temp: number
  headline: string
  copy: string
  environment: string
  attached: ComponentId[]
  gradient: [string, string, string]
  accent: string
  configuration: string
  flexibility: string
  warmth: string
}

export const SEASONS: Season[] = [
  {
    id: 'summer',
    name: 'Summer',
    temp: 76,
    headline: 'Maximum movement for warmer water.',
    copy: 'Strip the suit back to its lightest form. No full arms, short legs, nothing between you and the wave.',
    environment: 'Bright turquoise water, warm sunlight, gentle tropical waves.',
    attached: ['core'],
    gradient: ['#0a5a63', '#0d8a8f', '#0e454b'],
    accent: '#8fe9dc',
    configuration: 'Sleeveless core',
    flexibility: 'Maximum',
    warmth: 'Low',
  },
  {
    id: 'fall',
    name: 'Fall',
    temp: 64,
    headline: 'Extra protection as the water begins to cool.',
    copy: 'Add full legs and lighter upper-body coverage. Balanced warmth without giving up your paddle.',
    environment: 'Golden coastal light, deeper blue water, slightly rougher waves.',
    attached: ['core', 'leftLeg', 'rightLeg'],
    gradient: ['#0d3f52', '#12506a', '#08283a'],
    accent: '#d8b874',
    configuration: 'Full legs + sleeveless',
    flexibility: 'Medium–High',
    warmth: 'Medium',
  },
  {
    id: 'winter',
    name: 'Winter',
    temp: 50,
    headline: 'Complete protection for the coldest conditions.',
    copy: 'Attach both arms, both legs and the thermal hood. The full cold-water system, sealed against the cold.',
    environment: 'Dark blue ocean, cold mist, snow on the distant coastline, stronger swell.',
    attached: ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'hood', 'boots'],
    gradient: ['#04121f', '#0a2740', '#020810'],
    accent: '#9ed8e8',
    configuration: 'Full suit + hood',
    flexibility: 'Medium',
    warmth: 'Maximum',
  },
  {
    id: 'spring',
    name: 'Spring',
    temp: 60,
    headline: 'Adapt instantly as conditions begin to change.',
    copy: 'A customizable mixed setup. Read the water each morning and rebuild your suit to match it.',
    environment: 'Misty sunrise, soft blue and seafoam light, calm but active water.',
    attached: ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'],
    gradient: ['#0a2c40', '#124a5a', '#0a3340'],
    accent: '#b8d9d1',
    configuration: 'Balanced mixed setup',
    flexibility: 'Medium–High',
    warmth: 'Medium–High',
  },
]
