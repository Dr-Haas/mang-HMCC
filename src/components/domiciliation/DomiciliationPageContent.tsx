"use client";

import Link from "next/link";
import { MapPin, Shield, TrendingUp, Eye, Zap, Award, FileCheck, Users, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function DomiciliationPageContent() {
  const advantages = [
    {
      icon: TrendingUp,
      title: "Crédibilité renforcée",
      description: "Une adresse professionnelle qui inspire confiance à vos clients et partenaires",
    },
    {
      icon: Eye,
      title: "Vie privée préservée",
      description: "Pas d'utilisation de votre adresse personnelle pour votre activité professionnelle",
    },
    {
      icon: MapPin,
      title: "Localisation stratégique",
      description: "Une adresse prestigieuse à Arpajon pour votre développement",
    },
    {
      icon: Zap,
      title: "Services additionnels",
      description: "Gestion de courrier, location d'espace de travail, permanence téléphonique",
    },
  ];

  const trust = [
    {
      icon: Award,
      title: "Expertise reconnue",
      description: "Plus de 25 ans d'expérience dans l'accompagnement des entreprises",
    },
    {
      icon: FileCheck,
      title: "Agrément préfectoral",
      description: "Domiciliation d'entreprise conforme et sécurisée",
    },
    {
      icon: Users,
      title: "Solutions sur-mesure",
      description: "Des services adaptés à chaque projet et chaque profil",
    },
    {
      icon: Lock,
      title: "Confidentialité totale",
      description: "Conformité et protection de vos données garanties",
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
              <MapPin size={16} />
              Agrément préfectoral
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 mb-6 leading-[1.1]"
            >
              Domiciliation d&apos;entreprise <br />
              <span className="text-red-600">à Arpajon</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed mb-12"
            >
              Une solution professionnelle pour votre siège social avec services additionnels sur-mesure.
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
                Demander un devis
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Les avantages de la domiciliation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-neutral-200 hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{advantage.title}</h3>
                  <p className="text-neutral-600 font-light">{advantage.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Pourquoi nous faire confiance ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trust.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:bg-white hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 font-light">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Besoin d&apos;une domiciliation ?
          </h2>
          <p className="text-xl text-neutral-400 font-light leading-relaxed mb-10">
            Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
          <Link
            href="/contact"
            className="bg-red-600 text-white text-base font-medium px-10 py-4 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-900/30 inline-flex items-center gap-2"
          >
            Nous contacter
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
