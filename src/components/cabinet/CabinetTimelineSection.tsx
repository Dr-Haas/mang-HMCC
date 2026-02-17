const timelineEvents = [
  {
    year: "1998",
    title: "Creation du cabinet",
    description: "Herve Miniou fonde HMCC",
  },
  {
    year: "2006",
    title: "Nouvelle generation",
    description: "Alan Miniou rejoint le cabinet",
  },
  {
    year: "2015",
    title: "Transformation digitale",
    description: "Adoption des outils cloud",
  },
  {
    year: "2020",
    title: "Innovation",
    description: "IA et automatisation",
  },
  {
    year: "2026",
    title: "Aujourd'hui",
    description: "Leader de l'expertise 3.0",
  },
];

export function CabinetTimelineSection() {
  return (
    <section className="border-b border-neutral-200 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-red-700 md:text-5xl">
            Notre histoire
          </h2>
          <p className="mx-auto max-w-3xl text-lg font-light text-neutral-500">
            Plus de 25 ans d&apos;evolution et d&apos;innovation continue
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-red-200 via-red-600 to-red-200 md:block" />

          <div className="space-y-10">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <article
                  key={event.year}
                  className={`relative flex items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div className="w-full md:w-[calc(50%-2rem)]">
                    <div
                      className={`rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 ${
                        isLeft ? "text-left md:text-right" : "text-left"
                      }`}
                    >
                      <p className="mb-2 text-4xl font-bold leading-none text-red-700">
                        {event.year}
                      </p>
                      <h3 className="mb-2 text-xl font-semibold text-neutral-900">{event.title}</h3>
                      <p className="text-base font-light text-neutral-600">{event.description}</p>
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
