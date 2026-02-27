"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";

export function LenisScrollToTopOnRouteChange({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Use Lenis for smooth scroll to top if available
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return <>{children}</>;
}
