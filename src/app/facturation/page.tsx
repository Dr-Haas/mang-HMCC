import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/home/FooterSection";
import { FacturationHeroSection } from "@/components/facturation/FacturationHeroSection";
import { FacturationSection1 } from "@/components/facturation/FacturationSection1";
import { FacturationSection2 } from "@/components/facturation/FacturationSection2";
import { SITE_NAME } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: `Facturation électronique | ${SITE_NAME}`,
  description:
    "Facturation électronique B2B, Chorus Pro et conformité. HMCC vous accompagne pour la mise en place et le suivi de vos obligations.",
};

export default function FacturationPage() {
  return (
    <div className="min-h-screen bg-white text-[#2a2a2a]">
      <Header />
      <main>
        <FacturationHeroSection />
        <FacturationSection1 />
        <FacturationSection2 />
        <section className="bg-[#e61d2b] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Un projet facturation électronique ?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Parlons de votre situation et des solutions adaptées à votre activité.
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
