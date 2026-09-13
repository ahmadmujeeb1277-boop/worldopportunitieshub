import { prisma } from "./prisma";

export function featuredOpportunities(take = 6) {
  return prisma.opportunity.findMany({
    where: { status: "published", isFeatured: true },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export function latestOpportunities(take = 8) {
  return prisma.opportunity.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
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
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { summary: { contains: q } },
            { organization: { contains: q } },
          ],
        }
      : {}),
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

export function relatedOpportunities(type: string, excludeId: string, take = 4) {
  return prisma.opportunity.findMany({
    where: { type, status: "published", NOT: { id: excludeId } },
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

export function opportunityCountsByType() {
  return prisma.opportunity.groupBy({
    by: ["type"],
    where: { status: "published" },
    _count: { _all: true },
  });
}
