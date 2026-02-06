"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * Section 4 – Titre + 3 cartes + Nos compétences (Figma Home_Page_4).
 * Icônes 3D : documents (copy), bulle chat, bouclier. Formes décoratives : carrés rose/gris.
 */
const cards = [
  {
    title: "Gérez votre comptabilité simplement",
    description:
      "Suivez vos opérations, vos factures et vos justificatifs en toute simplicité grâce à un accompagnement structuré et clair.",
    iconSrc: "/images/homepage-section4/copy.png",
  },
  {
    title: "Bénéficiez de conseils personnalisés",
    description:
      "Recevez des recommandations adaptées à votre activité et prenez des décisions éclairées tout au long de l'année.",
    iconSrc: "/images/homepage-section4/chat.png",
  },
  {
    title: "Restez conforme en toute sérénité",
    description:
      "Nous gérons vos déclarations fiscales, sociales et légales afin que votre entreprise soit toujours à jour, sans stress.",
    iconSrc: "/images/homepage-section4/shield.png",
  },
];

export function TitreEtCompetencesSection() {
  return (
    <section id="competences" className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
          Titre
        </h2>
        <p className="mt-3 max-w-3xl text-[#2a2a2a]/80">
          Suivez vos opérations, vos factures et vos justificatifs en toute
          simplicité grâce à un accompagnement structuré et clair.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {cards.map((card) => (
            <div className="flex flex-col items-center justify-center">
              <article
              key={card.title}
              className="flex flex-col items-center justify-center rounded-2xl border border-[#2a2a2a]/10 bg-[#f5f5f5]/80 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] w-full"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl">
                <div className="flex items-center justify-center">
                  <Image
                    src={card.iconSrc}
                    alt=""
                    width={80}
                    height={80}
                    className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                    unoptimized
                  />
                </div>
              </div>
            </article>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-[#2a2a2a]">{card.title}</h3>
              <p className="mt-3 text-[#2a2a2a]/80">{card.description}</p>
            </div>
            </div>
          ))}
        </div>

        {/* Bas de section : carrés décoratifs en bas à gauche, bloc Nos compétences en bas à droite (comme sur la maquette) */}
        <div className="mt-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-36 lg:h-36 lg:w-44" aria-hidden>
            <span className="absolute inset-0 z-[3] rounded-lg bg-[#f5c6cb] shadow-sm" style={{ transform: "rotate(-6deg)" }} />
            <span className="absolute inset-0 z-[2] rounded-lg bg-[#e5e5e5] shadow-sm" style={{ transform: "rotate(3deg) translate(20px, 16px)" }} />
            <span className="absolute inset-0 z-[1] rounded-lg bg-[#9ca3af] shadow-sm" style={{ transform: "rotate(0deg) translate(40px, 32px)" }} />
          </div>
          <div className="max-w-md lg:ml-auto lg:text-right">
            <div className="lg:inline-block lg:text-left">
              <span className="inline-block rounded-md border border-[#2a2a2a]/25 bg-white px-3 py-1 text-sm text-[#2a2a2a]">
                Texte
              </span>
              <h3 className="mt-3 text-2xl font-bold text-[#2a2a2a]">
                Nos compétences
              </h3>
              <p className="mt-2 text-[#2a2a2a]/80">
                Création des bulletins, déclarations sociales, accompagnement RH :
                nous sécurisons chaque étape pour garantir une paie fiable, ponctuelle
                et conforme.
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-[#2563eb] font-medium hover:underline"
              >
                Voir nos compétences →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
