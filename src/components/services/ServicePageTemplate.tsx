"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Check,
  Calculator,
  TrendingUp,
  Users,
  FileText,
  Scale,
  Briefcase,
} from "lucide-react";
import type { ServiceData, ServiceIconId } from "@/lib/services-data";
import { PageCTASection } from "@/components/PageCTASection";

const ICON_MAP: Record<
  ServiceIconId,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  calculator: Calculator,
  "trending-up": TrendingUp,
  users: Users,
  "file-text": FileText,
  scale: Scale,
  briefcase: Briefcase,
};

interface ServicePageTemplateProps {
  service: ServiceData;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const Icon = ICON_MAP[service.iconId];

  return (
    <div>
      {/* Fil d'Ariane */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-red-600 transition-colors"
        >
          <ChevronLeft size={16} />
          Retour aux services
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 ${service.bgColor} border-neutral-200`}
            >
              <Icon size={16} className={service.iconColor} />
              <span className={`text-sm font-medium ${service.iconColor}`}>
                {service.tagline}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl typography-hero-title text-neutral-900 mb-6"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl typography-hero-desc text-neutral-600 max-w-3xl mx-auto mb-8"
            >
              {service.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl bg-neutral-50 border border-neutral-200 px-6 py-4 inline-block"
            >
              <p className="text-sm typography-hero-label text-neutral-500 mb-1">
                Notre mission
              </p>
              <p className="text-neutral-900 font-medium">{service.mission}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sections de contenu */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            {service.sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-neutral-200"
              >
                <h2 className="text-2xl md:text-3xl typography-section-title text-neutral-900 mb-2">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className="text-neutral-500 typography-hero-desc mb-6">
                    {section.subtitle}
                  </p>
                )}

                {section.items && section.items.length > 0 ? (
                  <ul className="space-y-3 mb-8">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-neutral-600 typography-hero-desc"
                      >
                        <Check
                          className={`flex-shrink-0 mt-1 ${service.iconColor}`}
                          size={18}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.subSections?.map((subSection, subIndex) => (
                  <div
                    key={subIndex}
                    className={`${section.items && section.items.length > 0 ? "mt-8 pt-8 border-t border-neutral-100" : subIndex > 0 ? "mt-8 pt-8 border-t border-neutral-100" : ""}`}
                  >
                    <h3 className="text-lg md:text-xl typography-section-title text-neutral-900 mb-4">
                      {subSection.title}
                    </h3>
                    <ul className="space-y-3">
                      {subSection.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-neutral-600 typography-hero-desc"
                        >
                          <Check
                            className={`flex-shrink-0 mt-1 ${service.iconColor}`}
                            size={18}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi choisir HMCC */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl typography-section-title text-red-600 mb-4">
              Pourquoi choisir HMCC ?
            </h2>
            <p className="text-neutral-500 typography-hero-desc text-lg max-w-2xl mx-auto">
              Un cabinet structuré, des compétences reconnues et une approche
              personnalisée.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.whyChoose.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${service.bgColor}`}
                >
                  <Check className={service.iconColor} size={20} />
                </div>
                <p className="text-neutral-700 font-medium">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* Notre promesse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center max-w-2xl mx-auto"
          >
            <p className="text-sm typography-hero-label text-neutral-500 mb-4">
              Notre engagement
            </p>
            <div className="space-y-2">
              {service.promise.map((line, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl typography-hero-desc text-neutral-700"
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTASection
        title={`Prêt à en savoir plus sur notre ${service.title.toLowerCase()} ?`}
        description="Discutons de vos besoins et découvrez comment nous pouvons vous accompagner."
        buttonLabel="Nous contacter"
      />
    </div>
  );
}
