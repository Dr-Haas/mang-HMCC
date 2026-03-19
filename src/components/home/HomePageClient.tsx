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

const HOME_INTRO_SEEN_KEY = "hmcc_home_intro_seen";

export function HomePageClient() {
  const [motionComponents, setMotionComponents] = useState<{motion?: any, AnimatePresence?: any}>({});
  const [showContent, setShowContent] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    import("framer-motion").then(fm => {
      setMotionComponents({ motion: fm.motion, AnimatePresence: fm.AnimatePresence });
    });
  }, []);

  // Préchargement des images de la séquence home
  useEffect(() => {
    setHydrated(true);
    const frameCount = 251;
    const folder = "/sequence/desktop-version/home/";
    let loaded = 0;
    let cancelled = false;
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = `${folder}HOME PAGE 1 - DESKTOP -_${String(i).padStart(5, "0")}.png`;
      img.onload = () => {
        loaded++;
        setProgress(Math.round((loaded / frameCount) * 100));
        if (loaded === frameCount && !cancelled) {
          setTimeout(() => setImagesLoaded(true), 200); // petit délai pour la transition
        }
      };
      img.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / frameCount) * 100));
        if (loaded === frameCount && !cancelled) {
          setTimeout(() => setImagesLoaded(true), 200);
        }
      };
    }
    return () => {
      cancelled = true;
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


  // Nettoyage : plus de vidéo d'intro, donc pas de handleVideoEnd

  const { motion, AnimatePresence } = motionComponents;

  if (!hydrated) return null;

  return (
    <>
      {/* Loader fonctionnel : fond blanc, texte rouge, attend le chargement de toutes les images */}
      {AnimatePresence && motion && !imagesLoaded && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ zIndex: 100 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mb-6" />
            <span className="text-lg font-semibold text-red-600 mb-2">Chargement en cours</span>
            <span className="text-base text-red-600">{progress}%</span>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Affichage du contenu home seulement après le chargement des images */}
      {imagesLoaded && <HomePageContent showContent={true} />}
    </>
  );
}
