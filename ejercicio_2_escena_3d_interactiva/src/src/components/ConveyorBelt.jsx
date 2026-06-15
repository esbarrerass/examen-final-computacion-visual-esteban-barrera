import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const PARTS = 8  // cajas sobre la cinta

/**
 * Banda transportadora con cajas animadas que se mueven en bucle.
 * La textura se desplaza vía offset UV para simular movimiento de la cinta.
 */
export function ConveyorBelt({ position = [0, 0, 0], length = 8, speed = 1 }) {
  const beltRef = useRef()
  const partsRefs = useRef([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed

    // Mover cajas a lo largo del eje X
    partsRefs.current.forEach((ref, i) => {
      if (!ref) return
      const offset = (i / PARTS) * length
      const x = ((t * 0.8 + offset) % length) - length / 2
      ref.position.x = x
    })
  })

  return (
    <group position={position}>
      {/* Estructura base de la cinta */}
      <mesh receiveShadow position={[0, -0.12, 0]}>
        <boxGeometry args={[length, 0.12, 0.9]} />
        <meshStandardMaterial color="#222" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Superficie de la cinta */}
      <mesh ref={beltRef} receiveShadow position={[0, -0.04, 0]}>
        <boxGeometry args={[length, 0.05, 0.8]} />
        <meshStandardMaterial color="#444" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Rodillos */}
      {Array.from({ length: Math.floor(length) + 1 }, (_, i) => (
        <mesh key={i} castShadow position={[-length / 2 + i, -0.09, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.9, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Soportes laterales */}
      {[-length / 2, length / 2].map((x, i) => (
        <mesh key={i} castShadow position={[x, -0.25, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.95]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Cajas en movimiento */}
      {Array.from({ length: PARTS }, (_, i) => (
        <mesh
          key={i}
          ref={el => (partsRefs.current[i] = el)}
          castShadow
          position={[0, 0.08, 0]}
        >
          <boxGeometry args={[0.35, 0.28, 0.35]} />
          <meshStandardMaterial
            color={['#ff4444', '#44aaff', '#ffcc00', '#44ff88'][i % 4]}
            metalness={0.1}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}
