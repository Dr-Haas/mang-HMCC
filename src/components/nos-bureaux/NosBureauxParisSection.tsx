"use client";

import Image from "next/image";
import Link from "next/link";

const CARD_IMAGES = [
  "/images/nos-bureaux/nos-bureaux-1.png",
  "/images/nos-bureaux/nos-bureaux-2.png",
  "/images/nos-bureaux/nos-bureaux-3.png",
  "/images/nos-bureaux/nos-bureaux-4.png",
  "/images/nos-bureaux/nos-bureaux-5.png",
  "/images/nos-bureaux/nos-bureaux-6.png",
];

/**
 * Section : titre central "Nos bureaux à paris", 6 cartes, puis bloc Titre + texte + lien + 2 boutons.
 */
export function NosBureauxParisSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-[#2a2a2a] sm:text-4xl">
          Nos bureaux à Paris
        </h2>

        {/* 6 cartes : disposition autour du titre (5 bordeaux, 1 grise en bas à droite) */}
        <div className="relative mt-12 mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl min-h-[280px]">
          {CARD_IMAGES.map((src, i) => (
            <div
              key={i}
              className={`relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden shrink-0 ring-2 ${
                i === 5 ? "bg-[#e5e5e5] ring-[#2a2a2a]/10" : "bg-[#7a2d2d] ring-[#7a2d2d]/50"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="112px"
                unoptimized
              />
              <div className={`absolute inset-0 flex items-center justify-center bg-black/20`}>
                <div className={`h-8 w-10 rounded-full border-2 ${i === 5 ? "border-[#2a2a2a]/25" : "border-white/40"}`} />
              </div>
              <span className={`absolute top-1.5 left-1.5 text-[10px] font-medium ${i === 5 ? "text-[#2a2a2a]/70" : "text-white/90"}`}>€</span>
              <span className={`absolute top-1.5 right-1.5 text-[10px] font-medium ${i === 5 ? "text-[#2a2a2a]/70" : "text-white/90"}`}>$</span>
              <span className={`absolute bottom-1.5 left-1.5 text-[10px] font-medium ${i === 5 ? "text-[#2a2a2a]/70" : "text-white/90"}`}>$</span>
              <span className={`absolute bottom-1.5 right-1.5 text-[10px] font-medium ${i === 5 ? "text-[#2a2a2a]/70" : "text-white/90"}`}>€</span>
            </div>
          ))}
        </div>

        {/* Bloc bas : Titre + paragraphe + lien + boutons */}
        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold text-[#2a2a2a] sm:text-2xl">
              Titre
            </h3>
            <p className="mt-2 text-[#2a2a2a]/85">
              Création des bulletins, déclarations sociales, accompagnement RH :
              nous sécurisons chaque étape pour garantir une paie fiable,
              ponctuelle et conforme.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1 text-[#2563eb] hover:underline"
            >
              Voir nos compétences →
            </Link>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-xl border border-[#2a2a2a]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#2a2a2a]"
            >
              Texte
            </button>
            <button
              type="button"
              className="rounded-xl border border-[#2a2a2a]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#2a2a2a]"
            >
              Texte
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
