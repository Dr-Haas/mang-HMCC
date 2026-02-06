/**
 * Section 6 – 3 blocs avec image + chiffre (Figma Home_Page_6).
 * Assets Figma : 3 photos (architecture), formes décoratives rose/gris.
 */
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
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#fce7e7]/60 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#f0f0f0] blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
          Titre
        </h2>
        <div className="mt-12 space-y-8">
          {blocs.map((bloc) => (
            <article
              key={bloc.title}
              className="flex flex-col gap-8 rounded-2xl border border-[#2a2a2a]/10 bg-[#fafafa] p-8 sm:flex-row sm:items-center"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#2a2a2a] sm:text-2xl">
                  {bloc.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-[#e61d2b]">
                  {bloc.subtitle}
                </p>
                <p className="mt-4 text-[#2a2a2a]/80">{bloc.description}</p>
              </div>
              <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl bg-[#2a2a2a]/10 sm:h-48 sm:w-80">
                <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                  <div>
                    <p className="text-2xl font-bold">{bloc.stat}</p>
                    <p className="text-sm">{bloc.statLabel}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
