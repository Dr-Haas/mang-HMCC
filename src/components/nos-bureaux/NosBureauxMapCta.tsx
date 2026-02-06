"use client";

import Image from "next/image";

/**
 * Section Figma Nos bureaux 6 (frame 106-3) : barre rouge en haut, zone blanche,
 * vecteurs roses gauche/droite, texte centré (grosse fonte), bouton "Voir sur la carte".
 */
export function NosBureauxMapCta() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Barre rouge en haut, coins bas arrondis */}
      <div
        className="h-8 w-full rounded-b-3xl bg-[#9E0E1B] sm:h-10"
        aria-hidden
      />

      <div className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Vecteurs décoratifs : formes organiques gauche et droite */}
        <div
          className="pointer-events-none absolute -left-16 top-1/2 hidden w-72 -translate-y-1/2 sm:block lg:-left-4 lg:w-80"
          aria-hidden
        >
          <Image
            src="/images/nos-bureaux/Vector 3.png"
            alt=""
            width={320}
            height={320}
            className="h-auto w-full object-contain opacity-70"
            unoptimized
          />
        </div>
        <div
          className="pointer-events-none absolute -right-16 top-1/2 hidden w-72 -translate-y-1/2 sm:block lg:-right-4 lg:w-80"
          aria-hidden
        >
          <Image
            src="/images/nos-bureaux/Vector 4.png"
            alt=""
            width={320}
            height={320}
            className="h-auto w-full object-contain opacity-70"
            unoptimized
          />
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-xl font-medium leading-relaxed text-[#4A4A4A] sm:text-2xl lg:text-3xl">
            Des solutions comptables claires et
            <br />
            adaptées à votre activité, pour vous
            <br />
            accompagner au quotidien et simplifier la
            <br />
            gestion de vos finances.
          </p>
          <a
            href="/contact"
            className="mt-10 inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-[#e61d2b] via-[#d91c28] to-[#b81a25] px-10 py-4 text-lg font-medium text-white shadow-lg shadow-[#2a2a2a]/15 transition hover:opacity-95 hover:shadow-xl hover:shadow-[#2a2a2a]/20"
          >
            Voir sur la carte
          </a>
        </div>
      </div>
    </section>
  );
}
