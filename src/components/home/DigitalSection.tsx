import { CreditCard, FileText, ShoppingBag, Briefcase } from "lucide-react";

export function DigitalSection({
  transparentBg = false,
}: {
  transparentBg?: boolean;
}) {
  return (
    <section
      id="digital"
      className={`py-20 ${
        transparentBg ? "bg-transparent" : "bg-white"
      } relative overflow-hidden`}
    >
      {/* Blur overlay, mais le background reste sur la section */}
      {!transparentBg && (
        <div className="absolute inset-0 z-0 pointer-events-none backdrop-blur-lg bg-white/30" />
      )}
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <p className="text-lg font-medium tracking-wide text-neutral-900 uppercase mb-8">
          Compatible avec vos outils préférés
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <Briefcase className="text-neutral-800" size={24} />
            <span className="text-xl font-bold tracking-tight text-neutral-800">
              QuickBooks
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="text-neutral-800" size={24} />
            <span className="text-xl font-bold tracking-tight text-neutral-800">
              Pennylane
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="text-neutral-800" size={24} />
            <span className="text-xl font-bold tracking-tight text-neutral-800">
              Tiime
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-neutral-800" size={24} />
            <span className="text-xl font-bold tracking-tight text-neutral-800">
              Silæ
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
