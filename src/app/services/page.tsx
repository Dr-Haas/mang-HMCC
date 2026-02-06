import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/home/FooterSection";
import { ServicesHeroSection } from "@/components/services/ServicesHeroSection";
import { ServicesCardsExpandableSection } from "@/components/services/ServicesCardsExpandableSection";
import { ServicesSection3 } from "@/components/services/ServicesSection3";
import { SITE_NAME } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: `Services | ${SITE_NAME}`,
  description:
    "Comptabilité, conseil, paie & social, création d'entreprise. Découvrez l'ensemble de nos services pour les TPE, PME et indépendants.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[#2a2a2a]">
      <Header />
      <main>
        <ServicesHeroSection />

        <ServicesCardsExpandableSection />

        <ServicesSection3 />

        <section className="bg-[#e61d2b] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Un projet ? Parlons-en
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Demandez un devis ou un premier rendez-vous sans engagement.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-[#e61d2b] transition hover:bg-white/95"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
