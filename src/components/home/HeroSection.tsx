"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  startAnimation?: boolean;
}

export function HeroSection({ startAnimation = false }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!startAnimation) return;

    console.log("🎬 Starting entrance animations for icons");

    const timeline = gsap.timeline({ delay: 0.2 });

    // Initialiser les éléments avec des transformations initiales
    gsap.set(
      [
        subtitleRef.current,
        titleRef.current,
        descriptionRef.current,
        ctaRef.current,
        scrollIndicatorRef.current,
      ],
      {
        opacity: 0,
      }
    );

    // Animation du sous-titre avec effet de révélation élégant
    timeline
      .fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 40,
          rotationX: 85,
          transformOrigin: "center bottom",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.4,
          ease: "power4.out",
        }
      )
      // Animation du titre avec effet élégant et classe
      .fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 80,
          rotationX: 15,
          transformOrigin: "center center",
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.6,
          ease: "power4.out",
        },
        "-=1.0"
      )
      // Animation de la description avec mouvement fluide
      .fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 60,
          rotationX: 45,
          transformOrigin: "center top",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1.2"
      )
      // Animation du CTA avec effet de rebond sophistiqué
      .fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
          rotationY: 45,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(2)",
        },
        "-=0.8"
      )
      // Animation de l'indicateur de scroll avec ondulation
      .fromTo(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "elastic.out(1, 0.4)",
        },
        "-=0.4"
      );

    // Animation continue de respiration pour le titre
    gsap.to(titleRef.current, {
      scale: 1.02,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2,
    });

    // Animation de flottement pour l'indicateur de scroll
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3,
    });

    // Micro-animation sur le sous-titre
    gsap.to(subtitleRef.current, {
      opacity: 0.6,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 4,
    });

    // Initialiser immédiatement les images hors écran pour éviter le flash
    iconsRef.current.forEach((icon, index) => {
      if (!icon) {
        console.log(`⚠️ Icon ${index} not found for entrance animation`);
        return;
      }

      console.log(`✨ Setting up entrance animation for icon ${index}`);

      let startX = 0;
      let startY = 0;

      // Pen en haut à gauche (0)
      if (index === 0) {
        startX = -400;
        startY = -200;
      }
      // Calculator en haut à droite (1)
      else if (index === 1) {
        startX = 400;
        startY = -200;
      }
      // Notebook en bas à gauche (2)
      else if (index === 2) {
        startX = -400;
        startY = 200;
      }
      // Pins en bas à droite (3)
      else if (index === 3) {
        startX = 400;
        startY = 200;
      }
      // Pin en bas à gauche (4)
      else if (index === 4) {
        startX = -400;
        startY = 200;
      }

      // Animation d'entrée avec fromTo pour forcer les valeurs de départ
      gsap.fromTo(
        icon,
        {
          x: startX,
          y: startY,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5 + index * 0.1,
        }
      );
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [startAnimation]);

  // Effet parallax au scroll
  useEffect(() => {
    if (!startAnimation) return;

    // Parallax pour le titre principal
    gsap.to(titleRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Parallax pour le sous-titre
    gsap.to(subtitleRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Parallax pour la description
    gsap.to(descriptionRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    // Parallax subtil pour le CTA
    gsap.to(ctaRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2.5,
      },
    });

    // Parallax simple - les images sortent sur les côtés au scroll
    console.log(
      "🎯 Setting up parallax for icons, found:",
      iconsRef.current.length
    );

    iconsRef.current.forEach((icon, index) => {
      if (!icon) {
        console.log(`⚠️ Icon ${index} is null`);
        return;
      }

      console.log(`✅ Icon ${index} found, setting up parallax`);

      let moveX = 0;
      let moveY = 0;
      let scrubValue = 1;

      // Variation pour chaque image pour un effet organique
      const variations = [
        { x: -450, y: -100, scrub: 0.9 }, // Pen - haut gauche
        { x: 500, y: -80, scrub: 1.1 }, // Calculator - haut droite
        { x: -480, y: 150, scrub: 1.2 }, // Notebook - bas gauche
        { x: 520, y: 120, scrub: 0.95 }, // Pins - bas droite
        { x: -420, y: 180, scrub: 1.0 }, // Pin - bas gauche
      ];

      if (variations[index]) {
        moveX = variations[index].x;
        moveY = variations[index].y;
        scrubValue = variations[index].scrub;
      }

      console.log(
        `📍 Icon ${index}: will move to x: ${moveX}, y: ${moveY}, scrub: ${scrubValue}`
      );

      gsap.fromTo(
        icon,
        {
          x: 0,
          y: 0,
        },
        {
          x: moveX,
          y: moveY,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: scrubValue,
            onUpdate: (self) => {
              console.log(
                `📊 Icon ${index} progress: ${(self.progress * 100).toFixed(
                  0
                )}%`
              );
            },
            onEnter: () =>
              console.log(`▶️ Icon ${index} ScrollTrigger ENTERED`),
            onLeave: () => console.log(`⏹️ Icon ${index} ScrollTrigger LEFT`),
            onEnterBack: () =>
              console.log(`◀️ Icon ${index} ScrollTrigger ENTER BACK`),
            onLeaveBack: () =>
              console.log(`⏪ Icon ${index} ScrollTrigger LEAVE BACK`),
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [startAnimation]);

  // Animation de hover sophistiquée pour le CTA
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    const handleMouseEnter = () => {
      gsap.to(cta, {
        scale: 1.08,
        rotationY: 5,
        z: 20,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });

      // Animation de la flèche
      gsap.to(cta.querySelector("svg"), {
        x: 8,
        y: -8,
        rotation: 5,
        duration: 0.6,
        ease: "back.out(2)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cta, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });

      // Retour de la flèche
      gsap.to(cta.querySelector("svg"), {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });
    };

    cta.addEventListener("mouseenter", handleMouseEnter);
    cta.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cta.removeEventListener("mouseenter", handleMouseEnter);
      cta.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
    >
      {/* Dégradé de fond subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-red-50/30 rounded-full blur-3xl -z-10" />

      {/* Images décoratives - Bureau désordonné */}
      {/* Pen - Haut à gauche */}
      <img
        ref={(el) => {
          iconsRef.current[0] = el;
        }}
        src="/images/hero/pen-left-top.png"
        alt=""
        className="absolute left-[-12%] top-[-18%] w-32 h-32 md:w-48 md:h-48 lg:w-[28rem] lg:h-[28rem] opacity-0 pointer-events-none rotate-[25deg]"
        aria-hidden="true"
      />

      {/* Calculator - Haut à droite */}
      <img
        ref={(el) => {
          iconsRef.current[1] = el;
        }}
        src="/images/hero/calculator-right-top.png"
        alt=""
        className="absolute right-[-12%] top-[-4%] w-28 h-28 md:w-44 md:h-44 lg:w-[24rem] lg:h-[24rem] opacity-0 pointer-events-none rotate-[-8deg]"
        aria-hidden="true"
      />

      {/* Notebook - Bas à gauche */}
      <img
        ref={(el) => {
          iconsRef.current[2] = el;
        }}
        src="/images/hero/notebook-left-bottom.png"
        alt=""
        className="absolute left-[-24%] bottom-[1%] w-40 h-40 md:w-64 md:h-64 lg:w-[36rem] lg:h-[36rem] opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Pins - Bas à droite */}
      <img
        ref={(el) => {
          iconsRef.current[3] = el;
        }}
        src="/images/hero/pins-right-botttom.png"
        alt=""
        className="absolute right-[-14%] bottom-[3%] w-32 h-32 md:w-52 md:h-52 lg:w-[28rem] lg:h-[28rem] opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Pin - Bas à gauche */}
      <img
        ref={(el) => {
          iconsRef.current[4] = el;
        }}
        src="/images/hero/pin-bottom-left.png"
        alt=""
        className="absolute left-[8%] bottom-[5%] w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Sous-titre */}
        <h2
          ref={subtitleRef}
          className="typography-hero-label text-neutral-400 opacity-0"
        >
          Cabinet d'expertise comptable
        </h2>

        {/* Titre principal */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl typography-hero-title text-neutral-900 opacity-0 mt-16"
        >
          HMCC
          <span className="block text-3xl md:text-5xl lg:text-6xl typography-hero-title text-red-600 mt-4">
            Expertise moderne
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-lg md:text-xl typography-hero-desc text-neutral-500 max-w-2xl mx-auto opacity-0"
        >
          Nous transformons vos obligations comptables en opportunités
          stratégiques. Une approche digitale et humaine pour les entrepreneurs
          exigeants.
        </p>

        {/* CTA simple */}
        <div className="pt-8">
          <Link
            ref={ctaRef}
            href="/contact"
            className="inline-flex items-center gap-3 text-neutral-900 text-lg tracking-wide border-b border-neutral-300 pb-1 hover:border-red-600 transition-colors duration-300 opacity-0 typography-hero-desc"
          >
            Prendre contact
            <ArrowDown size={20} className="transform rotate-[-45deg]" />
          </Link>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs tracking-[0.2em] text-neutral-400 uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-neutral-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
