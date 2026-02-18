import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/lib/seo";
import { CabinetHeroSection } from "@/components/cabinet/CabinetHeroSection";
import { CabinetTimelineSection } from "@/components/cabinet/CabinetTimelineSection";
import { CabinetSection } from "@/components/home/CabinetSection";
import { BureauxSection } from "@/components/home/BureauxSection";
import { FooterCTASection } from "@/components/home/FooterCTASection";

export const metadata: Metadata = buildPageMetadata({
  title: "Le cabinet HMCC",
  description: "Decouvrez HMCC, cabinet d'expertise comptable independant fonde en 1998.",
  path: "/cabinet",
  keywords: ["cabinet expertise comptable", "HMCC", "expert-comptable Paris", "histoire cabinet"],
});

export default function CabinetPage() {
  return (
    <main>
      <div className="pt-20">
        <CabinetHeroSection />
        <CabinetTimelineSection />
        <CabinetSection />
        <BureauxSection />
        <FooterCTASection />
      </div>
    </main>
  );
}
