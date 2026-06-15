# Examen Final — Computación Visual 2026-I

**Estudiante:** Esteban Barrera  
**Universidad Nacional de Colombia**  
**Curso:** Computación Visual  
**Fecha:** Junio 2026

---

## Descripción general

Entrega práctica del examen final que integra dos ejercicios:

1. **Procesamiento visual e IA** — Pipeline de procesamiento de imágenes con OpenCV en Python: escala de grises, conversión HSV, suavizado gaussiano, detección de bordes Canny y segmentación adaptativa.

2. **Escena 3D interactiva** — Fábrica automatizada construida con React Three Fiber (Three.js): brazos robóticos articulados con jerarquía de 4 niveles, bandas transportadoras con piezas animadas, robots móviles AGV y controles de usuario (teclado + botones UI).

---

## Dependencias

### Ejercicio 1 (Python)
- Python 3.9+
- `opencv-python` 4.x
- `numpy` 1.x

### Ejercicio 2 (JavaScript/Web)
- Node.js 18+
- npm 9+
- React 18, Vite 6, Three.js r168+, @react-three/fiber 9, @react-three/drei 10

---

## Instalación

### Ejercicio 1

```bash
pip install opencv-python numpy
```

### Ejercicio 2

```bash
cd ejercicio_2_escena_3d_interactiva/src
npm install
```

---

## Ejecución

### Ejercicio 1

```bash
# Imagen incluida de muestra
python ejercicio_1_procesamiento_visual/src/main.py \
       ejercicio_1_procesamiento_visual/data/sample.png

# Imagen propia
python ejercicio_1_procesamiento_visual/src/main.py ruta/imagen.jpg
```

Los resultados se guardan en `ejercicio_1_procesamiento_visual/resultados/`.

### Ejercicio 2

```bash
cd ejercicio_2_escena_3d_interactiva/src
npm run dev
# Abrir http://localhost:5173
```

---

## Estructura del repositorio

```
examen-final-computacion-visual-esteban-barrera/
├── README.md                                  ← este archivo
├── GUIA.md                                    ← enunciado del examen
│
├── ejercicio_1_procesamiento_visual/
│   ├── README.md                              ← documentación técnica
│   ├── src/
│   │   └── main.py                            ← pipeline OpenCV
│   ├── data/
│   │   └── sample.png                         ← imagen de prueba
│   └── resultados/
│       ├── original.png
│       ├── grises.png
│       ├── hsv.png
│       ├── suavizado.png
│       ├── bordes.png
│       ├── deteccion_segmentacion.png
│       └── comparacion.png                    ← cuadrícula comparativa
│
└── ejercicio_2_escena_3d_interactiva/
    ├── README.md                              ← documentación técnica
    ├── media/                                 ← capturas y GIF de demo
    └── src/                                   ← proyecto Vite/React
        ├── package.json
        └── src/
            ├── main.jsx
            ├── App.jsx
            ├── index.css
            └── components/
                ├── Scene.jsx
                ├── Factory.jsx
                ├── RoboticArm.jsx
                ├── ConveyorBelt.jsx
                └── MobileRobot.jsx
```

---

## Evidencias

### Ejercicio 1 — Resultados del pipeline

Los 7 archivos en `ejercicio_1_procesamiento_visual/resultados/` muestran cada etapa del pipeline. El archivo `comparacion.png` presenta las 6 etapas lado a lado en una cuadrícula 2×4.

### Ejercicio 2 — Escena 3D

Ver `ejercicio_2_escena_3d_interactiva/media/` para capturas de pantalla de la escena en funcionamiento.

---

## Análisis técnico

### Ejercicio 1
El pipeline sigue el flujo estándar de visión por computador: adquisición → preprocesamiento (grises, HSV) → filtrado (Gaussiano) → detección de características (Canny) → análisis semántico (segmentación). La umbralización adaptativa gaussiana fue preferida sobre Otsu porque maneja iluminación no uniforme, condición frecuente en imágenes reales.

### Ejercicio 2
La arquitectura de componentes React separa responsabilidades claramente: `Factory` define el entorno estático, mientras que `RoboticArm`, `ConveyorBelt` y `MobileRobot` encapsulan su propia lógica de animación vía `useFrame`. La jerarquía de transformaciones del brazo robótico usa coordenadas locales, reflejando el modelo de cinemática directa de robots reales.

---

## Uso de IA

Se utilizó **Claude Sonnet 4.6** (Claude Code) para:
- Generar la estructura base del pipeline OpenCV
- Diseñar la arquitectura de componentes React Three Fiber
- Redactar la documentación técnica

El estudiante verificó manualmente:
- Correctitud visual de cada etapa del pipeline (Ejercicio 1)
- Jerarquía de transformaciones del brazo robótico (Ejercicio 2)
- Comportamiento de interacción por teclado y botones
- Build de producción sin errores
- Parámetros de iluminación y materiales PBR
- Coherencia entre el código y la documentación

Los prompts principales utilizados: *"construir pipeline OpenCV con las 7 operaciones del enunciado"*, *"escena React Three Fiber de fábrica automatizada con jerarquía, animaciones y controles de usuario"*.
