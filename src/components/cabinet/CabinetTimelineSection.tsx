const timelineEvents = [
  {
    year: "1985",
    title: "Création par Hervé",
    description: "Fondation du cabinet HMCC.",
  },
  {
    year: "1988",
    title: "Prise de la Bastille",
    description: "Installation du cabinet au 42 boulevard de la Bastille, Paris.",
  },
  {
    year: "1993",
    title: "Arrivée d'Alan au cabinet",
    description: "Alan Miniou rejoint l'équipe.",
  },
  {
    year: "2006",
    title: "Diplôme EC Alan",
    description: "Alan obtient le diplôme d'expert-comptable.",
  },
  {
    year: "2013",
    title: "Ouverture du bureau d'Arpajon",
    description: "Extension du cabinet en Essonne.",
  },
  {
    year: "2018",
    title: "Création du pôle RH",
    description: "Renforcement de l'offre paie et gestion sociale.",
  },
  {
    year: "2024",
    title: "Déménagement Arpajon",
    description: "Nouveaux locaux pour le bureau d'Arpajon.",
  },
  {
    year: "2025",
    title: "Diplôme EC Julien",
    description: "Julien obtient le diplôme d'expert-comptable.",
  },
  {
    year: "2025",
    title: "Nouveaux associés",
    description: "Élargissement de la gouvernance du cabinet.",
  },
];

export function CabinetTimelineSection() {
  return (
    <section className="border-b border-neutral-200 bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="mb-3 md:mb-4 text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-red-700">
            Notre histoire
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg font-light text-neutral-500">
            Plus de 40 ans d'évolution et d'innovation continue
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-red-200 via-red-600 to-red-200 md:block" />

          <div className="space-y-8 md:space-y-10">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <article
                  key={`${event.year}-${index}-${event.title}`}
                  className={`relative flex items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div className="w-full md:w-[calc(50%-2rem)]">
                    <div
                      className={`rounded-xl md:rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6 md:p-8 ${
                        isLeft ? "text-left md:text-right" : "text-left"
                      }`}
                    >
                      <p className="mb-2 text-2xl sm:text-3xl md:text-4xl font-bold leading-none text-red-700">
                        {event.year}
                      </p>
                      <h3 className="mb-2 text-lg sm:text-xl font-semibold text-neutral-900">
                        {event.title}
                      </h3>
                      <p className="text-sm sm:text-base font-light text-neutral-600">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <span className="absolute left-1/2 top-1/2 hidden size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-red-700 shadow-md md:block" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
