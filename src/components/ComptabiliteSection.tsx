import Link from "next/link";

export function ComptabiliteSection() {
  return (
    <section className="bg-[#2a2a2a]/5 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex justify-center">
            <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-[#e61d2b] text-white shadow-lg sm:h-56 sm:w-56">
              <span className="text-5xl" aria-hidden>📋</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
              Votre comptabilité sans stress
            </h2>
            <p className="mt-4 text-[#2a2a2a]/80">
              Un partenaire de confiance pour la tenue de vos comptes, les déclarations
              et la conformité. Vous restez concentré sur votre activité.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-[#e61d2b] px-6 py-3 text-base font-medium text-white transition hover:bg-[#b81a25]"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
