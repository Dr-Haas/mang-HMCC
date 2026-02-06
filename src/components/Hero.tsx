import Link from "next/link";

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#e61d2b]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#e61d2b]/5 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#2a2a2a] sm:text-4xl lg:text-5xl">
              Votre comptabilité sans stress
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[#2a2a2a]/80">
              Nous vous accompagnons au quotidien pour une gestion sereine de votre entreprise.
              Comprendre en toute simplicité.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[#e61d2b] px-6 py-3 text-base font-medium text-white transition hover:bg-[#b81a25]"
              >
                Nous contacter
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-md border border-[#2a2a2a]/20 px-6 py-3 text-base font-medium text-[#2a2a2a] transition hover:border-[#e61d2b] hover:text-[#e61d2b]"
              >
                Nos services
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#2a2a2a]/5">
            <div className="absolute inset-0 flex items-center justify-center text-[#2a2a2a]/30">
              <span className="text-sm">Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
