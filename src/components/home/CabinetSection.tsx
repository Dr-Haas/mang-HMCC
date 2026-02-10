import { Award, Users } from "lucide-react";

export function CabinetSection() {
  const leaders = [
    {
      name: "Hervé Miniou",
      role: "Expert-Comptable",
      inscription: "Inscrit à l&apos;Ordre depuis 1983",
      experience: "40+ ans d&apos;expérience",
    },
    {
      name: "Alan Miniou",
      role: "Expert-Comptable",
      inscription: "Inscrit à l&apos;Ordre depuis 2006",
      experience: "18+ ans d&apos;expérience",
    },
  ];

  return (
    <section className="py-24 bg-neutral-50 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-medium text-red-600 mb-6">
              <Award size={16} />
              Depuis 1998
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-6">
              Un cabinet indépendant,<br />
              <span className="text-neutral-900">une expertise reconnue.</span>
            </h2>
            <p className="text-neutral-600 text-lg mb-6 font-light leading-relaxed">
              Hervé Miniou Conseil Comptabilité (HMCC) est un cabinet d&apos;expertise comptable indépendant, spécialisé en conseil, audit et commissariat aux comptes, fondé en 1998.
            </p>
            <p className="text-neutral-600 text-lg mb-8 font-light leading-relaxed">
              Depuis plus de <span className="font-semibold text-neutral-900">25 ans</span>, nous accompagnons les entreprises, dirigeants et associations dans toutes les étapes de leur développement.
            </p>

            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-neutral-200">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Users size={28} />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">500+</p>
                <p className="text-sm text-neutral-500">Clients accompagnés</p>
              </div>
            </div>
          </div>

          {/* Right - Team Cards */}
          <div className="space-y-6">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-neutral-200 hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-1 tracking-tight">
                      {leader.name}
                    </h3>
                    <p className="text-red-600 font-medium">{leader.role}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center">
                    <Award className="text-red-600" size={24} />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-neutral-600">{leader.inscription}</p>
                  <p className="text-sm font-medium text-neutral-900">{leader.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
