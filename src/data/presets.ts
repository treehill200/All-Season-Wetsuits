import type { ComponentId } from './types'

export interface Preset {
  id: string
  name: string
  description: string
  attached: ComponentId[]
}

export const PRESETS: Preset[] = [
  {
    id: 'tropical',
    name: 'Tropical',
    description: 'Warmest water. Maximum movement.',
    attached: ['core'],
  },
  {
    id: 'california',
    name: 'California Coast',
    description: 'Balanced warmth for moderate water.',
    attached: ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'],
  },
  {
    id: 'coldwater',
    name: 'Cold Water',
    description: 'Full coverage with boots.',
    attached: ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'boots'],
  },
  {
    id: 'maximum',
    name: 'Maximum Protection',
    description: 'Everything sealed for the coldest sessions.',
    attached: [
      'core',
      'leftArm',
      'rightArm',
      'leftLeg',
      'rightLeg',
      'hood',
      'gloves',
      'boots',
    ],
  },
]
