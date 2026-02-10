"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CONTACT_PHONE } from "@/app/lib/constants";

export function FooterCTASection() {
  return (
    <section className="py-24 bg-neutral-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
          Vous recherchez un expert-comptable à Paris ou en Essonne ?
        </h2>
        <p className="text-xl text-neutral-400 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
          Notre équipe est à votre disposition pour vous conseiller et définir une stratégie adaptée à vos besoins.
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
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base font-medium px-8 py-3.5 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            {CONTACT_PHONE}
          </a>
        </div>

        {/* Trust badge */}
        <div className="mt-12 pt-8 border-t border-white/10 text-neutral-400 text-sm">
          <p>✓ Premier rendez-vous de conseil offert</p>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-red-900/20 to-transparent opacity-50"></div>
    </section>
  );
}
