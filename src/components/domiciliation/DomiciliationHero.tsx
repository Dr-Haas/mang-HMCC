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
