import type { Metadata } from "next";
import { searchOpportunities } from "@/lib/queries";
import { OpportunityCard } from "@/components/opportunity-card";
import { OpportunityFilters } from "@/components/opportunity-filters";
import { Pagination } from "@/components/pagination";
import { EmptyState } from "@/components/empty-state";

export const metadata: Metadata = {
  title: "Browse Opportunities",
  description:
    "Search and filter scholarships, jobs, grants, fellowships, and more from verified sources worldwide.",
};

interface PageProps {
  searchParams: Promise<{
    type?: string;
    region?: string;
    level?: string;
    fundingType?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function OpportunitiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1") || 1;

  const { items, total, totalPages } = await searchOpportunities({
    type: params.type,
    region: params.region,
    level: params.level,
    fundingType: params.fundingType,
    q: params.q,
    page,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground">
        Browse Opportunities
      </h1>
      <p className="mt-2 text-muted-foreground">
        {total} {total === 1 ? "opportunity" : "opportunities"} found
      </p>

      <div className="mt-6">
        <OpportunityFilters basePath="/opportunities" current={params} />
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="No opportunities match those filters"
          description="Try clearing a filter or searching a broader keyword."
          actionHref="/opportunities"
          actionLabel="Clear all filters"
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      )}

      <Pagination basePath="/opportunities" page={page} totalPages={totalPages} searchParams={params} />
    </div>
  );
}
