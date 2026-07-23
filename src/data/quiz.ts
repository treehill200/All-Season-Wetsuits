import type { ComponentId } from './types'

export interface QuizOption {
  id: string
  label: string
  sublabel?: string
  /** Warmth demand contribution 0-3. */
  weight: number
}

export interface QuizQuestion {
  id: string
  prompt: string
  kind: 'choice' | 'temperature' | 'duration'
  options?: QuizOption[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'location',
    prompt: 'Where are you going?',
    kind: 'choice',
    options: [
      { id: 'tropical', label: 'Tropical beach', sublabel: 'Warm, clear water', weight: 0 },
      { id: 'california', label: 'California coast', sublabel: 'Moderate water', weight: 2 },
      { id: 'northern', label: 'Cold northern coast', sublabel: 'Cold, exposed', weight: 3 },
      { id: 'lake', label: 'Lake or river', sublabel: 'Variable inland', weight: 1 },
    ],
  },
  {
    id: 'activity',
    prompt: 'What are you doing?',
    kind: 'choice',
    options: [
      { id: 'surfing', label: 'Surfing', weight: 1 },
      { id: 'swimming', label: 'Swimming', weight: 0 },
      { id: 'diving', label: 'Diving', weight: 2 },
      { id: 'paddle', label: 'Paddleboarding', weight: 1 },
    ],
  },
  {
    id: 'temperature',
    prompt: 'What water temperature do you expect?',
    kind: 'temperature',
  },
  {
    id: 'duration',
    prompt: 'How long will you be in the water?',
    kind: 'duration',
    options: [
      { id: 'short', label: 'Under 30 minutes', weight: 0 },
      { id: 'medium', label: '30–60 minutes', weight: 1 },
      { id: 'long', label: '1–2 hours', weight: 2 },
      { id: 'epic', label: 'More than 2 hours', weight: 3 },
    ],
  },
]

export interface QuizRecommendation {
  attached: ComponentId[]
  lines: string[]
  waterRange: string
  summary: string
}

// Combine chosen temperature with weighted demand to size the recommendation.
export function recommendFromQuiz(answers: {
  weight: number
  temperature: number
}): QuizRecommendation {
  // Effective temperature nudges colder as demand rises.
  const effective = answers.temperature - answers.weight * 1.5

  let attached: ComponentId[]
  let lines: string[]
  let range: string

  if (effective >= 72) {
    attached = ['core']
    lines = ['Sleeveless core', 'Short legs', '2 mm thermal core', 'Maximum flexibility']
    range = '72°F+ water'
  } else if (effective >= 64) {
    attached = ['core', 'leftLeg', 'rightLeg']
    lines = ['Full legs', 'Sleeveless upper', '2 mm thermal core', 'Optional short-sleeve top']
    range = '64°F–71°F water'
  } else if (effective >= 57) {
    attached = ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg']
    lines = ['Full legs', 'Detachable long sleeves', '3 mm thermal core', 'Optional hood']
    range = '57°F–64°F water'
  } else if (effective >= 50) {
    attached = ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'boots']
    lines = ['Full arms + full legs', '4 mm thermal core', 'Grip boots', 'Optional hood']
    range = '50°F–57°F water'
  } else {
    attached = ['core', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'hood', 'gloves', 'boots']
    lines = ['Full arms + full legs', 'Sealed hood', 'Gloves + boots', '5 mm thermal core']
    range = 'Below 50°F water'
  }

  return {
    attached,
    lines,
    waterRange: range,
    summary: `Tuned for ${range.toLowerCase()} and your session length.`,
  }
}
