import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/constants";

/**
 * Génère robots.txt pour les crawlers (Google, Bing, etc.).
 * Autorise l’indexation du site et pointe vers le sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
