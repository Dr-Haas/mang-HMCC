"use client";

import Link from "next/link";
import { Briefcase, Users, Zap, Heart, TrendingUp, GraduationCap, Coffee, Rocket, Mail, ArrowRight, CheckCircle, Sparkles, Target, Brain, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function CarrierePageContent() {
  const values = [
    {
      icon: Heart,
      title: "Ambiance familiale",
      description: "Un cabinet à taille humaine où chacun compte et peut s'épanouir",
    },
    {
      icon: Rocket,
      title: "Innovation continue",
      description: "Des outils modernes, de l'IA et des processus digitalisés",
    },
    {
      icon: TrendingUp,
      title: "Évolution rapide",
      description: "Des opportunités de croissance et de développement de compétences",
    },
    {
      icon: Users,
      title: "Esprit d'équipe",
      description: "Une collaboration quotidienne dans un climat de confiance",
    },
  ];

  const profiles = [
    {
      title: "Alternants & Stagiaires",
      description: "Nous formons les talents de demain et accompagnons votre montée en compétences",
      icon: GraduationCap,
      tags: ["BTS CG", "DCG", "DSCG", "Master CCA"],
    },
    {
      title: "Jeunes diplômés",
      description: "Démarrez votre carrière dans un environnement stimulant et bienveillant",
      icon: Sparkles,
      tags: ["Collaborateur comptable", "Assistant audit", "Chargé de mission"],
    },
    {
      title: "Comptables confirmés",
      description: "Rejoignez une équipe d'experts et développez votre portefeuille clients",
      icon: Briefcase,
      tags: ["Chef de mission", "Responsable comptable", "Expert-comptable"],
    },
  ];

  const benefits = [
    { icon: Coffee, text: "Horaires flexibles & télétravail" },
    { icon: Brain, text: "Formation continue aux nouvelles technologies" },
    { icon: Globe, text: "Clients variés (startups, PME, international)" },
    { icon: Target, text: "Objectifs clairs et accompagnement personnalisé" },
    { icon: Zap, text: "Outils dernière génération (cloud, IA)" },
    { icon: Heart, text: "Événements team building réguliers" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white mb-8"
            >
              <Briefcase size={16} />
              Rejoignez-nous
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Construisez votre <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">carrière</span> avec nous
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-12"
            >
              Un cabinet moderne où l&apos;innovation rencontre l&apos;expertise humaine.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Nos valeurs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200 hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-neutral-600 font-light">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
              Profils recherchés
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {profiles.map((profile, index) => {
              const Icon = profile.icon;
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
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{profile.title}</h3>
                  <p className="text-neutral-600 font-light mb-6">{profile.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-neutral-100 rounded-full text-sm text-neutral-600">
                        {tag}
                      </span>
                    ))}
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
              Avantages & bénéfices
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:bg-white hover:shadow-xl transition-all"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="text-neutral-700 font-medium">{benefit.text}</span>
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
            Intéressé(e) par une carrière chez HMCC ?
          </h2>
          <p className="text-xl text-neutral-400 font-light leading-relaxed mb-10">
            Envoyez-nous votre CV et lettre de motivation. Nous vous recontacterons rapidement.
          </p>
          <Link
            href="/contact"
            className="bg-red-600 text-white text-base font-medium px-10 py-4 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-900/30 inline-flex items-center gap-2"
          >
            Candidater
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
