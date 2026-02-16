"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoLoaderProps {
  onVideoEnd: () => void;
  /**
   * Chemin de la vidéo MP4 hébergée sur le site (ex: "/videos/intro.mp4").
   * Si non fourni, utilise "/videos/intro.mp4" par défaut.
   */
  videoSrc?: string;
}

export function VideoLoader({ onVideoEnd, videoSrc }: VideoLoaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const src = videoSrc || "/videos/intro.mp4";

  const finish = () => {
    setIsPlaying(false);
    // Laisse le temps à l'animation d'opacité de se jouer
    setTimeout(() => {
      setVisible(false);
      onVideoEnd();
    }, 500);
  };

  const handlePlayClick = () => {
    const el = videoRef.current;
    if (!el) {
      finish();
      return;
    }

    el
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Si la vidéo ne peut pas être lue, on passe directement à la home
        finish();
      });
  };

  const handleEndedOrError = () => {
    finish();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Vidéo plein écran en background, sans contrôles */}
          <video
            ref={videoRef}
            src={src}
            className="absolute inset-0 h-full w-full object-cover"
            onEnded={handleEndedOrError}
            onError={handleEndedOrError}
            playsInline
            // Pas de muted ici, on veut le son quand l'utilisateur clique
            // muted
            controls={false}
          />

          {/* Zone cliquable invisible, centrée verticalement et alignée sur le "bouton" de la vidéo */}
          <div className="absolute inset-0 flex items-center justify-end pr-[13vw]">
            <motion.button
            style={{
              width: "250px",
              height: "150px",
            }}
              type="button"
              onClick={handlePlayClick}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              aria-label="Lancer la vidéo d'introduction"
              className="h-12 w-24 cursor-pointer bg-transparent border-none outline-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
