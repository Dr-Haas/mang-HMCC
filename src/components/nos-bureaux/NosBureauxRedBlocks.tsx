"use client";

import Image from "next/image";

const SUITCASE_IMAGE = "/images/nos-bureaux/travel-dynamic-clay.png";

/**
 * Section : fond rouge foncé, 1 grand bloc horizontal (texte + grande valise) + 2 blocs (Titre + texte + 3 valises).
 * Bordures légères, coins très arrondis, tailles d’images et de blocs alignées sur la maquette.
 */
export function NosBureauxRedBlocks() {
  return (
    <section className="bg-[#9E0E1B] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Grand bloc horizontal : texte à gauche (~60–70 %), grande valise à droite */}
        <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-[#b12534]/80 p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-10">
          <p className="max-w-[70%] min-w-0 flex-1 text-lg font-bold leading-snug text-white sm:text-xl">
            Lorem ipsum dolor sit amet, consectetur — Adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <div className="relative h-28 w-28 shrink-0 sm:h-36 sm:w-36">
            <Image
              src={SUITCASE_IMAGE}
              alt=""
              fill
              className="object-contain"
              sizes="144px"
              unoptimized
            />
          </div>
        </div>

        {/* Deux blocs en dessous : même hauteur, 3 valises plus grandes */}
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex min-h-[220px] flex-col rounded-3xl border border-white/10 bg-[#b12534]/80 p-6 sm:min-h-[240px] sm:p-8">
            <h3 className="text-xl font-bold text-white sm:text-2xl">Titre</h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-white/90">
              Des solutions comptables claires et adaptées à votre activité,
              pour vous accompagner
            </p>
            <div className="mt-6 flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20"
                  aria-hidden
                >
                  <Image
                    src={SUITCASE_IMAGE}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="80px"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-[220px] flex-col rounded-3xl border border-white/10 bg-[#b12534]/80 p-6 sm:min-h-[240px] sm:p-8">
            <h3 className="text-xl font-bold text-white sm:text-2xl">Titre</h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-white/90">
              Des solutions comptables claires et adaptées à votre activité,
              pour vous accompagner
            </p>
            <div className="mt-6 flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20"
                  aria-hidden
                >
                  <Image
                    src={SUITCASE_IMAGE}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="80px"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
