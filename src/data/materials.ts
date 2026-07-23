export interface MaterialLayer {
  id: string
  index: number
  name: string
  purpose: string
  thickness: string
  durability: string
  sustainability: string
  color: string
}

export const MATERIAL_LAYERS: MaterialLayer[] = [
  {
    id: 'shell',
    index: 1,
    name: 'Protective Outer Shell',
    purpose: 'Abrasion-resistant skin that sheds water and blocks wind chill.',
    thickness: '0.8 mm',
    durability: 'Rated 5,000+ flex cycles',
    sustainability: 'Woven from recycled ocean-bound polyester.',
    color: '#0d3553',
  },
  {
    id: 'insulation',
    index: 2,
    name: 'Flexible Insulation Layer',
    purpose: 'Air-cell foam that traps warmth while staying supple.',
    thickness: '2.0 mm',
    durability: 'Compression-stable to 30 m',
    sustainability: 'Limestone-based neoprene alternative, no petroleum.',
    color: '#0d6f7a',
  },
  {
    id: 'core',
    index: 3,
    name: 'Thermal Core',
    purpose: 'Infrared-reflective lining that returns body heat to the skin.',
    thickness: '3.0 mm',
    durability: 'Retains 92% loft after 200 sessions',
    sustainability: 'Recycled fibre, dope-dyed to cut water use.',
    color: '#c9a85d',
  },
  {
    id: 'seam',
    index: 4,
    name: 'Waterproof Seam Layer',
    purpose: 'Fluid-welded seams that stop cold flush at the joints.',
    thickness: '1.2 mm',
    durability: 'Sealed & taped, zero-stitch entry points',
    sustainability: 'Solvent-free water-based adhesives.',
    color: '#9ed8e8',
  },
  {
    id: 'lining',
    index: 5,
    name: 'Soft Interior Lining',
    purpose: 'Quick-drying brushed lining, comfortable on bare skin.',
    thickness: '0.6 mm',
    durability: 'Anti-pill, colour-fast to salt & UV',
    sustainability: 'Fully recycled, bluesign® approved yarn.',
    color: '#b8d9d1',
  },
]
