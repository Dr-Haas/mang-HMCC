import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function ServicesHeroSection() {
  return (
    <section className="bg-foreground/[0.04] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <AnimateOnScroll animation="fade-up">
        <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Nos services
        </h1>
        <p className="mt-4 text-lg text-foreground/70">
          Comptabilité, conseil, paie & social, création d&apos;entreprise.
          Découvrez l&apos;ensemble de nos offres pour les TPE, PME et
          indépendants.
        </p>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
