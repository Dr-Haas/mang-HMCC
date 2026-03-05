"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DomiciliationHero() {
  // Icônes flottantes pour le hero domiciliation (positions différentes)
  const floatingIcons = [
    {
      src: "/icons/hero-icon-1.svg",
      style:
        "left-[8%] top-[14%] w-[clamp(3.5rem,7vw,6rem)] h-[clamp(3.5rem,7vw,6rem)] opacity-0",
      delay: 0.2,
      float: { y: 20, x: 8, duration: 3.1, delay: 0 },
    },
    {
      src: "/icons/hero-icon-2.svg",
      style:
        "right-[10%] top-[10%] w-[clamp(3.2rem,6vw,5.5rem)] h-[clamp(3.2rem,6vw,5.5rem)] opacity-0",
      delay: 0.4,
      float: { y: 16, x: -10, duration: 2.7, delay: 0.2 },
    },
    {
      src: "/icons/hero-icon-3.svg",
      style:
        "left-[4%] bottom-[18%] w-[clamp(3rem,6vw,5rem)] h-[clamp(3rem,6vw,5rem)] opacity-0 rotate-[-10deg]",
      delay: 0.6,
      float: { y: 18, x: 12, duration: 3.3, delay: 0.3 },
    },
    {
      src: "/icons/hero-icon-4.svg",
      style:
        "right-[6%] bottom-[10%] w-[clamp(3.7rem,7vw,6.2rem)] h-[clamp(3.7rem,7vw,6.2rem)] opacity-0 rotate-[10deg]",
      delay: 0.8,
      float: { y: 22, x: -14, duration: 3.2, delay: 0.4 },
    },
    {
      src: "/icons/hero-icon-5.svg",
      style:
        "left-[22%] top-[28%] w-[clamp(2.7rem,5vw,4.2rem)] h-[clamp(2.7rem,5vw,4.2rem)] opacity-0 rotate-[8deg]",
      delay: 0.5,
      float: { y: 12, x: 10, duration: 2.8, delay: 0.1 },
    },
    {
      src: "/icons/hero-icon-6.svg",
      style:
        "right-[20%] top-[18%] w-[clamp(2.7rem,5vw,4.2rem)] h-[clamp(2.7rem,5vw,4.2rem)] opacity-0 rotate-[-8deg]",
      delay: 0.7,
      float: { y: 14, x: -8, duration: 2.9, delay: 0.2 },
    },
    {
      src: "/icons/hero-icon-7.svg",
      style:
        "left-[14%] bottom-[24%] w-[clamp(2.7rem,5vw,4.2rem)] h-[clamp(2.7rem,5vw,4.2rem)] opacity-0 rotate-[12deg]",
      delay: 0.9,
      float: { y: 16, x: 14, duration: 3.4, delay: 0.3 },
    },
    {
      src: "/icons/hero-icon-8.svg",
      style:
        "right-[18%] bottom-[14%] w-[clamp(2.7rem,5vw,4.2rem)] h-[clamp(2.7rem,5vw,4.2rem)] opacity-0 rotate-[-12deg]",
      delay: 1.1,
      float: { y: 12, x: -10, duration: 2.7, delay: 0.4 },
    },
  ];
  // Refs pour les icônes flottantes
  const iconRefs = useRef<(HTMLImageElement | null)[]>([]);
  // Animation GSAP pour les icônes flottantes (apparition + float)
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
            // Animation de flottement continue
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
  // Refs pour les animations GSAP du nouveau hero minimaliste
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Animations d'entrée GSAP élégantes inspirées de home
  useEffect(() => {
    const timeline = gsap.timeline({ delay: 0.3 });

    // Initialiser les éléments
    gsap.set(
      [titleRef.current, subtitleRef.current, descRef.current, ctaRef.current],
      {
        opacity: 0,
      }
    );

    // Animation du titre principal
    timeline
      .fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 80,
          rotationX: 15,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.6,
          ease: "power4.out",
        }
      )
      // Animation du sous-titre avec décalage créatif
      .fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 40,
          rotationY: 15,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=1.2"
      )
      // Animation de la description
      .fromTo(
        descRef.current,
        {
          opacity: 0,
          y: 60,
          rotationX: 45,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1.0"
      )
      // Animation du CTA subtil
      .fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      );

    // Animation continue subtile pour le titre
    gsap.to(titleRef.current, {
      scale: 1.01,
      duration: 5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2,
    });

    return () => {
      timeline.kill();
    };
  }, []);

  // Effet parallax au scroll
  useEffect(() => {
    // Parallax pour le titre principal
    gsap.to(titleRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Parallax pour le sous-titre
    gsap.to(subtitleRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    // Parallax pour la description
    gsap.to(descRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2.5,
      },
    });

    // Parallax pour le CTA
    gsap.to(ctaRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden"
    >
      {/* Dégradé de fond subtil inspiré de home */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-red-50/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-violet-50/15 rounded-full blur-3xl -z-10" />

      {/* Icônes flottantes animées */}
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

      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Sous-titre élégant */}
        <div className="text-sm tracking-[0.3em] text-neutral-400 uppercase">
          Service de domiciliation agréé depuis 1998
        </div>

        {/* Titre principal avec décalage créatif */}
        <div className="space-y-6">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-neutral-900 leading-none opacity-0"
          >
            Domiciliation
          </h1>

          <h2
            ref={subtitleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-red-600 leading-none opacity-0"
          >
            Entreprise
          </h2>
        </div>

        {/* Description élégante */}
        <p
          ref={descRef}
          className="text-lg md:text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed font-light opacity-0 mt-16"
        >
          Une solution professionnelle pour votre siège social
          <br />
          avec services additionnels sur-mesure à Arpajon
        </p>

        {/* CTA subtil */}
        <div className="pt-12">
          <Link
            ref={ctaRef}
            href="/contact"
            className="inline-flex items-center gap-3 text-neutral-900 text-lg tracking-wide border-b border-neutral-300 pb-1 hover:border-red-600 transition-colors duration-300 opacity-0 font-light group"
          >
            Demander un devis
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-30">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs tracking-[0.2em] text-neutral-400 uppercase">
            Domiciliation
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
