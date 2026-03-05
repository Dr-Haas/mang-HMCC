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
  const [videoPreloaded, setVideoPreloaded] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(HOME_INTRO_SEEN_KEY) === "1";
    if (hasSeenIntro) {
      setHasSeenVideo(true);
      setShowContent(true);
    }
    setHydrated(true);
    // Précharger la vidéo Vimeo en arrière-plan
    const iframe = document.createElement("iframe");
    iframe.src =
      "https://player.vimeo.com/video/1165658777?h=f626d7d501&title=0&byline=0&portrait=0&badge=0&autopause=0&controls=0&preload=1&muted=1&autoplay=0&loop=0&quality=1080p&background=0&transparent=0&color=000000&pip=0&speed=0&keyboard=0&fullscreen=0&dnt=1&player_id=0&app_id=58479";
    iframe.style.display = "none";
    iframe.setAttribute("aria-hidden", "true");
    iframe.onload = () => setVideoPreloaded(true);
    document.body.appendChild(iframe);
    return () => {
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    };
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
      {/* Loader vidéo d'intro */}
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
