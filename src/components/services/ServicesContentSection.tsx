import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { StaggerScroll } from "@/components/ui/StaggerScroll";

const items = [
  {
    title: "Comptabilité",
    description: "Tenue de comptes, clôture, liasse fiscale.",
  },
  {
    title: "Paie & social",
    description: "Bulletins, déclarations, accompagnement social.",
  },
  {
    title: "Conseil",
    description: "Stratégie, optimisation, pilotage.",
  },
  {
    title: "Création d'entreprise",
    description: "Immatriculation, statuts, accompagnement.",
  },
];

export function ServicesContentSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll animation="fade-up">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ce que nous proposons
          </h2>
        </AnimateOnScroll>
        <StaggerScroll as="ul" className="mt-8 space-y-6">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-foreground/10 bg-background p-6"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-foreground/70">{item.description}</p>
            </li>
          ))}
        </StaggerScroll>
      </div>
    </section>
  );
}
