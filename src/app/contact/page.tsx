import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contactez HMCC par formulaire, telephone ou email et prenez rendez-vous avec nos equipes.",
  path: "/contact",
  keywords: ["contact HMCC", "rendez-vous expert-comptable", "cabinet comptable Paris"],
});

export default function ContactPage() {
  return (
    <main>
      <ContactPageContent />
    </main>
  );
}
