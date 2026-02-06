import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-[#e61d2b] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Nous proposons nos services
        </h2>
        <p className="mt-4 text-lg text-white/90">
          Faites-nous part de votre projet et nous vous recontacterons rapidement.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-[#e61d2b] transition hover:bg-white/95"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
