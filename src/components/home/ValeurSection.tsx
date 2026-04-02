import { CheckCircle, Clock, MessageCircle } from "lucide-react";

export function ValeurSection({
  transparentBg = false,
}: {
  transparentBg?: boolean;
}) {
  return (
    <section
      id="cabinet"
      className={`py-24 ${
        transparentBg ? "bg-transparent" : "bg-neutral-50"
      } relative overflow-hidden`}
    >
      {/* Blur overlay, mais le background reste sur la section */}
      {!transparentBg && (
        <div className="absolute inset-0 z-0 pointer-events-none backdrop-blur-lg bg-neutral-50/30" />
      )}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Espace vide à gauche */}
          <div className="hidden lg:block" />

          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-6">
              Moins de papier,
              <br />
              <span className="text-neutral-900">plus de valeur.</span>
            </h2>
            <p className="text-neutral-900 text-xl mb-8 font-medium leading-relaxed">
              Chez HMCC, nous avons supprimé les tâches chronophages pour nous
              concentrer sur ce qui compte vraiment : le conseil. Nous utilisons
              les meilleurs outils du marché pour automatiser vos flux.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="min-w-[24px] pt-1 text-red-600">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-neutral-900">
                    Zéro saisie manuelle
                  </h4>
                  <p className="text-lg text-neutral-900 font-medium">
                    Récupération bancaire automatique et scan de factures
                    intelligent.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="min-w-[24px] pt-1 text-red-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-neutral-900">
                    Temps réel
                  </h4>
                  <p className="text-base text-neutral-900 font-medium">
                    Accédez à vos chiffres clés 24/7 sur votre smartphone ou
                    ordinateur.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="min-w-[24px] pt-1 text-red-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-neutral-900">
                    Réactivité garantie
                  </h4>
                  <p className="text-base text-neutral-900 font-medium">
                    Un collaborateur dédié qui connaît votre dossier et répond
                    sous 24h.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
