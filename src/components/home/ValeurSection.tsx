import Image from "next/image";
import { CheckCircle, Clock, MessageCircle } from "lucide-react";

export function ValeurSection() {
  return (
    <section id="cabinet" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-6">
              Moins de papier,<br />
              <span className="text-neutral-900">plus de valeur.</span>
            </h2>
            <p className="text-neutral-500 text-lg mb-8 font-light leading-relaxed">
              Chez HMCC, nous avons supprimé les tâches chronophages pour nous concentrer sur ce qui compte vraiment : le conseil. Nous utilisons les meilleurs outils du marché pour automatiser vos flux.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="min-w-[24px] pt-1 text-red-600">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-neutral-900">Zéro saisie manuelle</h4>
                  <p className="text-sm text-neutral-500 font-light">
                    Récupération bancaire automatique et scan de factures intelligent.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="min-w-[24px] pt-1 text-red-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-neutral-900">Temps réel</h4>
                  <p className="text-sm text-neutral-500 font-light">
                    Accédez à vos chiffres clés 24/7 sur votre smartphone ou ordinateur.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="min-w-[24px] pt-1 text-red-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-neutral-900">Réactivité garantie</h4>
                  <p className="text-sm text-neutral-500 font-light">
                    Un collaborateur dédié qui connaît votre dossier et répond sous 24h.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl border border-neutral-200 p-2">
              <Image
                src="https://images.unsplash.com/photo-1760611656007-f767a8082758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3MDQ4NjU3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Equipe HMCC"
                width={1080}
                height={1080}
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Stats Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-neutral-100 max-w-xs">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-red-600 tracking-tighter">15+</span>
                <span className="text-sm text-neutral-500 font-medium mb-1">années</span>
              </div>
              <p className="text-sm text-neutral-600 font-medium">
                D&apos;expérience au service des entrepreneurs et PME.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
