"use client";

const TEAM_TEXT =
  "Des solutions comptables claires et adaptées à votre activité, pour vous accompagner au quotidien et simplifier la gestion de vos finances.";

/**
 * Section Figma "La team" : titre, slogan, 2 blocs avec le même texte + emplacements pour assets (têtes 3D).
 */
export function NosBureauxTeamSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
          La team
        </h2>
        <p className="mt-2 max-w-2xl text-[#2a2a2a]/85">
          Suivez vos opérations, vos factures et vos justificatifs en toute
          simplicité grâce à un accompagnement structuré et clair.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="relative flex items-start gap-4 rounded-2xl border border-[#2a2a2a]/10 bg-white p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#fdf2f2] text-[#2a2a2a]/40">
              {/* Asset tête 3D à remplacer */}
              <span className="text-2xl" aria-hidden>👤</span>
            </div>
            <p className="font-bold text-[#2a2a2a] leading-snug">
              {TEAM_TEXT}
            </p>
          </div>
          <div className="relative flex items-start gap-4 rounded-2xl border border-[#2a2a2a]/10 bg-white p-6">
            <p className="font-bold text-[#2a2a2a] leading-snug">
              {TEAM_TEXT}
            </p>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#fdf2f2] text-[#2a2a2a]/40">
              {/* Asset tête 3D à remplacer */}
              <span className="text-2xl" aria-hidden>👤</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
