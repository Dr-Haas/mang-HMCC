import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { DomiciliationPageContent } from "@/components/domiciliation/DomiciliationPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Domiciliation d'entreprise",
  description:
    "Service de domiciliation d'entreprise a Arpajon : adresse professionnelle, gestion du courrier et services additionnels.",
  path: "/domiciliation",
  keywords: ["domiciliation entreprise", "adresse professionnelle", "Arpajon", "HMCC"],
});

export default function DomiciliationPage() {
  return (
    <main>
      <DomiciliationPageContent />
    </main>
  );
}
