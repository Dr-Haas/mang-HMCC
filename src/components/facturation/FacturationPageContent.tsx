"use client";

import {
  FileText,
  ArrowRight,
  Check,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Download,
  Upload,
  RefreshCw,
  Database,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { CONTACT_PHONE } from "@/app/lib/constants";
import BlobBackground from "@/components/decor/BlobBackground";

export function FacturationPageContent() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);
  const annotationsRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ctaLineRef = useRef<HTMLDivElement>(null);
  const ctaArrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;

      // Calculer l'opacité en fonction du scroll (commence à disparaître après 20% du scroll)
      const fadeStart = heroHeight * 0.2;
      const fadeEnd = heroHeight * 0.8;

      let opacity = 1;
      if (scrollY > fadeStart) {
        const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        opacity = Math.max(0, 1 - fadeProgress);
      }

      gsap.to(hero, {
        opacity: opacity,
        duration: 0.1,
        ease: "none",
      });

      // Effet locomotive scroll - déplace les textes horizontalement
      const scrollProgress = Math.min(scrollY / heroHeight, 1);

      // Configuration du déplacement pour chaque mot (direction d'où il vient)
      const wordScrollEffects = [
        { index: 0, direction: 1, intensity: 150 }, // Facturation → droite
        { index: 1, direction: -1, intensity: 150 }, // Électronique → gauche
        { index: 2, direction: 1, intensity: 100 }, // Obligatoire → droite
      ];

      wordScrollEffects.forEach(({ index, direction, intensity }) => {
        const wordElement = wordsRef.current[index];
        if (wordElement) {
          const xOffset = scrollProgress * intensity * direction;
          gsap.to(wordElement, {
            x: xOffset,
            duration: 0.1,
            ease: "none",
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation GSAP pour les mots qui apparaissent progressivement
  useEffect(() => {
    if (wordsRef.current.length === 0) return;

    const timeline = gsap.timeline();

    // Configuration des directions de slide pour chaque mot
    const wordAnimations = [
      { element: wordsRef.current[0], fromX: 100 }, // Facturation (droite → gauche)
      { element: wordsRef.current[1], fromX: -100 }, // Électronique (gauche → droite)
      { element: wordsRef.current[2], fromX: 50 }, // Obligatoire (droite → gauche)
    ];

    // Animer les mots principaux
    wordAnimations.forEach((anim, index) => {
      if (anim.element) {
        timeline.fromTo(
          anim.element.querySelector("h1, h2, h3"),
          {
            opacity: 0,
            x: anim.fromX,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          index * 0.25
        );

        // Animer l'annotation qui apparaît du bas après le mot
        const annotation = annotationsRef.current[index];
        if (annotation) {
          timeline.fromTo(
            annotation,
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            index * 0.25 + 0.4 // Commence 0.4s après le début du mot
          );
        }
      }
    });

    // Animer la description
    if (wordsRef.current[3]) {
      timeline.fromTo(
        wordsRef.current[3],
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
        0.9
      );
    }

    // Animation sophistiquée du CTA
    if (ctaRef.current && ctaLineRef.current && ctaArrowRef.current) {
      // Texte principal fade in + slide
      timeline.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
        },
        1.1
      );

      // Ligne qui se dessine de gauche à droite
      timeline.fromTo(
        ctaLineRef.current,
        {
          scaleX: 0,
          transformOrigin: "left",
        },
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        1.3
      );

      // Flèche qui slide de la gauche
      timeline.fromTo(
        ctaArrowRef.current,
        {
          opacity: 0,
          x: -10,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        1.4
      );
    }

    return () => {
      timeline.kill();
    };
  }, []);

  const timeline = [
    {
      date: "1er septembre 2026",
      title: "Réception obligatoire",
      description:
        "Toutes les entreprises doivent pouvoir recevoir des factures électroniques",
      audience: "Toutes entreprises",
      color: "red",
    },
    {
      date: "1er septembre 2026",
      title: "Émission - Grandes entreprises",
      description:
        "Les grandes entreprises et ETI doivent émettre des factures électroniques",
      audience: "GE & ETI",
      color: "violet",
    },
    {
      date: "1er septembre 2027",
      title: "Émission - PME & TPE",
      description:
        "Les PME, TPE et micro-entreprises doivent émettre des factures électroniques",
      audience: "PME, TPE & Micro",
      color: "blue",
    },
  ];

  const workflow = [
    {
      step: 1,
      title: "Émission",
      icon: Upload,
      description: "Votre entreprise émet une facture",
      color: "red",
    },
    {
      step: 2,
      title: "Plateforme Agréée",
      icon: RefreshCw,
      description: "Conversion et validation",
      color: "violet",
    },
    {
      step: 3,
      title: "Administration",
      icon: Database,
      description: "Transmission des données à la DGFiP",
      color: "blue",
    },
    {
      step: 4,
      title: "Réception",
      icon: Download,
      description: "Le client reçoit la facture",
      color: "emerald",
    },
  ];

  const differences = [
    {
      incorrect: "PDF envoyé par email",
      correct: "Facture normée (UBL, CII, Factur-X)",
    },
    {
      incorrect: "Facture papier scannée",
      correct: "Données structurées sécurisées",
    },
    {
      incorrect: "Envoi direct client",
      correct: "Transmission via Plateforme Agréée",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Gain de temps",
      description: "Automatisation de la saisie et des processus",
    },
    {
      icon: Shield,
      title: "Réduction des erreurs",
      description: "Données structurées et contrôles automatiques",
    },
    {
      icon: TrendingUp,
      title: "TVA pré-remplie",
      description: "Déclarations facilitées et gain de temps",
    },
    {
      icon: CheckCircle,
      title: "Conformité garantie",
      description: "Respect des obligations légales",
    },
  ];

  const faqs = [
    {
      question: "Un PDF envoyé par email suffit-il ?",
      answer:
        "Non. Un simple PDF ou une facture scannée n'est plus conforme. La facture doit être normée (UBL, CII ou Factur-X) et transmise via une Plateforme Agréée.",
    },
    {
      question: "Quelles nouvelles mentions sont obligatoires ?",
      answer:
        "En plus des mentions habituelles : n° SIREN fournisseur et client, date d'émission, adresse de livraison complète, nature de l'opération, identifiant de la PA.",
    },
    {
      question: "Qui est concerné par cette réforme ?",
      answer:
        "Toutes les entreprises assujetties à la TVA, quelle que soit leur taille : grandes entreprises, ETI, PME, TPE et micro-entrepreneurs.",
    },
    {
      question: "Qu'est-ce qu'une Plateforme Agréée (PA) ?",
      answer:
        "C'est un opérateur validé par l'administration fiscale qui assure l'émission, la transmission, la réception des factures et la transmission des données à la DGFiP.",
    },
    {
      question: "Quel est le coût de cette transition ?",
      answer:
        "Le coût varie selon votre volume de factures et la PA choisie. Il inclut l'abonnement à la PA, la formation des équipes et éventuellement l'audit préalable. C'est un investissement qui génère un ROI via l'automatisation.",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Audit de vos flux",
      description: "Analyse de vos processus actuels et besoins",
      icon: FileText,
    },
    {
      number: 2,
      title: "Choix de la PA",
      description: "Sélection de la plateforme adaptée à votre activité",
      icon: CheckCircle,
    },
    {
      number: 3,
      title: "Formation équipes",
      description: "Accompagnement et montée en compétences",
      icon: Users,
    },
    {
      number: 4,
      title: "Mise en conformité",
      description: "Déploiement et validation avant échéance",
      icon: Shield,
    },
  ];

  return (
    <div className="pt-20 relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-visible bg-transparent pointer-events-none z-10 h-[130vh]"
      >
        {/* Blob Background - Uniquement sur desktop */}
        <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
          <BlobBackground />
        </div>

        {/* Grid Container - En haut de la page, non centré */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20 md:pt-32">
          {/* Grid 12 colonnes desktop, simple sur mobile */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4">
            {/* Ligne 1 - Facturation avec annotation */}
            <div
              ref={(el) => {
                if (el) wordsRef.current[0] = el;
              }}
              className="col-span-1 md:col-start-5 md:col-span-7 pointer-events-auto relative text-center md:text-left ml-4 md:ml-0"
            >
              <div
                ref={(el) => {
                  if (el) annotationsRef.current[0] = el;
                }}
                className="absolute -top-6 md:-top-8 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 text-sm text-neutral-500 font-light"
              >
                Réforme 2026
              </div>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-medium text-neutral-900 leading-none">
                Facturation
              </h1>
            </div>

            {/* Ligne 2 - Électronique avec annotation */}
            <div
              ref={(el) => {
                if (el) wordsRef.current[1] = el;
              }}
              className="col-span-1 md:col-start-2 md:col-span-7 pointer-events-auto mt-6 md:mt-8 relative text-center md:text-left -ml-2 md:ml-0"
            >
              <div
                ref={(el) => {
                  if (el) annotationsRef.current[1] = el;
                }}
                className="absolute -top-6 md:-top-8 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 text-sm text-neutral-500 font-light"
              >
                Dématérialisation complète
              </div>
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-medium text-neutral-600 leading-none">
                Électronique
              </h2>
            </div>

            {/* Ligne 3 - Obligatoire avec annotation */}
            <div
              ref={(el) => {
                if (el) wordsRef.current[2] = el;
              }}
              className="col-span-1 md:col-start-6 md:col-span-6 pointer-events-auto mt-4 md:mt-6 relative text-center md:text-left mr-3 md:mr-0"
            >
              <div
                ref={(el) => {
                  if (el) annotationsRef.current[2] = el;
                }}
                className="absolute -top-6 md:-top-8 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 text-sm text-red-500 font-medium"
              >
                Toutes entreprises
              </div>
              <h3 className="text-4xl md:text-7xl lg:text-8xl font-medium text-red-600 leading-none">
                Obligatoire
              </h3>
            </div>

            {/* Ligne 4 - Description courte */}
            <div
              ref={(el) => {
                if (el) wordsRef.current[3] = el;
              }}
              className="col-span-1 md:col-start-6 md:col-span-6 pointer-events-auto mt-12 md:mt-16 text-center md:text-left px-4 md:px-0"
            >
              <p className="text-base md:text-lg lg:text-xl text-neutral-600 font-light leading-relaxed max-w-md mx-auto md:max-w-none md:mx-0">
                Préparez votre entreprise à la révolution de la facturation
                numérique
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button - Position absolue au-dessus du canvas */}
        <div className="absolute top-2/5 md:top-3/5 left-0 right-0 z-50 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="md:ml-[16.666%]">
              <Link
                ref={ctaRef}
                href="/contact"
                className="group inline-block relative"
                onMouseEnter={() => {
                  if (ctaArrowRef.current) {
                    gsap.to(ctaArrowRef.current, {
                      x: 5,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                  if (ctaLineRef.current) {
                    gsap.to(ctaLineRef.current, {
                      scaleX: 1.05,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                }}
                onMouseLeave={() => {
                  if (ctaArrowRef.current) {
                    gsap.to(ctaArrowRef.current, {
                      x: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                  if (ctaLineRef.current) {
                    gsap.to(ctaLineRef.current, {
                      scaleX: 1,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                }}
              >
                <span className="flex items-center gap-3 text-neutral-900 text-xl md:text-2xl font-light tracking-wide">
                  Être accompagné
                  <span ref={ctaArrowRef} className="inline-block">
                    <ArrowRight size={24} className="stroke-[1.5]" />
                  </span>
                </span>
                <div
                  ref={ctaLineRef}
                  className="h-[1px] bg-neutral-900 mt-2 origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Changes Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Ce qui change vraiment
            </h2>
            <p className="text-neutral-600 font-light text-lg max-w-2xl mx-auto">
              Une facture électronique n&apos;est pas un simple PDF. Voici les
              différences clés.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {differences.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Incorrect */}
                <div className="bg-white rounded-2xl p-6 border-2 border-red-100 relative">
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="text-red-600" size={20} />
                  </div>
                  <p className="text-neutral-500 text-sm mb-2">
                    ❌ Non conforme
                  </p>
                  <p className="text-lg font-medium text-neutral-900">
                    {diff.incorrect}
                  </p>
                </div>

                {/* Correct */}
                <div className="bg-white rounded-2xl p-6 border-2 border-green-100 relative">
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="text-green-600" size={20} />
                  </div>
                  <p className="text-neutral-500 text-sm mb-2">
                    ✅ Conforme 2026
                  </p>
                  <p className="text-lg font-medium text-neutral-900">
                    {diff.correct}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Le nouveau parcours de la facture
            </h2>
            <p className="text-neutral-600 font-light text-lg">
              Visualisez le flux automatisé de bout en bout
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connection lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-200 via-violet-200 via-blue-200 to-emerald-200 -translate-y-1/2 hidden md:block"></div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {workflow.map((step, index) => {
                const Icon = step.icon;
                const colorMap: Record<string, string> = {
                  red: "from-red-500 to-orange-500",
                  violet: "from-violet-500 to-purple-500",
                  blue: "from-blue-500 to-cyan-500",
                  emerald: "from-emerald-500 to-green-500",
                };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-xl">
                      {/* Step number badge */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>

                      {/* Icon with gradient */}
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                          colorMap[step.color]
                        } flex items-center justify-center mb-4 mx-auto`}
                      >
                        <Icon className="text-white" size={32} />
                      </div>

                      <h3 className="text-lg font-semibold text-neutral-900 mb-2 text-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-600 font-light text-center">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Calendrier de mise en œuvre
            </h2>
            <p className="text-neutral-600 font-light text-lg">
              Les dates clés à retenir pour être conforme
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((event, index) => {
              const colorMap: Record<
                string,
                { bg: string; text: string; border: string }
              > = {
                red: {
                  bg: "bg-red-50",
                  text: "text-red-600",
                  border: "border-red-200",
                },
                violet: {
                  bg: "bg-violet-50",
                  text: "text-violet-600",
                  border: "border-violet-200",
                },
                blue: {
                  bg: "bg-blue-50",
                  text: "text-blue-600",
                  border: "border-blue-200",
                },
              };
              const colors = colorMap[event.color];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-3xl p-8 border-2 ${colors.border} hover:shadow-xl transition-all`}
                >
                  <div
                    className={`inline-block px-4 py-2 ${colors.bg} ${colors.text} rounded-full text-sm font-semibold mb-6`}
                  >
                    {event.date}
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 font-light">
                    {event.description}
                  </p>
                  <div
                    className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-xs font-medium`}
                  >
                    {event.audience}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Pourquoi cette réforme ?
            </h2>
            <p className="text-neutral-600 font-light text-lg">
              Des bénéfices concrets pour votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:bg-white hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="text-red-600" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-600 font-light">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Notre accompagnement
            </h2>
            <p className="text-neutral-600 font-light text-lg">
              4 étapes pour une transition réussie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-3xl p-8 border-2 border-neutral-200 hover:border-red-200 hover:shadow-xl transition-all h-full">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg">
                      {step.number}
                    </div>
                    <Icon className="text-red-600 mb-4 mt-4" size={32} />
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 font-light">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="bg-red-600 text-white text-base font-medium px-10 py-4 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-200 inline-flex items-center gap-2"
            >
              Demander un audit gratuit
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-neutral-600 font-light text-lg">
              Tout ce que vous devez savoir sur la réforme
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight
                      className="text-red-600 transform rotate-90"
                      size={20}
                    />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: activeFaq === index ? "auto" : 0,
                    opacity: activeFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-neutral-600 font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-red-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white mb-8"
          >
            <AlertCircle size={16} />
            Anticipez dès maintenant
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6"
          >
            Prêt pour la facturation électronique ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-300 font-light leading-relaxed mb-10"
          >
            Notre cabinet vous accompagne pour auditer vos flux, choisir la
            meilleure plateforme et assurer votre conformité dans les délais.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white text-neutral-900 text-base font-medium px-10 py-4 rounded-full hover:bg-neutral-100 transition-all shadow-2xl inline-flex items-center justify-center gap-2"
            >
              Planifier un rendez-vous
              <ArrowRight size={20} />
            </Link>
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base font-medium px-10 py-4 rounded-full hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
            >
              {CONTACT_PHONE}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
