/**
 * Section 6 – 3 blocs avec image + chiffre (Figma Home_Page_6, node 52:317).
 * Structure : titre centré ; 3 cartes (texte à gauche gris clair, image à droite avec overlay chiffre + label).
 * Assets : 3 photos architecture (homepage-section6).
 */
const BLOC_IMAGES = [
  "/images/homepage-section6/bloc-1.png",
  "/images/homepage-section6/bloc-2.png",
  "/images/homepage-section6/bloc-3.png",
];

const blocs = [
  {
    title: "Votre gestion comptable, toujours à jour.",
    subtitle: "Suivi comptable automatisé",
    description:
      "Nous assurons la mise à jour de vos écritures et le suivi de vos opérations en continu, pour vous offrir une vision claire de votre activité à tout moment.",
    stat: "3000+",
    statLabel: "Écritures traitées chaque mois",
  },
  {
    title: "Les bulletins de paie, simple et sans erreur.",
    subtitle: "Gestion sociale complète",
    description:
      "Création des bulletins, déclarations sociales, accompagnement RH : nous sécurisons chaque étape pour garantir une paie fiable, ponctuelle et conforme.",
    stat: "150+",
    statLabel: "Fiches de paie gérées mensuellement",
  },
  {
    title: "Des décisions éclairées, une fiscalité optimisée.",
    subtitle: "Accompagnement stratégique",
    description:
      "Nous analysons votre situation et identifions les leviers d'optimisation pour réduire vos charges et améliorer la performance financière de votre entreprise.",
    stat: "12%",
    statLabel: "Optimisation moyenne constatée",
  },
];

export function BlocsChiffresSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Formes décoratives rose pâle (Figma) */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full opacity-90"
        style={{
          background: "radial-gradient(circle, rgba(252, 231, 231, 0.7) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[380px] w-[380px] rounded-full opacity-90"
        style={{
          background: "radial-gradient(circle, rgba(252, 231, 231, 0.6) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-[#2a2a2a] sm:text-3xl lg:text-4xl">
          Titre
        </h2>

        <div className="mt-10 space-y-6 sm:mt-14 sm:space-y-8">
          {blocs.map((bloc, index) => (
            <article
              key={bloc.title}
              className="flex flex-col overflow-hidden rounded-3xl bg-[#f5f5f5] shadow-sm sm:flex-row"
            >
              {/* Partie gauche : texte sur fond gris clair — 75 % de la div */}
              <div className="flex min-w-0 flex-[3] flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
                <h3 className="text-lg font-bold text-[#2a2a2a] sm:text-xl lg:text-2xl">
                  {bloc.title}
                </h3>
                <p className="mt-2 text-sm font-bold text-[#2a2a2a] sm:text-base">
                  {bloc.subtitle}
                </p>
                <p className="mt-4 text-[#2a2a2a]/85 text-sm leading-relaxed sm:text-base">
                  {bloc.description}
                </p>
              </div>

              {/* Partie droite : image = 25 % de la largeur de la carte, hauteur alignée au bloc */}
              <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-full sm:min-h-[200px] sm:w-1/4 sm:self-stretch">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={BLOC_IMAGES[index] ?? BLOC_IMAGES[0]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent pb-8 pt-16"
                  aria-hidden
                >
                  <span className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    {bloc.stat}
                  </span>
                  <span className="mt-1 text-center text-sm font-medium text-white/95 sm:text-base">
                    {bloc.statLabel}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
