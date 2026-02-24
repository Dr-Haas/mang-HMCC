import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { BLOG_CACHE_TAG } from "@/lib/blog";

function normalizeSlug(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().replace(/^\/+|\/+$/g, "");
  return normalized || null;
}

function getSecretFromRequest(request: NextRequest): string | null {
  const fromHeader = request.headers.get("x-revalidate-secret");
  if (fromHeader) {
    return fromHeader;
  }

  const fromQuery = request.nextUrl.searchParams.get("secret");
  return fromQuery;
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.NEXT_REVALIDATE_SECRET;
  const providedSecret = getSecretFromRequest(request);

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload: unknown = await request.json().catch(() => ({}));
  const payloadObject = typeof payload === "object" && payload !== null ? (payload as Record<string, unknown>) : {};

  const rawSlugs: unknown[] = Array.isArray(payloadObject.slugs)
    ? payloadObject.slugs
    : payloadObject.slug
      ? [payloadObject.slug]
      : [];
  const slugs = rawSlugs.map(normalizeSlug).filter((value): value is string => Boolean(value));

  revalidateTag(BLOG_CACHE_TAG, "max");
  revalidatePath("/blog");

  for (const slug of slugs) {
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({
    ok: true,
    revalidated: {
      tag: BLOG_CACHE_TAG,
      paths: ["/blog", ...slugs.map((slug) => `/blog/${slug}`)],
    },
  });
}
