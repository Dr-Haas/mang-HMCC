"use client";

import Image from "next/image";
import Link from "next/link";

const AGENCIES = [
  {
    title: "Agence 1",
    address: "adresse adresse",
    image: "/images/nos-bureaux/nos-bureaux-1.png",
  },
  {
    title: "Agence 2",
    address: "adresse adresse",
    image: "/images/nos-bureaux/nos-bureaux-2.png",
  },
];

/**
 * Section : 2 cartes agence (image, titre, adresse, 5 cercles, bouton "Voir sur la carte"), puis Titre + paragraphe.
 */
export function NosBureauxAgencyCards() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-2">
          {AGENCIES.map((agency) => (
            <article
              key={agency.title}
              className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-[#2a2a2a]/10"
            >
              <div className="relative aspect-[4/3] w-full bg-[#2a2a2a]/10">
                <Image
                  src={agency.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold text-[#2a2a2a]">
                  {agency.title}
                </h3>
                <p className="mt-1 text-sm text-[#2a2a2a]/70">
                  {agency.address}
                </p>
                <div className="mt-4 flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="h-2.5 w-2.5 rounded-full border border-[#2a2a2a]/20 bg-transparent"
                      aria-hidden
                    />
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#e61d2b] px-4 py-2.5 text-sm font-medium text-white shadow transition hover:bg-[#b81a25]"
                >
                  Voir sur la carte
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <h3 className="text-2xl font-bold text-[#2a2a2a]">Titre</h3>
          <p className="mx-auto mt-3 max-w-2xl text-[#2a2a2a]/85">
            Suivez vos opérations, vos factures et vos justificatifs en toute
            simplicité grâce à un accompagnement structuré et clair.
          </p>
        </div>
      </div>
    </section>
  );
}
