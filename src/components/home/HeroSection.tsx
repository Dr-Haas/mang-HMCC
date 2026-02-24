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

  useEffect(() => {
    if (!startAnimation) return;

    const timeline = gsap.timeline({ delay: 0.2 });

    // Initialiser les éléments avec des transformations initiales
    gsap.set([subtitleRef.current, titleRef.current, descriptionRef.current, ctaRef.current, scrollIndicatorRef.current], {
      opacity: 0
    });

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

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
      gsap.to(cta.querySelector('svg'), {
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
      gsap.to(cta.querySelector('svg'), {
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
      
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Sous-titre */}
        <h2 
          ref={subtitleRef}
          className="text-sm tracking-[0.3em] text-neutral-400 uppercase opacity-0"
        >
          Cabinet d'expertise comptable
        </h2>
        
        {/* Titre principal */}
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl tracking-tight text-neutral-900 leading-none opacity-0 mt-16"
          style={{ fontWeight: 300 }}
        >
          HMCC
          <span className="block text-4xl md:text-6xl lg:text-7xl text-red-600 mt-4" style={{ fontWeight: 300 }}>
            Expertise moderne
          </span>
        </h1>
        
        {/* Description */}
        <p 
          ref={descriptionRef}
          className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed opacity-0"
          style={{ fontWeight: 300 }}
        >
          Nous transformons vos obligations comptables en opportunités stratégiques. 
          Une approche digitale et humaine pour les entrepreneurs exigeants.
        </p>
        
        {/* CTA simple */}
        <div className="pt-8">
          <Link
            ref={ctaRef}
            href="/contact"
            className="inline-flex items-center gap-3 text-neutral-900 text-lg tracking-wide border-b border-neutral-300 pb-1 hover:border-red-600 transition-colors duration-300 opacity-0"
            style={{ fontWeight: 300 }}
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
