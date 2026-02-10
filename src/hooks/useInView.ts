"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Seuil de visibilité (0–1) pour déclencher l'entrée en vue */
  threshold?: number;
  /** Marge racine : déclencher quand l'élément entre dans cette zone (ex. "0px 0px -80px 0px" = 80px avant le bas) */
  rootMargin?: string;
  /** Ne déclencher qu'une seule fois */
  once?: boolean;
}

/**
 * Détecte quand un élément entre dans le viewport (Intersection Observer).
 * Déclenche dès qu'une partie de l'élément est visible.
 */
export function useInView(options: UseInViewOptions = {}) {
  const {
    threshold = 0.05,
    rootMargin = "0px 0px -80px 0px",
    once = true,
  } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    // Failsafe : si l'élément est déjà dans le viewport au montage (ou après layout), le rendre visible
    let raf = 0;
    let t: ReturnType<typeof setTimeout> | undefined;
    if (typeof window !== "undefined") {
      const checkInView = () => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight + 100 && rect.bottom > -100) {
          setIsInView(true);
        }
      };
      raf = requestAnimationFrame(checkInView);
      t = setTimeout(checkInView, 150);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (t) clearTimeout(t);
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
