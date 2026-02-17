import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-red-600">Erreur 404</p>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
          Page introuvable
        </h1>
        <p className="mb-10 text-lg font-light text-neutral-600">
          La page que vous recherchez n&apos;existe pas ou a ete deplacee.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-red-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Retour a l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-neutral-300 px-8 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
