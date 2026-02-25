"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function NewCabinetHero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  // Animation de texte uniquement - split text pour "Cabinet"
  useEffect(() => {
    const timeline = gsap.timeline({ delay: 0.3 });

    // Créer l'effet de split-text pour "Cabinet"
    const cabinetText = titleRef.current;
    if (cabinetText) {
      const letters = cabinetText.textContent?.split("") || [];
      cabinetText.innerHTML = "";
      letters.forEach((letter, i) => {
        const span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(50px)";
        cabinetText.appendChild(span);
        lettersRef.current[i] = span;
      });
    }

    // Animation des lettres en cascade
    timeline
      .to(lettersRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      })
      // Animation du sous-titre
      .fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      // Animation de l'année
      .fromTo(
        yearRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.6"
      )
      // Animation de la description
      .fromTo(
        descRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      // Animation du CTA
      .fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  // Effets parallax simples
  useEffect(() => {
    // Parallax pour le titre principal - décale vers la gauche
    gsap.to(titleRef.current, {
      yPercent: -60,
      xPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Parallax pour le sous-titre - décale vers la gauche
    gsap.to(subtitleRef.current, {
      yPercent: -45,
      xPercent: -35,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    // Parallax pour la description - décale vers la gauche
    gsap.to(descRef.current, {
      yPercent: -50,
      xPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2.5,
      },
    });

    // Parallax pour l'année - décale vers la droite
    gsap.to(yearRef.current, {
      yPercent: -70,
      xPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8,
      },
    });

    // Parallax pour le CTA - décale vers la droite
    gsap.to(ctaRef.current, {
      yPercent: -40,
      xPercent: 45,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2.2,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center px-6 py-16"
    >
      {/* Fond blanc simple */}
      <div className="absolute inset-0 bg-white -z-10" />

      {/* Contenu principal avec layout asymétrique */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-12 gap-8 h-full items-center">
          {/* Section gauche : titre + description */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 md:col-start-2 lg:col-start-2">
            <div className="space-y-12">
              {/* Titres alignés */}
              <div className="space-y-6">
                <div
                  ref={titleRef}
                  className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-neutral-900 leading-none"
                >
                  Cabinet
                </div>

                <div
                  ref={subtitleRef}
                  className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-red-600 leading-none"
                >
                  Indépendant
                </div>
              </div>

              {/* Description alignée avec les titres */}
              <p
                ref={descRef}
                className="text-lg md:text-xl text-neutral-600 leading-relaxed font-light max-w-2xl"
              >
                Plus de 25 ans d'expertise au service des entrepreneurs,
                associations et dirigeants. Un cabinet indépendant qui
                privilégie la proximité et l'excellence.
              </p>
            </div>
          </div>

          {/* Section droite : année + CTA */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 md:col-start-8 lg:col-start-9">
            <div className="space-y-16 text-right md:text-center">
              {/* Année */}
              <div ref={yearRef}>
                <div className="text-4xl md:text-5xl font-light text-neutral-400">
                  1998
                </div>
                <div className="text-sm tracking-[0.2em] text-neutral-500 uppercase mt-2">
                  Depuis
                </div>
              </div>

              {/* CTA aligné à droite avec plus d'espace */}
              <div>
                <button
                  ref={ctaRef}
                  onClick={() => {
                    // Chercher l'élément suivant après le hero (la timeline)
                    const nextSection = heroRef.current
                      ?.nextElementSibling as HTMLElement;
                    if (nextSection) {
                      nextSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center gap-3 text-neutral-900 text-lg tracking-wide border-b border-neutral-300 pb-1 hover:border-red-600 transition-colors duration-300 font-light group cursor-pointer"
                >
                  Découvrir notre histoire
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-30">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs tracking-[0.2em] text-neutral-400 uppercase">
            Cabinet
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
