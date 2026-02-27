import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware pour :
 * - Rediriger les URLs avec slash final vers la version sans slash (ex: /services/ → /services)
 * - S'assurer que les chemins directs sont correctement traités par Next.js
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorer les fichiers statiques et _next
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".") // .ico, .svg, .png, etc.
  ) {
    return NextResponse.next();
  }

  // Redirection : /services/ → /services (évite les 404 sur accès direct)
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const pathWithoutSlash = pathname.slice(0, -1);
    return NextResponse.redirect(new URL(pathWithoutSlash, request.url), 308);
  }

  // Pour les chemins de blog dynamiques : /blog/[slug] - pas de redirection
  if (pathname.startsWith("/blog/") && pathname !== "/blog/") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
