import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { HomePageClient } from "@/components/home/HomePageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Cabinet d'expertise comptable",
  description:
    "HMCC accompagne les entrepreneurs, dirigeants et independants en comptabilite, fiscalite, juridique, social et pilotage.",
  path: "/",
  keywords: ["expert comptable", "cabinet comptable", "comptabilite", "fiscalite", "HMCC"],
});

export default function Home() {
  return <HomePageClient />;
}

