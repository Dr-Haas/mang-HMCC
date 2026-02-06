"use client";

import Link from "next/link";
import Image from "next/image";

/* 5 icônes autour du bloc texte (positionnement Figma) : curseur, montre, carte, puzzle, cadenas */
const SECTION3_ICONS = [
  { src: "/images/homepage-hero/cursor.png", alt: "", position: "top-[15%] right-[12%]", size: "w-12 h-12 sm:w-14 sm:h-14" },
  { src: "/images/homepage-section2/explorer.png", alt: "", position: "top-[50%] right-[10%] -translate-y-1/2", size: "w-12 h-12 sm:w-14 sm:h-14" },
  { src: "/images/homepage-section2/card.png", alt: "", position: "bottom-[18%] right-[14%]", size: "w-12 h-12 sm:w-14 sm:h-14" },
  { src: "/images/homepage-section2/puzzle.png", alt: "", position: "bottom-[18%] left-[12%]", size: "w-12 h-12 sm:w-14 sm:h-14" },
  { src: "/images/homepage-section2/lock.png", alt: "", position: "top-[50%] left-[10%] -translate-y-1/2", size: "w-12 h-12 sm:w-14 sm:h-14" },
];

const RED_LINKS = [
  { label: "NOS SERVICES", href: "/services" },
  { label: "FACTURATION", href: "/#facturation" },
  { label: "NOS BUREAUX", href: "/nos-bureaux" },
  { label: "CONTACT", href: "/contact" },
];

export function NousProposonsSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* Icônes 3D dispersées autour du texte */}
      {SECTION3_ICONS.map((icon, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute hidden sm:block ${icon.position}`}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={56}
            height={56}
            className={`${icon.size} object-contain drop-shadow-md`}
            unoptimized
          />
        </div>
      ))}

      {/* Bloc texte centré : NOUS PROPOSONS (noir) + 4 lignes (rouge) */}
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-2xl font-bold uppercase tracking-tight text-[#2a2a2a] sm:text-4xl">
          Nous proposons
        </p>
        <div className="mt-6 flex flex-col items-center gap-1 sm:mt-4 ">
          {RED_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-bold uppercase tracking-tight text-[#b81a25] transition hover:text-[#e61d2b] sm:text-4xl"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
