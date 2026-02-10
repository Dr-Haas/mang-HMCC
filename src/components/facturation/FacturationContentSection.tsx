import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function FacturationContentSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <AnimateOnScroll animation="slide-left">
        <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Un projet facturation électronique ?
        </h2>
        <p className="mt-4 text-foreground/80">
          Parlons de votre situation et des solutions adaptées à votre
          activité.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-hmcc-red px-8 py-3 text-base font-medium text-white transition hover:bg-hmcc-red-dark"
        >
          Nous contacter
        </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
