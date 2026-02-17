import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME } from "@/app/lib/constants";
import { getArticleBySlug, getPublishedArticles } from "@/lib/blog";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: `Article introuvable | ${SITE_NAME}`,
    };
  }

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.excerpt ?? `Découvrez l'article ${article.title} sur le blog ${SITE_NAME}.`,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? `Découvrez l'article ${article.title}.`,
      images: article.images.map((url) => ({ url })),
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.isPublished) {
    notFound();
  }

  return (
    <main className="pt-20">
      <article className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <Link href="/blog" className="text-sm font-medium text-red-600 hover:text-red-700">
          Retour au blog
        </Link>

        <header className="mt-6 border-b border-neutral-200 pb-8">
          <p className="text-sm text-neutral-500">{formatDate(article.publishedAt)}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-red-600 md:text-5xl">
            {article.title}
          </h1>
          {article.author ? <p className="mt-4 text-neutral-600">Par {article.author}</p> : null}
          {article.excerpt ? <p className="mt-5 text-lg leading-relaxed text-neutral-600">{article.excerpt}</p> : null}
        </header>

        {article.images.length > 0 ? (
          <div className="mt-10 space-y-4">
            <div
              className="h-72 w-full rounded-3xl bg-cover bg-center md:h-96"
              style={{ backgroundImage: `url(${article.images[0]})` }}
              aria-hidden
            />
            {article.images.length > 1 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {article.images.slice(1).map((imageUrl, index) => (
                  <div
                    key={`${imageUrl}-${index}`}
                    className="h-56 w-full rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    aria-hidden
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <section className="mt-10 space-y-6 text-lg leading-relaxed text-neutral-800">
          {article.contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          ) : (
            <p className="whitespace-pre-wrap">{article.content ?? "Le contenu de cet article n'est pas encore disponible."}</p>
          )}
        </section>
      </article>
    </main>
  );
}
