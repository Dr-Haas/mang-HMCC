import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { CarrierePageContent } from "@/components/carriere/CarrierePageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Carrieres",
  description: "Rejoignez HMCC : offres d'emploi, stages et alternances en expertise comptable.",
  path: "/carriere",
  keywords: ["carriere comptabilite", "emploi expertise comptable", "stage comptabilite", "HMCC"],
});

export default function CarrierePage() {
  return (
    <main>
      <CarrierePageContent />
    </main>
  );
}
