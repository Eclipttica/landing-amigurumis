"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Camera,
  Check,
  Droplets,
  Flame,
  Heart,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Package,
  Palette,
  Play,
  Plus,
  Recycle,
  Sparkles,
  Star,
  Store,
  Timer,
  TrendingUp,
  Users,
  VolumeX,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  access,
  bonuses,
  designs,
  faqs,
  modules,
  reasons,
  stats,
  testimonials,
  type IconName,
} from "@/lib/course";
import { enrollHref, isExternalEnroll, site } from "@/lib/site";
import { AmbientVideo } from "./ambient-video";
import { FloatingCta } from "./floating-cta";
import { Modal } from "./modal";
import { Thread, YarnMark } from "./yarn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const icons = {
  book: BookOpen,
  box: Package,
  calculator: Calculator,
  droplets: Droplets,
  flame: Flame,
  heart: Heart,
  instagram: Camera,
  mail: Mail,
  monitor: MonitorSmartphone,
  palette: Palette,
  play: Play,
  recycle: Recycle,
  sparkles: Sparkles,
  store: Store,
  timer: Timer,
  trending: TrendingUp,
  users: Users,
} satisfies Record<IconName, typeof Sparkles>;

const externalLink = isExternalEnroll
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};

const hasCheckout = Boolean(site.hotmartUrl);

const craftPieces = [
  {
    image: "/images/proyecto-monstruo.webp",
    alt: "Amigurumi monstruo turquesa con cabello lila sobre un bolso tejido",
    title: "Monstruo",
    note: "Color y personalidad",
  },
  {
    image: "/images/proyecto-bolso.webp",
    alt: "Bolso tejido en color café con amigurumis azul y verde dentro",
    title: "Bolso",
    note: "Piezas para llevar contigo",
  },
  {
    image: "/images/proyecto-dinosaurio.webp",
    alt: "Dinosaurio azul tejido a crochet sostenido entre las manos",
    title: "Dinosaurio",
    note: "Un regalo que se recuerda",
  },
];

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={1.5} aria-hidden="true" />;
}

const INITIAL_COUNTDOWN_SECONDS = 2 * 3600 + 47 * 60 + 19;

function formatCountdown(totalSeconds: number) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return { hours, minutes, seconds };
}

export function Landing({ availableVideos }: { availableVideos: string[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const [openModule, setOpenModule] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(
    null,
  );
  const [reducedMotion, setReducedMotion] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_COUNTDOWN_SECONDS);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) =>
        prev > 60 ? prev - 1 : INITIAL_COUNTDOWN_SECONDS,
      );
    }, 1000);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const countdown = formatCountdown(secondsLeft);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(".hero-top > *", {
            y: -14,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.08,
          })
          .from(
            ".hero-title__line > span",
            { yPercent: 110, duration: 1.05, stagger: 0.12 },
            0.05,
          )
          .from(".hero-lead", { y: 18, autoAlpha: 0, duration: 0.75 }, 0.5)
          .from(
            ".hero-actions > *",
            { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.08 },
            0.62,
          )
          .from(".hero-trust", { y: 14, autoAlpha: 0, duration: 0.7 }, 0.8)
          .from(
            ".hero-visual",
            { y: 26, autoAlpha: 0, scale: 0.97, duration: 1 },
            0.3,
          )
          .from(".hero-scroll", { autoAlpha: 0, duration: 0.6 }, 1);

        gsap.to(".hero-visual", {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        gsap.utils.toArray<SVGPathElement>("[data-thread]").forEach((path) => {
          const length = path.getTotalLength();
          gsap.fromTo(
            path,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: path.closest("svg"),
                start: "top 92%",
                end: "bottom 40%",
                scrub: 1,
              },
            },
          );
        });
      });

      let disposed = false;
      document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });

      return () => {
        disposed = true;
        media.revert();
      };
    },
    { scope },
  );

  const toggleModule = (index: number, open: boolean) => {
    if (!open && document.querySelector("details.module[open]")) return;
    setOpenModule(open ? index : -1);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div ref={scope}>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      <aside
        className="fomo-top-bar"
        aria-label="Aviso de oferta por tiempo limitado"
      >
        <div className="shell fomo-top-bar__inner">
          <span className="fomo-top-bar__badge">
            <Flame size={14} aria-hidden="true" />
            Oferta de hoy · +8 bonos gratis
          </span>
          <p className="fomo-top-bar__text">
            <span className="fomo-top-bar__dot" aria-hidden="true" />
            Inscripciones abiertas · Acceso de por vida y certificado
          </p>
          <div className="fomo-top-bar__meta">
            <span
              className="fomo-top-bar__timer"
              aria-label="Tiempo restante de la oferta"
            >
              <Timer size={14} aria-hidden="true" />
              Cierra en{" "}
              <strong>
                {countdown.hours}:{countdown.minutes}:{countdown.seconds}
              </strong>
            </span>
            <span className="fomo-top-bar__spots">Últimos 7 cupos hoy</span>
            <a
              className="fomo-top-bar__link"
              href={enrollHref}
              {...externalLink}
            >
              Quiero mi cupo
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </aside>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-top">
          <a href="#inicio" className="wordmark" aria-label="Punto & Encanto, inicio">
            Punto <span className="wordmark__amp">&</span> Encanto
          </a>
          <span className="hero-top__tag">Taller online · Nivel cero</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="kicker">Crochet desde cero, a tu ritmo</span>
            <h1 className="hero-title" id="hero-title">
              <span className="hero-title__line">
                <span>Teje tus</span>
              </span>
              <span className="hero-title__line">
                <span>
                  propios <em>amigurumis.</em>
                </span>
              </span>
            </h1>
            <p className="hero-lead">
              El método paso a paso para pasar de los ovillos a piezas que
              puedas regalar, vender o disfrutar. Sin experiencia previa.
            </p>
            <div className="hero-urgency">
              <span className="hero-urgency__dot" aria-hidden="true" />
              <span>
                <strong>Inscríbete hoy:</strong> incluye los 8 bonos exclusivos
                sin costo extra · Quedan <strong>7 cupos</strong> disponibles.
              </span>
            </div>
            <div className="hero-actions">
              <a
                className="button button--primary"
                href={enrollHref}
                {...externalLink}
              >
                Quiero mi cupo hoy
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button button--ghost" href="#programa">
                Ver el programa
                <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
            <ul className="hero-trust">
              <li>
                <Star size={15} strokeWidth={1.7} aria-hidden="true" />
                Más de 1.500 alumnas
              </li>
              <li>
                <Check size={15} strokeWidth={1.8} aria-hidden="true" />
                Acceso inmediato de por vida
              </li>
              <li>
                <Check size={15} strokeWidth={1.8} aria-hidden="true" />
                Garantía 7 días + Certificado
              </li>
            </ul>
          </div>

          <div className="hero-visual">
            <span className="hero-shape hero-shape--lilac" aria-hidden="true" />
            <span className="hero-shape hero-shape--teal" aria-hidden="true" />
            <div className="hero-card">
              <div className="hero-card__media">
                <Image
                  src="/images/hero-alumna-bolso.webp"
                  alt="Alumna de Punto & Encanto con un bolso tejido a crochet"
                  fill
                  sizes="(max-width: 900px) 88vw, 42vw"
                  preload
                />
              </div>
              <span className="hero-card__caption">
                Diseños que puedes crear
              </span>
            </div>
            <span className="hero-sticker">
              Nivel cero
              <small>empieza hoy</small>
            </span>
            <span className="hero-tag">
              <Sparkles size={16} aria-hidden="true" />
              Hecho por ti
            </span>
          </div>
        </div>

        <p className="hero-scroll">
          Desliza para ver testimonios
          <ArrowDown size={15} aria-hidden="true" />
        </p>
      </section>

      <main id="contenido">
        <section className="hook" id="testimonios" aria-labelledby="hook-title">
          <span className="hook__glow" aria-hidden="true" />
          <div className="shell hook__grid">
            <div className="hook__copy">
              <span className="kicker kicker--light">Ellas ya lo hicieron</span>
              <h2 id="hook-title">
                “¡Pensé que
                <br />
                era <em>difícil!</em>”
              </h2>
              <p className="hook__sub">En 2 semanas tejí mi primer diseño.</p>
              <p className="hook__text">
                Mira cómo empezaron desde cero, con clases cortas y un método
                que se puede repetir hasta que cada punto sale como quieres.
              </p>
            </div>

            <div className="hook__reels">
              {testimonials.map((testimonial, index) => {
                const hasVideo = availableVideos.includes(testimonial.src);
                return (
                  <button
                    key={testimonial.id}
                    className="reel"
                    onClick={() => setSelectedTestimonial(index)}
                    aria-label={`Abrir testimonio con sonido: ${testimonial.title}`}
                  >
                    {hasVideo ? (
                      <video
                        src={testimonial.src}
                        poster={testimonial.poster}
                        autoPlay={!reducedMotion}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                      />
                    ) : (
                      <Image
                        src={testimonial.poster}
                        alt={testimonial.alt}
                        fill
                        sizes="(max-width: 700px) 92vw, 48vw"
                      />
                    )}
                    <span className="reel__shade" aria-hidden="true" />
                    <span className="reel__badge">Testimonio de alumna</span>
                    <span className="reel__sound">
                      <VolumeX size={13} aria-hidden="true" />
                      Toca para escuchar
                    </span>
                    <span className="reel__meta">
                      <span>{testimonial.title}</span>
                      <span>{testimonial.duration}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="shell hook__stats">
            {stats.map((stat) => (
              <article className="hook__stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
          <p className="hook__hint">
            Los videos empiezan sin sonido. Toca uno para escucharlo.
          </p>
        </section>

        <section className="manifesto shell" aria-labelledby="manifesto-title">
          <div className="manifesto__label">
            <YarnMark />
            <span>El método</span>
          </div>
          <h2 id="manifesto-title">
            No necesitas más tutoriales.
            <br />
            Necesitas un camino claro.
          </h2>
          <div className="manifesto__body">
            <p>
              Aprender sola, saltando de video en video, puede volverse
              frustrante. Por eso el taller está ordenado como una ruta:
              primero los puntos, después las formas y al final las piezas que
              puedes regalar o vender.
            </p>
            <p>
              Clases cortas, repetibles y explicadas con calma. Empiezas desde
              cero y avanzas a tu ritmo, con una comunidad para resolver dudas.
            </p>
            <span className="manifesto__note">
              Clases cortas · repetibles · en orden
            </span>
          </div>
          <div className="manifesto__compare">
            <article className="manifesto__compare-card">
              <span className="manifesto__compare-tag">Sin un método</span>
              <h3>Tutoriales sueltos</h3>
              <ul>
                <li>
                  <span aria-hidden="true">–</span>
                  Saltas de video en video sin saber qué sigue.
                </li>
                <li>
                  <span aria-hidden="true">–</span>
                  Las piezas quedan desiguales y no sabes por qué.
                </li>
                <li>
                  <span aria-hidden="true">–</span>
                  Cuando aparece una duda, no tienes a quién preguntar.
                </li>
              </ul>
            </article>
            <article className="manifesto__compare-card manifesto__compare-card--after">
              <span className="manifesto__compare-tag">Con Punto & Encanto</span>
              <h3>Una ruta clara</h3>
              <ul>
                <li>
                  <Check size={16} aria-hidden="true" />
                  Avanzas en orden, desde los puntos base hasta tu pieza.
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />
                  Repites clases cortas hasta que cada punto sale como quieres.
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />
                  Resuelves dudas en una comunidad que te acompaña.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="reasons" aria-labelledby="reasons-title">
          <div className="shell">
            <div className="section-head">
              <span className="kicker">El método</span>
              <h2 id="reasons-title">
                4 pilares para tejer
                <br />
                piezas que se vean profesionales.
              </h2>
            </div>
            <div className="reasons__grid">
              {reasons.map((reason, index) => (
                <article className="reason" key={reason.title}>
                  <div className="reason__top">
                    <span className="reason__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="reason__icon">
                      <Icon name={reason.icon} />
                    </span>
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="program shell"
          id="programa"
          aria-labelledby="program-title"
        >
          <div className="program__intro">
            <span className="kicker">El taller</span>
            <h2 id="program-title">
              De tu primer punto
              <br />
              a tu primera colección.
            </h2>
            <p>
              Un recorrido práctico para aprender crochet desde los
              fundamentos y terminar creando amigurumis con acabados que se ven
              profesionales.
            </p>
            <div className="program__badge">
              <span aria-hidden="true">0</span>
              <div>
                <strong>Sin experiencia previa</strong>
                <p>
                  Empiezas por los puntos base y avanzas hasta más de 12
                  diseños y técnicas.
                </p>
              </div>
            </div>
          </div>

          <div className="program__body">
            <div className="program__modules">
              {modules.map((module, index) => (
                <details
                  className="module"
                  key={module.title}
                  open={openModule === index}
                  onToggle={(event) =>
                    toggleModule(index, event.currentTarget.open)
                  }
                >
                  <summary>
                    <span className="module__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="module__title">{module.title}</span>
                    <Plus
                      className="module__plus"
                      size={20}
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="module__content">
                    <p>{module.text}</p>
                    <ul>
                      {module.items.map((item) => (
                        <li key={item}>
                          <Check size={14} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>

            <div className="designs">
              <span className="kicker">Más de 12 diseños y técnicas</span>
              <ul>
                {designs.map((design) => (
                  <li key={design}>{design}</li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="craft-strip"
            tabIndex={0}
            role="region"
            aria-label="Proyectos de referencia"
          >
            {craftPieces.map((piece, index) => (
              <figure className={`craft-strip__item craft-strip__item--${index + 1}`} key={piece.title}>
                <div className="craft-strip__photo">
                  <Image
                    src={piece.image}
                    alt={piece.alt}
                    fill
                    sizes="(max-width: 700px) 42vw, 24vw"
                  />
                </div>
                <figcaption>
                  <strong>{piece.title}</strong>
                  <span>{piece.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="craft-strip__note">
            Piezas de referencia del estilo de proyectos que puedes crear.
          </p>
        </section>

        <section className="bonuses" id="bonos" aria-labelledby="bonuses-title">
          <div className="shell">
            <div className="section-head section-head--split">
              <div>
                <span className="kicker">Incluido sin costo extra</span>
                <h2 id="bonuses-title">
                  8 bonos para tejer
                  <br />y vender mejor.
                </h2>
              </div>
              <p>
                Materiales complementarios para que no te falte nada: desde
                acabados perfectos hasta costos, proveedores y una comunidad
                para acompañarte.
              </p>
            </div>

            <div className="bonuses__grid">
              {bonuses.map((bonus, index) => (
                <article
                  className={`bonus${bonus.wide ? " bonus--wide" : ""}${
                    bonus.highlight ? " bonus--highlight" : ""
                  }`}
                  key={bonus.title}
                >
                  <div className="bonus__top">
                    <span className="bonus__number">
                      Bono {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="bonus__badge">HOY GRATIS</span>
                    <span className="bonus__icon">
                      <Icon name={bonus.icon} />
                    </span>
                  </div>
                  <h3>{bonus.title}</h3>
                  <p>{bonus.text}</p>
                </article>
              ))}
            </div>
            <div className="bonuses__urgency">
              <p className="bonuses__note">
                <Flame size={16} aria-hidden="true" />
                Los 8 bonos se desbloquean gratis solo al asegurar tu cupo hoy
                (quedan {countdown.hours}:{countdown.minutes}:{countdown.seconds}
                ).
              </p>
              <a
                className="text-link bonuses__cta"
                href={enrollHref}
                {...externalLink}
              >
                Reclamar mi cupo + los 8 bonos
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="brand-story shell"
          id="marca"
          aria-labelledby="brand-title"
        >
          <div className="brand-story__visual">
            <div className="brand-story__photo">
              <Image
                src="/images/brand-story-alumna-monstruo.webp"
                alt="Alumna de Punto & Encanto con un amigurumi turquesa"
                fill
                sizes="(max-width: 900px) 90vw, 42vw"
              />
            </div>
            <AmbientVideo
              src={
                availableVideos.includes("/videos/atelier-web.mp4")
                  ? "/videos/atelier-web.mp4"
                  : undefined
              }
              poster="/images/hero.webp"
              alt="Manos tejiendo a crochet sobre una mesa de trabajo"
              className="brand-story__video"
              sizes="(max-width: 700px) 34vw, 180px"
            />
            <span className="brand-story__sticker">
              Hecho a mano
              <small>explicado con calma</small>
            </span>
          </div>

          <div className="brand-story__copy">
            <span className="kicker">Punto & Encanto</span>
            <h2 id="brand-title">
              Un hobby que se convirtió
              <br />
              en un oficio.
            </h2>
            <p>
              Punto & Encanto nació tejiendo regalos para familiares y amigos.
              Lo que empezó como un pasatiempo se convirtió en una forma de
              crear ingresos y, después, en un taller para enseñar a otras
              mujeres a hacer lo mismo.
            </p>
            <p>
              Hoy acompañamos a más de 1.500 alumnas que aprenden a su ritmo,
              desde casa y con una comunidad que comparte avances, dudas y
              logros.
            </p>
            <ul className="check-list">
              <li>
                <Check size={16} aria-hidden="true" />
                Clases cortas y repetibles
              </li>
              <li>
                <Check size={16} aria-hidden="true" />
                Acompañamiento en comunidad
              </li>
              <li>
                <Check size={16} aria-hidden="true" />
                Enfoque práctico y comercial
              </li>
            </ul>
            <span className="brand-story__signature">
              Cada pieza cuenta una historia.
            </span>
          </div>
        </section>

        <section className="access" id="acceso" aria-labelledby="access-title">
          <div className="shell access__grid">
            <figure className="access__course">
              <div className="access__course-image">
                <Image
                  src="/images/curso-crochet-paso-a-paso.webp"
                  alt="Mockup del curso Crochet Paso a Paso con guía de puntos, patrones descargables y proyectos terminados"
                  fill
                  sizes="(max-width: 1180px) 88vw, 30vw"
                />
              </div>
              <figcaption>
                <span>
                  <Sparkles size={15} aria-hidden="true" />
                  Incluye taller + 8 bonos
                </span>
                <p>Guías descargables, patrones y proyectos paso a paso.</p>
              </figcaption>
            </figure>

            <div className="certificate">
              <div className="certificate__inner">
                <span className="certificate__brand">
                  Punto <span>&</span> Encanto
                </span>
                <span className="certificate__kicker">
                  Certificado de finalización
                </span>
                <h3>Taller de amigurumis</h3>
                <p>
                  Se otorga al completar el programa de formación en crochet y
                  creación de amigurumis.
                </p>
                <div className="certificate__seal" aria-hidden="true">
                  <span>P&E</span>
                  <Sparkles size={18} />
                </div>
                <span className="certificate__footer">
                  Emitido al completar el programa
                </span>
              </div>
            </div>

            <div className="access__copy">
              <span className="kicker kicker--light">Acceso</span>
              <h2 id="access-title">
                Tu taller,
                <br />
                cuando tú puedas.
              </h2>
              <div className="access__list">
                {access.map((item) => (
                  <article key={item.title}>
                    <span className="access__icon">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <a
                className="text-link access__cta"
                href={enrollHref}
                {...externalLink}
              >
                Consultar acceso por WhatsApp
                <MessageCircle size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="beginner" aria-labelledby="beginner-title">
          <div className="shell beginner__grid">
            <span className="beginner__number" aria-hidden="true">
              0
            </span>
            <div>
              <span className="kicker">¿Nunca has tejido?</span>
              <h2 id="beginner-title">
                No necesitas experiencia.
                <br />
                Necesitas empezar.
              </h2>
            </div>
            <p>
              El taller comienza desde los fundamentos básicos y te acompaña
              hasta crear más de 12 tipos de amigurumis. Si puedes seguir un
              video y repetir un punto, puedes hacerlo.
            </p>
          </div>
        </section>

        <section
          className="enroll"
          id="inscripcion"
          aria-labelledby="enroll-title"
        >
          <div className="shell">
            <div className="enroll__head">
              <div>
                <span className="kicker">Inscripción abierta</span>
                <h2 id="enroll-title">Tu cupo al taller.</h2>
              </div>
              <p>
                Empieza hoy y teje a tu ritmo. Al confirmar el pago recibes el
                acceso por correo y todos los bonos del programa.
              </p>
            </div>

            <div className="enroll__card">
              <div className="enroll__copy">
                <span className="kicker">Todo lo que recibes</span>
                <h3>El taller completo y sus bonos, en un solo lugar.</h3>
                <p>
                  Empieza por los puntos base y avanza hasta tus primeras
                  piezas, con guías descargables y acompañamiento en comunidad.
                </p>
                <ul className="check-list check-list--two enroll__list">
                  <li>
                    <Check size={15} aria-hidden="true" />
                    Taller online completo
                  </li>
                  <li>
                    <Check size={15} aria-hidden="true" />
                    8 bonos incluidos
                  </li>
                  <li>
                    <Check size={15} aria-hidden="true" />
                    Acceso de por vida
                  </li>
                  <li>
                    <Check size={15} aria-hidden="true" />
                    Certificado de finalización
                  </li>
                  <li>
                    <Check size={15} aria-hidden="true" />
                    Comunidad VIP
                  </li>
                  <li>
                    <Check size={15} aria-hidden="true" />
                    Lista de proveedores
                  </li>
                </ul>
                <span className="enroll__note">
                  <Check size={16} aria-hidden="true" />
                  Garantía de 7 días para probar el taller.
                </span>
              </div>

              <div className="enroll__panel">
                <div className="enroll__badges">
                  <span className="enroll__tag">
                    {hasCheckout
                      ? "Pago seguro por Hotmart"
                      : "Inscripción asistida por WhatsApp"}
                  </span>
                  <span className="enroll__spots-badge">
                    <Flame size={13} aria-hidden="true" />
                    Últimos 7 cupos hoy
                  </span>
                </div>
                <p className="enroll__price">
                  {hasCheckout
                    ? "Precio especial hoy en tu moneda"
                    : "Precio promocional y cupos por WhatsApp"}
                </p>
                <p className="enroll__price-note">
                  {hasCheckout
                    ? "El valor con descuento y los 8 bonos gratis se activan al abrir la página de pago hoy."
                    : "Escríbenos ahora para congelar el precio promocional de hoy, recibir los 8 bonos gratis y asegurar tu cupo antes de que cierre el contador."}
                </p>

                <div
                  className="enroll__countdown"
                  aria-label="Cuenta regresiva para el cierre de los bonos gratuitos"
                >
                  <span className="enroll__countdown-label">
                    <Timer size={14} aria-hidden="true" />
                    Los 8 bonos gratis cierran en:
                  </span>
                  <div className="enroll__countdown-grid">
                    <div>
                      <strong>{countdown.hours}</strong>
                      <small>Horas</small>
                    </div>
                    <span aria-hidden="true">:</span>
                    <div>
                      <strong>{countdown.minutes}</strong>
                      <small>Min</small>
                    </div>
                    <span aria-hidden="true">:</span>
                    <div>
                      <strong>{countdown.seconds}</strong>
                      <small>Seg</small>
                    </div>
                  </div>
                </div>

                <div className="enroll__scarcity">
                  <div className="enroll__scarcity-head">
                    <span>Cupos de hoy con 8 bonos incluidos</span>
                    <strong>86% reservados</strong>
                  </div>
                  <div className="enroll__scarcity-bar" aria-hidden="true">
                    <span />
                  </div>
                </div>

                <a
                  className="button button--primary button--full"
                  href={enrollHref}
                  {...externalLink}
                >
                  Quiero asegurar mi cupo ahora
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <span className="enroll__small">
                  {hasCheckout
                    ? "Acceso inmediato después de confirmar el pago · Garantía de 7 días"
                    : "Atención inmediata para completar tu inscripción hoy · Garantía de 7 días"}
                </span>
                <span className="enroll__whatsapp">
                  <MessageCircle size={16} aria-hidden="true" />
                  {hasCheckout
                    ? "Atención prioritaria por WhatsApp"
                    : "Respuesta inmediata por WhatsApp"}
                </span>
                <div className="enroll__proof">
                  <strong>+1.500 alumnas</strong>
                  <span>ya tejieron con este método</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="guarantee" aria-labelledby="guarantee-title">
          <div className="shell guarantee__grid">
            <div className="guarantee__seal" aria-hidden="true">
              <span>7</span>
              <small>días</small>
            </div>
            <div className="guarantee__copy">
              <span className="kicker">Garantía de satisfacción</span>
              <h2 id="guarantee-title">Pruébalo sin riesgo.</h2>
              <p>
                Tienes 7 días desde la compra para probar el taller. Si
                consideras que no cumple o no supera tus expectativas, puedes
                solicitar la devolución del dinero dentro de ese período.
              </p>
            </div>
          </div>
        </section>

        <section
          className="faq shell"
          id="preguntas"
          aria-labelledby="faq-title"
        >
          <div className="faq__intro">
            <span className="kicker">Preguntas frecuentes</span>
            <h2 id="faq-title">
              Todo lo que
              <br />
              necesitas saber.
            </h2>
            <p>
              Si tu duda no está aquí, escríbenos por WhatsApp y te ayudamos a
              decidir.
            </p>
            <a
              className="text-link"
              href={enrollHref}
              {...externalLink}
            >
              Hablar por WhatsApp
              <MessageCircle size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="faq__list">
            {faqs.map((faq) => (
              <details className="faq__item" key={faq.question}>
                <summary>
                  <span>{faq.question}</span>
                  <Plus size={20} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final" aria-labelledby="final-title">
          <Image
            src="/images/hero.webp"
            alt=""
            fill
            sizes="100vw"
            className="final__bg"
          />
          <span className="final__veil" aria-hidden="true" />
          <Thread className="final__thread" />
          <div className="shell final__content">
            <YarnMark />
            <span className="kicker kicker--light">Tu próximo punto</span>
            <h2 id="final-title">
              Tu primer amigurumi
              <br />
              empieza hoy.
            </h2>
            <p>
              Aprende a tu ritmo, con acompañamiento y una comunidad que te
              empuja a terminar tu primera pieza.
            </p>
            <span className="final__urgency">
              <Flame size={15} aria-hidden="true" />
              Últimos 7 cupos de hoy · Cierra en {countdown.hours}:
              {countdown.minutes}:{countdown.seconds}
            </span>
            <a
              className="button button--light"
              href={enrollHref}
              {...externalLink}
            >
              Quiero asegurar mi cupo hoy
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <span className="final__small">
              Acceso inmediato de por vida · 8 bonos gratis hoy · Garantía de 7
              días
            </span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer__top">
          <a href="#inicio" className="wordmark" aria-label="Punto & Encanto, inicio">
            Punto <span className="wordmark__amp">&</span> Encanto
          </a>
          <p>
            Taller online de amigurumis.
            <br />
            Hecho a mano, explicado con calma.
          </p>
        </div>
        <div className="shell footer__legal">
          {hasCheckout && (
            <p>
              Este producto se comercializa a través de Hotmart. Hotmart es la
              plataforma tecnológica y de pagos; no realiza un control editorial
              previo del producto ni evalúa directamente la experiencia o
              conocimientos técnicos de sus creadores.
            </p>
          )}
          <p>
            Esta página y el producto no forman parte del ecosistema de Meta ni
            de Meta Inc.
          </p>
          <p>
            El certificado es de finalización del taller y no constituye un
            título oficial.
          </p>
          <span>© 2026 Punto & Encanto</span>
        </div>
      </footer>

      <FloatingCta />

      {selectedTestimonial !== null &&
        (() => {
          const testimonial = testimonials[selectedTestimonial];
          const hasVideo = availableVideos.includes(testimonial.src);
          return (
            <Modal
              title={`Testimonio: ${testimonial.title}`}
              onClose={() => setSelectedTestimonial(null)}
              className="video-modal"
            >
              <div className="video-modal__frame">
                {hasVideo ? (
                  <video
                    key={testimonial.src}
                    src={testimonial.src}
                    poster={testimonial.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    aria-label={`Testimonio de una alumna: ${testimonial.title}`}
                  />
                ) : (
                  <Image
                    src={testimonial.poster}
                    alt={testimonial.alt}
                    fill
                    sizes="(max-width: 500px) 90vw, 420px"
                  />
                )}
              </div>
              <div className="video-modal__caption">
                <span className="kicker">Testimonio de alumna</span>
                <p>{testimonial.title}</p>
                <span>Activa el sonido para escucharla.</span>
              </div>
            </Modal>
          );
        })()}
    </div>
  );
}
