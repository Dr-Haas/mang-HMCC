/**
 * URL de base du site pour le SEO (sitemap, robots, canonical, openGraph).
 * En production : définir NEXT_PUBLIC_SITE_URL (ex: https://hmcc.example.com).
 * En dev : utilise localhost ou la variable d'environnement.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_NAME = "HMCC";

/** Coordonnées de contact */
export const CONTACT_EMAIL = "contact@hmcc.fr";
export const CONTACT_PHONE = "01 23 45 67 89";
export const CONTACT_PHONE_ALT = "01 42 66 52 40";
export const CONTACT_ADDRESS_PARIS = "42 boulevard de la Bastille, 75012 Paris";
export const CONTACT_ADDRESS_PARIS_12 = "42 boulevard de la Bastille, 75012 Paris";
export const CONTACT_ADDRESS_ARPAJON = "11 bis boulevard Abel Cornaton, 91290 Arpajon, Essonne";
export const CONTACT_ADDRESS_ALGAJOLA = "Algajola";
