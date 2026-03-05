"use client";

import { useEffect, useRef } from "react";
// Liste des icônes à afficher
const floatingIcons = [
  {
    src: "/icons/hero-icon-1.svg",
    style: "left-[5%] top-[10%] w-[clamp(3.5rem,7vw,6rem)] h-[clamp(3.5rem,7vw,6rem)] opacity-0",
    delay: 0.2,
    float: { y: 18, x: 0, duration: 3, delay: 0 },
  },
  {
    src: "/icons/hero-icon-2.svg",
    style: "right-[8%] top-[18%] w-[clamp(3rem,6vw,5rem)] h-[clamp(3rem,6vw,5rem)] opacity-0",
    delay: 0.4,
    float: { y: 14, x: 8, duration: 2.8, delay: 0.2 },
  },
  {
    src: "/icons/hero-icon-3.svg",
    style: "left-[2%] bottom-[10%] w-[clamp(3rem,6vw,5rem)] h-[clamp(3rem,6vw,5rem)] opacity-0 rotate-[-12deg]",
    delay: 0.6,
    float: { y: 16, x: -10, duration: 3.2, delay: 0.3 },
  },
  {
    src: "/icons/hero-icon-4.svg",
    style: "right-[3%] bottom-[14%] w-[clamp(3.5rem,7vw,6rem)] h-[clamp(3.5rem,7vw,6rem)] opacity-0 rotate-[8deg]",
    delay: 0.8,
    float: { y: 20, x: 10, duration: 3.1, delay: 0.4 },
  },
  {
    src: "/icons/hero-icon-5.svg",
    style: "left-[18%] top-[22%] w-[clamp(2.5rem,5vw,4rem)] h-[clamp(2.5rem,5vw,4rem)] opacity-0 rotate-[6deg]",
    delay: 0.5,
    float: { y: 10, x: 12, duration: 2.7, delay: 0.1 },
  },
  {
    src: "/icons/hero-icon-6.svg",
    style: "right-[18%] top-[8%] w-[clamp(2.5rem,5vw,4rem)] h-[clamp(2.5rem,5vw,4rem)] opacity-0 rotate-[-8deg]",
    delay: 0.7,
    float: { y: 12, x: -10, duration: 2.9, delay: 0.2 },
  },
  {
    src: "/icons/hero-icon-7.svg",
    style: "left-[10%] bottom-[22%] w-[clamp(2.5rem,5vw,4rem)] h-[clamp(2.5rem,5vw,4rem)] opacity-0 rotate-[10deg]",
    delay: 0.9,
    float: { y: 14, x: 8, duration: 3.3, delay: 0.3 },
  },
  {
    src: "/icons/hero-icon-8.svg",
    style: "right-[16%] bottom-[8%] w-[clamp(2.5rem,5vw,4rem)] h-[clamp(2.5rem,5vw,4rem)] opacity-0 rotate-[-6deg]",
    delay: 1.1,
    float: { y: 10, x: -12, duration: 2.6, delay: 0.4 },
  },
];
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
  const ctaRef = useRef<HTMLButtonElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
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

  // Effets parallax simples - UNIQUEMENT sur desktop
  useEffect(() => {
    // Désactiver sur mobile pour les performances
    if (window.innerWidth < 768) return;

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
      className="relative min-h-screen flex items-center px-4 sm:px-6 py-12 sm:py-16"
    >
      {/* Fond blanc simple */}
      <div className="absolute inset-0 bg-white -z-10" />

      {/* Icônes flottantes animées */}
      {floatingIcons.map((icon, i) => (
        <img
          key={icon.src}
          ref={el => {
            iconRefs.current[i] = el;
          }}
          src={icon.src}
          alt=""
          className={`pointer-events-none select-none absolute ${icon.style}`}
          aria-hidden="true"
        />
      ))}

      {/* Contenu principal avec layout asymétrique */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-full items-center">
          {/* Section gauche : titre + description */}
          <div className="col-span-1 md:col-span-6 lg:col-span-6 md:col-start-2 lg:col-start-2">
            <div className="space-y-8 md:space-y-12">
              {/* Titres alignés */}
              <div className="space-y-4 md:space-y-6">
                <div
                  ref={titleRef}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-neutral-900 leading-none"
                >
                  Cabinet
                </div>

                <div
                  ref={subtitleRef}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-red-600 leading-none"
                >
                  Indépendant
                </div>
              </div>

              {/* Description alignée avec les titres */}
              <p
                ref={descRef}
                className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed font-light max-w-2xl"
              >
                Plus de 25 ans d'expertise au service des entrepreneurs,
                associations et dirigeants. Un cabinet indépendant qui
                privilégie la proximité et l'excellence.
              </p>
            </div>
          </div>

          {/* Section droite : année + CTA */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3 md:col-start-8 lg:col-start-9 mt-8 md:mt-0">
            <div className="space-y-8 md:space-y-16 text-center md:text-right lg:text-center">
              {/* Année */}
              <div ref={yearRef}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-400">
                  1998
                </div>
                <div className="text-xs sm:text-sm tracking-[0.2em] text-neutral-500 uppercase mt-1 md:mt-2">
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
                  className="inline-flex items-center gap-2 md:gap-3 text-neutral-900 text-base md:text-lg tracking-wide border-b border-neutral-300 pb-1 hover:border-red-600 transition-colors duration-300 font-light group cursor-pointer"
                >
                  Découvrir notre histoire
                  <ArrowRight
                    size={18}
                    className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 opacity-30">
        <div className="flex flex-col items-center space-y-1 md:space-y-2">
          <span className="text-xs tracking-[0.2em] text-neutral-400 uppercase">
            Cabinet
          </span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-neutral-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
