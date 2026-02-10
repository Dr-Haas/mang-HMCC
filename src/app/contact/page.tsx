import type { Metadata } from "next";
import { SITE_NAME } from "@/app/lib/constants";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description:
    "Contactez HMCC par formulaire, téléphone ou email. Prenez rendez-vous avec nos équipes.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactPageContent />
    </main>
  );
}
