import type { ComponentId, WetsuitComponent } from './types'

// The modular system. The core is the always-present base layer; every other
// piece attaches or detaches via the AquaAdapt connection system.
export const COMPONENTS: Record<ComponentId, WetsuitComponent> = {
  core: {
    id: 'core',
    label: 'Core Suit',
    short: 'Core',
    detachable: false,
    price: 289,
    warmth: 22,
    flexPenalty: 0,
    description: 'The sleeveless, short-leg thermal core. The foundation every configuration builds on.',
  },
  leftArm: {
    id: 'leftArm',
    label: 'Left Full Arm',
    short: 'L Arm',
    detachable: true,
    price: 46,
    warmth: 13,
    flexPenalty: 6,
    description: 'Full-length insulated sleeve with a sealed AquaAdapt shoulder joint.',
  },
  rightArm: {
    id: 'rightArm',
    label: 'Right Full Arm',
    short: 'R Arm',
    detachable: true,
    price: 46,
    warmth: 13,
    flexPenalty: 6,
    description: 'Full-length insulated sleeve with a sealed AquaAdapt shoulder joint.',
  },
  leftLeg: {
    id: 'leftLeg',
    label: 'Left Full Leg',
    short: 'L Leg',
    detachable: true,
    price: 52,
    warmth: 14,
    flexPenalty: 5,
    description: 'Full-length insulated leg extension that locks at the knee seam.',
  },
  rightLeg: {
    id: 'rightLeg',
    label: 'Right Full Leg',
    short: 'R Leg',
    detachable: true,
    price: 52,
    warmth: 14,
    flexPenalty: 5,
    description: 'Full-length insulated leg extension that locks at the knee seam.',
  },
  hood: {
    id: 'hood',
    label: 'Thermal Hood',
    short: 'Hood',
    detachable: true,
    price: 39,
    warmth: 10,
    flexPenalty: 2,
    description: 'Sealed thermal hood for the coldest water and long winter sessions.',
  },
  gloves: {
    id: 'gloves',
    label: 'Sealed Gloves',
    short: 'Gloves',
    detachable: true,
    price: 34,
    warmth: 6,
    flexPenalty: 4,
    description: 'Pre-curved thermal gloves that keep dexterity in cold conditions.',
  },
  boots: {
    id: 'boots',
    label: 'Grip Boots',
    short: 'Boots',
    detachable: true,
    price: 36,
    warmth: 6,
    flexPenalty: 3,
    description: 'Split-toe grip boots for cold, rocky entries.',
  },
}

export const COMPONENT_LIST: WetsuitComponent[] = Object.values(COMPONENTS)

export const DETACHABLE_COMPONENTS: WetsuitComponent[] = COMPONENT_LIST.filter(
  (c) => c.detachable,
)

// Spatial anchor positions (as % of the suit frame) used by the builder + hero
// to place glowing connection points and floating pieces around the core.
export const COMPONENT_ANCHORS: Record<
  ComponentId,
  { x: number; y: number }
> = {
  core: { x: 50, y: 50 },
  leftArm: { x: 24, y: 34 },
  rightArm: { x: 76, y: 34 },
  leftLeg: { x: 40, y: 82 },
  rightLeg: { x: 60, y: 82 },
  hood: { x: 50, y: 9 },
  gloves: { x: 16, y: 52 },
  boots: { x: 50, y: 96 },
}
