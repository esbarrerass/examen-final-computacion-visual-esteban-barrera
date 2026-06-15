import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Brazo robótico con jerarquía de 4 segmentos.
 * Cada segmento es hijo del anterior (transform local).
 * La animación simula el ciclo de recogida/soltar de una pieza.
 */
export function RoboticArm({ position = [0, 0, 0], speed = 1, color = '#ff6600' }) {
  const baseRef = useRef()
  const joint1Ref = useRef()
  const joint2Ref = useRef()
  const clawRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed

    // Base rota sobre Y lentamente
    if (baseRef.current) {
      baseRef.current.rotation.y = Math.sin(t * 0.5) * 0.8
    }
    // Primer segmento: balanceo vertical
    if (joint1Ref.current) {
      joint1Ref.current.rotation.z = -0.4 + Math.sin(t * 0.7) * 0.5
    }
    // Segundo segmento: flexión complementaria
    if (joint2Ref.current) {
      joint2Ref.current.rotation.z = 0.6 + Math.sin(t * 0.7 + Math.PI) * 0.4
    }
    // Garra: abre y cierra
    if (clawRef.current) {
      const grip = (Math.sin(t * 1.4) + 1) * 0.5
      clawRef.current.scale.x = 0.6 + grip * 0.4
    }
  })

  const metalMat = {
    color,
    metalness: 0.85,
    roughness: 0.2,
  }

  const darkMetal = {
    color: '#222',
    metalness: 0.9,
    roughness: 0.15,
  }

  return (
    <group position={position}>
      {/* Base cilíndrica */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.3, 16]} />
        <meshStandardMaterial {...darkMetal} />
      </mesh>

      {/* Columna giratoria */}
      <group ref={baseRef} position={[0, 0.15, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.6, 12]} />
          <meshStandardMaterial {...metalMat} />
        </mesh>

        {/* Articulación 1 - segmento superior izquierdo */}
        <group ref={joint1Ref} position={[0, 0.4, 0]}>
          {/* Esfera articulación */}
          <mesh castShadow>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshStandardMaterial {...darkMetal} />
          </mesh>
          {/* Brazo 1 */}
          <mesh castShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[0.18, 1.1, 0.18]} />
            <meshStandardMaterial {...metalMat} />
          </mesh>

          {/* Articulación 2 */}
          <group ref={joint2Ref} position={[0, 1.15, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial {...darkMetal} />
            </mesh>
            {/* Brazo 2 */}
            <mesh castShadow position={[0, 0.45, 0]}>
              <boxGeometry args={[0.14, 0.9, 0.14]} />
              <meshStandardMaterial {...metalMat} />
            </mesh>

            {/* Garra */}
            <group ref={clawRef} position={[0, 0.95, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.3, 0.08, 0.08]} />
                <meshStandardMaterial color="#ffaa00" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Dientes */}
              {[-0.12, 0.12].map((x, i) => (
                <mesh key={i} castShadow position={[x, -0.1, 0]}>
                  <boxGeometry args={[0.06, 0.2, 0.06]} />
                  <meshStandardMaterial color="#ffaa00" metalness={0.9} roughness={0.1} />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
