"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, Play } from "lucide-react";

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
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);

  const src = videoSrc || "/videos/intro.mp4";

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsPlaying(false);
    setHasStarted(true);
    // Laisse le temps à l'animation d'opacité de se jouer
    setTimeout(() => {
      setVisible(false);
      onVideoEnd();
    }, 500);
  };

  // Failsafe: never block navigation indefinitely if media cannot start.
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (!isPlaying) finish();
    }, 8000);
    return () => window.clearTimeout(timeout);
  }, [isPlaying]);

  const handlePlayClick = () => {
    if (isPlaying) return;
    const el = videoRef.current;
    if (!el) {
      finish();
      return;
    }

    el
      .play()
      .then(() => {
        setHasStarted(true);
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
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
          onClick={!isPlaying ? handlePlayClick : undefined}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Vidéo plein écran en background, sans contrôles */}
          <video
            ref={videoRef}
            src={src}
            className="absolute inset-0 h-full w-full object-contain md:object-cover"
            onEnded={handleEndedOrError}
            onError={handleEndedOrError}
            playsInline
            preload="auto"
            // Pas de muted ici, on veut le son quand l'utilisateur clique
            // muted
            controls={false}
          />

          {/* Play action: visible and easy to hit on mobile */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
              <motion.button
                type="button"
                onClick={handlePlayClick}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                aria-label="Lancer la vidéo d'introduction"
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm"
              >
                <Play size={16} />
                Lancer l&apos;intro
              </motion.button>
            </div>
          )}

          {/* Optional hotspot kept for legacy alignment while intro is idle */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-end pr-[8vw]">
            <motion.button
              style={{
                width: "220px",
                height: "140px",
              }}
              type="button"
              onClick={handlePlayClick}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              aria-label="Lancer la vidéo d'introduction"
              className="cursor-pointer bg-transparent border-none outline-none"
            />
          </div>
          )}

          {/* Skip action bottom-right */}
          <div className="absolute bottom-6 right-6 z-10">
            <button
              type="button"
              onClick={finish}
              className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            >
              passé
              <ArrowDownRight size={14} />
            </button>
          </div>

          {!hasStarted && !isPlaying && (
            <p className="absolute bottom-7 left-6 text-xs text-white/70">
              Touchez l&apos;ecran pour lancer la video
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
