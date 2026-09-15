import Link from "next/link";
import { CalendarBlank, MapPin, Sparkle } from "@phosphor-icons/react/dist/ssr";
import type { Opportunity } from "@prisma/client";
import { opportunityTypeLabel, regionLabel, fundingTypeLabel } from "@/lib/taxonomy";
import { formatDeadline } from "@/lib/format";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Link
      href={`/opportunities/${opportunity.type}/${opportunity.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {opportunityTypeLabel(opportunity.type)}
        </span>
        {opportunity.isFeatured && (
          <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-amber-800">
            <Sparkle size={12} weight="fill" aria-hidden="true" />
            Featured
          </span>
        )}
      </div>

      <h3 className="mt-3 line-clamp-2 font-display text-lg font-semibold text-card-foreground group-hover:text-primary">
        {opportunity.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{opportunity.summary}</p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin size={14} aria-hidden="true" />
          {regionLabel(opportunity.region)}
        </span>
        <span className="flex items-center gap-1">
          <CalendarBlank size={14} aria-hidden="true" />
          {formatDeadline(opportunity.deadline)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs font-medium text-muted-foreground">
          {fundingTypeLabel(opportunity.fundingType)}
        </span>
        <span className="text-sm font-semibold text-primary group-hover:underline">
          View details &rarr;
        </span>
      </div>
    </Link>
  );
}
