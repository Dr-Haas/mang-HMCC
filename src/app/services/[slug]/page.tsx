import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services-data";
import { buildPageMetadata } from "@/app/lib/seo";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service introuvable" };
  }

  return buildPageMetadata({
    title: service.title,
    description: `${service.tagline} - ${service.heroDescription.slice(0, 150)}...`,
    path: `/services/${slug}`,
    keywords: [
      service.title.toLowerCase(),
      "HMCC",
      "expert comptable",
      "cabinet comptable",
    ],
  });
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <ServicePageTemplate service={service} />
    </main>
  );
}
