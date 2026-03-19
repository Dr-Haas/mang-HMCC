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
import { SequenceScrollAnimation } from "./SequenceScrollAnimation";

interface HomePageContentProps {
  showContent: boolean;
}

export function HomePageContent({ showContent }: HomePageContentProps) {
  return (
    <>
      {/* Wrapper principal avec fond animé */}
      <div className="relative w-full min-h-screen">
        <SequenceScrollAnimation
          frameCount={251}
          className="fixed inset-0 w-full h-full object-cover z-[-10] pointer-events-none"
        />
        {!showContent && <div className="min-h-screen" />}
        <AnimatePresence>
          {showContent && (
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Hero avec animation spéciale */}
              <HeroSectionWithAnimation />
              <ExpertiseSection transparentBg />
              <ValeurSection transparentBg />
              <CabinetSection transparentBg />
              <BureauxSection transparentBg />
              <PourquoiSection transparentBg />
              <DigitalSection transparentBg />
              <TestimonialsSection transparentBg />
              <FooterCTASection transparentBg />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
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
