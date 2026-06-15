import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid, Stats } from '@react-three/drei'
import { Factory } from './Factory'
import { RoboticArm } from './RoboticArm'
import { ConveyorBelt } from './ConveyorBelt'
import { MobileRobot } from './MobileRobot'

/**
 * Escena principal: Fábrica automatizada con robots industriales.
 *
 * Controles de teclado:
 *   ESPACIO  → pausar/reanudar animaciones
 *   L        → cambiar modo de iluminación (día / noche)
 *   R        → resetear cámara
 *
 * Controles UI (botones inferiores):
 *   PAUSA | LUCES | CÁMARA
 *
 * Interacción:
 *   Orbit controls: arrastrar para rotar, scroll para zoom,
 *                   clic derecho + arrastrar para desplazar.
 */
export function Scene({ paused, lightMode }) {
  const controlsRef = useRef()

  const armSpeed = paused ? 0 : 1

  return (
    <Canvas
      shadows
      camera={{ position: [0, 10, 18], fov: 65, near: 0.1, far: 200 }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Luz ambiental base */}
      <ambientLight intensity={lightMode === 'day' ? 2.0 : 0.9} color={lightMode === 'day' ? '#ffffff' : '#aabbcc'} />

      {/* Luz direccional (sol / luna) */}
      <directionalLight
        castShadow
        position={lightMode === 'day' ? [15, 20, 10] : [5, 15, -5]}
        intensity={lightMode === 'day' ? 3 : 0.6}
        color={lightMode === 'day' ? '#fff5e0' : '#3355aa'}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Jerarquía de la escena */}
      <group>
        {/* Estructura de la fábrica */}
        <Factory />

        {/* 3 brazos robóticos en posiciones distintas */}
        <RoboticArm position={[-5, -0.5, -6]} speed={paused ? 0 : 1.0} color="#ff6600" />
        <RoboticArm position={[0,  -0.5, -6]} speed={paused ? 0 : 0.8} color="#00aaff" />
        <RoboticArm position={[5,  -0.5, -6]} speed={paused ? 0 : 1.2} color="#ffcc00" />

        {/* Banda transportadora principal */}
        <ConveyorBelt position={[0, -0.5, 0]} length={12} speed={paused ? 0 : 1} />

        {/* Banda secundaria perpendicular */}
        <group rotation={[0, Math.PI / 2, 0]}>
          <ConveyorBelt position={[0, -0.5, 6]} length={6} speed={paused ? 0 : 0.7} />
        </group>

        {/* 2 robots móviles AGV con fases distintas */}
        <MobileRobot position={[0, -0.38, 0]} speed={paused ? 0 : 0.35} phaseOffset={0} />
        <MobileRobot position={[0, -0.38, 0]} speed={paused ? 0 : 0.35} phaseOffset={Math.PI} />
      </group>

      {/* Controles de cámara interactivos */}
      <OrbitControls
        ref={controlsRef}
        target={[0, 0, -2]}
        minDistance={4}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2.1}
        enableDamping
        dampingFactor={0.06}
      />

      {/* Niebla ambiental */}
      <fog attach="fog" args={['#0a0a1a', 35, 80]} />

      <Stats />
    </Canvas>
  )
}
