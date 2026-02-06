"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  return (
    <section id="contact" className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-2xl font-bold text-[#2a2a2a] sm:text-3xl">
          Contact
        </h2>
        <p className="mt-3 text-center text-[#2a2a2a]/80">
          Remplissez le formulaire ou contactez-nous directement.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-2xl border border-[#2a2a2a]/10 bg-white p-8 shadow-sm"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#2a2a2a]">
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-[#2a2a2a]/20 px-4 py-3 text-[#2a2a2a] focus:border-[#e61d2b] focus:outline-none focus:ring-1 focus:ring-[#e61d2b]"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2a2a2a]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-[#2a2a2a]/20 px-4 py-3 text-[#2a2a2a] focus:border-[#e61d2b] focus:outline-none focus:ring-1 focus:ring-[#e61d2b]"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#2a2a2a]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border border-[#2a2a2a]/20 px-4 py-3 text-[#2a2a2a] focus:border-[#e61d2b] focus:outline-none focus:ring-1 focus:ring-[#e61d2b]"
              placeholder="Votre message"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-md bg-[#e61d2b] px-6 py-3 font-medium text-white transition hover:bg-[#b81a25] disabled:opacity-70"
          >
            {status === "sending"
              ? "Envoi..."
              : status === "sent"
                ? "Message envoyé"
                : "Envoyer"}
          </button>
        </form>
      </div>
    </section>
  );
}
