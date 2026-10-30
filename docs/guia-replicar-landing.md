# Guía para replicar esta landing en otro emprendimiento

Esta guía resume el proceso usado para construir la landing de Punto & Encanto y
sirve como punto de partida para crear una página similar para otro negocio:
taller, marca de productos artesanales, servicio profesional, infoproducto o
emprendimiento local.

La idea no es copiar el diseño tal cual, sino reutilizar la estructura, el método
de trabajo y las decisiones técnicas que funcionaron.

## 1. Antes de escribir código

Reunir esta información con el cliente o responsable del emprendimiento:

- Nombre de la marca y una frase que explique qué hace.
- Producto o servicio principal.
- Público al que le habla.
- Promesa central: qué cambia en la vida del cliente.
- Precio, forma de pago y forma de inscripción o compra.
- Número de WhatsApp real, con código de país.
- Enlace de checkout, si existe.
- Prueba social disponible: testimonios, fotos, cifras, reseñas, certificados.
- Fotos y videos reales. Evitar imágenes genéricas o generadas si parecen fuera
  de contexto.
- Preguntas frecuentes y objeciones habituales.
- Datos legales: política de privacidad, términos, garantía, responsable.
- Dominio final.

Regla importante: no inventar cifras, testimonios, certificados ni resultados.
Si un dato no está confirmado, dejarlo como pendiente o usar un texto neutro.

## 2. Definir la narrativa y estructura de persuasión de la página

La landing de referencia utiliza una estructura de conversión de 13 bloques estratégicos diseñados para llevar al visitante desde la captura de atención inmediata hasta el cierre sin fricciones, complementada por elementos de urgencia transversales:

### Bloques de persuasión (orden secuencial)

1. **0. Barra superior de FOMO y urgencia (`aside.fomo-top-bar`)**:
   - Aviso de oferta relámpago con porcentaje de descuento destacado.
   - Temporizador de cuenta regresiva en vivo para crear escasez temporal.
   - Contador dinámico de cupos limitados disponibles hoy.
2. **1. Hero Section de alto impacto con VSL Inline (`header.hero-section`)**:
   - Badge superior de categoría y edición certificada.
   - Titular principal centrado en el beneficio transformacional y monetizable.
   - Subtítulo que especifica técnicas clave, proyección de ingresos y elimina la barrera de "sin experiencia previa".
   - Prueba social inmediata (calificación promedio 4.9/5 y número de alumnas graduadas).
   - Botón CTA principal reforzado con micro-compromisos de confianza (Pago seguro, Certificado oficial, Garantía 7 días).
   - Reproductor VSL Inline integrado (sin popups invasivos), con video explicativo o demostración interactiva directa.
   - Barra de confianza con 4 pilares clave de entrega (100% práctico, paso a paso, acceso de por vida, comunidad privada).
3. **2. Prueba social temprana y resultados medibles (`section.social-proof-early`)**:
   - Tarjetas de impacto cuantitativo (alumnas graduadas, % de satisfacción, países alcanzados, ingreso mensual promedio).
   - Testimonios realistas con formato de mensaje directo/chat, avatares y valoraciones de 5 estrellas.
4. **3. Manifiesto: agitación del dolor y solución de ruptura (`section.manifesto-section`)**:
   - Contraste visual entre "El camino tradicional / cursos desordenados" vs. "El método probado de alta rentabilidad".
   - Conexión empática con la frustración del prospecto y presentación del vehículo de cambio.
5. **4. El método rentable: las técnicas o pilares más cotizados (`section.method-section`)**:
   - Desglose de las habilidades o servicios de mayor demanda comercial y retorno de inversión rápido.
6. **5. Plan de estudios: contenido desglosado en acordeón interactivo (`section.curriculum-section`)**:
   - Módulos organizados paso a paso (desde bioseguridad y fundamentos hasta técnicas avanzadas y captación de clientes).
   - Formato colapsable/acordeón accesible para mantener la lectura limpia y sin sobrecarga cognitiva.
7. **6. Stack de bonos exclusivos de alta valoración (`section.bonuses-section`)**:
   - Bonos aceleradores que resuelven objeciones futuras (guías de costos/precios, plantillas para redes, comunidad VIP).
   - Anclaje de valor con etiquetas "Valorado en $XX" y badge llamativo "HOY GRATIS".
8. **7. Autoridad e historia de la instructora o fundador (`section.instructor-section`)**:
   - Fotografía profesional y biografía humana que combina trayectoria, credenciales y empatía.
9. **8. Acceso y certificado con imagen del curso (`section.access-section`)**:
   - Mockup realista del certificado en alta resolución con sellos de verificación para respaldar la validez profesional del aprendizaje.
   - Imagen del curso integrada en el mismo módulo de acceso, no como una sección independiente ni duplicada dentro de la oferta.
   - Copy de acceso («Tu taller, cuando tú puedas»), beneficios y CTA de WhatsApp alrededor de la imagen.
10. **9. Oferta irresistible y caja de precios reactiva (`section.offer-section`)**:
    - Temporizador de urgencia sincronizado.
    - Anclaje de precios: Valor total con bonos -> Precio regular tachado -> Precio final con descuento agresivo (ej. 75% OFF) y cuotas sugeridas.
    - Checklist exhaustivo de todo lo que incluye el acceso de por vida.
    - Botón CTA principal de checkout con sellos de seguridad SSL y medios de pago.
11. **10. Garantía incondicional de 7 días (`section.guarantee-section`)**:
    - Sello visual original de garantía y promesa explícita de reembolso del 100% sin preguntas para eliminar el riesgo financiero.
12. **11. Preguntas frecuentes y derribo de objeciones (`section.faq-section`)**:
    - Acordeón interactivo respondiendo las dudas críticas (falta de experiencia, materiales necesarios, acceso, métodos de pago, soporte).
13. **12. Cierre persuasivo y pie de página legal (`footer.site-footer`)**:
    - Último recordatorio a la acción y canal de asistencia directa (WhatsApp).
    - Avisos de privacidad, términos de servicio y descargos de responsabilidad legal requeridos (Meta/Hotmart).

### Imagen del curso dentro de Acceso

La imagen promocional del curso forma parte del módulo de acceso y no se
presenta como una sección nueva. Tampoco se coloca dentro de la oferta, porque
esa sección debe concentrarse en el precio, la inscripción y los CTA.

- En escritorio, el módulo se organiza en tres columnas: imagen del curso,
  certificado y copy de acceso con sus beneficios.
- En tablet y móvil, el copy de acceso aparece primero, seguido de la imagen y
  del certificado. Así el visitante entiende el módulo antes de ver el mockup.
- La imagen se presenta como una figura editorial con marco de papel, radio
  amplio y una rotación leve. Debajo se indica qué incluye («Incluye taller +
  8 bonos») y se describe el material visible.
- Usar `next/image` con `sizes` responsive, `alt` descriptivo y sin `priority`
  cuando la sección está por debajo del hero.
- Evitar títulos o sellos que se salgan del marco del certificado cuando el
  módulo pasa a tres columnas; el texto debe adaptarse al ancho disponible.

### Elementos persuasivos transversales

- **Barra flotante fija de conversión (Sticky Floating CTA)**: Aparece de forma fluida tras rebasar la cabecera, manteniendo siempre visible la oferta con mini-temporizador y botón de compra directa.
- **Notificaciones de prueba social en vivo (Toasts FOMO)**: Notificaciones emergentes temporizadas en la esquina inferior que muestran compras recientes simuladas en tiempo real de diferentes ciudades para generar validación social y efecto multitud.

Para otro emprendimiento se puede conservar este orden, adaptando los argumentos al modelo de negocio:

- Curso online / Infoproducto: módulos, bonos, acceso de por vida, certificado, testimonios.
- Servicio profesional: problema, método, casos de éxito, entregables, garantía, agenda directa.
- Producto físico: beneficio transformador, variedades, materiales, envíos, reseñas reales, garantía de satisfacción.
- Spa o clínica local: necesidad, tratamientos, resultados antes/después, profesionales certificados, reserva asistida.

No agregar una barra de navegación superior clásica si la página es de una sola ruta y el objetivo es la conversión directa. Los enlaces internos y el CTA flotante son más eficaces y evitan fugas de tráfico.

## 3. Stack recomendado

La base usada en este proyecto:

- Next.js 16 con App Router.
- React 19.
- TypeScript.
- CSS global con variables y media queries.
- next/font con Google Fonts.
- next/image para imágenes responsive.
- GSAP + ScrollTrigger para movimiento.
- lucide-react para iconos.
- `<dialog>` nativo para el modal.
- Playwright + axe para pruebas.
- WhatsApp como canal de conversión mientras no hay checkout.

Comandos de referencia:

```powershell
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

En Windows PowerShell, si `npm.ps1` está bloqueado, usar `npm.cmd`.

## 4. Estructura de archivos

Una estructura cómoda para este tipo de landing:

```text
app/
  layout.tsx          Metadatos, fuentes y estilos globales
  page.tsx            Detección de medios y render de la landing
  globals.css         Sistema visual, componentes y responsive
components/
  landing.tsx         Secciones, estado y animaciones
  modal.tsx           Diálogo accesible
  ambient-video.tsx   Video decorativo con carga diferida
  floating-cta.tsx    CTA fijo
  yarn.tsx            Elementos gráficos de marca
lib/
  site.ts             WhatsApp, checkout y enlaces de conversión
  course.ts           Contenido editable: módulos, bonos, FAQ, testimonios
public/
  images/             Fotos optimizadas, posters y Open Graph
  videos/             Videos web y originales
tests/
  landing.spec.ts
  hero-motion.spec.ts
docs/
  design-direction.md
  image-prompts.md
  guia-replicar-landing.md
```

Separar el contenido (`lib/course.ts`) de la configuración comercial
(`lib/site.ts`) evita tocar el JSX cada vez que cambian precios, textos o enlaces.

## 5. Crear el sistema visual

Definir primero las variables base:

- Color de fondo principal y secundario.
- Color de texto y texto suave.
- Un color de marca principal.
- Un color de acento.
- Un color de alerta o cierre.
- Fuente display para titulares.
- Fuente sans para cuerpo, botones y etiquetas.
- Ancho máximo del contenedor, gutter y radios.
- Escala tipográfica con `clamp()`.

En este proyecto:

```css
--paper: #fff8ec;
--paper-2: #fbf1dc;
--ink: #2a2230;
--ink-soft: #5d5260;
--teal: #149e96;
--teal-deep: #0b6f6a;
--lilac: #a78bdb;
--lilac-soft: #e9e1f8;
--butter: #f7c64b;
--coral: #ee6c57;
```

Fraunces se usa para titulares y Manrope para el resto. Los titulares llevan
interlineado compacto y tracking negativo; el cuerpo necesita interlineado
amplio y un máximo de caracteres por línea.

Antes de construir secciones, revisar `docs/design-direction.md` para mantener
una dirección visual coherente.

## 6. Implementar por fases

### Fase 1: configuración y datos

1. Crear `lib/site.ts` con nombre, WhatsApp, mensaje inicial y checkout.
2. Crear `lib/course.ts` con módulos, bonos, razones, acceso, FAQ y testimonios.
3. Definir el CTA principal y el comportamiento cuando no hay checkout.

Ejemplo de lógica:

- Si `hotmartUrl` existe, el CTA va al checkout.
- Si no existe, el CTA va a WhatsApp.
- Si tampoco hay WhatsApp, el CTA baja a la sección de inscripción.

### Fase 2: layout y estilos base

1. Configurar fuentes y metadatos en `app/layout.tsx`.
2. Agregar `suppressHydrationWarning` al `<body>` si se esperan extensiones del
   navegador que inyectan atributos.
3. Crear variables, reset, contenedor, tipografía y botones en `globals.css`.
4. Definir el ancho máximo y el gutter responsive.

### Fase 3: secciones

Construir en este orden:

0. Barra superior FOMO (cuenta regresiva y cupos disponibles).
1. Hero con VSL inline y micro-garantías.
2. Prueba social temprana (métricas cuantitativas y reseñas).
3. Manifiesto (problema vs. método de solución).
4. El método de técnicas/pilares más cotizados.
5. Plan de estudios o proceso en acordeón interactivo.
6. Bonos con valor percibido y tag "HOY GRATIS".
7. Autoridad e historia de marca/instructora.
8. Acceso y certificado, con la imagen del curso integrada en el mismo módulo.
9. Oferta irresistible y caja de precios con temporizador.
10. Garantía incondicional de 7 días.
11. Preguntas frecuentes (FAQ interactivo).
12. Cierre persuasivo y pie de página legal.
13. Elementos flotantes: sticky CTA y toasts de prueba social.

Cada sección debe tener un único objetivo y un CTA claro cuando corresponda.

### Fase 4: movimiento

- Animar la entrada del hero una sola vez.
- Usar parallax leve, sin secuestrar el scroll.
- Respetar `prefers-reduced-motion`.
- Con movimiento reducido, no iniciar el autoplay de los testimonios; conservar
  el poster y permitir la reproducción manual.
- No animar elementos dentro de un `<dialog>` antes de abrirlo: puede quedar
  contenido invisible aunque el modal esté abierto.
- Preferir animaciones CSS o GSAP después de que el diálogo esté visible.

### Fase 5: medios

- Guardar fotos originales sin modificar.
- Crear recortes nuevos para la web.
- Convertir a WebP con `sharp`.
- Usar nombres nuevos cuando se reemplaza una imagen. Next puede conservar en
  caché la versión anterior si se sobrescribe la misma URL.
- Definir `sizes`, `alt` y `object-position`.
- Integrar la imagen del curso dentro del módulo de Acceso; no crear una
  sección aparte ni repetirla en la oferta.
- Presentar esa imagen en formato `3:4`, con un marco de papel y caption que
  explique los materiales incluidos.
- Generar posters para los videos.
- Comprimir videos a H.264/AAC con `-movflags +faststart`.
- Reproducir los testimonios inline en horizontal, silenciados y en bucle; usar
  el modal solo para activar sonido y controles.
- Recortar los videos verticales a un encuadre horizontal `4:3` y revisar que la
  cara y la pieza principal sigan visibles en cada uno.

### Fase 6: conversión

- Todos los CTA de inscripción deben apuntar al mismo destino.
- El CTA flotante aparece después del hero y se oculta al llegar al pie.
- Si no hay checkout, explicar que la inscripción es asistida por WhatsApp.
- Ocultar textos legales de la pasarela si no se está usando.
- No crear formularios si el flujo real es WhatsApp.

### Fase 7: accesibilidad

- Usar un solo `h1`.
- Mantener orden lógico de encabezados.
- Añadir `alt` descriptivo a imágenes con contenido.
- Marcar imágenes decorativas con `alt=""`.
- Usar botones reales para acciones y enlaces reales para navegación.
- El modal debe abrir con `<dialog>`, cerrar con Escape y restaurar el foco.
- Verificar contraste WCAG AA en fondos oscuros, coral y botones.
- La franja horizontal de imágenes debe poder recorrerse con teclado.
- Cada testimonio debe ser un botón real con una etiqueta como «Abrir
  testimonio con sonido: título». El badge visual no sustituye esa etiqueta.
- El video del modal debe llevar `controls` y abrir con sonido; los videos
  inline deben ir silenciados y con `aria-hidden`.
- Probar con `prefers-reduced-motion`.

### Fase 8: pruebas

Cubrir como mínimo:

- Estructura y orden de secciones.
- Presencia de `h1`, ausencia de navbar o formularios no deseados.
- Carga de todas las imágenes.
- Imagen del curso dentro de Acceso y ausencia de una sección duplicada en la
  oferta.
- En tablet y móvil, orden correcto: copy de acceso, imagen y certificado.
- Reproducción inline de los testimonios con `autoplay`, `muted`, `loop` y
  `playsInline`, y encuadre horizontal.
- Apertura del modal con sonido, `controls` y restauración del foco.
- Tamaño del modal en desktop y móvil.
- CTA flotante y enlaces de inscripción.
- Acordeones de módulos y FAQ.
- Axe sin violaciones en página y modal.
- Ausencia de overflow horizontal en 320, 360, 390, 768, 1024 y 1440 px.
- Movimiento reducido: sin autoplay de testimonios y sin descarga del video
  ambiente.

### Fase 9: publicación

Antes de publicar:

- Reemplazar el WhatsApp de ejemplo.
- Definir checkout o confirmar el flujo por WhatsApp.
- Configurar `metadataBase` con el dominio final.
- Revisar Open Graph y favicon.
- Confirmar certificados, cifras y promesas.
- Revisar textos legales.
- Probar en un teléfono real.
- Revisar velocidad de carga de imágenes y videos.
- Verificar que el dominio canónico y los enlaces no apunten a `localhost`.

## 7. Errores que conviene evitar

- Copiar textos de otra marca y dejar cifras o promesas sin sustento.
- Usar imágenes generadas que no coinciden con el producto real.
- Mantener texto quemado dentro de una foto.
- Reemplazar una imagen conservando el mismo nombre y asumir que el navegador
  mostrará la versión nueva.
- Animar la opacidad de un modal antes de llamar a `showModal()`.
- Poner `overflow: hidden` en titulares con descendentes sin dejar padding
  suficiente para `j`, `g`, `y`, `p`.
- Crear formularios cuando el negocio solo atiende por WhatsApp.
- Mostrar “compra segura” o referencias a una pasarela que no está configurada.
- Depender de animaciones para que el contenido sea visible.
- Publicar sin revisar el sitio en móvil.

## 8. Prompt para replicar con opencode

Desde la raíz de un proyecto nuevo:

```text
Crea una landing de venta para [NOMBRE DEL EMPRENDIMIENTO] usando Next.js 16,
React 19, TypeScript y CSS global. Toma como referencia
docs/guia-replicar-landing.md y docs/design-direction.md.

Antes de escribir código, hazme las preguntas necesarias sobre:
producto, público, promesa, precio, WhatsApp, checkout, prueba social,
fotos, videos, garantía, FAQ y dominio.

Después:
1. Propón la narrativa y el orden de secciones.
2. Define paleta, tipografías y dirección visual.
3. Crea lib/site.ts y lib/course.ts.
4. Implementa la landing completa con componentes reutilizables.
5. Optimiza imágenes y videos.
6. Añade pruebas con Playwright y axe.
7. Ejecuta lint, typecheck, build y test:e2e.
8. Déjame una lista de datos pendientes antes de publicar.

No inventes cifras, testimonios ni certificados.
No agregues formularios si el flujo real es WhatsApp.
```

## 9. Checklist final

- [ ] Historia y promesa definidas.
- [ ] Orden de secciones aprobado.
- [ ] Paleta y fuentes elegidas.
- [ ] WhatsApp y checkout configurados.
- [ ] Textos legales revisados.
- [ ] Fotos reales recortadas y en WebP.
- [ ] Imagen del curso integrada dentro de Acceso, fuera de la oferta.
- [ ] Acceso responsive con el copy primero en tablet y móvil.
- [ ] Videos comprimidos y con poster.
- [ ] Testimonios horizontales, silenciados y con autoplay.
- [ ] Modal de testimonio con sonido y controles.
- [ ] Imágenes con nombres nuevos si reemplazaron otras.
- [ ] Hero sin texto quemado.
- [ ] Titulares sin descendentes cortados.
- [ ] Modal de video grande, visible y funcional.
- [ ] CTA flotante correcto.
- [ ] Acordeones funcionando.
- [ ] Axe sin violaciones.
- [ ] Sin overflow horizontal.
- [ ] Movimiento reducido respetado.
- [ ] `lint`, `typecheck`, `build` y `test:e2e` en verde.
- [ ] Dominio y `metadataBase` configurados.
- [ ] Prueba manual en móvil terminada.
