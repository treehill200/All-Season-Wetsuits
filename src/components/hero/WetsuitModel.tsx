import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import type { ComponentId } from '../../data/types'

interface Props {
  attached: ComponentId[]
  accent: string
  pointer: { x: number; y: number }
  reduced: boolean
  quality: 'high' | 'low'
}

const has = (list: ComponentId[], id: ComponentId) => list.includes(id)

/** Smoothly eased limb that scales along its length when attached/detached. */
function Limb({
  visible,
  position,
  rotation,
  args,
  material,
  reduced,
}: {
  visible: boolean
  position: [number, number, number]
  rotation?: [number, number, number]
  args: [number, number, number, number]
  material: THREE.Material
  reduced: boolean
}) {
  const ref = useRef<THREE.Group>(null)
  const target = visible ? 1 : 0.0001

  useFrame((_, delta) => {
    if (!ref.current) return
    const g = ref.current
    const speed = reduced ? 1 : 8
    const next = THREE.MathUtils.damp(g.scale.y, target, speed, delta)
    g.scale.set(
      THREE.MathUtils.damp(g.scale.x, visible ? 1 : 0.3, speed, delta),
      next,
      THREE.MathUtils.damp(g.scale.z, visible ? 1 : 0.3, speed, delta),
    )
    // Material fade
    const mat = g.children[0] as THREE.Mesh
    if (mat && (mat.material as THREE.MeshStandardMaterial).opacity !== undefined) {
      const m = mat.material as THREE.MeshStandardMaterial
      m.opacity = THREE.MathUtils.damp(m.opacity, visible ? 1 : 0, speed, delta)
    }
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh castShadow material={material}>
        {/* CapsuleGeometry(radius, length, capSegments, radialSegments) */}
        <capsuleGeometry args={[args[0], args[1], args[2], args[3]]} />
      </mesh>
    </group>
  )
}

export function WetsuitModel({ attached, accent, pointer, reduced, quality }: Props) {
  const root = useRef<THREE.Group>(null)

  const seg = quality === 'high' ? 16 : 8

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1d4a68'),
        roughness: 0.45,
        metalness: 0.15,
        // A little self-illumination so the wet suit reads against the dark
        // water even without an environment map.
        emissive: new THREE.Color('#0a2135'),
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 1,
      }),
    [],
  )

  const limbMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#245676'),
        roughness: 0.4,
        metalness: 0.15,
        emissive: new THREE.Color('#0c2a42'),
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 1,
      }),
    [],
  )

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(accent),
        roughness: 0.3,
        metalness: 0.1,
        emissive: new THREE.Color(accent),
        emissiveIntensity: 0.55,
        transparent: true,
        opacity: 1,
      }),
    [accent],
  )

  // Keep accent in sync with prop without recreating.
  accentMaterial.color.set(accent)
  accentMaterial.emissive.set(accent)

  useFrame((state, delta) => {
    if (!root.current) return
    const g = root.current
    // Slow rotation
    if (!reduced) {
      g.rotation.y += delta * 0.22
    }
    // React to pointer
    const targetX = reduced ? 0 : pointer.y * 0.18
    const targetZ = reduced ? 0 : -pointer.x * 0.1
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 4, delta)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, targetZ, 4, delta)
  })

  return (
    <Float
      speed={reduced ? 0 : 1.4}
      rotationIntensity={0}
      floatIntensity={reduced ? 0 : 0.7}
      floatingRange={[-0.12, 0.12]}
    >
      <group ref={root} scale={1.05} position={[0, -0.1, 0]}>
        {/* Torso */}
        <mesh castShadow material={bodyMaterial}>
          <capsuleGeometry args={[0.62, 1.1, seg, seg * 2]} />
        </mesh>
        {/* Chest taper / zip seam */}
        <mesh position={[0, 0.1, 0.6]} material={accentMaterial}>
          <boxGeometry args={[0.03, 1.2, 0.02]} />
        </mesh>

        {/* Sleeveless shoulder caps (always present) */}
        <mesh position={[-0.6, 0.62, 0]} material={bodyMaterial} castShadow>
          <sphereGeometry args={[0.3, seg, seg]} />
        </mesh>
        <mesh position={[0.6, 0.62, 0]} material={bodyMaterial} castShadow>
          <sphereGeometry args={[0.3, seg, seg]} />
        </mesh>

        {/* Short core legs (always present) */}
        <mesh position={[-0.28, -1.15, 0]} material={bodyMaterial} castShadow>
          <capsuleGeometry args={[0.26, 0.5, seg, seg]} />
        </mesh>
        <mesh position={[0.28, -1.15, 0]} material={bodyMaterial} castShadow>
          <capsuleGeometry args={[0.26, 0.5, seg, seg]} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.15, 0]} material={bodyMaterial} castShadow>
          <sphereGeometry args={[0.34, seg, seg]} />
        </mesh>

        {/* Full arms */}
        <Limb
          visible={has(attached, 'leftArm')}
          position={[-0.78, 0.15, 0]}
          rotation={[0, 0, 0.32]}
          args={[0.17, 0.9, seg, seg]}
          material={limbMaterial}
          reduced={reduced}
        />
        <Limb
          visible={has(attached, 'rightArm')}
          position={[0.78, 0.15, 0]}
          rotation={[0, 0, -0.32]}
          args={[0.17, 0.9, seg, seg]}
          material={limbMaterial}
          reduced={reduced}
        />

        {/* Full leg extensions */}
        <Limb
          visible={has(attached, 'leftLeg')}
          position={[-0.28, -1.85, 0]}
          args={[0.2, 0.7, seg, seg]}
          material={limbMaterial}
          reduced={reduced}
        />
        <Limb
          visible={has(attached, 'rightLeg')}
          position={[0.28, -1.85, 0]}
          args={[0.2, 0.7, seg, seg]}
          material={limbMaterial}
          reduced={reduced}
        />

        {/* Hood */}
        <Limb
          visible={has(attached, 'hood')}
          position={[0, 1.2, 0]}
          args={[0.4, 0.05, seg, seg]}
          material={limbMaterial}
          reduced={reduced}
        />

        {/* Gloves */}
        {has(attached, 'gloves') && (
          <>
            <mesh position={[-1.02, -0.45, 0]} material={accentMaterial}>
              <sphereGeometry args={[0.14, seg, seg]} />
            </mesh>
            <mesh position={[1.02, -0.45, 0]} material={accentMaterial}>
              <sphereGeometry args={[0.14, seg, seg]} />
            </mesh>
          </>
        )}

        {/* Boots */}
        {has(attached, 'boots') && (
          <>
            <mesh position={[-0.28, -2.28, 0.08]} material={accentMaterial}>
              <boxGeometry args={[0.26, 0.16, 0.4]} />
            </mesh>
            <mesh position={[0.28, -2.28, 0.08]} material={accentMaterial}>
              <boxGeometry args={[0.26, 0.16, 0.4]} />
            </mesh>
          </>
        )}

        {/* Connection accent rings at the joints */}
        <mesh position={[-0.62, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} material={accentMaterial}>
          <torusGeometry args={[0.2, 0.02, 8, 24]} />
        </mesh>
        <mesh position={[0.62, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} material={accentMaterial}>
          <torusGeometry args={[0.2, 0.02, 8, 24]} />
        </mesh>
      </group>
    </Float>
  )
}
