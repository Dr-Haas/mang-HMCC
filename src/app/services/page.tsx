import type { Metadata } from "next";
import { SITE_NAME } from "@/app/lib/constants";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";

export const metadata: Metadata = {
  title: `Services | ${SITE_NAME}`,
  description:
    "Comptabilité, conseil, paie & social, création d'entreprise. Découvrez l'ensemble de nos services pour les TPE, PME et indépendants.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesPageContent />
    </main>
  );
}
