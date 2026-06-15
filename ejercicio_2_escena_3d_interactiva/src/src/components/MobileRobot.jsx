import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PATH_RADIUS = 4.5

/**
 * Robot móvil (AGV) que patrulla en círculo por la fábrica.
 * Tiene ruedas animadas y una luz de estado parpadeante.
 */
export function MobileRobot({ position = [0, 0, 0], speed = 0.4, phaseOffset = 0 }) {
  const groupRef = useRef()
  const wheelRefs = useRef([])
  const lightRef = useRef()
  const antennaRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phaseOffset

    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.cos(t) * PATH_RADIUS
      groupRef.current.position.z = position[2] + Math.sin(t) * PATH_RADIUS
      groupRef.current.rotation.y = -t + Math.PI / 2
    }

    wheelRefs.current.forEach(ref => {
      if (ref) ref.rotation.x += 0.1
    })

    if (lightRef.current) {
      lightRef.current.intensity = 0.6 + Math.sin(t * 6) * 0.4
    }

    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(t * 3) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Chasis principal */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.22, 0.5]} />
        <meshStandardMaterial color="#1a3a5c" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Cabina superior */}
      <mesh castShadow position={[0, 0.22, 0]}>
        <boxGeometry args={[0.45, 0.2, 0.38]} />
        <meshStandardMaterial color="#0d2b45" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Ventana frontal */}
      <mesh position={[0.23, 0.22, 0]}>
        <boxGeometry args={[0.02, 0.14, 0.3]} />
        <meshStandardMaterial color="#88ddff" metalness={0.1} roughness={0} transparent opacity={0.6} />
      </mesh>

      {/* Ruedas: 4 esquinas */}
      {[[-0.28, -0.14, 0.2], [0.28, -0.14, 0.2],
        [-0.28, -0.14, -0.2], [0.28, -0.14, -0.2]].map((pos, i) => (
        <mesh
          key={i}
          ref={el => (wheelRefs.current[i] = el)}
          castShadow
          position={pos}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.12, 0.12, 0.1, 12]} />
          <meshStandardMaterial color="#111" metalness={0.4} roughness={0.9} />
        </mesh>
      ))}

      {/* Antena */}
      <group ref={antennaRef} position={[0.1, 0.38, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 6]} />
          <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Luz de estado */}
        <mesh ref={lightRef} position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1} />
        </mesh>
        <pointLight color="#00ff88" intensity={0.8} distance={1.5} position={[0, 0.18, 0]} />
      </group>

      {/* Sensor frontal */}
      <mesh position={[0.36, 0, 0]}>
        <boxGeometry args={[0.04, 0.08, 0.08]} />
        <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}
