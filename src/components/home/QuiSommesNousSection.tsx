"use client";

import Image from "next/image";

/* Coordonnées précises (image de référence) : étoile/drapeau au-dessus de "Proches de vous", documents, puzzle, carte, compas à droite ; cadenas à gauche. Effet floating via .section2-asset-float */
const SECTION2_ICONS = [
  { src: "/images/homepage-section2/star.png", alt: "", position: "top-[8%] right-[18%]", size: "w-12 h-12 sm:w-12 sm:h-12" },
  { src: "/images/homepage-section2/flag.png", alt: "", position: "top-[2%] right-[10%]", size: "w-12 h-12 sm:w-11 sm:h-11" },
  { src: "/images/homepage-section2/file-text.png", alt: "", position: "top-[20%] right-[44%]", size: "w-11 h-11 sm:w-13 sm:h-13" },
  { src: "/images/homepage-section2/lock.png", alt: "", position: "top-[30%] left-[16%]", size: "w-10 h-10 sm:w-11 sm:h-11" },
  { src: "/images/homepage-section2/puzzle.png", alt: "", position: "top-[42%] right-[50%]", size: "w-10 h-10 sm:w-11 sm:h-11" },
  { src: "/images/homepage-section2/card.png", alt: "", position: "top-[60%] right-[20%]", size: "w-11 h-11 sm:w-12 sm:h-12" },
  { src: "/images/homepage-section2/explorer.png", alt: "", position: "bottom-[18%] right-[4%]", size: "w-10 h-10 sm:w-12 sm:h-12" },
];

export function QuiSommesNousSection() {
  return (
    <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        {/* Titre (phrase d'accroche) – pleine largeur */}
        <p className="text-2xl font-bold leading-snug text-[#2a2a2a] sm:text-3xl lg:text-[1.75rem] lg:leading-relaxed max-w-3xl">
          Des solutions comptables claires et adaptées à votre activité, pour
          vous accompagner au quotidien et simplifier la gestion de vos
          finances.
        </p>

        {/* Row : gauche vide sur lg, droite = Proches de vous (aligné à droite, favicon à droite). Mobile : colonne, même indentation que les blocs suivants. */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block" aria-hidden />
          <div className="w-full lg:ml-auto lg:max-w-md lg:flex lg:justify-end">
            <div className="flex flex-row gap-4 lg:flex-row-reverse lg:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 overflow-hidden">
                <Image src="/images/homepage-section2/map-pin.png" alt="" width={32} height={32} className="h-6 w-6 object-contain sm:h-7 sm:w-7" unoptimized />
              </div>
              <div className="min-w-0 lg:text-right">
                <h2 className="text-xl font-bold text-[#2a2a2a] sm:text-2xl">
                  Proches de vous
                </h2>
                <p className="mt-3 text-[#2a2a2a]/85 leading-relaxed">
                  Deux implantations : Paris Bastille et Arpajon, pour un
                  accompagnement accessible et local.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Qui sommes-nous ? */}
        <div className="mt-14 flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 overflow-hidden">
            <Image src="/images/homepage-section2/calculator.png" alt="" width={32} height={32} className="h-6 w-6 object-contain sm:h-7 sm:w-7" unoptimized />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2a2a2a] sm:text-2xl">
              Qui sommes-nous ?
            </h2>
            <p className="mt-3 text-[#2a2a2a]/85 leading-relaxed max-w-2xl">
              HMCC un cabinet d&apos;expertise comptable indépendant, spécialisé
              en conseil, audit et commissariat aux comptes, fondé en 1998.
              Depuis plus de 25 ans, nous accompagnons les entreprises,
              dirigeants et associations dans toutes les étapes de leur
              développement.
            </p>
          </div>
        </div>

        {/* Ils nous font confiance */}
        <div className="mt-10 flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 overflow-hidden">
            <Image src="/images/section2/boy.png" alt="" width={32} height={32} className="h-6 w-6 object-contain sm:h-7 sm:w-7" unoptimized />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2a2a2a] sm:text-2xl">
              Ils nous font confiance
            </h2>
            <p className="mt-3 text-[#2a2a2a]/85 leading-relaxed">
              Des entreprises de tous secteurs choisissent notre expertise au
              quotidien.
            </p>
          </div>
        </div>

        {/* Icônes 3D avec coordonnées précises + effet floating (ombre portée) */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
          {SECTION2_ICONS.map((icon, i) => (
            <div
              key={i}
              className={`absolute ${icon.position} section2-asset-float`}
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={48}
                height={48}
                className={`${icon.size} object-contain`}
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Barre Client en bas */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-0 border-t border-[#2a2a2a]/10 pt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center text-[#2a2a2a]/45 text-sm sm:text-base">
              {i > 0 && <span className="mx-3 sm:mx-4 text-[#2a2a2a]/30">|</span>}
              <span>Client</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
