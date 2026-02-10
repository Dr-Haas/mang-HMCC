import type { Metadata } from "next";
import { SITE_NAME } from "@/app/lib/constants";
import { CarrierePageContent } from "@/components/carriere/CarrierePageContent";

export const metadata: Metadata = {
  title: `Carrières | ${SITE_NAME}`,
  description: "Rejoignez HMCC. Offres d'emploi, stages et alternances en expertise comptable.",
};

export default function CarrierePage() {
  return (
    <main>
      <CarrierePageContent />
    </main>
  );
}
