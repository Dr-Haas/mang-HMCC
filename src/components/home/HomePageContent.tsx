"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { ExpertiseSection } from "./ExpertiseSection";
import { ValeurSection } from "./ValeurSection";
import { CabinetSection } from "./CabinetSection";
import { BureauxSection } from "./BureauxSection";
import { PourquoiSection } from "./PourquoiSection";
import { DigitalSection } from "./DigitalSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { FooterCTASection } from "./FooterCTASection";

interface HomePageContentProps {
  showContent: boolean;
}

export function HomePageContent({ showContent }: HomePageContentProps) {
  return (
    <>
      {/* Spacer invisible pour éviter que le footer apparaisse en haut pendant le chargement */}
      {!showContent && <div className="min-h-screen" />}
      
      <AnimatePresence>
        {showContent && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Hero avec animation spéciale */}
            <HeroSectionWithAnimation />
            
            <ExpertiseSection />
            <ValeurSection />
            <CabinetSection />
            <BureauxSection />
            <PourquoiSection />
            <DigitalSection />
            <TestimonialsSection />
            <FooterCTASection />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

// HeroSection avec animation d'entrée spéciale après la vidéo
function HeroSectionWithAnimation() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection startAnimation={true} />
    </div>
  );
}
