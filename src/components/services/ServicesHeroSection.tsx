"use client";

import Image from "next/image";

const NAV_REPEAT = 8;
const ACTIVE_INDEX = 3; // 4e occurrence soulignée et en rouge

export function ServicesHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-8 pb-16 sm:px-6 sm:pt-10 sm:pb-24 lg:px-8 min-h-[100vh] flex flex-col justify-center">

      {/* Contenu principal : 2 colonnes */}
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Bloc de texte à gauche */}
        <div className="order-2 lg:order-1">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug tracking-tight text-[#2a2a2a]">
            Des solutions comptables claires et adaptées à votre activité, pour vous accompagner au quotidien et simplifier la gestion de vos finances.
          </p>
        </div>

        {/* Illustration à droite : rectangle bordeaux avec pièce et symboles */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-square rounded-3xl bg-[#7a2d2d] flex items-center justify-center overflow-hidden shadow-xl">
            {/* Symboles aux 4 coins */}
            <span className="absolute top-6 left-6 text-2xl sm:text-3xl font-medium text-white/90" aria-hidden>€</span>
            <span className="absolute top-6 right-6 text-2xl sm:text-3xl font-medium text-white/90" aria-hidden>$</span>
            <span className="absolute bottom-6 left-6 text-2xl sm:text-3xl font-medium text-white/90" aria-hidden>$</span>
            <span className="absolute bottom-6 right-6 text-2xl sm:text-3xl font-medium text-white/90" aria-hidden>€</span>
            {/* Pièce euro au centre — pièce stylisée (clay) l’image Figma est ajoutée */}
            <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44">
              <Image
                src="/images/services/euro-dynamic-clay.png"
                alt=""
                width={176}
                height={176}
                className="w-full h-full object-contain drop-shadow-lg"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
