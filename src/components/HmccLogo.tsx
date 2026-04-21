"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface HmccLogoProps {
  className?: string;
}

export function HmccLogo({ className = "" }: HmccLogoProps) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const handleMouseEnter = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      letterRefs.current.forEach((letter, index) => {
        if (!letter) return;
        gsap.to(letter, {
          rotateY: "+=360",
          duration: 0.6,
          delay: index * 0.08,
          ease: "power2.out",
        });
      });

      setTimeout(() => {
        isAnimating.current = false;
      }, 600 + 3 * 80 + 100);
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    return () => link.removeEventListener("mouseenter", handleMouseEnter);
  }, []);

  return (
    <Link ref={linkRef} href="/" className={`flex items-center gap-1 group ${className}`}>
      <div
        className="font-bold text-2xl tracking-tighter text-neutral-900 flex"
        style={{ perspective: "1000px" }}
      >
        {["H", "M", "C", "C"].map((letter, index) => (
          <span
            key={index}
            ref={(el) => { letterRefs.current[index] = el; }}
            className="inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {letter}
          </span>
        ))}
        <span className="text-red-600">.</span>
      </div>
    </Link>
  );
}
