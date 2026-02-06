"use client";

import Link from "next/link";

const NAV_REPEAT = 7;
const ACTIVE_INDEX = 3;

/** Couleurs des cartes : #700000 (foncé), #B22020 (moyen), #9C9090 (gris) */
const CARD_COLORS = {
  dark: "bg-[#700000]",
  medium: "bg-[#B22020]",
  grey: "bg-[#9C9090]",
} as const;

type CardVariant = keyof typeof CARD_COLORS;

/**
 * Une carte décorative : fond (3 couleurs), ovale au centre, € $ aux 4 coins.
 * Affichée uniquement à partir de sm (masquée sur mobile).
 */
function CurrencyCard({ variant = "medium" }: { variant?: CardVariant }) {
  const isGrey = variant === "grey";
  return (
    <div
      className={`relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl sm:h-24 sm:w-24 ${CARD_COLORS[variant]}`}
    >
      <div
        className={`h-10 w-14 rounded-full border-2 sm:h-12 sm:w-16 ${
          isGrey ? "border-[#2a2a2a]/30" : "border-white/40"
        }`}
      />
      <span className={`absolute left-1.5 top-1.5 text-xs font-medium sm:text-sm ${isGrey ? "text-[#2a2a2a]/80" : "text-white/90"}`}>€</span>
      <span className={`absolute right-1.5 top-1.5 text-xs font-medium sm:text-sm ${isGrey ? "text-[#2a2a2a]/80" : "text-white/90"}`}>$</span>
      <span className={`absolute bottom-1.5 left-1.5 text-xs font-medium sm:text-sm ${isGrey ? "text-[#2a2a2a]/80" : "text-white/90"}`}>$</span>
      <span className={`absolute bottom-1.5 right-1.5 text-xs font-medium sm:text-sm ${isGrey ? "text-[#2a2a2a]/80" : "text-white/90"}`}>€</span>
    </div>
  );
}

/**
 * Hero : fond blanc, nav Services, titre centré au milieu,
 * 4 cartes au-dessus du titre et 3 en dessous (masquées sur mobile).
 */
export function NosBureauxHero() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Barre Services */}
      <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-12">
        {Array.from({ length: NAV_REPEAT }, (_, i) => (
          <span
            key={i}
            className={`text-sm font-medium sm:text-base ${
              i === ACTIVE_INDEX
                ? "text-[#e61d2b] underline decoration-[#e61d2b] underline-offset-4 decoration-2"
                : "text-[#2a2a2a]"
            }`}
          >
            Services
          </span>
        ))}
      </nav>

      {/* Zone centrale : 4 cartes au-dessus, titre au milieu, 3 cartes en dessous */}
      <div className="mx-auto max-w-4xl flex flex-col items-center justify-center">
        {/* 4 cartes au-dessus du titre — masquées sur mobile */}
        <div className="hidden sm:flex w-full justify-between items-center px-4 sm:px-8 lg:px-12 mb-6 sm:mb-8">
          <CurrencyCard variant="dark" />
          <CurrencyCard variant="medium" />
          <CurrencyCard variant="dark" />
          <CurrencyCard variant="medium" />
        </div>

        {/* Titre au centre de la page */}
        <h1 className="relative z-10 text-center text-3xl font-bold text-[#2a2a2a] sm:text-4xl lg:text-5xl">
          Nos bureaux à Paris
        </h1>

        {/* 3 cartes en dessous du titre — masquées sur mobile */}
        <div className="hidden sm:flex w-full justify-between items-center px-8 sm:px-12 lg:px-24 mt-6 sm:mt-8">
          <CurrencyCard variant="medium" />
          <CurrencyCard variant="dark" />
          <CurrencyCard variant="grey" />
        </div>
      </div>

      {/* Bas : bloc gauche (Titre + texte + lien) et boutons à droite */}
      <div className="mx-auto mt-10 sm:mt-12 max-w-5xl flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold text-[#2a2a2a] sm:text-2xl">
            Titre
          </h2>
          <p className="mt-2 text-[#2a2a2a]/85">
            Création des bulletins, déclarations sociales, accompagnement RH :
            nous sécurisons chaque étape pour garantir une paie fiable,
            ponctuelle et conforme.
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-flex items-center gap-1 text-[#2563eb] hover:underline"
          >
            Voir nos compétences →
          </Link>
        </div>
        <div className="flex gap-3 shrink-0">
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
    </section>
  );
}
