Examen Final de Computación Visual 2026-I
Universidad Nacional de Colombia
Curso: Computación Visual
Componente: Parte práctica
Modalidad: Entrega individual en repositorio
Formato: Código, README y evidencias visuales

1. Objetivo
Desarrollar una entrega práctica que integre procesamiento de imágenes,
visión por computador, gráficos 3D, materiales, animación, interacción y
documentación técnica. La evaluación revisará funcionalidad, trazabilidad,
organización del repositorio, evidencias visuales y claridad en la explicación de
las decisiones técnicas.

2. Reglas generales de entrega
• Crear un repositorio llamado examen-final-computacion-visual-[nombre-apellido].
• El repositorio debe ser público o estar compartido con el docente.
• Incluir un README.md principal con:
– descripción general,
– dependencias,
– instalación,
– ejecución,
– estructura del repositorio,
– evidencias,
– análisis técnico,
– y uso de IA, si aplica.
• No se permite entregar únicamente capturas; debe existir código fuente
reproducible.
• Cada ejercicio debe tener su propio README.md o una sección claramente
separada en el README principal.
• Evitar archivos pesados dentro del repositorio; si es necesario, usar enlaces
externos debidamente documentados.

3. Estructura esperada del repositorio
examen-final-computacion-visual-[nombre-apellido]/
+-- README.md
+-- ejercicio_1_procesamiento_visual/
| +-- src/main.py

1

| +-- data/ # opcional
| +-- resultados/
| +-- README.md
+-- ejercicio_2_escena_3d_interactiva/
+-- src/ o proyecto_unity/
+-- media/
+-- README.md

4. Ejercicio 1 - Procesamiento visual e IA
Desarrollar una aplicación en Python que procese una imagen o un video corto
y genere resultados visuales comparables. Este ejercicio debe quedar definido
como una secuencia clara de operaciones.
Operaciones obligatorias
La solución debe realizar, como mínimo, las siguientes operaciones:
1. Cargar una entrada visual
• Cargar una imagen o un video corto usando OpenCV.
2. Generar una versión en escala de grises
• Convertir la entrada original a escala de grises.
3. Generar una segunda representación de color

• Convertir adicionalmente la entrada a otro espacio de color, por ejem-
plo HSV o LAB.

4. Aplicar suavizado
• Aplicar un filtro de suavizado, por ejemplo:
– Gaussiano, o
– Mediana.
5. Aplicar detección de bordes
• Aplicar una técnica de detección de bordes, por ejemplo:
– Sobel, o
– Canny.
6. Realizar segmentación o detección

• Implementar una etapa de segmentación o detección de objetos me-
diante:

– una técnica clásica, o
– un modelo preentrenado.
7. Guardar resultados comparativos
• Guardar las salidas intermedias y finales para poder comparar el
procesamiento realizado.
8. Documentar parámetros y decisiones

• Explicar qué parámetros se usaron y justificar brevemente las deci-
siones técnicas.

2

Entregables mínimos
ejercicio_1_procesamiento_visual/
+-- src/main.py
+-- resultados/original.png
+-- resultados/grises.png
+-- resultados/hsv_o_lab.png
+-- resultados/suavizado.png
+-- resultados/bordes.png
+-- resultados/deteccion_o_segmentacion.png
+-- README.md

5. Ejercicio 2 - Escena 3D interactiva temática

Desarrollar una escena 3D en Unity, Three.js o React Three Fiber que inte-
gre jerarquía de objetos, transformaciones, materiales, iluminación, animaciones

e interacción.
Selección del tema
El estudiante debe escoger uno de los siguientes temas para construir su escena:
1. Exploración espacial

Ejemplos: base lunar, estación espacial, superficie marciana, rover, astro-
nautas, paneles solares.

2. Exploración submarina o entorno marino
Ejemplos: fondo oceánico, submarino, estación submarina, peces,
medusas, buzos, robot marino.
3. Robótica o ambiente de automatización
Ejemplos: fábrica automatizada, línea de producción, brazos robóticos,
bandas transportadoras, robots móviles.
4. Laboratorio de química
Ejemplos: estación de experimentación, tubos de ensayo, sustancias,
humo, líquidos, brazo automático, científico.
5. Lago o ecosistema de biología
Ejemplos: lago, flora, fauna, peces, aves, ranas, vegetación, investigador.
6. Museo o entorno relacionado con arte

Ejemplos: museo interactivo, galería de arte, sala de exposiciones, escul-
turas, visitante, guía virtual.

7. Entorno prehistórico
Ejemplos: dinosaurios, cavernas, vegetación antigua, fuego, explorador,
campamento primitivo.

3

8. Entorno futurista
Ejemplos: ciudad futurista, laboratorio avanzado, drones, hologramas,
robots, vehículos autónomos.
9. Entorno barroco
Ejemplos: palacio, salón barroco, teatro clásico, candelabros, cortinas,
músicos o bailarines.
10. Entorno oriental, natural o deportivo
Ejemplos: templo oriental, jardín zen, bosque natural, cascada, estadio,
cancha, pista o gimnasio.
Requerimientos obligatorios
La escena debe cumplir como mínimo con lo siguiente:
• Crear una escena 3D completa basada en uno de los temas anteriores.
• Incluir al menos una jerarquía de objetos 3D.
• Aplicar transformaciones de traslación, rotación y escala.
• Configurar una cámara interactiva.
• Usar materiales PBR o un shader personalizado.
• Incorporar iluminación coherente con el tema de la escena.

• Añadir animaciones a personajes, caracteres, criaturas o elementos prin-
cipales de la plataforma/escena.

• Hacer que esos personajes o elementos interactúen dentro de la escena.

• Implementar al menos una interacción del usuario, por ejemplo medi-
ante teclado, mouse, botones, sliders, voz, gesto o WebSocket.

Resultado esperado
Como evidencia principal, el estudiante debe entregar:
• un GIF, o
• un video corto,
mostrando claramente:
• la escena construida,
• la navegación o uso de la cámara,
• las animaciones implementadas,
• la interacción del usuario,
• y la interacción entre personajes o elementos dentro de la escena.
Entregables mínimos
ejercicio_2_escena_3d_interactiva/
+-- src/ o proyecto_unity/
+-- media/captura_1.png
+-- media/captura_2.png

4

+-- media/demo.gif o demo.mp4
+-- README.md

6. Requisitos de documentación
Cada ejercicio debe documentar como mínimo lo siguiente:
• ¿Qué problema o propósito aborda el ejercicio?
• ¿Qué herramientas, librerías o motores se utilizaron?
• ¿Cómo se ejecuta la solución?
• ¿Qué resultados se obtuvieron?
• ¿Qué dificultades aparecieron y cómo se resolvieron?
• ¿Qué prompts de IA se usaron, si aplica?
• ¿Qué partes fueron verificadas manualmente por el estudiante?

7. Recomendación final
La entrega debe demostrar comprensión técnica y trazabilidad. Una solución
simple, reproducible y bien documentada puede ser mejor evaluada que una
solución más compleja sin evidencias ni justificación suficiente.