import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { WetsuitModel } from './WetsuitModel'
import { UnderwaterParticles } from './UnderwaterParticles'
import type { ComponentId } from '../../data/types'

interface Props {
  attached: ComponentId[]
  accent: string
  turbulence: number
  pointer: { x: number; y: number }
  reduced: boolean
  quality: 'high' | 'low'
}

/** A slowly drifting caustic light that plays across the suit. */
function CausticLight({ color, turbulence, reduced }: { color: string; turbulence: number; reduced: boolean }) {
  const light = useRef<THREE.SpotLight>(null)
  useFrame((state) => {
    if (!light.current || reduced) return
    const t = state.clock.elapsedTime
    light.current.position.x = Math.sin(t * 0.4) * 3
    light.current.position.z = 4 + Math.cos(t * 0.3) * 1.5
    light.current.intensity = 2.4 + Math.sin(t * 2) * turbulence
  })
  return (
    <spotLight
      ref={light}
      position={[2, 5, 4]}
      angle={0.6}
      penumbra={1}
      intensity={2.6}
      color={color}
      castShadow
      shadow-mapSize-width={reduced ? 512 : 1024}
      shadow-mapSize-height={reduced ? 512 : 1024}
    />
  )
}

export function HeroScene({ attached, accent, turbulence, pointer, reduced, quality }: Props) {
  return (
    <Canvas
      shadows={quality === 'high'}
      dpr={quality === 'high' ? [1, 1.8] : [1, 1.2]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: quality === 'high', alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <color attach="background" args={['#05080b']} />
      <fog attach="fog" args={['#061826', 9, 20]} />

      <ambientLight intensity={0.9} color="#3a6f8c" />
      <directionalLight position={[-4, 6, 3]} intensity={1.4} color={accent} />
      <directionalLight position={[5, 2, 5]} intensity={1.1} color="#eaf4f2" />
      <CausticLight color={accent} turbulence={turbulence} reduced={reduced} />

      <Suspense fallback={null}>
        <WetsuitModel
          attached={attached}
          accent={accent}
          pointer={pointer}
          reduced={reduced}
          quality={quality}
        />
        <UnderwaterParticles count={quality === 'high' ? 130 : 60} color={accent} />
        {/* Rim + fill lights instead of a remote HDR environment, so the scene
            stays fully self-contained with no external asset fetches. */}
        <pointLight position={[3, -2, 4]} intensity={0.5} color="#b8d9d1" />
        <pointLight position={[-3, 3, -2]} intensity={0.4} color={accent} />
      </Suspense>

      {/* Soft ground shadow catcher */}
      {quality === 'high' && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.35} />
        </mesh>
      )}
    </Canvas>
  )
}
