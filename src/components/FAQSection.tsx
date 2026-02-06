"use client";

import { useState } from "react";

const items = [
  {
    question: "Quels types d'entreprises accompagnez-vous ?",
    answer: "Nous accompagnons les TPE, PME et indépendants dans tous les secteurs d'activité.",
  },
  {
    question: "Comment se déroule le premier rendez-vous ?",
    answer: "Nous échangeons sur votre situation, vos objectifs et vos besoins pour vous proposer une offre sur mesure.",
  },
  {
    question: "Proposez-vous un accompagnement à la création ?",
    answer: "Oui, nous vous aidons à choisir le bon statut et à monter votre dossier de création.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#2a2a2a]/5 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
          Questions fréquentes
        </h2>
        <div className="mt-12 space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#2a2a2a]/10 bg-white shadow-sm"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-[#2a2a2a]"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                {item.question}
                <span className="text-[#e61d2b]">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="border-t border-[#2a2a2a]/10 px-6 py-4 text-[#2a2a2a]/80">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
