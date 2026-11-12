import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

// Listings with no deadline (rolling) or a deadline that hasn't passed yet.
function stillOpen() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return { OR: [{ deadline: null }, { deadline: { gte: startOfToday } }] };
}

export function featuredOpportunities(take = 6) {
  return prisma.opportunity.findMany({
    where: { status: "published", isFeatured: true, ...stillOpen() },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export function latestOpportunities(take = 8) {
  return prisma.opportunity.findMany({
    where: { status: "published", ...stillOpen() },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

const LATEST_WINDOW_HOURS = 72;

// Anything published in the last 72 hours, across every category. The
// cutoff is computed per request, so items drop out on their own.
export function recentOpportunities(take = 6) {
  const cutoff = new Date(Date.now() - LATEST_WINDOW_HOURS * 60 * 60 * 1000);
  return prisma.opportunity.findMany({
    where: { status: "published", publishedAt: { gte: cutoff }, ...stillOpen() },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export function latestOpportunitiesByType(type: string, take = 5) {
  return prisma.opportunity.findMany({
    where: { status: "published", type, ...stillOpen() },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export function openOpportunityCount() {
  return prisma.opportunity.count({ where: { status: "published", ...stillOpen() } });
}

// The nearest-deadline open opportunities, for a "closing soon" hero strip —
// real listings, not a decorative counter.
export function closingSoonOpportunities(take = 4) {
  return prisma.opportunity.findMany({
    where: { status: "published", deadline: { gte: new Date() } },
    orderBy: { deadline: "asc" },
    take,
  });
}

export function latestArticles(take = 3) {
  return prisma.article.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export interface OpportunityFilters {
  type?: string;
  region?: string;
  level?: string;
  fundingType?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}

export async function searchOpportunities(filters: OpportunityFilters) {
  const { type, region, level, fundingType, q, page = 1, pageSize = 12 } = filters;

  const where = {
    status: "published" as const,
    ...(type ? { type } : {}),
    ...(region ? { region } : {}),
    ...(level ? { level } : {}),
    ...(fundingType ? { fundingType } : {}),
    AND: [
      stillOpen(),
      ...(q
        ? [
            {
              OR: [
                { title: { contains: q } },
                { summary: { contains: q } },
                { organization: { contains: q } },
              ],
            },
          ]
        : []),
    ],
  };

  const [items, total] = await Promise.all([
    prisma.opportunity.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.opportunity.count({ where }),
  ]);

  return { items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export function opportunityBySlug(slug: string) {
  return prisma.opportunity.findUnique({
    where: { slug },
    include: { tags: { include: { tag: true } } },
  });
}

// Always shows currently-open opportunities, even when viewed from an
// expired listing's page — a "related" expired listing isn't useful.
export function relatedOpportunities(type: string, excludeId: string, take = 4) {
  return prisma.opportunity.findMany({
    where: { type, status: "published", NOT: { id: excludeId }, ...stillOpen() },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export function articleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: { tags: { include: { tag: true } } },
  });
}

export function allArticles(page = 1, pageSize = 9) {
  return prisma.article
    .findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
    .then(async (items) => {
      const total = await prisma.article.count({ where: { status: "published" } });
      return { items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
    });
}

// A count per type, for showing "(n)" next to category links/options —
// counts only published AND currently-open listings, matching what the
// category list pages actually show. Cached for 5 minutes: this now runs
// in the shared site layout on every page, and the shared-hosting MySQL
// plan has a max_connections_per_hour cap — an uncached query here would
// run on every single page view.
export const opportunityCountsByType = unstable_cache(
  async (): Promise<Record<string, number>> => {
    const rows = await prisma.opportunity.groupBy({
      by: ["type"],
      where: { status: "published", ...stillOpen() },
      _count: { _all: true },
    });
    return Object.fromEntries(rows.map((r) => [r.type, r._count._all]));
  },
  ["opportunity-counts-by-type"],
  { revalidate: 300 },
);
