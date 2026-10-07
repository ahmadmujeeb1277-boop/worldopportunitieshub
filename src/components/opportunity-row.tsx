import Link from "next/link";
import { CalendarBlank, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Opportunity } from "@prisma/client";
import { regionLabel } from "@/lib/taxonomy";
import { formatDate } from "@/lib/format";
import { typeTheme } from "@/lib/type-theme";
import { CardImage } from "./card-image";

// Compact list item: small thumbnail on the left, title and meta on the right.
export function OpportunityRow({ opportunity }: { opportunity: Opportunity }) {
  const theme = typeTheme(opportunity.type);

  return (
    <Link
      href={`/opportunities/${opportunity.type}/${opportunity.slug}`}
      className={`group flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${theme.hoverBorder}`}
    >
      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
        <CardImage src={opportunity.coverImage} alt="" kind={opportunity.type} iconSize={28} />
      </div>
      <div className="flex min-w-0 flex-col justify-center">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary">
          {opportunity.title}
        </h3>
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarBlank size={12} aria-hidden="true" />
            {formatDate(opportunity.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} aria-hidden="true" />
            {regionLabel(opportunity.region)}
          </span>
        </div>
      </div>
    </Link>
  );
}
