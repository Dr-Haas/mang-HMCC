"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Player from "@vimeo/player";

const VIMEO_OPTIONS = "title=0&byline=0&portrait=0&badge=0&autopause=0&controls=0";
const VIMEO_DESKTOP_SRC = `https://player.vimeo.com/video/1165656919?h=e9affce932&${VIMEO_OPTIONS}&player_id=0&app_id=58479`;
const VIMEO_MOBILE_SRC = `https://player.vimeo.com/video/1165658777?h=f626d7d501&${VIMEO_OPTIONS}&player_id=0&app_id=58479`;

interface VideoLoaderProps {
  onVideoEnd: () => void;
}

export function VideoLoader({ onVideoEnd }: VideoLoaderProps) {
  const [visible, setVisible] = useState(true);
  const finishedRef = useRef(false);
  const desktopIframeRef = useRef<HTMLIFrameElement>(null);
  const mobileIframeRef = useRef<HTMLIFrameElement>(null);
  const playersRef = useRef<Player[]>([]);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setTimeout(() => {
      setVisible(false);
      onVideoEnd();
    }, 500);
  };

  const handleZoneClick = () => {
    playersRef.current.forEach((player) => {
      player.play().catch(() => {});
    });
  };

  useEffect(() => {
    if (!visible) return;

    const players: Player[] = [];

    const setupPlayer = (iframe: HTMLIFrameElement | null) => {
      if (!iframe) return;
      const player = new Player(iframe);
      players.push(player);
      player.on("ended", () => finish());
    };

    setupPlayer(desktopIframeRef.current);
    setupPlayer(mobileIframeRef.current);
    playersRef.current = players;

    return () => {
      playersRef.current = [];
      players.forEach((p) => p.destroy().catch(() => {}));
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Desktop : iframe Vimeo (masqué sur mobile) */}
          <div className="absolute inset-0 hidden md:block">
            <iframe
              ref={desktopIframeRef}
              src={VIMEO_DESKTOP_SRC}
              className="h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Intro HMCC desktop"
            />
          </div>

          {/* Mobile : iframe Vimeo (masqué sur desktop) */}
          <div className="absolute inset-0 md:hidden">
            <iframe
              ref={mobileIframeRef}
              src={VIMEO_MOBILE_SRC}
              className="h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="HMCC Introduction mobile"
            />
          </div>

          {/* Zone cliquable pour lancer la vidéo — fond rouge pour réglages (remplacer par bg-transparent en prod) */}
          <div
            role="button"
            tabIndex={0}
            onClick={handleZoneClick}
            onKeyDown={(e) => e.key === "Enter" && handleZoneClick()}
            className="absolute inset-[15%] z-10 cursor-pointer md:inset-[20%]"
            aria-label="Lancer la vidéo"
          />

          {/* Skip action bottom-right */}
          <div className="absolute bottom-6 right-6 z-20">
            <button
              type="button"
              onClick={finish}
              className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            >
              passé
              <ArrowDownRight size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
