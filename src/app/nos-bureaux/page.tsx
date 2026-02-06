import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/home/FooterSection";
import { SITE_NAME } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: `Nos bureaux | ${SITE_NAME}`,
  description:
    "Retrouvez les adresses et horaires de nos bureaux HMCC. Venez nous rencontrer ou prenez rendez-vous.",
};

const bureaux = [
  {
    name: "Siège",
    address: "123 avenue des Champs-Élysées",
    city: "75008 Paris",
    phone: "01 23 45 67 89",
    email: "contact@hmcc.fr",
    hours: "Lun–Ven 9h–18h",
  },
  {
    name: "Bureau Lyon",
    address: "45 rue de la République",
    city: "69002 Lyon",
    phone: "04 78 12 34 56",
    email: "lyon@hmcc.fr",
    hours: "Lun–Ven 9h–17h30",
  },
  {
    name: "Bureau Marseille",
    address: "12 boulevard Longchamp",
    city: "13001 Marseille",
    phone: "04 91 23 45 67",
    email: "marseille@hmcc.fr",
    hours: "Lun–Ven 9h–17h",
  },
];

export default function NosBureauxPage() {
  return (
    <div className="min-h-screen bg-white text-[#2a2a2a]">
      <Header />
      <main>
        <section className="bg-[#2a2a2a]/5 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#2a2a2a] sm:text-4xl">
              Nos bureaux
            </h1>
            <p className="mt-4 text-lg text-[#2a2a2a]/80">
              Retrouvez nos équipes dans plusieurs villes. Rendez-vous sur place ou
              à distance selon vos préférences.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {bureaux.map((bureau) => (
                <article
                  key={bureau.name}
                  className="flex flex-col rounded-2xl border border-[#2a2a2a]/10 bg-white p-8 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e61d2b]/10">
                    <span className="text-xl" aria-hidden>📍</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#2a2a2a]">{bureau.name}</h2>
                  <address className="mt-4 not-italic text-[#2a2a2a]/80">
                    <p>{bureau.address}</p>
                    <p>{bureau.city}</p>
                  </address>
                  <dl className="mt-6 space-y-2">
                    <div>
                      <dt className="sr-only">Téléphone</dt>
                      <dd>
                        <a
                          href={`tel:${bureau.phone.replace(/\s/g, "")}`}
                          className="text-[#e61d2b] hover:underline"
                        >
                          {bureau.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${bureau.email}`}
                          className="text-[#e61d2b] hover:underline"
                        >
                          {bureau.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Horaires</dt>
                      <dd className="text-[#2a2a2a]/80">{bureau.hours}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg bg-[#2a2a2a]/5">
                    <div className="flex h-full items-center justify-center text-[#2a2a2a]/30 text-sm">
                      Carte
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e61d2b] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Prendre rendez-vous
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Appelez-nous ou envoyez un message pour convenir d’un créneau.
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
