"use client";
import { useEffect, useRef } from "react";

interface SequenceScrollAnimationProps {
  folder?: string;
  frameCount?: number;
  className?: string;
}

// Par défaut : 251 images (de 00000 à 00250)
const DEFAULT_FRAME_COUNT = 251;
const DEFAULT_FOLDER = "/sequence/desktop-version/home2/";

export function SequenceScrollAnimation({
  folder = DEFAULT_FOLDER,
  frameCount = DEFAULT_FRAME_COUNT,
  className = "absolute inset-0 w-full h-full z-[-1] pointer-events-none",
}: SequenceScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const lastFrameRef = useRef<number>(-1);
  const fadeRef = useRef<number>(1); // Opacité pour le fondu
  const fadeDuration = 0.18; // Durée du fondu en secondes (ajuste si besoin)
  const lastTimestampRef = useRef<number>(0);

  // Précharge les images
  useEffect(() => {
    imagesRef.current = Array(frameCount)
      .fill(null)
      .map((_, i) => {
        const img = new window.Image();
        img.src = `${folder}HOME PAGE v2 -_${String(i).padStart(5, "0")}.png`;
        img.onload = () => {
          loadedRef.current[i] = true;
        };
        loadedRef.current[i] = false;
        return img;
      });
  }, [folder, frameCount]);

  useEffect(() => {
    let rafId: number;
    let prevFrame = 0;
    let fade = 1;
    let fadeStart = 0;
    let autoPlayDone = false;
    let autoPlayFrame = 0;
    const AUTO_PLAY_FRAMES = 50;
    const drawFrame = (timestamp: number) => {
      const ctx = canvasRef.current?.getContext("2d");
      // Phase 1 : auto-play frames 0-29
      if (!autoPlayDone) {
        if (
          !ctx ||
          !imagesRef.current[autoPlayFrame] ||
          !loadedRef.current[autoPlayFrame]
        ) {
          rafId = window.requestAnimationFrame(drawFrame);
          return;
        }
        if (!canvasRef.current) {
          rafId = window.requestAnimationFrame(drawFrame);
          return;
        }
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.globalAlpha = 1;
        ctx.drawImage(
          imagesRef.current[autoPlayFrame],
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        lastFrameRef.current = autoPlayFrame;
        autoPlayFrame++;
        if (autoPlayFrame >= AUTO_PLAY_FRAMES) {
          autoPlayDone = true;
        }
        rafId = window.requestAnimationFrame(drawFrame);
        return;
      }
      // Phase 2 : scroll sync (frames 30-250)
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      // Frame de scroll commence à 30
      const minFrame = AUTO_PLAY_FRAMES;
      const maxFrame = frameCount - 1;
      const frame = Math.floor(
        scrollPercent * (maxFrame - minFrame) + minFrame
      );
      // Empêche le scroll de revenir sous 30
      const clampedFrame = Math.max(frame, minFrame);
      if (
        !ctx ||
        !imagesRef.current[clampedFrame] ||
        !loadedRef.current[clampedFrame]
      ) {
        rafId = window.requestAnimationFrame(drawFrame);
        return;
      }
      // Affiche la frame instantanément
      if (!canvasRef.current) {
        rafId = window.requestAnimationFrame(drawFrame);
        return;
      }
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.globalAlpha = 1;
      ctx.drawImage(
        imagesRef.current[clampedFrame],
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      rafId = window.requestAnimationFrame(drawFrame);
    };
    rafId = window.requestAnimationFrame(drawFrame);
    return () => window.cancelAnimationFrame(rafId);
  }, [frameCount]);
  // ...existing code...

  // Ajuste la taille du canvas
  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
