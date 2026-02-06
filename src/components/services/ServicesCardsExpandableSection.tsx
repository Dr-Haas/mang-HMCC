"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Mêmes images que la section 5 de la homepage.
 */
const CARD_IMAGES = [
  "/images/homepage-section5/Rectangle 92.png",
  "/images/homepage-section5/Rectangle 93.png",
  "/images/homepage-section5/Rectangle 94.png",
  "/images/homepage-section5/Rectangle 95.png",
  "/images/homepage-section5/Rectangle 96.png",
];

const SERVICE_CARDS = [
  {
    tag: "Fiscalité",
    tagSecondary: "Optimisation",
    stat1: "+120 Tableaux de bord actifs",
    stat2: "Mises à jour quotidiennes",
    label: "Pilotage d'Activité",
    description:
      "Pilotage de votre activité avec tableaux de bord, indicateurs et mises à jour régulières pour une vision claire de votre performance.",
    href: "/contact",
  },
  {
    tag: "Fiscalité",
    tagSecondary: "Optimisation",
    stat1: "200+ Dossiers gérés",
    stat2: "Suivi en continu",
    label: "Comptabilité Générale",
    description:
      "Tenue de comptes, enregistrement des écritures, rapprochements bancaires. Clôture annuelle et déclarations fiscales (TVA, impôts, liasse) pour rester en conformité en toute sérénité.",
    href: "/contact",
  },
  {
    tag: "Fiscalité",
    tagSecondary: "Optimisation",
    stat1: "9000+ fiches de paie annuelles",
    stat2: "Taux d'erreur 0%",
    label: "Gestion de Paie",
    description:
      "Gestion de la paie, bulletins, déclarations sociales et obligations employeur. Un interlocuteur dédié pour l'administratif du personnel.",
    href: "/contact",
  },
  {
    tag: "Fiscalité",
    stat1: "190 Entreprises créées et accompagnées",
    stat2: "Accompagnement créateurs",
    label: "Création d'Entreprise",
    description:
      "Montage du dossier de création, choix du statut (SARL, SAS, auto-entrepreneur…), rédaction des statuts et accompagnement jusqu'à l'immatriculation.",
    href: "/contact",
  },
  {
    tag: "Fiscalité",
    tagSecondary: "Optimisation",
    stat1: "Optimisation de 12% en moyenne",
    stat2: "500+ Déclarations suivies",
    label: "Conseil Fiscal",
    description:
      "Stratégie fiscale, optimisation de la structure et accompagnement dans vos décisions. Anticipation et choix des options les plus adaptées à votre activité.",
    href: "/contact",
  },
];

const NAV_REPEAT = 7;
const ACTIVE_INDEX = 3;

const CARD_WIDTH = 200;
const CARD_HEIGHT = 280;
const CARD_OVERLAP = 56;
const DRAWER_WIDTH = 320;

function CardContent({
  card,
  index,
  isSelected,
  isHovered,
  onClick,
}: {
  card: (typeof SERVICE_CARDS)[0];
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative flex-shrink-0 overflow-hidden rounded-2xl text-left
        transition-all duration-300 ease-out
        ${isSelected ? "z-20 scale-[1.02] shadow-xl ring-2 ring-[#e61d2b]" : ""}
        ${!isSelected && isHovered ? "scale-[1.02] shadow-xl opacity-100" : ""}
        ${!isSelected && !isHovered ? "z-0 opacity-90" : ""}
      `}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      <div className="absolute inset-0">
        <Image
          src={CARD_IMAGES[index]}
          alt=""
          fill
          className="object-cover"
          sizes="220px"
          unoptimized
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
      <div className="absolute inset-0 bg-[#2a2a2a]/50" />
      <div className="relative flex h-full flex-col justify-between p-5 text-white">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-white/25 px-2.5 py-1 text-xs">
            {card.tag}
          </span>
          {card.tagSecondary && (
            <span className="rounded-full bg-white/25 px-2.5 py-1 text-xs">
              {card.tagSecondary}
            </span>
          )}
        </div>
        <div>
          <p className="text-xs text-white/80">{card.stat1}</p>
          <p className="text-xs text-white/70">{card.stat2}</p>
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                isSelected ? "border-white bg-white" : "border-white"
              }`}
            />
            <span className="text-sm font-medium truncate">{card.label}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function ServicesCardsExpandableSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? SERVICE_CARDS[selectedIndex] : null;
  const leftCards = selectedIndex !== null ? SERVICE_CARDS.slice(0, selectedIndex) : [];
  const rightCards = selectedIndex !== null ? SERVICE_CARDS.slice(selectedIndex + 1) : [];

  const handleCardClick = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8 min-h-[100vh]">
      {/* Barre "Services" répété */}

      <div className="mx-auto max-w-6xl overflow-x-auto overflow-y-visible pb-4 scrollbar-thin -mt-6">
        <div className="flex items-start justify-center gap-0 min-w-max lg:min-w-0 relative" style={{ minHeight: CARD_HEIGHT }}>
          {/* État fermé : toutes les cartes en une rangée entassée */}
          {selectedIndex === null && (
            <div className="flex flex-shrink-0 items-start">
              {SERVICE_CARDS.map((card, i) => (
                <div
                  key={card.label}
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    marginLeft: i === 0 ? 0 : -CARD_OVERLAP,
                    zIndex: hoveredIndex === i ? 50 : i,
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CardContent
                    card={card}
                    index={i}
                    isSelected={false}
                    isHovered={hoveredIndex === i}
                    onClick={() => handleCardClick(i)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* État ouvert : gauche | centre (au-dessus) | droite */}
          {selectedIndex !== null && selected && (
            <>
              {/* Gauche : cartes avant la sélectionnée, entassées (derrière) */}
              <div
                className="flex flex-shrink-0 items-start relative"
                style={{ marginRight: -CARD_OVERLAP, zIndex: 1 }}
              >
                {leftCards.map((card, i) => (
                  <div
                    key={card.label}
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{
                      marginLeft: i === 0 ? 0 : -CARD_OVERLAP,
                      zIndex: hoveredIndex === i ? 10 : 0,
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <CardContent
                      card={card}
                      index={i}
                      isSelected={false}
                      isHovered={hoveredIndex === i}
                      onClick={() => handleCardClick(i)}
                    />
                  </div>
                ))}
              </div>

              {/* Centre : carte sélectionnée + tiroir — au premier plan */}
              <div
                className="flex flex-shrink-0 items-start relative z-[100]"
                style={{
                  marginLeft: leftCards.length > 0 ? -CARD_OVERLAP : 0,
                }}
              >
                <div className="flex-shrink-0 transition-transform duration-300">
                  <CardContent
                    card={selected}
                    index={selectedIndex}
                    isSelected
                    isHovered={false}
                    onClick={() => handleCardClick(selectedIndex)}
                  />
                </div>
                {/* Tiroir : sort de la carte vers la droite */}
                <div
                  className="flex-shrink-0 rounded-r-2xl bg-[#fdf2f2] shadow-xl border border-l-0 border-[#2a2a2a]/10 flex flex-col justify-between overflow-hidden transition-all duration-300"
                  style={{
                    width: DRAWER_WIDTH,
                    height: CARD_HEIGHT,
                  }}
                >
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-[#2a2a2a]">
                      {selected.label}
                    </h3>
                    <p className="mt-3 text-sm text-[#2a2a2a]/85 leading-relaxed line-clamp-4">
                      {selected.description}
                    </p>
                    <p className="mt-2 text-xs text-[#2a2a2a]/75">
                      {selected.stat1} · {selected.stat2}
                    </p>
                  </div>
                  <div className="p-5 pt-0 flex justify-end">
                    <Link
                      href={selected.href}
                      className="inline-flex items-center justify-center rounded-xl bg-[#b81a25] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#9a1620]"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>

              {/* Droite : cartes après la sélectionnée, entassées (derrière) */}
              <div
                className="flex flex-shrink-0 items-start relative"
                style={{
                  marginLeft: -CARD_OVERLAP,
                  zIndex: 1,
                }}
              >
                {rightCards.map((card, i) => {
                  const globalIndex = selectedIndex + 1 + i;
                  return (
                    <div
                      key={card.label}
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{
                        marginLeft: -CARD_OVERLAP,
                        zIndex: hoveredIndex === globalIndex ? 10 : 0,
                      }}
                      onMouseEnter={() => setHoveredIndex(globalIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <CardContent
                        card={card}
                        index={globalIndex}
                        isSelected={false}
                        isHovered={hoveredIndex === globalIndex}
                        onClick={() => handleCardClick(globalIndex)}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
