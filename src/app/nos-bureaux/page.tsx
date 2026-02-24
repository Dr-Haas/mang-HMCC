import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { BureauxSection } from "@/components/home/BureauxSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Nos bureaux",
  description: "Decouvrez nos bureaux a Paris 12e et Arpajon (Essonne).",
  path: "/nos-bureaux",
  keywords: ["cabinet comptable Paris", "cabinet comptable Arpajon", "HMCC bureaux"],
});

export default function NosBureauxPage() {
  return (
    <main>
      <div className="pt-20">
        <BureauxSection />
      </div>
    </main>
  );
}
