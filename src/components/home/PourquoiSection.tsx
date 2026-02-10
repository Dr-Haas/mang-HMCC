import { Check, Zap, Shield, Leaf, Users as UsersIcon } from "lucide-react";

export function PourquoiSection() {
  const reasons = [
    {
      icon: UsersIcon,
      title: "Proximité et réactivité",
      description: "Une équipe disponible et à l&apos;écoute, qui connaît vos enjeux.",
    },
    {
      icon: Shield,
      title: "Expérience reconnue",
      description: "Plus de 40 ans d&apos;expertise cumulée au service des entreprises.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Outils numériques performants et solutions de facturation électronique pour simplifier votre gestion.",
    },
    {
      icon: Leaf,
      title: "Engagement durable",
      description: "Une approche moderne et dématérialisée, respectueuse de l&apos;environnement.",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4">
            Pourquoi choisir HMCC ?
          </h2>
          <p className="text-neutral-500 font-light text-lg max-w-2xl mx-auto">
            Un partenaire de confiance qui combine expertise traditionnelle et innovation digitale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-neutral-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-300 border border-neutral-100 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-red-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Check className="text-red-600" size={20} />
                      <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-neutral-600 font-light leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-50 rounded-full blur-3xl opacity-20 -z-10"></div>
    </section>
  );
}
