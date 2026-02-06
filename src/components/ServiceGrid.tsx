const services = [
  {
    title: "Comptabilité",
    description: "Tenue de comptes, clôture et déclarations. Un accompagnement sur mesure.",
    icon: "📊",
  },
  {
    title: "Conseil",
    description: "Stratégie fiscale et optimisation. Nous vous guidons dans vos choix.",
    icon: "💡",
  },
  {
    title: "Paie & social",
    description: "Gestion de la paie et des obligations sociales pour votre sérénité.",
    icon: "👥",
  },
  {
    title: "Création d&apos;entreprise",
    description: "Montage de dossiers et choix du statut adapté à votre projet.",
    icon: "🚀",
  },
];

export function ServiceGrid() {
  return (
    <section id="services" className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
          Nos services
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#2a2a2a]/80">
          Des solutions adaptées à la taille et aux besoins de votre entreprise.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-[#2a2a2a]/10 bg-white p-6 shadow-sm transition hover:border-[#e61d2b]/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e61d2b]/10 text-2xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#2a2a2a]">{item.title}</h3>
              <p className="mt-2 text-[#2a2a2a]/80">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
