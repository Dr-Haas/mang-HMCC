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
  );
}

// HeroSection avec animation d'entrée spéciale après la vidéo
function HeroSectionWithAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
    >
      {/* Background blanc qui apparaît avec effet de zoom et fade */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-0 bg-white -z-10"
      />
      
      {/* Contenu du hero avec animation d'apparition progressive */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroSection skipInitialAnimation={true} />
      </motion.div>
    </motion.div>
  );
}
