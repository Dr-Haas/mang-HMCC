/**
 * URL de base du site pour le SEO (sitemap, robots, canonical, openGraph).
 * En production : définir NEXT_PUBLIC_SITE_URL (ex: https://hmcc.example.com).
 * En dev : utilise localhost ou la variable d'environnement.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_NAME = "HMCC";

/** Coordonnées de contact (à adapter selon les besoins) */
export const CONTACT_EMAIL = "contact@hmcc.com";
export const CONTACT_PHONE = "01 23 45 67 89";
