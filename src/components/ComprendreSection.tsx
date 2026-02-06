import Link from "next/link";

export function ComprendreSection() {
  return (
    <section id="apropos" className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute right-0 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#e61d2b]/10 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[#e61d2b]/5 blur-2xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
              Comprendre en toute simplicité
            </h2>
            <p className="mt-4 text-[#2a2a2a]/80">
              Nous mettons l&apos;expertise comptable à votre portée. Des explications claires,
              des tableaux de bord lisibles et un interlocuteur dédié pour avancer sereinement.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-[#e61d2b] px-6 py-3 text-base font-medium text-white transition hover:bg-[#b81a25]"
            >
              En savoir plus
            </Link>
          </div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-16 w-16 rounded-lg bg-[#e61d2b]/20 sm:h-20 sm:w-20"
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
