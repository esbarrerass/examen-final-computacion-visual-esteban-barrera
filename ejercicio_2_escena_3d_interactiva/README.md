# Ejercicio 2 — Escena 3D Interactiva: Fábrica Automatizada

## Propósito

Desarrollar una escena 3D de una fábrica de automatización industrial que demuestre jerarquía de objetos, transformaciones 3D, materiales PBR, iluminación multi-fuente, animaciones coordinadas e interacción del usuario. La escena incluye brazos robóticos articulados, bandas transportadoras con piezas en movimiento y robots móviles AGV que patrullan la planta.

---

## Tema elegido

**Robótica / Automatización** — Fábrica con:
- 3 brazos robóticos (4 grados de libertad cada uno)
- 2 bandas transportadoras con piezas en movimiento
- 2 robots móviles AGV (Automated Guided Vehicles)
- Estructura completa de fábrica (paredes, columnas, techo, ventanas, paneles de control)

---

## Herramientas y librerías

| Herramienta | Versión | Propósito |
|---|---|---|
| React | 18 | Framework UI |
| Vite | 6 | Bundler y dev server |
| Three.js | r168+ | Motor 3D WebGL |
| @react-three/fiber | 9 | Binding React para Three.js |
| @react-three/drei | 10 | Helpers (OrbitControls, Stats, Grid) |

---

## Instalación y ejecución

```bash
cd ejercicio_2_escena_3d_interactiva/src
npm install
npm run dev
```

Abrir en el navegador: `http://localhost:5173`

### Build de producción

```bash
npm run build
npm run preview
```

---

## Estructura del código

```
src/
└── src/
    ├── main.jsx                   # Punto de entrada React
    ├── App.jsx                    # Estado global + UI overlay
    ├── index.css                  # Estilos HUD industrial
    └── components/
        ├── Scene.jsx              # Canvas + cámara + iluminación
        ├── Factory.jsx            # Estructura de la fábrica (piso, paredes, luces)
        ├── RoboticArm.jsx         # Brazo robótico articulado (jerarquía 4 niveles)
        ├── ConveyorBelt.jsx       # Banda transportadora + cajas animadas
        └── MobileRobot.jsx        # Robot AGV con trayectoria circular
```

---

## Requerimientos cumplidos

| Requerimiento | Implementación |
|---|---|
| Escena 3D completa temática | Fábrica industrial con todos los elementos |
| Jerarquía de objetos | `RoboticArm`: base → columna → joint1 → joint2 → garra (4 niveles) |
| Traslación, rotación, escala | `MobileRobot` traslada en círculo; `RoboticArm` rota/flexiona; `ConveyorBelt` escala partes |
| Cámara interactiva | `OrbitControls`: rotar (drag), zoom (scroll), desplazar (clic der) |
| Materiales PBR | Todos usan `meshStandardMaterial` con `metalness` y `roughness` |
| Iluminación coherente | `ambientLight` + `directionalLight` (castShadow) + 6 `pointLight` de neón + luz de emergencia |
| Animaciones | Brazos: 3 DOF animados via `useFrame`; AGV: trayectoria circular + ruedas girando |
| Interacción entre elementos | Los AGV patrullan alrededor de las cintas; los brazos operan sobre ellas |
| Interacción del usuario | Teclado (`ESPACIO`, `L`) + botones UI (pausar, modo día/noche) |

---

## Interacción con el usuario

### Teclado
- `ESPACIO` — Pausar / reanudar todas las animaciones
- `L` — Alternar entre iluminación de día (luz solar cálida) y noche (luz azul tenue + neón)

### Ratón / Trackpad
- **Arrastrar** — Rotar cámara alrededor de la escena
- **Scroll** — Zoom in/out (rango 4–40 unidades)
- **Clic derecho + arrastrar** — Desplazamiento lateral de la cámara

### Botones UI
- **PAUSAR / REANUDAR** — Congela/reactiva todas las animaciones
- **DÍA / NOCHE** — Cambia el modo de iluminación de la escena

---

## Decisiones técnicas

### React Three Fiber vs Unity/Three.js puro
Se eligió R3F porque permite declarar la escena en JSX con estado React, simplificando el manejo de interacciones y la sincronización pausa/modo sin necesidad de un game loop explícito.

### Jerarquía del brazo robótico
Cada segmento es un `<group>` hijo del anterior. Rotaciones se expresan en espacio local, lo que permite encadenar DOF como en cinemática directa real: rotar el joint1 mueve automáticamente joint2 y la garra.

### Animación con `useFrame`
Se usó `clock.getElapsedTime()` en vez de state/setState para animaciones, evitando re-renders de React y manteniéndo 60 fps estables. Al pausar, simplemente se pasa `speed=0`.

### Materiales PBR (meshStandardMaterial)
- Metal brillante: `metalness=0.9, roughness=0.1–0.2`
- Plástico/pintura: `metalness=0.1–0.3, roughness=0.7–0.9`
- Emisivos para luces de indicadores y neón de techo

### Iluminación multi-fuente
- `directionalLight` con sombras: simula sol/luna según modo
- 6 `pointLight` en el techo: iluminación industrial uniforme
- 1 `pointLight` roja parpadeante: luz de emergencia (aleatoriedad via `Math.random()` en `useFrame`)

---

## Dificultades encontradas

- **OrbitControls y `maxPolarAngle`**: sin limitación el usuario podía ir debajo del piso. Se fijó `maxPolarAngle={Math.PI/2.1}`.
- **Robots pausados vs detenidos**: al pasar `speed=0` a `useFrame`, los valores siguen siendo cero multiplicados por tiempo creciente, por lo que las posiciones se congelan correctamente.
- **Banda transportadora**: la caja resetea posición usando módulo `% length` para hacer el loop infinito sin saltos visibles.

---

## Evidencias

Ver carpeta `media/` con capturas de pantalla de la escena en funcionamiento.

---

## Uso de IA

- Claude Sonnet 4.6 generó la arquitectura de componentes y el código de animación.
- El alumno verificó manualmente:
  - La jerarquía del brazo robótico (transformaciones locales correctas).
  - El comportamiento de los AGV en trayectoria circular.
  - El modo día/noche y la interacción con teclado.
  - El build de producción sin errores.
  - Los parámetros de iluminación y materialidad PBR.
