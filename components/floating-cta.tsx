"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { enrollHref, isExternalEnroll } from "@/lib/site";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>(".footer");
    let footerVisible = false;

    const update = () => {
      setVisible(window.scrollY > 560 && !footerVisible);
    };

    const observer = footer
      ? new IntersectionObserver(
          ([entry]) => {
            footerVisible = entry.isIntersecting;
            update();
          },
          { rootMargin: "0px 0px -10% 0px" },
        )
      : null;

    if (footer && observer) observer.observe(footer);
    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, []);

  return (
    <a
      href={enrollHref}
      target={isExternalEnroll ? "_blank" : undefined}
      rel={isExternalEnroll ? "noopener noreferrer" : undefined}
      className={`floating-cta${visible ? " is-visible" : ""}`}
      aria-label="Quiero mi cupo: escribir por WhatsApp"
    >
      <span className="floating-cta__pulse" aria-hidden="true" />
      <MessageCircle size={20} strokeWidth={1.8} aria-hidden="true" />
      <span>Últimos cupos hoy · Escríbenos</span>
    </a>
  );
}
