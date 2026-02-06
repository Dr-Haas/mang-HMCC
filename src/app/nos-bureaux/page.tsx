import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/home/FooterSection";
import { NosBureauxHero } from "@/components/nos-bureaux/NosBureauxHero";
import { NosBureauxAgencyCards } from "@/components/nos-bureaux/NosBureauxAgencyCards";
import { NosBureauxTeamSection } from "@/components/nos-bureaux/NosBureauxTeamSection";
import { NosBureauxRedBlocks } from "@/components/nos-bureaux/NosBureauxRedBlocks";
import { NosBureauxMapCta } from "@/components/nos-bureaux/NosBureauxMapCta";
import { SITE_NAME } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: `Nos bureaux | ${SITE_NAME}`,
  description:
    "Retrouvez les adresses et horaires de nos bureaux HMCC. Venez nous rencontrer ou prenez rendez-vous.",
};

export default function NosBureauxPage() {
  return (
    <div className="min-h-screen bg-white text-[#2a2a2a]">
      <Header />
      <main>
        <NosBureauxHero />

        <NosBureauxAgencyCards />

        <NosBureauxTeamSection />

        <NosBureauxRedBlocks />

        <NosBureauxMapCta />

        <section className="bg-[#e61d2b] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Prendre rendez-vous
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Appelez-nous ou envoyez un message pour convenir d&apos;un créneau.
            </p>
            <Link
              href="/#contact"
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
