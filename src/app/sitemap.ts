import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/constants";

/**
 * Sitemap XML pour aider Google et les autres moteurs à indexer le site.
 * Ajoutez ici les URLs de vos pages (ou générez-les dynamiquement).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/nos-bureaux`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
