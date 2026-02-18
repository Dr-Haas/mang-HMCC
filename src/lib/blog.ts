import { createPublicServerClient } from "@/lib/supabase/server-public";
import { unstable_cache } from "next/cache";

type ArticleRow = Record<string, unknown>;
export const BLOG_CACHE_TAG = "blog-articles";
export const BLOG_REVALIDATE_SECONDS = 300;

export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  metaTitle: string | null;
  metaDescription: string | null;
  excerpt: string | null;
  content: string | null;
  contentHtml: string | null;
  images: string[];
  coverImage: string | null;
  author: string | null;
  publishedAt: string | null;
  isPublished: boolean;
};

function getString(row: ArticleRow, keys: string[]): string | null {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

function getBoolean(row: ArticleRow, keys: string[]): boolean | null {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      const lower = value.toLowerCase();
      if (lower === "true" || lower === "published") {
        return true;
      }
      if (lower === "false" || lower === "draft") {
        return false;
      }
    }
  }
  return null;
}

function normalizeLabel(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getPublicationStatus(row: ArticleRow): "published" | "pending" | "draft" | null {
  const statusRaw = getString(row, ["status", "etat", "state"]);
  if (!statusRaw) {
    return null;
  }

  const status = normalizeLabel(statusRaw);

  if (["published", "publie", "publiee", "live", "online", "active"].includes(status)) {
    return "published";
  }

  if (["pending", "review", "en attente", "scheduled", "planifie", "planifiee"].includes(status)) {
    return "pending";
  }

  if (["draft", "brouillon"].includes(status)) {
    return "draft";
  }

  return null;
}

function isLikelyUrl(value: string): boolean {
  return /^(https?:\/\/|\/|data:image\/|blob:)/i.test(value);
}

function collectImageUrlsFromValue(value: unknown): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return [];
    }

    if (isLikelyUrl(trimmed)) {
      return [trimmed];
    }

    // Supports comma/pipe/line-separated URL lists.
    const splitValues = trimmed
      .split(/[\n,|;]/)
      .map((part) => part.trim())
      .filter(Boolean)
      .filter(isLikelyUrl);

    return splitValues;
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectImageUrlsFromValue(item));
  }

  if (typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    return [
      ...collectImageUrlsFromValue(objectValue.url),
      ...collectImageUrlsFromValue(objectValue.src),
      ...collectImageUrlsFromValue(objectValue.path),
      ...collectImageUrlsFromValue(objectValue.image),
      ...collectImageUrlsFromValue(objectValue.image_url),
    ];
  }

  return [];
}

function getArticleImages(row: ArticleRow): string[] {
  const directKeys = [
    "image_1",
    "image_2",
    "image_3",
    "image1",
    "image2",
    "image3",
    "image_01",
    "image_02",
    "image_03",
    "cover_image",
    "featured_image",
    "hero_image",
    "thumbnail",
    "images",
    "gallery",
    "photos",
  ];

  const keyPattern = /image|img|photo|gallery|visuel|cover|thumbnail|hero/i;
  const discoveredKeys = Object.keys(row).filter((key) => keyPattern.test(key));
  const allKeys = [...new Set([...directKeys, ...discoveredKeys])];

  const urls = allKeys.flatMap((key) => collectImageUrlsFromValue(row[key]));
  const deduped = [...new Set(urls)];

  return deduped;
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeArticle(row: ArticleRow, index: number): BlogArticle {
  const title = getString(row, ["title", "titre", "name"]) ?? `Article ${index + 1}`;
  const metaTitle = getString(row, ["meta_title", "seo_title", "title_meta", "og_title"]);
  const metaDescription = getString(row, ["meta_description", "seo_description", "description_meta", "og_description"]);

  const rawId = row.id ?? row.uuid ?? row.article_id ?? row.post_id;
  const id = typeof rawId === "string" || typeof rawId === "number" ? String(rawId) : `${index}`;

  const rawSlug = getString(row, ["slug", "handle", "permalink", "url_slug"]);
  const slug = rawSlug ?? `${slugify(title) || "article"}-${id}`;

  const publishedAt =
    getString(row, [
      "published_at",
      "publication_date",
      "publishedAt",
      "date_publication",
      "created_at",
      "createdAt",
    ]) ?? null;

  const publicationStatus = getPublicationStatus(row);
  const explicitPublished = getBoolean(row, ["is_published", "published", "isPublished"]);
  const isPublished = publicationStatus
    ? publicationStatus === "published"
    : (explicitPublished ?? Boolean(publishedAt));

  const images = getArticleImages(row);

  return {
    id,
    slug,
    title,
    metaTitle,
    metaDescription,
    excerpt: getString(row, ["excerpt", "summary", "description", "chapo", "meta_description"]),
    content: getString(row, ["content", "body", "texte", "markdown", "content_markdown"]),
    contentHtml: getString(row, ["content_html", "html", "body_html"]),
    images,
    coverImage: images[0] ?? null,
    author: getString(row, ["author", "author_name", "auteur", "writer"]),
    publishedAt,
    isPublished,
  };
}

function byMostRecent(a: BlogArticle, b: BlogArticle): number {
  const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
  const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
  return bTime - aTime;
}

async function getRawArticles(): Promise<ArticleRow[]> {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase.from("articles").select("*");

  if (error) {
    throw new Error(`Supabase articles query failed: ${error.message}`);
  }

  return data ?? [];
}

const getRawArticlesCached = unstable_cache(getRawArticles, ["blog-articles-all"], {
  revalidate: BLOG_REVALIDATE_SECONDS,
  tags: [BLOG_CACHE_TAG],
});

export async function getPublishedArticles(): Promise<BlogArticle[]> {
  const rows = await getRawArticlesCached();
  return rows.map(normalizeArticle).filter((item) => item.isPublished).sort(byMostRecent);
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | null> {
  const rows = await getRawArticlesCached();
  const articles = rows.map(normalizeArticle);
  return articles.find((item) => item.slug === slug) ?? null;
}
