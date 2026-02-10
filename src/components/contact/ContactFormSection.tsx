"use client";

import { useState } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/app/lib/constants";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function ContactFormSection() {
  const [sent, setSent] = useState(false);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <AnimateOnScroll animation="fade-up">
        <div className="mx-auto max-w-xl">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Nous écrire
        </h2>
        <p className="mt-2 text-foreground/70">
          Email :{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-hmcc-red hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <br />
          Téléphone :{" "}
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="text-hmcc-red hover:underline"
          >
            {CONTACT_PHONE}
          </a>
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
            >
              Nom / Société
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-foreground"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-hmcc-red px-4 py-3 font-medium text-white transition hover:bg-hmcc-red-dark sm:w-auto"
          >
            {sent ? "Message envoyé" : "Envoyer"}
          </button>
        </form>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
