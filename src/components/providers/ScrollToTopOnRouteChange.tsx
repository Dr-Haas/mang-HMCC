"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTopOnRouteChange({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return <>{children}</>;
}
