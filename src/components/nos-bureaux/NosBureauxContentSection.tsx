import Link from "next/link";
import { CONTACT_PHONE } from "@/app/lib/constants";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function NosBureauxContentSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <AnimateOnScroll animation="slide-right">
        <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Prendre rendez-vous
        </h2>
        <p className="mt-4 text-foreground/80">
          Appelez-nous ou envoyez un message pour convenir d&apos;un créneau.
        </p>
        <p className="mt-2 font-medium text-foreground">{CONTACT_PHONE}</p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-hmcc-red px-8 py-3 text-base font-medium text-white transition hover:bg-hmcc-red-dark"
        >
          Nous contacter
        </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
