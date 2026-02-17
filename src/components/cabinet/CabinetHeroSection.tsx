"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { UnicornHeaderScene } from "@/components/decor/UnicornHeaderScene";

export function CabinetHeroSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-28 md:py-36">
      <div className="absolute inset-0">
        <UnicornHeaderScene width="100%" height="100%" />
        <div className="absolute inset-0 bg-neutral-950/35" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
          >
            <Sparkles size={16} className="text-red-300" />
            HMCC depuis 1998
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-4xl font-semibold leading-[1.15] tracking-tight text-white md:text-6xl"
          >
            Un cabinet indépendant, <br />
            <span className="bg-gradient-to-r from-red-300 to-red-100 bg-clip-text text-transparent">
              une expertise reconnue
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-neutral-200 md:text-2xl"
          >
            Plus de 25 ans d&apos;accompagnement des entrepreneurs, associations et dirigeants.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-medium text-neutral-900 shadow-2xl transition-all hover:bg-neutral-100"
            >
              Parler avec un expert
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
