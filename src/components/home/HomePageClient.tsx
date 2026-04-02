"use client";
// Déclaration du type global pour éviter l'erreur TS
declare global {
  interface Window {
    __hmccHideHeaderFooter?: boolean;
  }
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { VideoLoader } from "@/components/VideoLoader";
import { HomePageContent } from "@/components/home/HomePageContent";

const INTRO_SESSION_KEY = "hmcc_intro_seen";

export function HomePageClient() {
  const [showContent, setShowContent] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    // Préchargement des images EN PREMIER — démarre immédiatement au montage
    const frameCount = 251;
    const folder = "/sequence/desktop-version/home2/";
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = `${folder}HOME PAGE v2 -_${String(i).padStart(5, "0")}.png`;
    }

    // Si l'intro a déjà été jouée dans cette session → on saute directement au contenu
    const alreadySeen = sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    setSkipIntro(alreadySeen);
    if (alreadySeen) setShowContent(true);

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
    sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    setShowContent(true);
  };

  if (!hydrated) return null;

  return (
    <>
      {/* Intro uniquement si pas encore vue dans cette session */}
      {!skipIntro && !showContent && <VideoLoader onVideoEnd={handleVideoEnd} />}

      {/* Contenu home : toujours monté, fondu d'opacité au moment où l'intro se termine */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <HomePageContent showContent={showContent} />
      </motion.div>
    </>
  );
}
