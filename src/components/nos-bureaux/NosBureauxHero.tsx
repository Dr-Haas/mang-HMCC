"use client";

import Link from "next/link";

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
      {/* Zone centrale : cartes en position absolue (coordonnées), titre au milieu */}
      <div className="relative mx-auto max-w-4xl min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-center">
        {/* 4 cartes au-dessus du titre — coordonnées en % (left, top) */}
        <div className="absolute left-[6%] top-[0%] hidden sm:block">
          <CurrencyCard variant="dark" />
        </div>
        <div className="absolute left-[26%] top-[12%] hidden sm:block">
          <CurrencyCard variant="medium" />
        </div>
        <div className="absolute left-[54%] top-[4%] hidden sm:block">
          <CurrencyCard variant="dark" />
        </div>
        <div className="absolute left-[78%] top-[16%] hidden sm:block">
          <CurrencyCard variant="medium" />
        </div>

        {/* Titre au centre */}
        <h1 className="relative z-10 text-center text-3xl font-bold text-[#2a2a2a] sm:text-4xl lg:text-5xl">
          Nos bureaux à Paris
        </h1>

        {/* 3 cartes en dessous du titre — coordonnées en % (left, top) */}
        <div className="absolute left-[4%] top-[68%] hidden sm:block">
          <CurrencyCard variant="medium" />
        </div>
        <div className="absolute left-[40%] top-[82%] hidden sm:block">
          <CurrencyCard variant="dark" />
        </div>
        <div className="absolute left-[76%] top-[72%] hidden sm:block">
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
            href="/contact"
            className="mt-4 inline-flex items-center gap-1 text-[#2563eb] hover:underline"
          >
            Voir nos compétences →
          </Link>
        </div>
      </div>
    </section>
  );
}
