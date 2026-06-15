"""
Ejercicio 1 - Procesamiento visual e IA
Pipeline de procesamiento de imágenes con OpenCV.

Operaciones:
  1. Carga de imagen
  2. Escala de grises
  3. Espacio de color HSV
  4. Suavizado Gaussiano
  5. Detección de bordes (Canny)
  6. Segmentación por umbralización adaptativa + detección de contornos
  7. Guardado de resultados comparativos
"""

import sys
import os
import numpy as np
import cv2

RESULTS_DIR = os.path.join(os.path.dirname(__file__), "..", "resultados")


def ensure_results_dir():
    os.makedirs(RESULTS_DIR, exist_ok=True)


def save(name: str, img: np.ndarray) -> None:
    path = os.path.join(RESULTS_DIR, name)
    cv2.imwrite(path, img)
    print(f"  Guardado: {path}")


def load_input(source: str) -> np.ndarray:
    """Carga una imagen (o el primer frame de un video)."""
    # Intentar como video primero
    cap = cv2.VideoCapture(source)
    if cap.isOpened():
        ret, frame = cap.read()
        cap.release()
        if ret:
            print(f"  Fuente: video — primer frame extraído de '{source}'")
            return frame
    # Fallback a imagen estática
    img = cv2.imread(source)
    if img is None:
        raise FileNotFoundError(f"No se pudo abrir '{source}'")
    print(f"  Fuente: imagen estática '{source}'")
    return img


def to_grayscale(img: np.ndarray) -> np.ndarray:
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


def to_hsv(img: np.ndarray) -> np.ndarray:
    """
    Convierte a HSV.
    Se devuelve normalizado a 8 bits para poder guardarse directamente.
    """
    return cv2.cvtColor(img, cv2.COLOR_BGR2HSV)


def apply_gaussian_blur(img: np.ndarray, ksize: int = 9) -> np.ndarray:
    """
    Suavizado Gaussiano.
    ksize=9 reduce ruido sin destruir bordes relevantes.
    """
    return cv2.GaussianBlur(img, (ksize, ksize), sigmaX=0)


def detect_edges_canny(gray: np.ndarray,
                       low: int = 50,
                       high: int = 150) -> np.ndarray:
    """
    Canny con umbrales empíricos bajos/altos.
    Se aplica sobre la imagen suavizada en grises para reducir ruido.
    """
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    return cv2.Canny(blurred, low, high)


def segment_adaptive(gray: np.ndarray) -> np.ndarray:
    """
    Segmentación por umbralización adaptativa gaussiana.
    Útil cuando la imagen tiene iluminación no uniforme.
    Devuelve una imagen BGR con contornos dibujados sobre la original en grises.
    """
    binary = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV,
        blockSize=21,   # vecindad local (impar)
        C=4,            # constante sustraída a la media
    )
    contours, _ = cv2.findContours(
        binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
    )
    # Filtrar contornos pequeños (ruido)
    min_area = 200
    contours = [c for c in contours if cv2.contourArea(c) > min_area]

    overlay = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
    cv2.drawContours(overlay, contours, -1, (0, 255, 0), 2)
    print(f"  Contornos detectados: {len(contours)}")
    return overlay


def build_comparison_grid(images: list, labels: list,
                           target_w: int = 400) -> np.ndarray:
    """
    Construye una cuadrícula 2×4 con todas las imágenes para comparación.
    Todas se redimensionan al mismo ancho manteniendo aspecto.
    """
    resized = []
    for img in images:
        h, w = img.shape[:2]
        new_h = int(h * target_w / w)
        r = cv2.resize(img, (target_w, new_h))
        # Asegurar 3 canales
        if r.ndim == 2:
            r = cv2.cvtColor(r, cv2.COLOR_GRAY2BGR)
        resized.append(r)

    # Unificar altura
    max_h = max(r.shape[0] for r in resized)
    padded = []
    for r in resized:
        diff = max_h - r.shape[0]
        p = cv2.copyMakeBorder(r, 0, diff, 0, 0,
                               cv2.BORDER_CONSTANT, value=(30, 30, 30))
        padded.append(p)

    # Añadir etiquetas
    font = cv2.FONT_HERSHEY_SIMPLEX
    labeled = []
    for img, label in zip(padded, labels):
        c = img.copy()
        cv2.putText(c, label, (8, 28), font, 0.7, (255, 255, 0), 2,
                    cv2.LINE_AA)
        labeled.append(c)

    # 2 filas × 3 columnas (exactamente 6 imágenes)
    row1 = np.hstack(labeled[:3])
    row2 = np.hstack(labeled[3:6])
    return np.vstack([row1, row2])


def run(source: str) -> None:
    print("\n=== Pipeline de procesamiento visual ===")
    ensure_results_dir()

    # 1. Cargar entrada
    print("\n[1] Cargando entrada...")
    original = load_input(source)
    save("original.png", original)

    # 2. Escala de grises
    print("\n[2] Escala de grises...")
    gray = to_grayscale(original)
    save("grises.png", gray)

    # 3. Espacio HSV
    print("\n[3] Conversión a HSV...")
    hsv = to_hsv(original)
    save("hsv.png", hsv)

    # 4. Suavizado Gaussiano
    print("\n[4] Suavizado Gaussiano (kernel 9×9)...")
    blurred = apply_gaussian_blur(original, ksize=9)
    save("suavizado.png", blurred)

    # 5. Detección de bordes Canny
    print("\n[5] Detección de bordes (Canny low=50, high=150)...")
    edges = detect_edges_canny(gray, low=50, high=150)
    save("bordes.png", edges)

    # 6. Segmentación adaptativa + contornos
    print("\n[6] Segmentación adaptativa y contornos...")
    segmented = segment_adaptive(gray)
    save("deteccion_segmentacion.png", segmented)

    # 7. Cuadrícula comparativa
    print("\n[7] Generando comparación visual...")
    imgs = [original, gray, hsv, blurred, edges, segmented]
    labels = ["Original", "Grises", "HSV",
              "Suavizado", "Bordes (Canny)", "Segmentacion"]
    grid = build_comparison_grid(imgs, labels)
    save("comparacion.png", grid)

    print("\n=== Pipeline completado. Resultados en:", RESULTS_DIR, "===\n")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        # Intentar imagen de prueba incluida en data/
        default = os.path.join(
            os.path.dirname(__file__), "..", "data", "sample.png"
        )
        if not os.path.exists(default):
            print("Uso: python main.py <ruta_imagen_o_video>")
            print("  o:  coloca una imagen en data/sample.png")
            sys.exit(1)
        source = default
    else:
        source = sys.argv[1]
    run(source)
