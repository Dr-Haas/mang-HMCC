import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SITE_NAME } from "@/app/lib/constants";
import { UnicornHeaderScene } from "@/components/decor/UnicornHeaderScene";
import { getPublishedArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: "Retrouvez nos articles et conseils pour les entrepreneurs et dirigeants.",
};

function formatDate(value: string | null): string {
  if (!value) {
    return "Date non renseignée";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-neutral-950 py-28 md:py-36">
        <div className="absolute inset-0">
          <UnicornHeaderScene width="100%" height="100%" />
          <div className="absolute inset-0 bg-neutral-950/35" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              <Sparkles size={16} className="text-red-300" />
              Actualités HMCC
            </div>

            <h1 className="mb-6 text-4xl font-semibold leading-[1.15] tracking-tight text-white md:text-6xl">
              Blog
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-neutral-200 md:text-2xl">
              Tous nos articles publiés sur l&apos;actualité entrepreneuriale, fiscale et comptable.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-neutral-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {articles.length === 0 ? (
            <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center">
              <h2 className="text-2xl font-semibold text-neutral-900">Aucun article publié pour le moment</h2>
              <p className="mt-3 text-neutral-600">Les prochains contenus apparaîtront ici automatiquement.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-red-200"
                >
                  {article.coverImage ? (
                    <div
                      className="h-44 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${article.coverImage})` }}
                      aria-hidden
                    />
                  ) : (
                    <div className="flex h-44 items-center justify-center bg-neutral-100 text-sm text-neutral-500">
                      Aucun visuel
                    </div>
                  )}

                  <div className="space-y-4 p-6">
                    <div className="text-sm text-neutral-500">{formatDate(article.publishedAt)}</div>
                    <h2 className="text-2xl font-semibold leading-tight text-neutral-900">{article.title}</h2>
                    <p className="line-clamp-3 text-neutral-600">
                      {article.excerpt ?? "Cliquez pour lire l'article complet."}
                    </p>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center text-sm font-medium text-red-600 transition-colors group-hover:text-red-700"
                    >
                      Lire l&apos;article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
