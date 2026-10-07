import Link from "next/link";
import type { Opportunity } from "@prisma/client";
import { typeTheme } from "@/lib/type-theme";
import { KindIcon } from "./card-image";
import { OpportunityCard } from "./opportunity-card";
import { OpportunityRow } from "./opportunity-row";

// One homepage block per opportunity type: colored heading, one large lead
// card, and a short list of the next newest underneath/beside it.
export function CategorySection({
  type,
  title,
  blurb,
  items,
}: {
  type: string;
  title: string;
  blurb: string;
  items: Opportunity[];
}) {
  if (items.length === 0) return null;

  const theme = typeTheme(type);
  const [lead, ...rest] = items;

  return (
    <section className={`border-t border-border py-14 ${theme.band}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${theme.iconWrap}`}
            >
              <KindIcon kind={type} size={26} />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold text-card-foreground">{title}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{blurb}</p>
            </div>
          </div>
          <Link
            href={`/opportunities/${type}`}
            className={`rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors ${theme.seeMore}`}
          >
            See more {title.toLowerCase()} &rarr;
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <OpportunityCard opportunity={lead} />
          </div>
          {rest.length > 0 && (
            <div className="flex flex-col gap-3 lg:col-span-2">
              {rest.map((o) => (
                <div
                  key={o.id}
                  className={rest.length >= 3 ? "flex flex-1 [&>a]:w-full" : "[&>a]:w-full"}
                >
                  <OpportunityRow opportunity={o} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
