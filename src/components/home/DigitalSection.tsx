import { CreditCard, FileText, ShoppingBag, Briefcase } from "lucide-react";

export function DigitalSection() {
  return (
    <section id="digital" className="py-20 border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold tracking-wide text-neutral-400 uppercase mb-8">
          Compatible avec vos outils préférés
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <Briefcase className="text-neutral-800" size={24} />
            <span className="text-xl font-bold tracking-tight text-neutral-800">QuickBooks</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="text-neutral-800" size={24} />
            <span className="text-xl font-bold tracking-tight text-neutral-800">Pennylane</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="text-neutral-800" size={24} />
            <span className="text-xl font-bold tracking-tight text-neutral-800">Tiime</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-neutral-800" size={24} />
            <span className="text-xl font-bold tracking-tight text-neutral-800">Silæ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
