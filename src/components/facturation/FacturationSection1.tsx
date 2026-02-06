"use client";

/**
 * Section 1 Facturation électronique (Figma node 86:75 - bloc du haut).
 * Charte : bloc gris clair (#F0F0F0) à coins arrondis. Gauche : liste verticale d’onglets (même libellé ou variantes). Droite : titre, sous-titre, paragraphe.
 */
const TABS = [
  "Suivi comptable automatisé",
  "Gestion sociale complète",
  "Accompagnement stratégique",
  "Facturation électronique",
  "Transmission Chorus Pro",
  "Conservation des preuves",
];

export function FacturationSection1() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Blobs rose pâle en haut (charte) */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full opacity-90"
        style={{
          background: "radial-gradient(circle, rgba(248, 232, 233, 0.9) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full opacity-90"
        style={{
          background: "radial-gradient(circle, rgba(248, 232, 233, 0.9) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl bg-[#f0f0f0] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
            {/* Gauche : onglets verticaux */}
            <div className="border-b border-[#2a2a2a]/10 p-6 lg:border-b-0 lg:border-r lg:py-8">
              <ul className="space-y-2">
                {TABS.map((label, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                        i === 0
                          ? "bg-[#2a2a2a]/10 text-[#2a2a2a]"
                          : "bg-[#e5e5e5] text-[#2a2a2a]/80 hover:bg-[#2a2a2a]/5"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Droite : titre, sous-titre, paragraphe */}
            <div className="flex flex-col justify-center p-6 lg:p-10">
              <h2 className="text-xl font-bold text-[#2a2a2a] sm:text-2xl lg:text-3xl">
                Votre gestion comptable, toujours à jour.
              </h2>
              <p className="mt-2 text-sm font-bold text-[#2a2a2a]/90 sm:text-base">
                Suivi comptable automatisé
              </p>
              <p className="mt-4 text-[#2a2a2a]/85 leading-relaxed">
                Nous assurons la mise à jour de vos écritures et le suivi de vos opérations en continu, pour vous offrir une vision claire de votre activité à tout moment. La facturation électronique s&apos;intègre à ce suivi pour garantir conformité et traçabilité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
