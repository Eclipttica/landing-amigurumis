# Punto & Encanto

Landing de venta del taller online de amigurumis de Punto & Encanto. Está
construida con Next.js 16, React 19, TypeScript y GSAP. La página presenta
el método, el programa, los bonos, la historia de marca y la inscripción, con
testimonios en video y un CTA flotante de WhatsApp.

## Estructura de la página

1. Barra de inscripciones abiertas con acceso directo a WhatsApp.
2. Hero con la promesa principal y acceso al programa.
3. Testimonios en video, métricas del taller y gancho inicial.
4. Manifiesto con comparación de método y cuatro pilares de aprendizaje.
5. Programa por módulos, diseños de referencia y piezas de muestra.
6. Ocho bonos incluidos.
7. Historia de la marca.
8. Acceso, certificado, imagen del curso y objeciones para principiantes.
9. Oferta e inscripción.
10. Garantía, preguntas frecuentes y cierre.

No hay barra de navegación ni formularios. Todos los CTA de inscripción salen a
WhatsApp mientras no se configure un checkout.

## Configuración

Edita `lib/site.ts`:

- `whatsappNumber`: número real con código de país, sin signos ni espacios.
- `whatsappMessage`: mensaje inicial de la conversación.
- `hotmartUrl`: enlace de pago. Si está vacío, la página muestra el modo
  «Inscripción asistida por WhatsApp» y oculta las referencias legales a Hotmart.

El contenido editable de módulos, bonos, acceso, preguntas y testimonios está en
`lib/course.ts`.

## Medios

- `public/images/hero-alumna-bolso.webp`: imagen principal del hero, recorte limpio.
- `public/images/brand-story-alumna-monstruo.webp`: retrato de la historia de marca.
- `public/images/proyecto-monstruo.webp`, `proyecto-bolso.webp`, `proyecto-dinosaurio.webp`: piezas de referencia.
- `public/images/curso-crochet-paso-a-paso.webp`: mockup del curso usado en la sección de acceso.
- `public/images/testimonio-*.webp`: pósters de los videos.
- `public/images/og-punto-encanto.jpg`: imagen para redes.
- `public/videos/atelier-web.mp4`: video ambiente de la sección de marca.
- `public/videos/testimonio-*.mp4`: videos de testimonios, en reproducción
  horizontal y silenciada; al abrirlos en el modal se activa el sonido.

Los archivos originales se conservan en `public/videos/`. Si reemplazas un video
de testimonio, conserva el mismo nombre o actualiza `lib/course.ts` y vuelve a
compilar.

## Desarrollo

Requiere Node.js 20.9 o superior.

```bash
npm ci
npm run dev
```

Abre http://localhost:3000. En PowerShell, si la política de ejecución bloquea
`npm.ps1`, usa `npm.cmd`.

## Comprobaciones

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Las pruebas arrancan el servidor de producción en el puerto 3100 y cubren
escritorio y móvil: estructura, orden de secciones, imágenes, modal de
testimonios, foco, CTA flotante, acordeones, enlaces de inscripción, accesibilidad
automática con axe, ausencia de desbordamiento horizontal y respeto a
`prefers-reduced-motion`. Las capturas se guardan en `artifacts/`.

Estas pruebas no sustituyen una auditoría manual de accesibilidad ni una revisión
de contenido legal.

## Estructura

- `app/layout.tsx`: metadatos, fuentes y estilos globales.
- `app/page.tsx`: detección de los videos disponibles.
- `components/landing.tsx`: secciones e interacciones.
- `components/ambient-video.tsx`: video ambiente con carga diferida.
- `components/floating-cta.tsx`: CTA fijo de WhatsApp.
- `components/modal.tsx`: diálogo accesible para los testimonios.
- `components/yarn.tsx`: marca gráfica e hilo decorativo.
- `lib/site.ts`: configuración de WhatsApp y checkout.
- `lib/course.ts`: textos y datos del taller.
- `app/globals.css`: sistema visual y responsive.
- `docs/design-direction.md`: decisiones de dirección visual.
- `docs/guia-replicar-landing.md`: guía para replicar la landing en otro emprendimiento.

## Pendientes antes de publicar

- Reemplazar el número de WhatsApp de ejemplo `573000000000`.
- Definir `hotmartUrl` si se habilitará el checkout; de lo contrario, mantener la
  inscripción por WhatsApp.
- Configurar `metadataBase` en `app/layout.tsx` con el dominio final para que las
  imágenes Open Graph no dependan de `localhost`.
- Confirmar con la marca que el certificado y la cifra de alumnas se pueden
  comunicar tal como aparecen en la página.
