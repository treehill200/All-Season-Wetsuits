export interface ConnectionPoint {
  id: string
  label: string
  x: number
  y: number
  detail: string
  layers: { name: string; note: string }[]
}

export const AQUA_ADAPT_POINTS: ConnectionPoint[] = [
  {
    id: 'shoulder',
    label: 'Shoulder Joint',
    x: 30,
    y: 26,
    detail: 'Where the full arm meets the sleeveless core.',
    layers: [
      { name: 'Locking tabs', note: 'Reinforced tabs align and click into the seam channel.' },
      { name: 'Flexible seal', note: 'A soft gasket compresses to close the waterline.' },
      { name: 'Movement zone', note: 'Articulated panel keeps the shoulder free to rotate.' },
    ],
  },
  {
    id: 'knee',
    label: 'Knee Seam',
    x: 44,
    y: 68,
    detail: 'Where the full leg extends the short core leg.',
    layers: [
      { name: 'Reinforced seam', note: 'Double-taped join carries flex load away from the seal.' },
      { name: 'Low-profile seal', note: 'Sits flush so nothing catches on entry or exit.' },
      { name: 'Locking mechanism', note: 'Quarter-turn tabs lock the leg under tension.' },
    ],
  },
  {
    id: 'hood',
    label: 'Hood Collar',
    x: 52,
    y: 8,
    detail: 'Where the thermal hood seals to the neck.',
    layers: [
      { name: 'Saltwater seal', note: 'Corrosion-free collar closure rated for cold flush.' },
      { name: 'Secure fit', note: 'Adjustable draw keeps the hood locked underwater.' },
      { name: 'Easy attach', note: 'One-motion connection, even with cold hands.' },
    ],
  },
]

export const AQUA_ADAPT_SPECS: string[] = [
  'Low-profile seal',
  'Reinforced locking tabs',
  'Saltwater-resistant materials',
  'Flexible movement zone',
  'Easy attachment',
  'Secure underwater fit',
]
