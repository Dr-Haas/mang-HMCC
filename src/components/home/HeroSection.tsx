"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  FileText,
  PieChart,
  Wallet,
  BarChart3,
  CircleDollarSign,
} from "lucide-react";
import { gsap } from "gsap";

interface HeroSectionProps {
  startAnimation?: boolean;
}

export function HeroSection({ startAnimation = false }: HeroSectionProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  const arrow1Ref = useRef<HTMLDivElement>(null);
  const arrow2Ref = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  const floatingIcons = [
    { Icon: Calculator, position: "top-[15%] left-[10%]", delay: 0, size: 40 },
    {
      Icon: TrendingUp,
      position: "top-[25%] right-[12%]",
      delay: 0.2,
      size: 36,
    },
    { Icon: FileText, position: "top-[50%] left-[8%]", delay: 0.4, size: 32 },
    { Icon: PieChart, position: "top-[60%] right-[10%]", delay: 0.6, size: 38 },
    { Icon: Wallet, position: "top-[35%] left-[15%]", delay: 0.8, size: 34 },
    { Icon: BarChart3, position: "top-[70%] left-[12%]", delay: 1, size: 36 },
    {
      Icon: CircleDollarSign,
      position: "top-[45%] right-[8%]",
      delay: 1.2,
      size: 40,
    },
  ];

  useEffect(() => {
    if (!startAnimation) return;

    const timeline = gsap.timeline({ delay: 0 });

    // Badge animation - apparition avec rotation
    timeline.fromTo(
      badgeRef.current,
      {
        opacity: 0,
        y: -30,
        scale: 0.8,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }
    );

    // Title animation - splits avec stagger
    timeline.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
        rotateX: 45,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // Description - glissement avec blur
    timeline.fromTo(
      descriptionRef.current,
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // Buttons - apparition fluide avec slide et blur
    timeline.fromTo(
      Array.from(buttonsRef.current?.children || []),
      {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Trust indicators - fade simple
    timeline.fromTo(
      trustRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Floating icons - apparition et animation continue
    iconsRef.current.forEach((icon, index) => {
      if (!icon) return;

      // Animation d'entrée
      gsap.fromTo(
        icon,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.5 + index * 0.1,
          ease: "back.out(2)",
        }
      );

      // Animation continue de flottement
      gsap.to(icon, {
        y: "-=20",
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });

      // Rotation subtile
      gsap.to(icon, {
        rotation: "+=10",
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.15,
      });

      // Pulsation de l'opacité
      gsap.to(icon, {
        opacity: 0.6,
        duration: 2 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1,
      });
    });

    return () => {
      timeline.kill();
      iconsRef.current.forEach((icon) => {
        if (icon) gsap.killTweensOf(icon);
      });
    };
  }, [startAnimation]);

  // Drag and drop pour les icônes flottantes
  useEffect(() => {
    if (!startAnimation) return;

    const cleanupFunctions: (() => void)[] = [];

    iconsRef.current.forEach((icon) => {
      if (!icon) return;

      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentX = 0;
      let currentY = 0;

      const handleMouseDown = (e: MouseEvent | TouchEvent) => {
        isDragging = true;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        startX = clientX - currentX;
        startY = clientY - currentY;
        
        // Arrêter les animations en cours
        gsap.killTweensOf(icon);
        
        // Changer le curseur et augmenter légèrement l'échelle
        icon.style.cursor = 'grabbing';
        gsap.to(icon, {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        
        e.preventDefault();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        currentX = clientX - startX;
        currentY = clientY - startY;
        
        gsap.set(icon, {
          x: currentX,
          y: currentY,
        });
      };

      const handleMouseUp = () => {
        if (!isDragging) return;
        
        isDragging = false;
        icon.style.cursor = 'grab';
        
        // Retour à la position initiale avec bounce
        gsap.to(icon, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Relancer les animations de flottement
            gsap.to(icon, {
              y: "-=20",
              duration: 2 + Math.random() * 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });

            gsap.to(icon, {
              rotation: "+=10",
              duration: 3 + Math.random() * 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });

            gsap.to(icon, {
              opacity: 0.6,
              duration: 2 + Math.random(),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        });
        
        currentX = 0;
        currentY = 0;
      };

      icon.style.cursor = 'grab';
      icon.style.userSelect = 'none';
      icon.addEventListener('mousedown', handleMouseDown as EventListener);
      icon.addEventListener('touchstart', handleMouseDown as EventListener);
      window.addEventListener('mousemove', handleMouseMove as EventListener);
      window.addEventListener('touchmove', handleMouseMove as EventListener, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);

      // Stocker la fonction de cleanup pour cette icône
      cleanupFunctions.push(() => {
        icon.removeEventListener('mousedown', handleMouseDown as EventListener);
        icon.removeEventListener('touchstart', handleMouseDown as EventListener);
        window.removeEventListener('mousemove', handleMouseMove as EventListener);
        window.removeEventListener('touchmove', handleMouseMove as EventListener);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
      });
    });

    // Cleanup global
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [startAnimation]);

  // Animations au hover des boutons
  useEffect(() => {
    const button1 = button1Ref.current;
    const button2 = button2Ref.current;
    const arrow1 = arrow1Ref.current;
    const arrow2 = arrow2Ref.current;

    if (!button1 || !button2) return;

    // Animation hover pour le bouton 1 (Devenir client)
    const handleButton1Enter = () => {
      if (!button1 || !arrow1) return;

      // Animation du texte
      gsap.to(button1.querySelector("span"), {
        x: -4,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animation de la flèche
      gsap.to(arrow1, {
        x: 8,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleButton1Leave = () => {
      if (!button1 || !arrow1) return;

      gsap.to(button1.querySelector("span"), {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(arrow1, {
        x: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Animation hover pour le bouton 2 (Découvrir nos offres)
    const handleButton2Enter = () => {
      if (!button2 || !arrow2) return;

      // Animation du texte avec un léger scale
      gsap.to(button2.querySelector("span"), {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animation de la flèche qui rebondit
      gsap.to(arrow2, {
        x: 6,
        rotation: -45,
        duration: 0.3,
        ease: "back.out(2)",
      });
    };

    const handleButton2Leave = () => {
      if (!button2 || !arrow2) return;

      gsap.to(button2.querySelector("span"), {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(arrow2, {
        x: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button1.addEventListener("mouseenter", handleButton1Enter);
    button1.addEventListener("mouseleave", handleButton1Leave);
    button2.addEventListener("mouseenter", handleButton2Enter);
    button2.addEventListener("mouseleave", handleButton2Leave);

    return () => {
      button1.removeEventListener("mouseenter", handleButton1Enter);
      button1.removeEventListener("mouseleave", handleButton1Leave);
      button2.removeEventListener("mouseenter", handleButton2Enter);
      button2.removeEventListener("mouseleave", handleButton2Leave);
    };
  }, []);

  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden hero-gradient min-h-[90vh] flex items-center">
      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-600 mb-8 opacity-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Cabinet d&apos;expertise comptable & audit
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-red-600 mb-6 leading-[1.1] opacity-0"
          >
            Pilotez votre <br />
            <span className="text-neutral-900">croissance.</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-neutral-500 font-light leading-relaxed mb-10 max-w-2xl mx-auto opacity-0"
          >
            HMCC transforme vos obligations comptables en opportunités
            stratégiques. Une approche moderne, digitale et humaine pour les
            entrepreneurs exigeants.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <Link
              ref={button1Ref}
              href="/contact"
              className="w-full sm:w-auto bg-red-600 text-white text-base font-medium px-8 py-3.5 rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-100/50 flex items-center justify-center gap-2 opacity-0 overflow-hidden"
            >
              <span className="inline-block">Devenir client</span>
              <div ref={arrow1Ref} className="inline-block">
                <ArrowRight size={20} />
              </div>
            </Link>
            <Link
              ref={button2Ref}
              href="/services"
              className="w-full sm:w-auto bg-white border border-neutral-200 text-neutral-900 text-base font-medium px-8 py-3.5 rounded-full hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 opacity-0 overflow-hidden"
            >
              <span className="inline-block">Découvrir nos offres</span>
              <div ref={arrow2Ref} className="inline-block">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            ref={trustRef}
            className="mt-16 pt-8 border-t border-neutral-100 flex items-center justify-center gap-8 opacity-0 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <span className="text-sm font-semibold tracking-tight text-neutral-400">
              Ordre des Experts-Comptables
            </span>
            <span className="text-sm font-semibold tracking-tight text-neutral-400">
              CNCC
            </span>
          </div>
        </div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => {
        const Icon = item.Icon;
        return (
          <div
            key={index}
            ref={(el) => {
              iconsRef.current[index] = el;
            }}
            className={`absolute ${item.position} hidden lg:block opacity-0`}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200 shadow-lg flex items-center justify-center text-red-600">
              <Icon size={item.size} strokeWidth={1.5} />
            </div>
          </div>
        );
      })}

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-40 -z-10"></div>
    </header>
  );
}
