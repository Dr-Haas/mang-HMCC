"use client";

import { Calculator, Users, Scale, TrendingUp, FileText, Briefcase, Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { UnicornHeaderScene } from "@/components/decor/UnicornHeaderScene";

export function ServicesPageContent() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: Calculator,
      title: "Comptabilité & Gestion Fiscale",
      tagline: "Automatisez votre comptabilité",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      description: "Tenue de comptabilité rigoureuse, établissement des bilans et compte de résultat.",
      features: [
        "Tenue comptable complète automatisée",
        "Bilans et comptes de résultat en temps réel",
        "Liasses fiscales dématérialisées",
        "Déclarations fiscales et sociales",
        "Optimisation fiscale personnalisée",
        "Tableaux de bord interactifs",
      ],
    },
    {
      icon: TrendingUp,
      title: "Conseil Fiscal & Optimisation",
      tagline: "Maximisez votre rentabilité",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      iconColor: "text-violet-600",
      description: "Stratégies personnalisées pour optimiser votre fiscalité en toute légalité.",
      features: [
        "Analyse approfondie de votre situation",
        "Simulation d'optimisation fiscale",
        "Stratégies d'investissement sur-mesure",
        "Accompagnement à la transmission",
        "Restructuration intelligente",
        "Veille fiscale et alertes automatiques",
      ],
    },
    {
      icon: Users,
      title: "Paie & Gestion Sociale",
      tagline: "Simplifiez vos RH",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      description: "Externalisation complète de votre gestion de paie et obligations sociales.",
      features: [
        "Bulletins de paie digitaux",
        "Déclarations sociales automatiques (DSN)",
        "Contrats de travail personnalisés",
        "Gestion intelligente des congés",
        "Audit social préventif",
        "Portail RH pour vos salariés",
      ],
    },
    {
      icon: FileText,
      title: "Audit & Commissariat",
      tagline: "Sécurisez vos comptes",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      description: "Missions légales et contractuelles de certification des comptes.",
      features: [
        "Commissariat aux comptes légal",
        "Audit d'acquisition digital",
        "Due diligence approfondie",
        "Certification des comptes",
        "Rapports de gestion interactifs",
        "Analyse de risques",
      ],
    },
    {
      icon: Scale,
      title: "Conseil Juridique",
      tagline: "Sécurisez votre structure",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      description: "Accompagnement dans toutes les démarches juridiques de votre entreprise.",
      features: [
        "Création de société clé en main",
        "Secrétariat juridique digitalisé",
        "Modifications statutaires rapides",
        "Assemblées générales dématérialisées",
        "Cession d'entreprise accompagnée",
        "Veille juridique permanente",
      ],
    },
    {
      icon: Briefcase,
      title: "Création d'Entreprise",
      tagline: "Lancez-vous sereinement",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      description: "Accompagnement complet dans votre projet de création d'entreprise.",
      features: [
        "Choix optimal de la structure",
        "Business plan et prévisionnels interactifs",
        "Formalités 100% en ligne",
        "Démarches administratives simplifiées",
        "Domiciliation professionnelle",
        "Mentorat post-création (1 an)",
      ],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          <UnicornHeaderScene width="100%" height="100%" />
          <div className="absolute inset-0 bg-neutral-950/35" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white/90 mb-8"
            >
              <Sparkles size={16} className="text-red-400" />
              Innovation & Expertise comptable
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 leading-[1.15]"
            >
              Des services nouvelle <br />
              <span className="bg-gradient-to-r from-red-300 to-red-100 bg-clip-text text-transparent">génération</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-2xl text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto"
            >
              Technologie de pointe et expertise humaine pour transformer votre gestion comptable
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="bg-white text-neutral-900 text-base font-medium px-10 py-4 rounded-full hover:bg-neutral-100 transition-all shadow-2xl inline-flex items-center gap-2"
              >
                Démarrer maintenant
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeService === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setActiveService(index)}
                  className="relative group cursor-pointer"
                >
                  <div
                    className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-500 border ${
                      isActive
                        ? "bg-white shadow-2xl shadow-neutral-200/50 scale-105 border-neutral-200"
                        : "bg-neutral-50 hover:bg-white border-neutral-100 hover:shadow-xl"
                    }`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    {/* Animated icon */}
                    <motion.div
                      animate={isActive ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                        isActive ? service.bgColor : "bg-white border border-neutral-200"
                      }`}
                    >
                      <Icon className={`${service.iconColor} transition-all duration-300 ${isActive ? "scale-110" : ""}`} size={32} strokeWidth={1.5} />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">{service.tagline}</div>
                      <h3 className="text-2xl font-semibold text-neutral-900 mb-3 tracking-tight">{service.title}</h3>
                      <p className="text-neutral-600 text-sm font-light leading-relaxed mb-6">{service.description}</p>

                      {/* Features list */}
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.6, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex items-start gap-2 text-sm text-neutral-700"
                          >
                            <Check className={`flex-shrink-0 mt-0.5 ${service.iconColor}`} size={16} />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Arrow indicator */}
                      <motion.div animate={isActive ? { x: 5 } : { x: 0 }}>
                        <Link
                          href="/contact"
                          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 group-hover:text-red-600 transition-colors"
                        >
                          En savoir plus
                          <ArrowRight size={16} />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Feature Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4"
            >
              Une technologie au service de votre réussite
            </motion.h2>
            <p className="text-neutral-500 font-light text-lg max-w-2xl mx-auto">
              Nos outils digitaux vous permettent de piloter votre entreprise en temps réel
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Dashboard en temps réel", description: "Visualisez vos KPI instantanément", icon: "📊" },
              { title: "IA & Automatisation", description: "Scan automatique de vos factures", icon: "🤖" },
              { title: "Mobile First", description: "Accédez à vos données partout", icon: "📱" },
              { title: "Sécurité bancaire", description: "Cryptage et protection maximale", icon: "🔒" },
              { title: "Collaboration", description: "Échangez avec votre expert en direct", icon: "💬" },
              { title: "Reporting avancé", description: "Rapports personnalisables et exports", icon: "📈" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600 font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-900 via-red-900 to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6"
          >
            Prêt à moderniser votre comptabilité ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-300 font-light leading-relaxed mb-10"
          >
            Discutons de vos besoins et découvrez comment notre approche tech peut transformer votre gestion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="bg-white text-neutral-900 text-base font-medium px-10 py-4 rounded-full hover:bg-neutral-100 transition-all shadow-2xl inline-flex items-center gap-2"
            >
              Démarrer maintenant
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
