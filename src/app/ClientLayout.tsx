"use client";
import { usePathname } from "next/navigation";
import { Layout } from "@/components/Layout";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Désactive uniquement le footer sur la home
  const hideHeader = false;
  const hideFooter = pathname === "/";
  return (
    <Layout hideHeader={hideHeader} hideFooter={hideFooter}>
      {children}
    </Layout>
  );
}
