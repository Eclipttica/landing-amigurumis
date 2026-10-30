# Video del hero

El video entregado está integrado como `atelier.mp4`: 1912 × 1080, 5,04 segundos,
8.716.329 bytes. Es una copia del archivo de exportación
`hf_20261021_153951_a0496de2-b1e7-4326-87c0-f3437b46cba5.mp4`, que se conserva.
La estructura MP4 tiene los metadatos `moov` antes de `mdat` (fast start).
La página detecta su existencia al compilar. Después de reemplazarlo, reinicia
desarrollo o ejecuta `npm run build` de nuevo.

- Recomendado: MP4 H.264, 1920 × 1080, 24–30 fps, sin audio.
- Duración sugerida: 10–20 segundos, con un corte apto para bucle.
- Optimiza el peso y añade `faststart` al codificar.
- Encuadra la acción hacia el centro/derecha para dejar espacio al titular.
- En móvil se recorta mediante `object-fit: cover`; comprueba las manos en vertical.

Mientras no exista el archivo se muestra `/images/hero.webp`, sin peticiones a un
video inexistente. Se usa el archivo entregado, sin generar contenido adicional.

El video real se presenta a pantalla completa dentro del hero con `object-fit:
cover`, `autoplay`, `muted`, `loop` y `playsInline`. No hay controles visibles.
Se empieza a cargar después de la carga inicial de la página, en un momento libre
del navegador. La fotografía permanece como respaldo y el video aparece con un
fundido de 900 ms al comenzar la reproducción. El overlay existente mantiene
legible el título en escritorio y móvil.

El scroll fija temporalmente el hero y acerca la capa visual de escala 1 a 1,12.
El título y el sello se retiran con parallax; un velo crema conecta con la
siguiente sección. La secuencia se revierte al subir y funciona igual con la
fotografía cuando todavía no existe el video. En móvil el recorrido es más corto.

Con `prefers-reduced-motion: reduce` se muestra solo la fotografía, sin descargar
el video. También se desactivan el pin, el zoom y el parallax. Si la preferencia
cambia durante la visita se retira el video y se recupera el scroll normal.
La reproducción se pausa al ocultar la pestaña. Si el navegador impide el autoplay
o falla el archivo, se conserva la fotografía.

Para comprobar la reproducción real, coloca el MP4, ejecuta `npm run build` y
`npm run test:e2e`. Sin ese archivo las pruebas de reproducción se omiten
explícitamente; sí se comprueban el respaldo y la ausencia de peticiones al MP4.
