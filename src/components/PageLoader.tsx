"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const band1Ref = useRef<HTMLDivElement>(null);
  const band2Ref = useRef<HTMLDivElement>(null);
  const band3Ref = useRef<HTMLDivElement>(null);
  const band4Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Animation d'entrée du texte
    timeline.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      0.3
    );

    // Animation de sortie des bandes une par une
    timeline.to(
      band1Ref.current,
      {
        y: "-100%",
        duration: 0.6,
        ease: "power3.inOut",
      },
      1.2
    );

    timeline.to(
      band2Ref.current,
      {
        y: "-100%",
        duration: 0.6,
        ease: "power3.inOut",
      },
      1.35
    );

    timeline.to(
      band3Ref.current,
      {
        y: "-100%",
        duration: 0.6,
        ease: "power3.inOut",
      },
      1.5
    );

    timeline.to(
      band4Ref.current,
      {
        y: "-100%",
        duration: 0.6,
        ease: "power3.inOut",
      },
      1.65
    );

    // Faire disparaître le texte en même temps
    timeline.to(
      textRef.current,
      {
        opacity: 0,
        y: -50,
        duration: 0.4,
        ease: "power2.in",
      },
      1.5
    );

    // Faire disparaître le container entier
    timeline.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = "none";
          }
        },
      },
      2.2
    );

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto"
      style={{ isolation: "isolate" }}
    >
      {/* Bandes noires avec un léger overlap pour éviter les gaps */}
      <div
        ref={band1Ref}
        className="absolute inset-y-0 bg-black"
        style={{ 
          left: '0%',
          width: 'calc(25% + 1px)',
          willChange: "transform" 
        }}
      />
      <div
        ref={band2Ref}
        className="absolute inset-y-0 bg-black"
        style={{ 
          left: 'calc(25% - 1px)',
          width: 'calc(25% + 2px)',
          willChange: "transform" 
        }}
      />
      <div
        ref={band3Ref}
        className="absolute inset-y-0 bg-black"
        style={{ 
          left: 'calc(50% - 1px)',
          width: 'calc(25% + 2px)',
          willChange: "transform" 
        }}
      />
      <div
        ref={band4Ref}
        className="absolute inset-y-0 bg-black"
        style={{ 
          left: 'calc(75% - 1px)',
          width: 'calc(25% + 1px)',
          willChange: "transform" 
        }}
      />

      {/* Texte HMCC */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ willChange: "transform, opacity", backgroundColor: "#A40D0D" }}
      >
        <h1 className="text-white text-[20vw] md:text-[18vw] font-bold tracking-[0.3em] leading-none select-none">
          HMCC
        </h1>
      </div>
    </div>
  );
}
