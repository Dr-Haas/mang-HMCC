import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function NosBureauxHeroSection() {
  return (
    <section className="bg-foreground/[0.04] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <AnimateOnScroll animation="fade-up">
        <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Nos bureaux
        </h1>
        <p className="mt-4 text-lg text-foreground/70">
          Retrouvez les adresses et horaires de nos bureaux HMCC. Venez nous
          rencontrer ou prenez rendez-vous.
        </p>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
