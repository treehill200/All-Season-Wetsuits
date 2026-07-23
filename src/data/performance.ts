export interface Metric {
  id: string
  label: string
  value: number // 0-100
  unit?: string
  display: string
  note: string
}

export const PERFORMANCE_METRICS: Metric[] = [
  { id: 'warmth', label: 'Warmth', value: 88, display: '88', note: 'Thermal retention at full configuration' },
  { id: 'flex', label: 'Flexibility', value: 82, display: '82', note: 'Range of motion, sleeveless core' },
  { id: 'durability', label: 'Durability', value: 91, display: '91', note: 'Flex-cycle & abrasion rating' },
  { id: 'drying', label: 'Drying Speed', value: 76, display: '76', note: 'Surface dry vs. standard neoprene' },
  { id: 'resistance', label: 'Water Resistance', value: 94, display: '94', note: 'Seam seal under pressure' },
  { id: 'range', label: 'Temperature Range', value: 96, display: '42–84°F', note: 'Total adaptable span' },
]

export interface FieldReport {
  id: string
  location: string
  water: string
  session: string
  configuration: string
  result: string
}

export const FIELD_REPORTS: FieldReport[] = [
  {
    id: '024',
    location: 'Northern California',
    water: '54°F',
    session: '92 minutes',
    configuration: 'Full arms + full legs',
    result: 'Stable thermal protection',
  },
  {
    id: '031',
    location: 'Oregon Coast',
    water: '51°F',
    session: '78 minutes',
    configuration: 'Full suit + hood',
    result: 'Warm through set waits',
  },
  {
    id: '047',
    location: 'Baja, Mexico',
    water: '71°F',
    session: '120 minutes',
    configuration: 'Full legs + sleeveless',
    result: 'No fatigue, full mobility',
  },
]
