import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Services comptables et conseil",
  description:
    "Comptabilite, conseil, paie et social, creation d'entreprise : decouvrez les services HMCC pour TPE, PME et independants.",
  path: "/services",
  keywords: ["services comptables", "creation entreprise", "paie", "conseil fiscal", "HMCC"],
});

export default function ServicesPage() {
  return (
    <main>
      <ServicesPageContent />
    </main>
  );
}
