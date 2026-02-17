"use client";

import { Award, Users } from "lucide-react";
import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";

export function CabinetSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Positions fixes des particules
  const particlePositions = useMemo(() => {
    return [...Array(15)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
  }, []);

  const leaders = [
    {
      name: "Hervé Miniou",
      role: "Expert-Comptable",
      inscription: "Inscrit à l&apos;Ordre depuis 1983",
      experience: "40+ ans d&apos;expérience",
    },
    {
      name: "Alan Miniou",
      role: "Expert-Comptable",
      inscription: "Inscrit à l&apos;Ordre depuis 2006",
      experience: "18+ ans d&apos;expérience",
    },
  ];

  // Animations d'entrée
  useEffect(() => {
    const timeline = gsap.timeline();

    // Badge avec explosion
    timeline.fromTo(
      badgeRef.current,
      {
        scale: 0,
        rotation: -360,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(2.5)",
      }
    );

    // Mots du titre en cascade 3D
    timeline.fromTo(
      titleWordsRef.current.filter(Boolean),
      {
        y: 80,
        opacity: 0,
        rotationX: -90,
        scale: 0.5,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=0.6"
    );

    // Paragraphes avec effet de typewriter
    timeline.fromTo(
      paragraphsRef.current.filter(Boolean),
      {
        x: -100,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Stats box avec bounce
    timeline.fromTo(
      statsRef.current,
      {
        scale: 0,
        y: 50,
        rotation: -10,
      },
      {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(2)",
      },
      "-=0.4"
    );

    // Cartes des experts avec effet flip
    timeline.fromTo(
      cardsRef.current.filter(Boolean),
      {
        rotationY: 180,
        opacity: 0,
        x: 100,
      },
      {
        rotationY: 0,
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.8"
    );

    // Particules qui flottent
    particlesRef.current.forEach((particle, i) => {
      if (!particle) return;
      gsap.to(particle, {
        y: `random(-30, 30)`,
        x: `random(-30, 30)`,
        rotation: `random(-360, 360)`,
        scale: `random(0.8, 1.5)`,
        duration: `random(4, 7)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.15,
      });
    });

    return () => {
      timeline.kill();
    };
  }, []);

  // Effet magnétique sur le titre
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) * 0.015;
      const moveY = (y - centerY) * 0.015;

      // Titre magnétique
      gsap.to(titleRef.current, {
        x: moveX,
        y: moveY,
        rotation: moveX * 0.02,
        duration: 1,
        ease: "power2.out",
      });

      // Badge suit le curseur
      gsap.to(badgeRef.current, {
        x: moveX * 1.5,
        y: moveY * 1.5,
        rotation: moveX * 0.5,
        duration: 0.6,
        ease: "power2.out",
      });

      // Stats avec parallaxe inverse
      gsap.to(statsRef.current, {
        x: -moveX * 0.8,
        y: -moveY * 0.8,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([titleRef.current, badgeRef.current, statsRef.current], {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animation hover sur les cartes
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const handleEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          rotation: 2,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);

      return () => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      };
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-neutral-50 border-y border-neutral-200 overflow-hidden">

      {/* Particules animées */}
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            ref={(el) => {
              particlesRef.current[i] = el;
            }}
            className="absolute w-3 h-3 rounded-full bg-red-400/20"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-medium text-red-600 mb-6 opacity-0"
              style={{ willChange: 'transform' }}
            >
              <Award size={16} />
              Depuis 1998
            </div>
            <h2
              ref={titleRef}
              className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-6"
              style={{ perspective: "1000px", willChange: 'transform' }}
            >
              {["Un", "cabinet", "indépendant,"].map((word, i) => (
                <span key={i}>
                  <span
                    ref={(el) => {
                      titleWordsRef.current[i] = el;
                    }}
                    className="inline-block mr-3 opacity-0"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {word}
                  </span>
                </span>
              ))}
              <br />
              <span className="text-neutral-900">
                {["une", "expertise", "reconnue."].map((word, i) => (
                  <span key={i + 3}>
                    <span
                      ref={(el) => {
                        titleWordsRef.current[i + 3] = el;
                      }}
                      className="inline-block mr-3 opacity-0"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            </h2>
            <p
              ref={(el) => {
                paragraphsRef.current[0] = el;
              }}
              className="text-neutral-600 text-lg mb-6 font-light leading-relaxed opacity-0"
            >
              Hervé Miniou Conseil Comptabilité (HMCC) est un cabinet d&apos;expertise comptable indépendant, spécialisé en conseil, audit et commissariat aux comptes, fondé en 1998.
            </p>
            <p
              ref={(el) => {
                paragraphsRef.current[1] = el;
              }}
              className="text-neutral-600 text-lg mb-8 font-light leading-relaxed opacity-0"
            >
              Depuis plus de <span className="font-semibold text-neutral-900">25 ans</span>, nous accompagnons les entreprises, dirigeants et associations dans toutes les étapes de leur développement.
            </p>

            <div
              ref={statsRef}
              className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-neutral-200 opacity-0"
              style={{ willChange: 'transform' }}
            >
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Users size={28} />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">500+</p>
                <p className="text-sm text-neutral-500">Clients accompagnés</p>
              </div>
            </div>
          </div>

          {/* Right - Team Cards */}
          <div className="space-y-6">
            {leaders.map((leader, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-lg opacity-0 cursor-pointer"
                style={{ perspective: "1000px", transformStyle: "preserve-3d", willChange: 'transform' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-1 tracking-tight">
                      {leader.name}
                    </h3>
                    <p className="text-red-600 font-medium">{leader.role}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center">
                    <Award className="text-red-600" size={24} />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-neutral-600">{leader.inscription}</p>
                  <p className="text-sm font-medium text-neutral-900">{leader.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
