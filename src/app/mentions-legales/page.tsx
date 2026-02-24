import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { MentionsLegalesPageContent } from "@/components/mentions-legales/MentionsLegalesPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Mentions legales",
  description: "Mentions legales du site HMCC.",
  path: "/mentions-legales",
  keywords: ["mentions legales", "informations legales", "HMCC"],
});

export default function MentionsLegalesPage() {
  return (
    <main>
      <MentionsLegalesPageContent />
    </main>
  );
}
