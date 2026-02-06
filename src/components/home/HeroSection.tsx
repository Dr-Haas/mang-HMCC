"use client";

import Link from "next/link";
import Image from "next/image";

/* Une seule occurrence par asset, positions espacées, mouvement smooth (sans orbite). */
const FLOAT_ASSETS = [
  { src: "/images/homepage-hero/cursor.png", alt: "", size: "w-11 h-11 sm:w-14 sm:h-14", position: "top-[14%] right-[12%]", animate: "animate-hero-float-1" },
  { src: "/images/homepage-hero/card.png", alt: "", size: "w-11 h-11 sm:w-13 sm:h-13", position: "top-[50%] right-[8%]", animate: "animate-hero-float-3" },
  { src: "/images/homepage-hero/wallet.png", alt: "", size: "w-11 h-11 sm:w-14 sm:h-14", position: "bottom-[32%] left-[6%]", animate: "animate-hero-float-4" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8 min-h-[80vh] flex flex-col justify-center">
      {/* Assets en position fixe, mouvement smooth (léger flottement) */}
      {FLOAT_ASSETS.map((asset, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none ${asset.position} ${asset.animate}`}
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            width={56}
            height={56}
            className={`${asset.size} object-contain drop-shadow-md`}
            unoptimized
          />
        </div>
      ))}

      <div className="relative mx-auto max-w-4xl text-center z-10">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#2a2a2a] sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="flex flex-wrap items-center justify-center gap-3">
            Comptabilité
            <Image
              src="/images/homepage-hero/safe.png"
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
              unoptimized
            />
          </span>
          <span className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white text-xl text-[#2a2a2a] shadow-md ring-1 ring-[#2a2a2a]/10 sm:h-12 sm:w-12 sm:text-2xl">
              $
            </span>
            <span className="text-[0.9em] sm:text-inherit">en toute</span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white text-xl text-[#2a2a2a] shadow-md ring-1 ring-[#2a2a2a]/10 sm:h-12 sm:w-12 sm:text-2xl">
              €
            </span>
          </span>
          <span className="mt-3 flex flex-wrap items-center justify-center gap-3 relative inline-flex items-center">
            <Image
              src="/images/homepage-hero/euro-coin.png"
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 object-contain sm:h-12 sm:w-12 lg:h-14 lg:w-14"
              unoptimized
            />
            <span>simplicité.</span>
            {/* Curseur fixe : un peu à droite et en dessous de "simplicité", battement */}
            <span className="absolute left-full top-full ml-1 mt-0.5 sm:ml-2 sm:mt-1 pointer-events-none animate-hero-cursor-pulse">
              <Image
                src="/images/homepage-hero/cursor.png"
                alt=""
                width={32}
                height={32}
                className="h-6 w-6 object-contain drop-shadow sm:h-8 sm:w-8"
                unoptimized
              />
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-[#2a2a2a]/80 sm:text-xl">
          Des solutions comptables claires et adaptées à votre activité, pour vous
          accompagner au quotidien et simplifier la gestion de vos finances.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#e61d2b] px-10 py-4 text-base font-medium text-white shadow-lg transition hover:bg-[#b81a25] sm:text-lg"
        >
          Je suis intéressé
        </Link>
      </div>
    </section>
  );
}
