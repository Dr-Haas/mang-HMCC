import { MapPin } from "lucide-react";

export function BureauxSection() {
  const locations = [
    {
      city: "Paris 12ᵉ",
      address: "42 boulevard de la Bastille",
      postalCode: "75012 Paris",
    },
    {
      city: "Arpajon",
      address: "11 bis boulevard Abel Cornaton",
      postalCode: "91290 Arpajon, Essonne",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-red-600 mb-4">
            Deux bureaux pour mieux vous servir
          </h2>
          <p className="text-neutral-500 font-light text-lg max-w-2xl mx-auto">
            Pour être au plus proche de nos clients, HMCC dispose de deux implantations stratégiques à Paris et en Essonne.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-3xl p-8 hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-300 border border-neutral-100 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                {location.city}
              </h3>
              <p className="text-neutral-600 mb-2">{location.address}</p>
              <p className="text-neutral-500 text-sm">{location.postalCode}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
