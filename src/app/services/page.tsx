import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/home/FooterSection";
import { SITE_NAME } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: `Services | ${SITE_NAME}`,
  description:
    "Comptabilité, conseil, paie & social, création d'entreprise. Découvrez l'ensemble de nos services pour les TPE, PME et indépendants.",
};

const services = [
  {
    title: "Comptabilité",
    icon: "📊",
    description:
      "Tenue de comptes, enregistrement des écritures, rapprochements bancaires. Nous assurons la clôture annuelle et les déclarations fiscales (TVA, impôts, liasse) pour que vous restiez en conformité en toute sérénité.",
    points: [
      "Tenue de comptes et clôture",
      "Déclarations fiscales (TVA, IS/IR)",
      "Tableaux de bord et suivi",
    ],
  },
  {
    title: "Conseil",
    icon: "💡",
    description:
      "Stratégie fiscale, optimisation de la structure et accompagnement dans vos décisions. Nous vous aidons à anticiper et à choisir les options les plus adaptées à votre activité.",
    points: [
      "Stratégie fiscale et optimisation",
      "Choix de statut et montages",
      "Accompagnement décisionnel",
    ],
  },
  {
    title: "Paie & social",
    icon: "👥",
    description:
      "Gestion de la paie, bulletins, déclarations sociales et obligations employeur. Un interlocuteur dédié pour gérer l'administratif du personnel.",
    points: [
      "Établissement des bulletins de paie",
      "Déclarations sociales (DSN, URSSAF…)",
      "Conventions collectives et droit du travail",
    ],
  },
  {
    title: "Création d'entreprise",
    icon: "🚀",
    description:
      "Montage de votre dossier de création, choix du statut (SARL, SAS, auto-entrepreneur…), rédaction des statuts et accompagnement jusqu'à l'immatriculation.",
    points: [
      "Choix du statut et du régime fiscal",
      "Rédaction des statuts",
      "Dossier d'immatriculation et suivi",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[#2a2a2a]">
      <Header />
      <main>
        <section className="bg-[#2a2a2a]/5 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#2a2a2a] sm:text-4xl">
              Nos services
            </h1>
            <p className="mt-4 text-lg text-[#2a2a2a]/80">
              Des solutions adaptées à la taille et aux besoins de votre entreprise.
              Comptabilité, conseil, paie et création : nous vous accompagnons à chaque étape.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-20">
            {services.map((service) => (
              <article
                key={service.title}
                className="grid gap-10 rounded-2xl border border-[#2a2a2a]/10 bg-white p-8 shadow-sm sm:grid-cols-[auto_1fr] sm:p-10"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#e61d2b]/10 text-3xl sm:h-20 sm:w-20">
                  {service.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2a2a2a]">{service.title}</h2>
                  <p className="mt-4 text-[#2a2a2a]/80">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-[#2a2a2a]/90"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e61d2b]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#e61d2b] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Un projet ? Parlons-en
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Demandez un devis ou un premier rendez-vous sans engagement.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-[#e61d2b] transition hover:bg-white/95"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
