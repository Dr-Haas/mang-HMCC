import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function FacturationHeroSection() {
  return (
    <section className="bg-foreground/[0.04] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <AnimateOnScroll animation="fade-up">
        <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Facturation électronique
        </h1>
        <p className="mt-4 text-lg text-foreground/70">
          B2B, Chorus Pro et conformité. HMCC vous accompagne pour la mise en
          place et le suivi de vos obligations.
        </p>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
