"use client";

import Image from "next/image";

/**
 * Section 2 Facturation électronique (Figma node 86:75 - bloc du bas).
 * Charte : bloc blanc à coins arrondis (légèrement à gauche). Gauche dans le bloc : titre + texte. À droite du bloc : grand titre + 2 icônes 3D (cadenas, puzzle). Blobs rose en fond.
 */
const SOLUTIONS_TEXT =
  "Des solutions comptables claires et adaptées à votre activité, pour vous accompagner au quotidien et simplifier la gestion de vos finances.";

const BODY_REPEAT =
  "Des solutions comptables claires et adaptées à votre activité, pour vous accompagner au quotidien et simplifier la gestion de vos finances. Des solutions comptables claires et adaptées à votre activité, pour vous accompagner au quotidien et simplifier la gestion des solutions comptables claires et adaptées à votre activité, pour vous accompagner au quotidien et simplifier la gestion.";

export function FacturationSection2() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Blobs rose pâle (#F8E8E9) */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full opacity-90"
        style={{
          background: "radial-gradient(circle, rgba(248, 232, 233, 0.9) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full opacity-90"
        style={{
          background: "radial-gradient(circle, rgba(248, 232, 233, 0.9) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:items-start">
          {/* Bloc blanc à gauche : titre + texte */}
          <div className="overflow-hidden rounded-3xl border border-[#2a2a2a]/10 bg-white p-6 shadow-sm lg:p-10">
            <h2 className="text-xl font-bold text-[#2a2a2a] sm:text-2xl">
              Suivi comptable automatisé
            </h2>
            <p className="mt-4 text-[#2a2a2a]/85 leading-relaxed">
              {BODY_REPEAT}
            </p>
          </div>

          {/* Droite : grand titre + 2 icônes (en dehors du bloc blanc) */}
          <div className="flex flex-col lg:pt-2">
            <p className="text-2xl font-bold leading-snug tracking-tight text-[#2a2a2a] sm:text-3xl lg:text-4xl">
              {SOLUTIONS_TEXT}
            </p>
            <div className="mt-8 flex gap-6">
              <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                <Image
                  src="/images/homepage-section2/lock.png"
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-contain drop-shadow-md"
                  unoptimized
                />
              </div>
              <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                <Image
                  src="/images/homepage-section2/puzzle.png"
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-contain drop-shadow-md"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
