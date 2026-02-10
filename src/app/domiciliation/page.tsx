import type { Metadata } from "next";
import { SITE_NAME } from "@/app/lib/constants";
import { DomiciliationPageContent } from "@/components/domiciliation/DomiciliationPageContent";

export const metadata: Metadata = {
  title: `Domiciliation | ${SITE_NAME}`,
  description: "Service de domiciliation d'entreprise à Arpajon. Adresse professionnelle, gestion de courrier et services additionnels.",
};

export default function DomiciliationPage() {
  return (
    <main>
      <DomiciliationPageContent />
    </main>
  );
}
