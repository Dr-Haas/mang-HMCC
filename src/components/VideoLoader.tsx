"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Canvas3D } from "@/components/Canvas3D";

type VimeoPlayer = import("@vimeo/player").default;

const VIMEO_OPTIONS =
  "title=0&byline=0&portrait=0&badge=0&autopause=0&controls=0&preload=1&muted=1&autoplay=0&loop=0&quality=1080p&background=0&transparent=0&color=000000&pip=0&speed=0&keyboard=0&fullscreen=0&dnt=1";
const VIMEO_DESKTOP_SRC = `https://player.vimeo.com/video/1165656919?h=e9affce932&${VIMEO_OPTIONS}&player_id=0&app_id=58479`;
const VIMEO_MOBILE_SRC = `https://player.vimeo.com/video/1165658777?h=f626d7d501&${VIMEO_OPTIONS}&player_id=0&app_id=58479`;

interface VideoLoaderProps {
  onVideoEnd: () => void;
}

export function VideoLoader({ onVideoEnd }: VideoLoaderProps) {
  const [showPreIntro, setShowPreIntro] = useState(true);
  const [visible, setVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [playersReady, setPlayersReady] = useState(false);
  const finishedRef = useRef(false);
  const desktopIframeRef = useRef<HTMLIFrameElement>(null);
  const mobileIframeRef = useRef<HTMLIFrameElement>(null);
  const playersRef = useRef<VimeoPlayer[]>([]);
  const preIntroRef = useRef<HTMLDivElement>(null);

  // Bloquer le scroll du body pendant que le VideoLoader est visible
  useEffect(() => {
    if (visible) {
      // Sauvegarder l'état actuel
      const originalOverflow = document.body.style.overflow;
      const originalHeight = document.body.style.height;

      // Bloquer le scroll
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";

      return () => {
        // Restaurer à la fermeture
        document.body.style.overflow = originalOverflow;
        document.body.style.height = originalHeight;
        document.documentElement.style.overflow = "";
      };
    }
  }, [visible]);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    // Transition immédiate et fluide
    setVisible(false);
    onVideoEnd();
  };

  const handleZoneClick = () => {
    // Empêcher la relecture si la vidéo a déjà commencé
    if (hasStarted) return;

    setHasStarted(true);
    playersRef.current.forEach((player) => {
      player.setVolume(1); // Remettre le volume
      player.setCurrentTime(0); // Recommencer depuis le début
      player.play().catch(() => {});
    });
  };

  const handleSwitchClick = () => {
    if (!preIntroRef.current || !playersReady) return;

    // Lancer la vidéo (en arrière-plan pendant le zoom)
    setHasStarted(true);
    playersRef.current.forEach((player) => {
      player.setVolume(1);
      player.setCurrentTime(0);
      player.play().catch(() => {});
    });

    // Attendre que le zoom soit quasi terminé puis fade out
    setTimeout(() => {
      gsap.to(preIntroRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          setShowPreIntro(false);
        },
      });
    }, 800);
  };

  // Initialiser les players dès que le composant est visible
  useEffect(() => {
    if (!visible) return;

    let cancelled = false;

    void (async () => {
      const { default: Player } = await import("@vimeo/player");
      if (cancelled) return;

      const players: VimeoPlayer[] = [];
      const readyPromises: Promise<void>[] = [];

      const setupPlayer = (iframe: HTMLIFrameElement | null) => {
        if (!iframe) return;
        const player = new Player(iframe);
        players.push(player);

        // Configuration simple pour afficher la première frame de la vidéo
        const readyPromise = player
          .ready()
          .then(() => {
            player.setLoop(false).catch(() => {});
            player.setVolume(0);
            player.setCurrentTime(0); // Aller directement à la première frame
            player.pause(); // S'assurer que c'est en pause
          })
          .catch(() => {});

        readyPromises.push(readyPromise);
        player.on("ended", () => finish());
      };

      setupPlayer(desktopIframeRef.current);
      setupPlayer(mobileIframeRef.current);
      playersRef.current = players;

      // Attendre que tous les players soient prêts
      await Promise.all(readyPromises);
      if (!cancelled) {
        setPlayersReady(true);
      }
    })();

    return () => {
      cancelled = true;
      const current = playersRef.current;
      playersRef.current = [];
      current.forEach((p) => p.destroy().catch(() => {}));
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Vidéo (toujours présente mais cachée derrière l'écran blanc) */}
          {/* Desktop */}
          <iframe
            ref={desktopIframeRef}
            src={VIMEO_DESKTOP_SRC}
            className="hidden md:block absolute inset-0 w-full h-full border-0 object-cover"
            style={{
              objectFit: "cover",
              width: "120%",
              height: "120%",
              top: "-10%",
              left: "-10%",
            }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Intro HMCC desktop"
          />

          {/* Mobile */}
          <iframe
            ref={mobileIframeRef}
            src={VIMEO_MOBILE_SRC}
            className="md:hidden absolute inset-0 w-full h-full border-0 object-cover"
            style={{
              objectFit: "cover",
              width: "120%",
              height: "120%",
              top: "-10%",
              left: "-10%",
            }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="HMCC Introduction mobile"
          />

          {/* Zone cliquable (seulement visible quand vidéo révélée) */}
          {!showPreIntro && (
            <div
              role="button"
              tabIndex={0}
              onClick={handleZoneClick}
              onKeyDown={(e) => e.key === "Enter" && handleZoneClick()}
              className={`absolute inset-[15%] md:inset-[20%] ${
                hasStarted ? "cursor-default" : "cursor-pointer"
              }`}
              aria-label={hasStarted ? "Vidéo en cours" : "Lancer la vidéo"}
            />
          )}

          {/* Écran pré-intro (par-dessus la vidéo) */}
          {showPreIntro && (
            <div
              ref={preIntroRef}
              className="absolute inset-0 bg-white overflow-hidden z-10"
            >
              <div className="absolute inset-0">
                <Canvas3D onSwitch={handleSwitchClick} />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
