import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

  const [heroImage, ...galleryImages] = article.images;
  const articleBodyClassName =
    "text-neutral-800 " +
    "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-neutral-900 " +
    "[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-neutral-900 " +
    "[&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:leading-snug [&_h4]:text-neutral-900 " +
    "[&_p]:my-5 [&_p]:text-lg [&_p]:leading-8 " +
    "[&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-lg [&_ul]:leading-8 " +
    "[&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-lg [&_ol]:leading-8 " +
    "[&_blockquote]:my-8 [&_blockquote]:rounded-r-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-red-500 [&_blockquote]:bg-red-50/70 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic " +
    "[&_a]:font-medium [&_a]:text-red-600 [&_a]:underline [&_a]:decoration-red-300 [&_a]:underline-offset-2 hover:[&_a]:text-red-700 " +
    "[&_hr]:my-10 [&_hr]:border-neutral-200 " +
    "[&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.95em] " +
    "[&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-neutral-900 [&_pre]:p-4 [&_pre]:text-neutral-100 " +
    "[&_pre_code]:bg-transparent [&_pre_code]:p-0 " +
    "[&_img]:my-8 [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-neutral-200";

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

        {heroImage ? (
          <figure className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
            <div className="relative aspect-[16/7] w-full">
              <Image src={heroImage} alt={article.title} fill className="object-cover" sizes="(min-width: 1024px) 896px, 100vw" />
            </div>
          </figure>
        ) : null}

        <section className={`mt-10 ${articleBodyClassName}`}>
          {article.contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          ) : article.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          ) : (
            <p>Le contenu de cet article n&apos;est pas encore disponible.</p>
          )}
        </section>

        {galleryImages.length > 0 ? (
          <section className="mt-14 border-t border-neutral-200 pt-10">
            <h2 className="text-2xl font-semibold leading-tight text-neutral-900">Galerie</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {galleryImages.map((imageUrl, index) => (
                <figure key={`${imageUrl}-${index}`} className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={imageUrl}
                      alt={`${article.title} - image ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 430px, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
