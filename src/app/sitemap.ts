import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { OPPORTUNITY_TYPES } from "@/lib/taxonomy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const [opportunities, articles] = await Promise.all([
    prisma.opportunity.findMany({
      where: { status: "published" },
      select: { slug: true, type: true, updatedAt: true },
    }),
    prisma.article.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/opportunities`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/articles`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const typePages: MetadataRoute.Sitemap = OPPORTUNITY_TYPES.map((t) => ({
    url: `${base}/opportunities/${t.value}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const opportunityPages: MetadataRoute.Sitemap = opportunities.map((o) => ({
    url: `${base}/opportunities/${o.type}/${o.slug}`,
    lastModified: o.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...typePages, ...opportunityPages, ...articlePages];
}
