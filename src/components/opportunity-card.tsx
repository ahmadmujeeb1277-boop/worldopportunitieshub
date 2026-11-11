import Link from "next/link";
import { CalendarBlank, MapPin, Sparkle } from "@phosphor-icons/react/dist/ssr";
import type { Opportunity } from "@prisma/client";
import { opportunityTypeLabel, regionLabel, fundingTypeLabel } from "@/lib/taxonomy";
import { formatDate, formatDeadline } from "@/lib/format";
import { typeTheme } from "@/lib/type-theme";
import { CardImage } from "./card-image";

// One card design everywhere a listing appears. `compact` trades the
// 16:9 hero image and full paragraph for a smaller thumbnail and tighter
// type — for secondary slots (e.g. a homepage category's side list) that
// need to fit several per section — but keeps every field the full card
// has: image, category tag, title, excerpt, deadline, and funding badge.
export function OpportunityCard({
  opportunity,
  compact = false,
}: {
  opportunity: Opportunity;
  compact?: boolean;
}) {
  const theme = typeTheme(opportunity.type);
  const href = `/opportunities/${opportunity.type}/${opportunity.slug}`;

  if (compact) {
    return (
      <Link
        href={href}
        className={`group flex gap-4 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md ${theme.hoverBorder}`}
      >
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
          <CardImage
            src={opportunity.coverImage}
            alt=""
            kind={opportunity.type}
            iconSize={28}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <span className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold ${theme.badge}`}>
            {opportunityTypeLabel(opportunity.type)}
          </span>
          <h3 className="line-clamp-1 font-display text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary">
            {opportunity.title}
          </h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">{opportunity.summary}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarBlank size={12} aria-hidden="true" />
              {formatDeadline(opportunity.deadline)}
            </span>
            <span className="font-medium">{fundingTypeLabel(opportunity.fundingType)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md ${theme.hoverBorder}`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <CardImage
          src={opportunity.coverImage}
          alt=""
          kind={opportunity.type}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {opportunity.isFeatured && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-amber-800 shadow-sm">
            <Sparkle size={12} weight="fill" aria-hidden="true" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${theme.badge}`}>
            {opportunityTypeLabel(opportunity.type)}
          </span>
          {opportunity.publishedAt && (
            <span className="text-xs text-muted-foreground">
              Posted {formatDate(opportunity.publishedAt)} &middot; Jabeen
            </span>
          )}
        </div>

        <h3 className="mt-3 line-clamp-2 font-display text-lg font-semibold text-card-foreground group-hover:text-primary">
          {opportunity.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{opportunity.summary}</p>

        <div className="mb-4 mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin size={14} aria-hidden="true" />
            {regionLabel(opportunity.region)}
          </span>
          <span className="flex items-center gap-1">
            <CalendarBlank size={14} aria-hidden="true" />
            {formatDeadline(opportunity.deadline)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs font-medium text-muted-foreground">
            {fundingTypeLabel(opportunity.fundingType)}
          </span>
          <span className="text-sm font-semibold text-primary group-hover:underline">
            View details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
