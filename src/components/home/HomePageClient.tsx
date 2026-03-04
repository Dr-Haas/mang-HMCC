
"use client";
// Déclaration du type global pour éviter l'erreur TS
declare global {
  interface Window {
    __hmccHideHeaderFooter?: boolean;
  }
}

import { useEffect, useState } from "react";
import { VideoLoader } from "@/components/VideoLoader";
import { HomePageContent } from "@/components/home/HomePageContent";
import { motion, AnimatePresence } from "framer-motion";

const HOME_INTRO_SEEN_KEY = "hmcc_home_intro_seen";

export function HomePageClient() {
  const [showContent, setShowContent] = useState(false);
  const [hasSeenVideo, setHasSeenVideo] = useState(false);
  const [showWhiteTransition, setShowWhiteTransition] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(HOME_INTRO_SEEN_KEY) === "1";
    if (hasSeenIntro) {
      setHasSeenVideo(true);
      setShowContent(true);
    }
    setHydrated(true);
  }, []);

  // Masquer header/footer tant que l'intro n'est pas terminée
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__hmccHideHeaderFooter = !showContent;
    }
    return () => {
      if (typeof window !== "undefined") {
        window.__hmccHideHeaderFooter = false;
      }
    };
  }, [showContent]);

  const handleVideoEnd = () => {
    setHasSeenVideo(true);
    setShowWhiteTransition(true);

    // Démarrer le fade out de la page blanche après un court délai
    setTimeout(() => {
      setShowWhiteTransition(false);
      setTimeout(() => {
        setShowContent(true);
        sessionStorage.setItem(HOME_INTRO_SEEN_KEY, "1");
      }, 100);
    }, 500);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <>
      {!hasSeenVideo && <VideoLoader onVideoEnd={handleVideoEnd} />}

      {/* Page blanche de transition */}
      <AnimatePresence>
        {showWhiteTransition && (
          <motion.div
            className="fixed inset-0 z-[99] bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {showContent && <HomePageContent showContent={showContent} />}
    </>
  );
}
