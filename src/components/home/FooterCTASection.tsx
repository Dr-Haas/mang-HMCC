"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CONTACT_PHONE } from "@/app/lib/constants";

export function FooterCTASection({ transparentBg = false }: { transparentBg?: boolean }) {
  return (
    <section
      className={`py-24 bg-transparent relative overflow-hidden`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-6">
          Vous recherchez un expert-comptable à Paris ou en Essonne ?
        </h2>
        <p className="text-xl text-neutral-900 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
          Notre équipe est à votre disposition pour vous conseiller et définir
          une stratégie adaptée à vos besoins.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-red-600 text-white text-base font-medium px-8 py-3.5 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
          >
            Prendre rendez-vous
            <ArrowRight size={20} />
          </Link>
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-base font-medium px-8 py-3.5 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Phone size={20} className="text-red-600" />
            <span className="text-red-600">{CONTACT_PHONE}</span>
          </a>
        </div>
        {/* Trust badge */}
        <div className="mt-12 pt-8 border-t border-white/10 text-neutral-900 font-medium text-base">
          <p>✓ Premier rendez-vous de conseil offert</p>
        </div>
      </div>
    </section>
  );
}
