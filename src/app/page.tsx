import { Header } from "@/components/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { QuiSommesNousSection } from "@/components/home/QuiSommesNousSection";
import { NousProposonsSection } from "@/components/home/NousProposonsSection";
import { TitreEtCompetencesSection } from "@/components/home/TitreEtCompetencesSection";
import { ServicesCardsSection } from "@/components/home/ServicesCardsSection";
import { BlocsChiffresSection } from "@/components/home/BlocsChiffresSection";
import { FooterSection } from "@/components/home/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#2a2a2a]">
      <Header />
      <main>
        <HeroSection />
        <QuiSommesNousSection />
        <NousProposonsSection />
        <TitreEtCompetencesSection />
        <ServicesCardsSection />
        <BlocsChiffresSection />
      </main>
      <FooterSection />
    </div>
  );
}
