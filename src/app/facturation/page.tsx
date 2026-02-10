import type { Metadata } from "next";
import { SITE_NAME } from "@/app/lib/constants";
import { FacturationPageContent } from "@/components/facturation/FacturationPageContent";

export const metadata: Metadata = {
  title: `Facturation électronique | ${SITE_NAME}`,
  description:
    "Facturation électronique B2B, Chorus Pro et conformité. HMCC vous accompagne pour la mise en place et le suivi de vos obligations.",
};

export default function FacturationPage() {
  return (
    <main>
      <FacturationPageContent />
    </main>
  );
}
