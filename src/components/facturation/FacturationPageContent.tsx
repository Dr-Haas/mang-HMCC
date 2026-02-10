"use client";

import { FileText, ArrowRight, Check, X, CheckCircle, AlertCircle, Calendar, Users, Zap, Shield, TrendingUp, Download, Upload, RefreshCw, Database } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { CONTACT_PHONE } from "@/app/lib/constants";

export function FacturationPageContent() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const timeline = [
    {
      date: "1er septembre 2026",
      title: "Réception obligatoire",
      description: "Toutes les entreprises doivent pouvoir recevoir des factures électroniques",
      audience: "Toutes entreprises",
      color: "red",
    },
    {
      date: "1er septembre 2026",
      title: "Émission - Grandes entreprises",
      description: "Les grandes entreprises et ETI doivent émettre des factures électroniques",
      audience: "GE & ETI",
      color: "violet",
    },
    {
      date: "1er septembre 2027",
      title: "Émission - PME & TPE",
      description: "Les PME, TPE et micro-entreprises doivent émettre des factures électroniques",
      audience: "PME, TPE & Micro",
      color: "blue",
    },
  ];

  const workflow = [
    { step: 1, title: "Émission", icon: Upload, description: "Votre entreprise émet une facture", color: "red" },
    { step: 2, title: "Plateforme Agréée", icon: RefreshCw, description: "Conversion et validation", color: "violet" },
    { step: 3, title: "Administration", icon: Database, description: "Transmission des données à la DGFiP", color: "blue" },
    { step: 4, title: "Réception", icon: Download, description: "Le client reçoit la facture", color: "emerald" },
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
      answer: "Non. Un simple PDF ou une facture scannée n'est plus conforme. La facture doit être normée (UBL, CII ou Factur-X) et transmise via une Plateforme Agréée.",
    },
    {
      question: "Quelles nouvelles mentions sont obligatoires ?",
      answer: "En plus des mentions habituelles : n° SIREN fournisseur et client, date d'émission, adresse de livraison complète, nature de l'opération, identifiant de la PA.",
    },
    {
      question: "Qui est concerné par cette réforme ?",
      answer: "Toutes les entreprises assujetties à la TVA, quelle que soit leur taille : grandes entreprises, ETI, PME, TPE et micro-entrepreneurs.",
    },
    {
      question: "Qu'est-ce qu'une Plateforme Agréée (PA) ?",
      answer: "C'est un opérateur validé par l'administration fiscale qui assure l'émission, la transmission, la réception des factures et la transmission des données à la DGFiP.",
    },
    {
      question: "Quel est le coût de cette transition ?",
      answer: "Le coût varie selon votre volume de factures et la PA choisie. Il inclut l'abonnement à la PA, la formation des équipes et éventuellement l'audit préalable. C'est un investissement qui génère un ROI via l'automatisation.",
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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-sm font-medium text-red-600 mb-8"
            >
              <Calendar size={16} />
              Obligatoire dès septembre 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 mb-6 leading-[1.1]"
            >
              Du papier au numérique : <br />
              <span className="text-red-600">la facture change</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed mb-12"
            >
              La facturation électronique devient obligatoire pour toutes les entreprises françaises. Découvrez comment vous préparer à cette révolution digitale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-red-600 text-white text-base font-medium px-8 py-3.5 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-100/50 flex items-center justify-center gap-2"
              >
                Être accompagné
                <ArrowRight size={20} />
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById("faq");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto bg-white border-2 border-neutral-200 text-neutral-900 text-base font-medium px-8 py-3.5 rounded-full hover:bg-neutral-50 transition-all flex items-center justify-center gap-2"
              >
                Questions fréquentes
              </button>
            </motion.div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-red-50 to-transparent blur-3xl opacity-50 -z-10"></div>
      </section>

      {/* What Changes Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Ce qui change vraiment
            </h2>
            <p className="text-neutral-600 font-light text-lg max-w-2xl mx-auto">
              Une facture électronique n&apos;est pas un simple PDF. Voici les différences clés.
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
                  <p className="text-neutral-500 text-sm mb-2">❌ Non conforme</p>
                  <p className="text-lg font-medium text-neutral-900">{diff.incorrect}</p>
                </div>

                {/* Correct */}
                <div className="bg-white rounded-2xl p-6 border-2 border-green-100 relative">
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="text-green-600" size={20} />
                  </div>
                  <p className="text-neutral-500 text-sm mb-2">✅ Conforme 2026</p>
                  <p className="text-lg font-medium text-neutral-900">{diff.correct}</p>
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
            <p className="text-neutral-600 font-light text-lg">Visualisez le flux automatisé de bout en bout</p>
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
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[step.color]} flex items-center justify-center mb-4 mx-auto`}>
                        <Icon className="text-white" size={32} />
                      </div>

                      <h3 className="text-lg font-semibold text-neutral-900 mb-2 text-center">{step.title}</h3>
                      <p className="text-sm text-neutral-600 font-light text-center">{step.description}</p>
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
            <p className="text-neutral-600 font-light text-lg">Les dates clés à retenir pour être conforme</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((event, index) => {
              const colorMap: Record<string, { bg: string; text: string; border: string }> = {
                red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
                violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
                blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
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
                  <div className={`inline-block px-4 py-2 ${colors.bg} ${colors.text} rounded-full text-sm font-semibold mb-6`}>
                    {event.date}
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-3">{event.title}</h3>
                  <p className="text-neutral-600 mb-4 font-light">{event.description}</p>
                  <div className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-xs font-medium`}>
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
            <p className="text-neutral-600 font-light text-lg">Des bénéfices concrets pour votre entreprise</p>
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
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-neutral-600 font-light">{benefit.description}</p>
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
            <p className="text-neutral-600 font-light text-lg">4 étapes pour une transition réussie</p>
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
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">{step.title}</h3>
                    <p className="text-neutral-600 font-light">{step.description}</p>
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
            <p className="text-neutral-600 font-light text-lg">Tout ce que vous devez savoir sur la réforme</p>
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
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-neutral-900 pr-4">{faq.question}</span>
                  <motion.div animate={{ rotate: activeFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ArrowRight className="text-red-600 transform rotate-90" size={20} />
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
                  <div className="px-6 pb-6 text-neutral-600 font-light leading-relaxed">{faq.answer}</div>
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
            Notre cabinet vous accompagne pour auditer vos flux, choisir la meilleure plateforme et assurer votre conformité dans les délais.
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
