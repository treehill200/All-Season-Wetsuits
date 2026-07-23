export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Technology', href: '#aquaadapt' },
  { label: 'Build Your Suit', href: '#builder' },
  { label: 'Materials', href: '#materials' },
  { label: 'Seasons', href: '#seasons' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Shop', href: '#shop' },
]

export const SUSTAINABILITY_POINTS = [
  'Recycled materials',
  'Reduced packaging',
  'Repairable modular components',
  'Replaceable arms and legs',
  'Longer product life',
  'Fewer complete wetsuits purchased',
]

export const LIFECYCLE = ['Build', 'Surf', 'Repair', 'Replace a Part', 'Keep Surfing']
