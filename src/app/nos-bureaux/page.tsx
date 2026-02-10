import type { Metadata } from "next";
import { SITE_NAME } from "@/app/lib/constants";
import { BureauxSection } from "@/components/home/BureauxSection";

export const metadata: Metadata = {
  title: `Nos bureaux | ${SITE_NAME}`,
  description: "Découvrez nos deux bureaux à Paris 12ème et Arpajon (Essonne).",
};

export default function NosBureauxPage() {
  return (
    <main>
      <div className="pt-20">
        <BureauxSection />
      </div>
    </main>
  );
}
