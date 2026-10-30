import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Punto & Encanto — Taller online de amigurumis desde cero",
  description:
    "Aprende a tejer tus propios amigurumis desde cero, a tu ritmo y con acompañamiento. Taller online con certificado, 8 bonos y garantía de 7 días.",
  openGraph: {
    title: "Punto & Encanto — Taller online de amigurumis",
    description:
      "Teje tus propios amigurumis. Clases paso a paso, acceso de por vida, certificado y 8 bonos.",
    images: [
      {
        url: "/images/og-punto-encanto.jpg",
        width: 1200,
        height: 630,
        alt: "Alumna de Punto & Encanto con sus amigurumis tejidos a mano",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punto & Encanto — Taller online de amigurumis",
    description:
      "Teje tus propios amigurumis desde cero, a tu ritmo y con acompañamiento.",
    images: ["/images/og-punto-encanto.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${display.variable} ${sans.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
