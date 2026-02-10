import { HeroSection } from "@/components/home/HeroSection";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { ValeurSection } from "@/components/home/ValeurSection";
import { CabinetSection } from "@/components/home/CabinetSection";
import { BureauxSection } from "@/components/home/BureauxSection";
import { PourquoiSection } from "@/components/home/PourquoiSection";
import { DigitalSection } from "@/components/home/DigitalSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FooterCTASection } from "@/components/home/FooterCTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExpertiseSection />
      <ValeurSection />
      <CabinetSection />
      <BureauxSection />
      <PourquoiSection />
      <DigitalSection />
      <TestimonialsSection />
      <FooterCTASection />
    </main>
  );
}
