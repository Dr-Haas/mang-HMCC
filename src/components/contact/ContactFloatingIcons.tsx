"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Utilise exactement les mêmes icônes/positions que NewCabinetHero
const floatingIcons = [
  {
    src: "/icons/hero-icon-1.png",
    style:
      "left-[5%] top-[10%] w-[clamp(2.3rem,4.6vw,3.4rem)] h-auto opacity-0",
    delay: 0.2,
    float: { y: 18, x: 0, duration: 3, delay: 0 },
  },
  {
    src: "/icons/hero-icon-2.png",
    style:
      "right-[8%] top-[18%] w-[clamp(2.3rem,4.6vw,3.4rem)] h-auto opacity-0",
    delay: 0.4,
    float: { y: 14, x: 8, duration: 2.8, delay: 0.2 },
  },
  {
    src: "/icons/hero-icon-3.png",
    style:
      "left-[2%] bottom-[10%] w-[clamp(2.3rem,4.6vw,3.4rem)] h-auto opacity-0 rotate-[-12deg]",
    delay: 0.6,
    float: { y: 16, x: -10, duration: 3.2, delay: 0.3 },
  },
  {
    src: "/icons/hero-icon-4.png",
    style:
      "right-[3%] bottom-[14%] w-[clamp(2.3rem,4.6vw,3.4rem)] h-auto opacity-0 rotate-[8deg]",
    delay: 0.8,
    float: { y: 20, x: 10, duration: 3.1, delay: 0.4 },
  },
  {
    src: "/icons/hero-icon-5.png",
    style:
      "left-[18%] top-[22%] w-[clamp(2.3rem,4.6vw,3.4rem)] h-auto opacity-0 rotate-[6deg]",
    delay: 0.5,
    float: { y: 10, x: 12, duration: 2.7, delay: 0.1 },
  },
  {
    src: "/icons/hero-icon-6.png",
    style:
      "right-[18%] top-[8%] w-[clamp(2.3rem,4.6vw,3.4rem)] h-auto opacity-0 rotate-[-8deg]",
    delay: 0.7,
    float: { y: 12, x: -10, duration: 2.9, delay: 0.2 },
  },
  {
    src: "/icons/hero-icon-7.png",
    style:
      "left-[10%] bottom-[22%] w-[clamp(2.3rem,4.6vw,3.4rem)] h-auto opacity-0 rotate-[10deg]",
    delay: 0.9,
    float: { y: 14, x: 8, duration: 3.3, delay: 0.3 },
  },
  {
    src: "/icons/hero-icon-8.png",
    style:
      "right-[16%] bottom-[8%] w-[clamp(2.3rem,4.6vw,3.4rem)] h-auto opacity-0 rotate-[-6deg]",
    delay: 1.1,
    float: { y: 10, x: -12, duration: 2.6, delay: 0.4 },
  },
];

export function ContactFloatingIcons() {
  const iconRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    floatingIcons.forEach((icon, i) => {
      const el = iconRefs.current[i];
      if (el) {
        gsap.to(el, {
          opacity: 1,
          y: -20,
          duration: 1.2,
          delay: icon.delay,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(el, {
              y: `-=${icon.float.y}`,
              x: `+=${icon.float.x}`,
              duration: icon.float.duration,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: icon.float.delay,
            });
          },
        });
      }
    });
  }, []);

  return (
    <>
      {floatingIcons.map((icon, i) => (
        <img
          key={icon.src}
          ref={(el) => {
            iconRefs.current[i] = el;
          }}
          src={icon.src}
          alt=""
          className={`pointer-events-none select-none absolute ${icon.style}`}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
