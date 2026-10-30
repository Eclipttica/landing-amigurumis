# Validación del video — 21 de octubre de 2026

Se integró el archivo entregado como `public/videos/atelier.mp4`, conservando
el original con su nombre de exportación. Ambas copias tienen el mismo SHA-256:
`EABD1146337D43CDD703A6845F9D0FB20D016A13597BC19213ECD4FACEE4050D`.

El navegador decodifica y reproduce el MP4 completo, incluido el retorno del
bucle: 1912 × 1080, 5,041667 segundos, 8.716.329 bytes. Los metadatos `moov`
preceden al contenido `mdat`. No se generó ni se transcodificó contenido.

Se conservan el overlay, el fundido de entrada, el pin con scrub, el zoom
1 → 1,12, las capas de parallax y la transición crema. Se corrigió la escucha
de `prefers-reduced-motion`: ahora un cambio durante la visita pausa y desmonta
el video. Al desactivar esa preferencia vuelve a reproducirse. La fotografía
permanece disponible ante un fallo de descarga.

Comprobaciones finales:

- `npm.cmd run build`: correcto.
- `npm.cmd run typecheck`: correcto.
- `npm.cmd run lint`: correcto.
- `npm.cmd run test:e2e`: 28 pruebas correctas, 4 omisiones previstas.

Dos omisiones corresponden al escenario de archivo ausente, porque el MP4
está presente. Las otras dos corresponden a pruebas específicas de escritorio
o móvil ejecutadas en el proyecto contrario. El fallo de descarga se comprueba
por separado y pasa en ambos proyectos.

Revisión visual de capturas de Playwright sobre la compilación de producción,
en Chromium: escritorio 1440 × 1000, emulación de iPhone 13 y orientación
horizontal 844 × 390. Se revisaron el inicio, el avance intermedio y la entrada
de la siguiente sección. Las pruebas comprueban también el extremo del zoom,
la continuidad al liberar el pin, la reversión, las anclas y la ausencia de
desbordamiento. Esta validación móvil usa emulación, no un dispositivo físico.

Capturas:

- [Inicio, escritorio](../artifacts/desktop-hero.png)
- [Scroll intermedio, escritorio](../artifacts/desktop-cinema-middle.png)
- [Transición, escritorio](../artifacts/desktop-cinema-transition.png)
- [Inicio, móvil](../artifacts/mobile-hero.png)
- [Scroll intermedio, móvil](../artifacts/mobile-cinema-middle.png)
- [Transición, móvil](../artifacts/mobile-cinema-transition.png)
- [Horizontal, móvil](../artifacts/mobile-cinema-landscape.png)
