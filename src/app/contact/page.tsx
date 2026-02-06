import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/home/FooterSection";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactForm } from "@/components/ContactForm";
import { SITE_NAME } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description:
    "Contactez HMCC par formulaire, téléphone ou email. Prenez rendez-vous avec nos équipes.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#2a2a2a]">
      <Header />
      <main>
        <ContactHeroSection />
        <ContactForm />
      </main>
      <FooterSection />
    </div>
  );
}
