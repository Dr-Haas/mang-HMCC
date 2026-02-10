import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface PageCTASectionProps {
  title: string;
  description: string;
  buttonLabel?: string;
}

export function PageCTASection({
  title,
  description,
  buttonLabel = "Nous contacter",
}: PageCTASectionProps) {
  return (
    <section className="bg-hmcc-red px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <AnimateOnScroll animation="fade-up">
        <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="mt-4 text-lg text-white/90">{description}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-hmcc-red transition hover:bg-white/95"
        >
          {buttonLabel}
        </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
