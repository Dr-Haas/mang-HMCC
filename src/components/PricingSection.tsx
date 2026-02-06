import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "Sur devis",
    features: ["Tenue de comptes", "Déclarations fiscales", "Support email"],
    cta: "Choisir",
  },
  {
    name: "Pro",
    price: "Sur devis",
    features: ["Tout Starter", "Paie", "Conseil personnalisé", "Tableaux de bord"],
    cta: "Choisir",
    highlighted: true,
  },
  {
    name: "Entreprise",
    price: "Sur devis",
    features: ["Tout Pro", "Dossier création", "Audit", "Accompagnement dédié"],
    cta: "Choisir",
  },
];

export function PricingSection() {
  return (
    <section className="bg-[#2a2a2a]/5 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
          Nos offres
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#2a2a2a]/80">
          Une formule adaptée à la taille et aux besoins de votre activité.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-[#e61d2b] bg-white shadow-lg"
                  : "border-[#2a2a2a]/10 bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold text-[#2a2a2a]">{plan.name}</h3>
              <p className="mt-2 text-lg font-medium text-[#e61d2b]">{plan.price}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[#2a2a2a]/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e61d2b]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 block w-full rounded-md py-3 text-center font-medium transition ${
                  plan.highlighted
                    ? "bg-[#e61d2b] text-white hover:bg-[#b81a25]"
                    : "border border-[#2a2a2a]/20 text-[#2a2a2a] hover:border-[#e61d2b] hover:text-[#e61d2b]"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
