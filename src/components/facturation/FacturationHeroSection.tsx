"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * Hero page Facturation électronique (Figma node 85:3).
 * Charte : 2 colonnes, titre gauche, lien bleu "Voir nos compétences →", 3 icônes 3D (cadenas, puzzle, document), image architecture droite à coins arrondis, blob rose en bas à droite.
 */
const HERO_ICONS = [
  { src: "/images/homepage-section2/lock.png", alt: "" },
  { src: "/images/homepage-section2/puzzle.png", alt: "" },
  { src: "/images/homepage-section2/file-text.png", alt: "" },
];

export function FacturationHeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-white px-4 pt-8 pb-16 sm:px-6 sm:pt-10 sm:pb-24 lg:px-8 lg:flex lg:items-center">
      {/* Blob rose en bas à droite (#FADAD2) */}
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full opacity-90 sm:h-[420px] sm:w-[420px]"
        style={{
          background: "radial-gradient(circle, rgba(250, 218, 210, 0.9) 0%, rgba(250, 218, 210, 0.4) 50%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Gauche : titre + CTA + 3 icônes */}
        <div className="order-2 lg:order-1">
          <p className="text-2xl font-bold leading-snug tracking-tight text-[#2a2a2a] sm:text-3xl lg:text-4xl">
            Des solutions comptables claires et adaptées à votre activité, pour vous accompagner au quotidien et simplifier la gestion de vos finances.
          </p>
          <Link
            href="/#competences"
            target="_self"
            className="mt-6 inline-block text-base font-medium text-[#2563eb] underline underline-offset-2 transition hover:text-[#1d4ed8] sm:text-lg"
          >
            Voir nos compétences →
          </Link>
          <div className="mt-10 flex flex-wrap gap-6">
            {HERO_ICONS.map((icon, i) => (
              <div key={i} className="relative h-14 w-14 sm:h-16 sm:w-16">
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain drop-shadow-md"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Droite : image architecture à coins arrondis (le blob la recouvre partiellement en bas à droite) */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl shadow-xl">
            <img
              src="/images/homepage-section6/bloc-1.png"
              alt=""
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
