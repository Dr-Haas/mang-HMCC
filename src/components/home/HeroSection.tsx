"use client";

import Link from "next/link";
import { ArrowRight, Calculator, TrendingUp, FileText, PieChart, Wallet, BarChart3, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const floatingIcons = [
    { Icon: Calculator, position: "top-[15%] left-[10%]", delay: 0, size: 40 },
    { Icon: TrendingUp, position: "top-[25%] right-[12%]", delay: 0.2, size: 36 },
    { Icon: FileText, position: "top-[50%] left-[8%]", delay: 0.4, size: 32 },
    { Icon: PieChart, position: "top-[60%] right-[10%]", delay: 0.6, size: 38 },
    { Icon: Wallet, position: "top-[35%] left-[15%]", delay: 0.8, size: 34 },
    { Icon: BarChart3, position: "top-[70%] left-[12%]", delay: 1, size: 36 },
    { Icon: CircleDollarSign, position: "top-[45%] right-[8%]", delay: 1.2, size: 40 },
  ];

  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden hero-gradient min-h-[90vh] flex items-center">
      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-600 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Cabinet d&apos;expertise comptable & audit
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-red-600 mb-6 leading-[1.1]"
          >
            Pilotez votre <br />
            <span className="text-neutral-900">croissance.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-500 font-light leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            HMCC transforme vos obligations comptables en opportunités stratégiques. Une approche moderne, digitale et humaine pour les entrepreneurs exigeants.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-red-600 text-white text-base font-medium px-8 py-3.5 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-100/50 flex items-center justify-center gap-2"
            >
              Devenir client
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto bg-white border border-neutral-200 text-neutral-900 text-base font-medium px-8 py-3.5 rounded-full hover:bg-neutral-50 transition-all flex items-center justify-center gap-2"
            >
              Découvrir nos offres
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-neutral-100 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <span className="text-sm font-semibold tracking-tight text-neutral-400">Ordre des Experts-Comptables</span>
            <span className="text-sm font-semibold tracking-tight text-neutral-400">CNCC</span>
          </motion.div>
        </div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => {
        const Icon = item.Icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: 1,
              y: [0, -20, 0],
            }}
            transition={{
              opacity: {
                duration: 3,
                repeat: Infinity,
                delay: item.delay,
              },
              scale: {
                duration: 0.5,
                delay: item.delay,
              },
              y: {
                duration: 4,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut",
              },
            }}
            className={`absolute ${item.position} hidden lg:block`}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200 shadow-lg flex items-center justify-center text-red-600">
              <Icon size={item.size} strokeWidth={1.5} />
            </div>
          </motion.div>
        );
      })}

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-40 -z-10"></div>
    </header>
  );
}
