"use client";

import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/app/lib/constants";

/**
 * Hero de la page Contact inspiré du Figma :
 * gauche = titre "Contactez nous" + formes roses, centre = "Notre adresse ?", droite = texte + téléphone + email.
 */
export function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
        {/* Gauche : titre + formes décoratives */}
        <div className="relative flex flex-col justify-center lg:col-span-4">
          {/* Formes abstraites rose clair (arrière-plan) */}
          <div
            className="pointer-events-none absolute -left-8 -top-4 h-40 w-40 rounded-full bg-[#fce4ec]/60 blur-2xl sm:h-52 sm:w-52"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#f8bbd0]/50 blur-2xl sm:h-72 sm:w-72"
            aria-hidden
          />
          <h1 className="relative text-4xl font-bold leading-tight text-[#2a2a2a] sm:text-5xl lg:text-5xl">
            Contactez
            <br />
            nous
          </h1>
        </div>

        {/* Centre : séparateurs rouges + cercle "Notre adresse ?" */}
        <div className="flex flex-col items-center justify-center lg:col-span-4">
          <div className="flex items-center justify-center gap-4">
            <span className="hidden h-24 w-0.5 bg-[#e61d2b] lg:block" aria-hidden />
            <Link
              href="/nos-bureaux"
              className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full bg-[#e61d2b] text-center text-sm font-medium text-white transition hover:bg-[#b81a25] sm:h-32 sm:w-32"
              aria-label="Voir notre adresse sur la page Nos bureaux"
            >
              Notre adresse ?
            </Link>
            <span className="hidden h-24 w-0.5 bg-[#e61d2b] lg:block" aria-hidden />
          </div>
        </div>

        {/* Droite : texte + téléphone + email */}
        <div className="relative flex flex-col justify-center lg:col-span-4">
          <div
            className="pointer-events-none absolute -right-4 bottom-0 h-32 w-32 rounded-full bg-[#fce4ec]/50 blur-2xl sm:h-40 sm:w-40"
            aria-hidden
          />
          <p className="relative text-[#2a2a2a]/90">
            Pour prendre rendez-vous, n&apos;hésitez pas à nous contacter par
            téléphone ou par mail.
          </p>
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="relative mt-4 text-xl font-bold text-[#2a2a2a] hover:text-[#e61d2b] sm:text-2xl"
          >
            {CONTACT_PHONE}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="relative mt-2 text-xl font-bold text-[#2a2a2a] underline decoration-[#2a2a2a] underline-offset-2 hover:text-[#e61d2b] hover:decoration-[#e61d2b] sm:text-2xl"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="relative mt-4 text-[#2a2a2a]/90">A bientôt !</p>
        </div>
      </div>
    </section>
  );
}
