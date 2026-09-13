import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { searchOpportunities } from "@/lib/queries";
import { OpportunityCard } from "@/components/opportunity-card";
import { OpportunityFilters } from "@/components/opportunity-filters";
import { Pagination } from "@/components/pagination";
import { EmptyState } from "@/components/empty-state";
import { OPPORTUNITY_TYPES, opportunityTypeLabel } from "@/lib/taxonomy";

interface PageProps {
  params: Promise<{ type: string }>;
  searchParams: Promise<{
    region?: string;
    level?: string;
    fundingType?: string;
    q?: string;
    page?: string;
  }>;
}

export function generateStaticParams() {
  return OPPORTUNITY_TYPES.map((t) => ({ type: t.value }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const label = opportunityTypeLabel(type);
  return {
    title: label,
    description: `Browse verified ${label.toLowerCase()} from official sources around the world.`,
  };
}

export default async function OpportunityTypePage({ params, searchParams }: PageProps) {
  const { type } = await params;
  const sp = await searchParams;

  if (!OPPORTUNITY_TYPES.some((t) => t.value === type)) {
    notFound();
  }

  const page = Number(sp.page ?? "1") || 1;
  const { items, total, totalPages } = await searchOpportunities({
    type,
    region: sp.region,
    level: sp.level,
    fundingType: sp.fundingType,
    q: sp.q,
    page,
  });

  const label = opportunityTypeLabel(type);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground">{label}</h1>
      <p className="mt-2 text-muted-foreground">
        {total} {total === 1 ? "opportunity" : "opportunities"} found
      </p>

      <div className="mt-6">
        <OpportunityFilters basePath={`/opportunities/${type}`} current={sp} lockType={type} />
      </div>

      {items.length === 0 ? (
        <EmptyState
          title={`No ${label.toLowerCase()} match those filters yet`}
          description="Try clearing a filter, or check back soon — new opportunities are added regularly."
          actionHref={`/opportunities/${type}`}
          actionLabel="Clear filters"
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      )}

      <Pagination basePath={`/opportunities/${type}`} page={page} totalPages={totalPages} searchParams={sp} />
    </div>
  );
}
