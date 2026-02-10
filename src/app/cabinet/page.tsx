import type { Metadata } from "next";
import { SITE_NAME } from "@/app/lib/constants";
import { CabinetSection } from "@/components/home/CabinetSection";
import { BureauxSection } from "@/components/home/BureauxSection";
import { FooterCTASection } from "@/components/home/FooterCTASection";

export const metadata: Metadata = {
  title: `Le Cabinet | ${SITE_NAME}`,
  description: "Découvrez HMCC, cabinet d'expertise comptable indépendant fondé en 1998.",
};

export default function CabinetPage() {
  return (
    <main>
      <div className="pt-20">
        <CabinetSection />
        <BureauxSection />
        <FooterCTASection />
      </div>
    </main>
  );
}
