"use client";

import Image from "next/image";

const NAV_REPEAT = 7;
const ACTIVE_INDEX = 3;

const SECTION_TITLE = "Titre";
const SECTION_DESCRIPTION =
  "Suivez vos opérations, vos factures et vos justificatifs en toute simplicité grâce à un accompagnement structuré et clair.";

const CARD_TITLE = "Gérez votre comptabilité simplement";
const CARD_DESCRIPTION =
  "Suivez vos opérations, vos factures et vos justificatifs en toute simplicité grâce à un accompagnement structuré et clair.";

const TAGLINE =
  "Une approche humaine, une expertise fiable, des solutions adaptées.";

const CARD_ASSETS = {
  bell: "/images/services/bell-dynamic-color.png",
  "magnifying-glass": "/images/services/zoom-dynamic-color.png",
  calendar: "/images/services/calendar-dynamic-color.png",
} as const;

const CARDS = [
  {
    bg: "bg-[#2a2a2a]",
    textClass: "text-white",
    descClass: "text-white/90",
    icon: "bell",
  },
  {
    bg: "bg-[#7a2d2d]",
    textClass: "text-white",
    descClass: "text-white/90",
    icon: "magnifying-glass",
  },
  {
    bg: "bg-[#f5f0e8]",
    textClass: "text-[#2a2a2a]",
    descClass: "text-[#2a2a2a]/85",
    icon: "calendar",
  },
] as const;

export function ServicesSection3() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8 min-h-[100vh]">

      <div className="mx-auto max-w-5xl">
        {/* Titre + description + icône décorative en haut à droite */}
        <div className="relative">
          <h2 className="text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
            {SECTION_TITLE}
          </h2>
          <p className="mt-3 max-w-2xl text-[#2a2a2a]/85">
            {SECTION_DESCRIPTION}
          </p>
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 hidden sm:block">
            <Image
              src="/images/homepage-section2/file-text.png"
              alt=""
              width={56}
              height={56}
              className="w-full h-full object-contain opacity-90"
              unoptimized
            />
          </div>
        </div>

        {/* Trois cartes : plus fines, asset centré dans sa colonne */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {CARDS.map((card) => (
            <article
              key={card.icon}
              className={`${card.bg} rounded-2xl px-4 py-5 sm:px-5 sm:py-5 flex gap-3 sm:gap-4 items-stretch min-h-0`}
            >
              {/* Colonne asset : justify-center + items-center pour centrer l'icône */}
              <div className="flex flex-col justify-center items-center shrink-0 w-14 sm:w-16">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12">
                  <Image
                    src={CARD_ASSETS[card.icon]}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="48px"
                    unoptimized
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center py-0.5">
                <h3
                  className={`text-base font-bold ${card.textClass} sm:text-medium leading-tight`}
                >
                  {CARD_TITLE}
                </h3>
                <p className={`mt-1 text-xs ${card.descClass} leading-relaxed sm:text-sm`} style={{fontSize: "10px"}}>
                  {CARD_DESCRIPTION}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Tagline avec mots en rouge + icône puzzle en bas à gauche */}
        <div className="mt-14 sm:mt-16 flex items-end gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 opacity-90">
            <Image
              src="/images/homepage-section2/puzzle.png"
              alt=""
              width={48}
              height={48}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
          <p className="text-xl font-bold text-[#2a2a2a] sm:text-2xl max-w-3xl pb-1">
            {TAGLINE.split(/(humaine|fiable|adaptées)/).map((part, i) =>
              ["humaine", "fiable", "adaptées"].includes(part) ? (
                <span key={i} className="text-[#e61d2b]">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
