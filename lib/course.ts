export type IconName =
  | "book"
  | "box"
  | "calculator"
  | "droplets"
  | "flame"
  | "heart"
  | "instagram"
  | "mail"
  | "monitor"
  | "palette"
  | "play"
  | "recycle"
  | "sparkles"
  | "store"
  | "timer"
  | "trending"
  | "users";

export const stats: { value: string; label: string }[] = [
  { value: "+1.500", label: "alumnas en el taller" },
  { value: "12", label: "diseños y técnicas" },
  { value: "8", label: "bonos incluidos" },
  { value: "24/7", label: "acceso a tu ritmo" },
];

export const reasons: {
  title: string;
  text: string;
  icon: IconName;
}[] = [
  {
    title: "Bases que se entienden",
    text: "Empiezas por puntos, tensión y lectura de patrones con clases cortas y repetibles.",
    icon: "palette",
  },
  {
    title: "Práctica guiada",
    text: "Cada módulo termina en una pieza y una técnica que puedes repetir sin depender de tutoriales sueltos.",
    icon: "play",
  },
  {
    title: "Acabados que se notan",
    text: "Aprendes uniones, relleno, caras y detalles para que tus amigurumis se vean limpios y resistentes.",
    icon: "sparkles",
  },
  {
    title: "Mirada comercial",
    text: "Calculas costos, fotografías y presentas tus piezas para regalarlas, venderlas o tomar encargos.",
    icon: "store",
  },
];

export const modules: { title: string; text: string; items: string[] }[] = [
  {
    title: "Materiales y puntos base",
    text: "Empiezas por lo esencial, con calma y sin saltarte pasos.",
    items: [
      "Hilos, agujas y herramientas",
      "Punto enano, cadena y medios puntos",
      "Cómo sujetar la aguja y el hilo",
    ],
  },
  {
    title: "Lectura de patrones y tensión",
    text: "El secreto para que tus piezas salgan parejas y del tamaño que esperas.",
    items: [
      "Cómo leer un patrón paso a paso",
      "Tensión, vueltas y marcadores",
      "Errores comunes y cómo corregirlos",
    ],
  },
  {
    title: "Cuerpo, aumentos y disminuciones",
    text: "Das forma a tus primeros amigurumis y aprendes a armar cada parte.",
    items: [
      "Aumentos y disminuciones invisibles",
      "Cuerpos, cabezas y extremidades",
      "Unión y relleno de las piezas",
    ],
  },
  {
    title: "Caras, detalles y acabados",
    text: "Lo que convierte un muñeco tejido en un personaje con personalidad.",
    items: [
      "Ojos, hocicos y bordado",
      "Expresiones y detalles finales",
      "Acabados limpios y resistentes",
    ],
  },
  {
    title: "Diseño propio, fotos y venta",
    text: "Creas variaciones, presentas tus piezas y calculas un precio justo.",
    items: [
      "Cómo adaptar un diseño base",
      "Fotografía con luz natural",
      "Costos, precios y encargos",
    ],
  },
];

export const designs = [
  "Osito",
  "Conejita",
  "Dinosaurio",
  "Monstruo",
  "Llavero",
  "Flor",
  "Bolso",
  "Nube",
  "Estrella",
  "Pulpo",
  "Zorro",
  "Panda",
];

export const bonuses: {
  title: string;
  text: string;
  icon: IconName;
  wide?: boolean;
  highlight?: boolean;
}[] = [
  {
    title: "Guía de puntos perfectos",
    text: "Una guía visual para lograr piezas parejas, bien formadas y con acabados que se ven profesionales.",
    icon: "sparkles",
    wide: true,
  },
  {
    title: "Limpieza PRO",
    text: "Cómo lavar, cuidar y mantener tus piezas e insumos para que duren más.",
    icon: "droplets",
  },
  {
    title: "Almacenamiento inteligente",
    text: "Organiza hilos, agujas y piezas terminadas sin enredos ni pérdidas.",
    icon: "box",
  },
  {
    title: "Libro digital de amigurumis",
    text: "Patrones y proyectos extra para seguir tejiendo después del taller.",
    icon: "book",
  },
  {
    title: "Calculadora de costos",
    text: "Calcula materiales, tiempo y margen para poner precios con seguridad.",
    icon: "calculator",
  },
  {
    title: "Instapower",
    text: "Tu tienda virtual en Instagram: exhibe, cuenta tu historia y vende por mensajes.",
    icon: "instagram",
  },
  {
    title: "Proveedores confiables",
    text: "Una lista de proveedores por país para comprar insumos seguros y económicos.",
    icon: "store",
  },
  {
    title: "Comunidad VIP",
    text: "Un espacio privado para compartir avances, resolver dudas y recibir retroalimentación de otras alumnas.",
    icon: "users",
    wide: true,
    highlight: true,
  },
];

export const access: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Llega a tu correo",
    text: "Después de confirmar el pago, recibes el acceso al taller por email.",
    icon: "mail",
  },
  {
    title: "A tu ritmo, 24/7",
    text: "Mira las clases cuando quieras, las veces que necesites.",
    icon: "play",
  },
  {
    title: "Acceso de por vida",
    text: "El contenido queda disponible sin fecha de caducidad.",
    icon: "heart",
  },
  {
    title: "En tus dispositivos",
    text: "Celular, tablet, computador y Smart TV.",
    icon: "monitor",
  },
];

export const faqs = [
  {
    question: "¿Cómo accederé al taller?",
    answer:
      "Después de la confirmación del pago, recibirás el acceso al correo electrónico que registres. Desde ahí puedes entrar al contenido las 24 horas del día.",
  },
  {
    question: "¿Tengo garantía?",
    answer:
      "Sí. Tienes 7 días desde la compra para probar el taller. Si consideras que no cumple o no supera tus expectativas, puedes solicitar la devolución del dinero dentro de ese período.",
  },
  {
    question: "¿Puedo participar si nunca he tejido?",
    answer:
      "Sí. El taller empieza desde los fundamentos básicos: materiales, puntos y tensión. No necesitas experiencia previa para comenzar.",
  },
  {
    question: "¿Cuánto tiempo tendré acceso?",
    answer:
      "El acceso es de por vida. Puedes ver el contenido las 24 horas del día, los 7 días de la semana, a tu ritmo.",
  },
  {
    question: "¿Puedo verlo desde el celular?",
    answer:
      "Sí. El taller se puede ver desde celular, tablet, computador, Smart TV y otros dispositivos compatibles.",
  },
  {
    question: "¿Cuál es el precio en mi moneda?",
    answer:
      "El valor se muestra en la página de pago en la moneda correspondiente a tu país. Si prefieres, te compartimos el enlace y el precio por WhatsApp.",
  },
  {
    question: "¿Cómo se resuelven mis dudas?",
    answer:
      "Con el acceso a la comunidad VIP, donde puedes compartir avances, hacer preguntas y recibir retroalimentación de otras alumnas y del equipo del taller.",
  },
];

export const testimonials = [
  {
    id: "testimonio-uno",
    src: "/videos/testimonio-uno-web.mp4",
    poster: "/images/testimonio-uno-poster.webp",
    duration: "0:47",
    title: "Su primera pieza",
    alt: "Alumna del taller sosteniendo un amigurumi turquesa con cabello lila",
  },
  {
    id: "testimonio-dos",
    src: "/videos/testimonio-dos-web.mp4",
    poster: "/images/testimonio-dos-poster.webp",
    duration: "0:49",
    title: "Empezó desde cero",
    alt: "Alumna del taller tejiendo un amigurumi azul con aguja de crochet",
  },
];
