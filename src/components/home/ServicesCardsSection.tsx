import Link from "next/link";
import Image from "next/image";

/**
 * Section 5 – 5 cartes services + bloc (Figma Home_Page_5).
 * Images de fond : Rectangle 92–96 (architecture). Icône Wi‑Fi en bas.
 */
const CARD_IMAGES = [
  "/images/homepage-section5/Rectangle 92.png",
  "/images/homepage-section5/Rectangle 93.png",
  "/images/homepage-section5/Rectangle 94.png",
  "/images/homepage-section5/Rectangle 95.png",
  "/images/homepage-section5/Rectangle 96.png",
];

const serviceCards = [
  {
    tag: "Fiscalité",
    stat1: "+120 Tableaux de bord actifs",
    stat2: "Mises à jour quotidiennes",
    label: "Pilotage d'Activité",
  },
  {
    tag: "Optimisation",
    stat1: "200+ Dossiers gérés",
    stat2: "Suivi en continu",
    label: "Comptabilité Générale",
  },
  {
    tag: "Fiscalité",
    stat1: "9000+ fiches de paie annuelles",
    stat2: "Taux d'erreur 0%",
    label: "Gestion de Paie",
  },
  {
    tag: "Fiscalité",
    stat1: "190 Entreprises créées et accompagnées",
    stat2: "Accompagnement créateurs",
    label: "Création d'Entreprise",
  },
  {
    tag: "Fiscalité",
    stat1: "Optimisation de 12% en moyenne",
    stat2: "500+ Déclarations suivies",
    label: "Conseil Fiscal",
  },
];

export function ServicesCardsSection() {
  return (
    <section className="bg-[#2a2a2a]/5 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-[#2a2a2a]/70">
          Pensé pour chaque besoin professionnel ou personnel
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
          Titre
        </h2>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-5 sm:overflow-visible">
          {serviceCards.map((card, index) => (
            <article
              key={card.label}
              className="relative min-w-[280px] flex-1 overflow-hidden rounded-2xl bg-[#2a2a2a] sm:min-w-0"
            >
              <div className="absolute inset-0">
                <Image
                  src={CARD_IMAGES[index]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 280px, 20vw"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              <div className="absolute inset-0 bg-[#2a2a2a]/70" />
              <div className="relative flex h-80 flex-col justify-between p-6 text-white sm:h-[22rem]">
                <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs">
                  {card.tag}
                </span>
                <div>
                  <p className="font-medium">{card.stat1}</p>
                  <p className="text-sm text-white/80">{card.stat2}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white" />
                    <span className="text-sm">{card.label}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 rounded-2xl border border-[#2a2a2a]/10 bg-white p-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#e61d2b]/10">
            <Image
              src="/images/homepage-section5/wifi-dynamic-color.png"
              alt=""
              width={28}
              height={28}
              className="object-contain"
              unoptimized
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2a2a2a]">
              Gérez tous vos besoins comptables au même endroit
            </h3>
            <p className="mt-2 text-[#2a2a2a]/80">
              Suivez vos opérations, vos factures et vos justificatifs en toute
              simplicité grâce à un accompagnement structuré et clair.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
