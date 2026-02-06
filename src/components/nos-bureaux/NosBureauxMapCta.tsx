"use client";

/**
 * Section Figma : bandeau rouge en haut, zone blanche avec formes roses, texte centré + bouton "Voir sur la carte".
 */
export function NosBureauxMapCta() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Formes organiques roses en arrière-plan */}
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#fdf2f2] opacity-80 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#fdf2f2] opacity-80 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-lg text-[#2a2a2a] sm:text-xl leading-relaxed">
          Des solutions comptables claires et
          <br />
          adaptées à votre activité, pour vous
          <br />
          accompagner au quotidien et simplifier la
          <br />
          gestion de vos finances.
        </p>
        <a
          href="/#contact"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#e61d2b] to-[#b81a25] px-8 py-4 text-base font-medium text-white shadow-lg transition hover:opacity-95"
        >
          Voir sur la carte
        </a>
      </div>
    </section>
  );
}
