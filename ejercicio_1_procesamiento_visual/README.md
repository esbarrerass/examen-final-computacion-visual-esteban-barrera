# Ejercicio 1 — Procesamiento Visual e IA

## Propósito

Implementar un pipeline de procesamiento de imágenes que recorre las etapas fundamentales de visión por computador: carga, transformación de espacio de color, suavizado, detección de bordes y segmentación. El resultado es una serie de imágenes comparativas que muestran el efecto de cada operación.

---

## Herramientas y librerías

| Herramienta | Versión | Propósito |
|---|---|---|
| Python | 3.9+ | Lenguaje base |
| OpenCV (`cv2`) | 4.x | Procesamiento de imagen |
| NumPy | 1.x | Operaciones matriciales |

---

## Instalación

```bash
pip install opencv-python numpy
```

---

## Ejecución

```bash
# Con imagen propia
python src/main.py ruta/a/tu/imagen.jpg

# Con imagen de muestra incluida
python src/main.py data/sample.png
```

El script también acepta un video corto (`.mp4`, `.avi`): extrae el primer frame y procesa el resto del pipeline sobre él.

---

## Estructura

```
ejercicio_1_procesamiento_visual/
├── src/
│   └── main.py          # Pipeline completo
├── data/
│   └── sample.png       # Imagen sintética de prueba
└── resultados/
    ├── original.png
    ├── grises.png
    ├── hsv.png
    ├── suavizado.png
    ├── bordes.png
    ├── deteccion_segmentacion.png
    └── comparacion.png
```

---

## Resultados obtenidos

| Archivo | Descripción |
|---|---|
| `original.png` | Imagen de entrada sin modificar |
| `grises.png` | Conversión a escala de grises (canal L perceptual via BGR→GRAY) |
| `hsv.png` | Representación en espacio HSV (Hue, Saturation, Value) |
| `suavizado.png` | Filtro Gaussiano kernel 9×9, σ automático |
| `bordes.png` | Bordes detectados con Canny (low=50, high=150) |
| `deteccion_segmentacion.png` | Segmentación adaptativa + contornos externos (verde) |
| `comparacion.png` | Cuadrícula 2×4 con las 6 etapas etiquetadas |

---

## Decisiones técnicas

### Escala de grises
`cv2.COLOR_BGR2GRAY` usa la ponderación perceptual estándar (0.114R + 0.587G + 0.299B), que refleja mejor la sensibilidad del ojo humano al color verde.

### Espacio HSV
Se eligió HSV sobre LAB porque facilita la segmentación por color (canal H es intuitivo) y es más adecuado para detección de objetos de color uniforme en aplicaciones industriales.

### Suavizado Gaussiano (kernel 9×9)
Un kernel más grande que el típico 5×5 garantiza mayor supresión de ruido antes de Canny, a costa de difuminar bordes finos. Para la imagen de prueba con formas geométricas claras, este trade-off es aceptable.

### Canny (low=50, high=150, relación 1:3)
La ratio 1:3 entre umbrales es la recomendada por Canny en el paper original. Valores bajos capturan bordes débiles; la hysteresis preserva solo los conectados a bordes fuertes (>150).

### Segmentación adaptativa
Se prefirió `ADAPTIVE_THRESH_GAUSSIAN_C` sobre umbralización global (Otsu) porque maneja iluminación no uniforme. `blockSize=21` y `C=4` se ajustaron empíricamente para la imagen de prueba. Se filtran contornos con área < 200px² para descartar ruido.

---

## Dificultades encontradas

- **OpenCV intenta abrir `.png` como video**: al usar `VideoCapture`, OpenCV retorna `isOpened()=True` para imágenes PNG en macOS (comportamiento del backend). Se resolvió haciendo fallback a `imread` si el primer frame falla.
- **Visualización de HSV**: el espacio HSV guardado directamente como PNG se ve con colores "falsos" porque los canales H (0–179), S y V tienen rangos distintos a RGB. Es intencional: sirve para visualizar la distribución de matiz/saturación.

---

## Uso de IA

- Claude Sonnet 4.6 generó el código base del pipeline.
- El alumno verificó manualmente:
  - Que cada función produce la salida esperada visualmente.
  - Los parámetros de Canny y la umbralización adaptativa (ajustados empíricamente).
  - La lógica de detección de contornos y filtrado por área mínima.
  - La cuadrícula comparativa final y su correcto etiquetado.
