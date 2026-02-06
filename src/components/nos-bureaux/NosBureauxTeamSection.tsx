"use client";

import Image from "next/image";

const TEAM_TEXT =
  "Des solutions comptables claires et adaptées à votre activité, pour vous accompagner au quotidien et simplifier la gestion de vos finances.";

/**
 * Section "La team" : titre et sous-titre en haut à gauche.
 * Deux blocs côte à côte : chacun = texte (gauche) + avatar 3D (droite), sans cadre autour de l'avatar.
 * Bloc gauche : texte + fille. Bloc droit : texte + garçon.
 */
export function NosBureauxTeamSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
          La team
        </h2>
        <p className="mt-2 max-w-2xl text-[#2a2a2a]/85">
          Suivez vos opérations, vos factures et vos justificatifs en toute
          simplicité grâce à un accompagnement structuré et clair.
        </p>

        <div className="mt-12 flex flex-col gap-12 sm:gap-16">
          {/* Bloc 1 : texte à gauche, image à droite — pleine largeur */}
          <div className="flex w-full items-center gap-6">
            <p className="min-w-0 flex-1 font-bold leading-snug text-[#2a2a2a]">
              {TEAM_TEXT}
            </p>
            <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
              <Image
                src="/images/nos-bureaux/girl-dynamic-color.png"
                alt=""
                fill
                className="object-contain"
                sizes="96px"
                unoptimized
              />
            </div>
          </div>

          {/* Bloc 2 : image à gauche, texte à droite — pleine largeur */}
          <div className="flex w-full items-center gap-6">
            <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
              <Image
                src="/images/nos-bureaux/boy-dynamic-color.png"
                alt=""
                fill
                className="object-contain"
                sizes="96px"
                unoptimized
              />
            </div>
            <p className="min-w-0 flex-1 font-bold leading-snug text-[#2a2a2a]">
              {TEAM_TEXT}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
