"use client";

/**
 * Section Figma : fond rouge foncé, 1 grand bloc (texte + valise) + 2 petits blocs (Titre + texte + 3 valises).
 * Assets valises à insérer quand fournis.
 */
export function NosBureauxRedBlocks() {
  return (
    <section className="bg-[#9E0E1B] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Grand bloc */}
        <div className="flex flex-col gap-6 rounded-2xl bg-[#b12534]/80 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-lg font-bold text-white">
            Lorem ipsum dolor sit amet, consectetur — Adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white/10 sm:h-24 sm:w-24">
            {/* Asset valise 3D */}
            <span className="text-3xl opacity-60" aria-hidden>💼</span>
          </div>
        </div>

        {/* Deux petits blocs */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#b12534]/80 p-6">
            <h3 className="text-xl font-bold text-white">Titre</h3>
            <p className="mt-2 text-white/90">
              Des solutions comptables claires et adaptées à votre activité,
              pour vous accompagner
            </p>
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10"
                  aria-hidden
                >
                  <span className="text-lg opacity-60">💼</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-[#b12534]/80 p-6">
            <h3 className="text-xl font-bold text-white">Titre</h3>
            <p className="mt-2 text-white/90">
              Des solutions comptables claires et adaptées à votre activité,
              pour vous accompagner
            </p>
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10"
                  aria-hidden
                >
                  <span className="text-lg opacity-60">💼</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
