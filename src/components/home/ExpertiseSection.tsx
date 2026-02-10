import Link from "next/link";
import { Calculator, Users, Scale, TrendingUp, ArrowRight } from "lucide-react";

export function ExpertiseSection() {
  return (
    <section id="expertises" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-red-600 mb-4">
              Une expertise à 360°
            </h2>
            <p className="text-neutral-500 font-light text-lg">
              Nous accompagnons le dirigeant à chaque étape de la vie de l&apos;entreprise, de la création à la transmission.
            </p>
          </div>
          <Link href="/services" className="text-neutral-900 font-medium border-b border-red-600 pb-0.5 hover:text-red-600 transition-colors flex items-center gap-1">
            Voir toutes les missions <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Main (Compta) */}
          <div className="md:col-span-2 bg-neutral-50 rounded-3xl p-8 md:p-10 hover:bg-white hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-300 border border-neutral-100 group cursor-default">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                <Calculator size={28} />
              </div>
              <ArrowRight className="text-neutral-300 group-hover:text-red-600 transition-colors" size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-3 tracking-tight">
              Comptabilité & Fiscalité
            </h3>
            <p className="text-neutral-500 font-light leading-relaxed max-w-md">
              Tenue comptable rigoureuse, bilans, liasses fiscales et conseils d&apos;optimisation pour sécuriser votre patrimoine.
            </p>
          </div>

          {/* Card 2: Social */}
          <div className="bg-white rounded-3xl p-8 hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-300 border border-neutral-100 group cursor-default">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-900 group-hover:text-red-600 transition-colors">
                <Users size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2 tracking-tight">
              Social & RH
            </h3>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">
              Gestion de la paie, contrats de travail et audit social.
            </p>
          </div>

          {/* Card 3: Juridique */}
          <div className="bg-white rounded-3xl p-8 hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-300 border border-neutral-100 group cursor-default">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-900 group-hover:text-red-600 transition-colors">
                <Scale size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2 tracking-tight">
              Juridique
            </h3>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">
              Secrétariat juridique annuel, création de sociétés, modifications statutaires.
            </p>
          </div>

          {/* Card 4: Audit & Conseil (Large) */}
          <div className="md:col-span-2 bg-neutral-900 rounded-3xl p-8 md:p-10 group cursor-default relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                  <TrendingUp size={28} />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">
                Audit & Conseil Stratégique
              </h3>
              <p className="text-neutral-400 font-light leading-relaxed max-w-md">
                Commissariat aux comptes, audit d&apos;acquisition et tableaux de bord prévisionnels pour éclairer vos décisions.
              </p>
            </div>
            {/* Subtle background effect */}
            <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-red-900/20 to-transparent opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
