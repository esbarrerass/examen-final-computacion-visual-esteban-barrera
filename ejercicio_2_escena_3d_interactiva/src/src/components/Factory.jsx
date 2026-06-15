import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Estructura física de la fábrica: piso, paredes, columnas, techo y ventanas.
 */
export function Factory() {
  const flickerRef = useRef()

  useFrame(({ clock }) => {
    // Luz de emergencia parpadeante
    if (flickerRef.current) {
      flickerRef.current.intensity = 0.3 + Math.random() * 0.1
    }
  })

  return (
    <group>
      {/* Suelo con patrón de cuadrícula */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Líneas de piso */}
      {[-6, -2, 2, 6].map((x, i) => (
        <mesh key={`fx-${i}`} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.498, 0]}>
          <planeGeometry args={[0.04, 28]} />
          <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {[-6, -2, 2, 6].map((z, i) => (
        <mesh key={`fz-${i}`} receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -0.498, z]}>
          <planeGeometry args={[0.04, 28]} />
          <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Paredes trasera y laterales */}
      <mesh receiveShadow position={[0, 4, -10]}>
        <boxGeometry args={[20, 9, 0.3]} />
        <meshStandardMaterial color="#1c1c2e" metalness={0.2} roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[-10, 4, 0]}>
        <boxGeometry args={[0.3, 9, 20]} />
        <meshStandardMaterial color="#1c1c2e" metalness={0.2} roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[10, 4, 0]}>
        <boxGeometry args={[0.3, 9, 20]} />
        <meshStandardMaterial color="#1c1c2e" metalness={0.2} roughness={0.9} />
      </mesh>

      {/* Techo */}
      <mesh receiveShadow position={[0, 8.5, 0]}>
        <boxGeometry args={[20, 0.3, 20]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>

      {/* Columnas */}
      {[[-8, 0], [-4, 0], [0, 0], [4, 0], [8, 0]].map(([x], i) => (
        <mesh key={i} castShadow position={[x, 4, -9.5]}>
          <boxGeometry args={[0.4, 9, 0.4]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Ventanas en pared trasera */}
      {[-6, 0, 6].map((x, i) => (
        <mesh key={`w-${i}`} position={[x, 4.5, -9.8]}>
          <boxGeometry args={[2.5, 2, 0.05]} />
          <meshStandardMaterial
            color="#0033aa"
            emissive="#0066ff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}

      {/* Luces de techo (neón industrial) */}
      {[[-5, 8.3, -4], [0, 8.3, -4], [5, 8.3, -4],
        [-5, 8.3, 4],  [0, 8.3, 4],  [5, 8.3, 4]].map((pos, i) => (
        <group key={`light-${i}`} position={pos}>
          <mesh>
            <boxGeometry args={[1.5, 0.06, 0.12]} />
            <meshStandardMaterial color="#ffffff" emissive="#88ccff" emissiveIntensity={2} />
          </mesh>
          <pointLight color="#cce4ff" intensity={2.5} distance={12} castShadow />
        </group>
      ))}

      {/* Luz de emergencia roja (parpadeante) */}
      <group position={[9, 7, -9]}>
        <mesh>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={2} />
        </mesh>
        <pointLight ref={flickerRef} color="#ff2200" intensity={0.4} distance={5} />
      </group>

      {/* Paneles de control en pared lateral */}
      <mesh position={[-9.7, 2.5, -5]}>
        <boxGeometry args={[0.1, 2, 1.5]} />
        <meshStandardMaterial color="#003366" metalness={0.5} roughness={0.4} />
      </mesh>
      {[0.2, -0.2].map((y, i) => (
        <mesh key={`btn-${i}`} position={[-9.65, 2.5 + y, -5.1]}>
          <boxGeometry args={[0.05, 0.15, 0.15]} />
          <meshStandardMaterial
            color={i === 0 ? '#00ff44' : '#ff4400'}
            emissive={i === 0 ? '#00ff44' : '#ff4400'}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  )
}
