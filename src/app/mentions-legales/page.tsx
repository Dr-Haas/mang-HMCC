import type { Metadata } from "next";
import { SITE_NAME } from "@/app/lib/constants";
import { MentionsLegalesPageContent } from "@/components/mentions-legales/MentionsLegalesPageContent";

export const metadata: Metadata = {
  title: `Mentions légales | ${SITE_NAME}`,
  description: "Mentions légales du site HMCC.",
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <MentionsLegalesPageContent />
    </main>
  );
}
