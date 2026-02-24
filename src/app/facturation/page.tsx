import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { FacturationPageContent } from "@/components/facturation/FacturationPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Facturation electronique",
  description:
    "Facturation electronique B2B, Chorus Pro et conformite : HMCC vous accompagne dans la mise en place et le suivi de vos obligations.",
  path: "/facturation",
  keywords: ["facturation electronique", "chorus pro", "conformite B2B", "HMCC"],
});

export default function FacturationPage() {
  return (
    <main>
      <FacturationPageContent />
    </main>
  );
}
