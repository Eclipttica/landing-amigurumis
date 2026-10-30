export const site = {
  name: "Punto & Encanto",
  tagline: "Taller online de amigurumis",
  students: "1.500",
  whatsappNumber: "573000000000",
  whatsappMessage:
    "Hola, quiero información del Taller de Amigurumis de Punto & Encanto.",
  hotmartUrl: "",
};

const whatsappDigits = site.whatsappNumber.replace(/\D/g, "");

const whatsappHref = whatsappDigits
  ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(site.whatsappMessage)}`
  : "";

export const enrollHref = site.hotmartUrl || whatsappHref || "#inscripcion";

export const isExternalEnroll = /^https?:\/\//.test(enrollHref);
