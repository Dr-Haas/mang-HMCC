/**
 * URL de base du site pour le SEO (sitemap, robots, canonical, openGraph).
 * En production : définir NEXT_PUBLIC_SITE_URL (ex: https://hmcc.example.com).
 * En dev : utilise localhost ou la variable d'environnement.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_NAME = "HMCC";
