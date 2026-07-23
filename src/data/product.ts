import type { ComponentId } from './types'

export interface Option<T = string> {
  id: T
  label: string
  sublabel?: string
  priceDelta: number
  swatch?: string
}

export const CORE_PRICE = 289

export const SIZES: Option[] = [
  { id: 'xs', label: 'XS', priceDelta: 0 },
  { id: 's', label: 'S', priceDelta: 0 },
  { id: 'm', label: 'M', priceDelta: 0 },
  { id: 'l', label: 'L', priceDelta: 0 },
  { id: 'xl', label: 'XL', priceDelta: 0 },
  { id: 'xxl', label: 'XXL', priceDelta: 12 },
]

export const THICKNESSES: Option[] = [
  { id: '2mm', label: '2 mm', sublabel: 'Warm water', priceDelta: 0 },
  { id: '3mm', label: '3 mm', sublabel: 'All-round', priceDelta: 24 },
  { id: '4mm', label: '4 mm', sublabel: 'Cold water', priceDelta: 44 },
  { id: '5mm', label: '5 mm', sublabel: 'Ice water', priceDelta: 68 },
]

export const COLORS: Option[] = [
  { id: 'abyss', label: 'Abyss', sublabel: 'Near-black charcoal', priceDelta: 0, swatch: '#0a0f14' },
  { id: 'navy', label: 'Deep Navy', sublabel: 'Ocean navy', priceDelta: 0, swatch: '#0a2c44' },
  { id: 'seafoam', label: 'Seafoam', sublabel: 'Muted green', priceDelta: 10, swatch: '#6ea79b' },
  { id: 'ice', label: 'Ice Line', sublabel: 'Ice-blue accent', priceDelta: 10, swatch: '#3d6f85' },
]

export interface AttachmentOption {
  id: ComponentId
  label: string
  price: number
  recommended?: boolean
}

export const INCLUDED_ATTACHMENTS: AttachmentOption[] = [
  { id: 'leftArm', label: 'Detachable arms (pair)', price: 92, recommended: true },
  { id: 'leftLeg', label: 'Detachable legs (pair)', price: 104, recommended: true },
]

export const ACCESSORY_ATTACHMENTS: AttachmentOption[] = [
  { id: 'hood', label: 'Thermal hood', price: 39 },
  { id: 'gloves', label: 'Sealed gloves', price: 34 },
  { id: 'boots', label: 'Grip boots', price: 36 },
]

export const CASE_ITEMS = [
  { id: 'core', label: 'Core wetsuit', included: true },
  { id: 'arms', label: 'Detachable arms', included: true },
  { id: 'legs', label: 'Detachable legs', included: true },
  { id: 'pouch', label: 'Storage pouch', included: true },
  { id: 'guide', label: 'Care guide', included: true },
  { id: 'temp', label: 'Temperature guide', included: true },
  { id: 'hood', label: 'Optional hood', included: false },
  { id: 'gloves', label: 'Optional gloves', included: false },
  { id: 'boots', label: 'Optional boots', included: false },
]

export const REASSURANCE = [
  'Free size exchange',
  'Repairable components',
  'Secure checkout',
  '2-year product warranty',
  'Temperature guide included',
]
