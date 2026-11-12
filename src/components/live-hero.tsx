import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import type { Opportunity } from "@prisma/client";
import { OPPORTUNITY_TYPES } from "@/lib/taxonomy";
import { opportunityTypeLabel } from "@/lib/taxonomy";
import { formatDeadline } from "@/lib/format";

export function LiveHero({
  openCount,
  closingSoon,
  counts = {},
}: {
  openCount: number;
  closingSoon: Opportunity[];
  counts?: Record<string, number>;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your gateway to global opportunities
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
          {openCount.toLocaleString()} opportunities open right now — fully funded
          scholarships, jobs, grants, and fellowships, verified from official sources.
        </p>

        <form action="/opportunities" className="mx-auto mt-8 flex max-w-xl gap-2">
          <label htmlFor="hero-search" className="sr-only">
            Search opportunities
          </label>
          <div className="relative flex-1">
            <MagnifyingGlass
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder="Search by title, organization, or country..."
              className="w-full rounded-full border border-transparent bg-white py-3 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[var(--color-on-accent)] transition-opacity hover:opacity-90"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
          {OPPORTUNITY_TYPES.slice(0, 7).map((t) => (
            <Link
              key={t.value}
              href={`/opportunities/${t.value}`}
              className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 font-medium text-white transition-colors hover:border-white hover:bg-white/20"
            >
              {t.label}
              {counts[t.value] != null && <span className="text-white/70"> ({counts[t.value]})</span>}
            </Link>
          ))}
        </div>

        {closingSoon.length > 0 && (
          <div className="mt-12 text-left">
            <h2 className="text-center text-sm font-semibold text-white/80">Closing soon</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {closingSoon.map((o) => (
                <Link
                  key={o.id}
                  href={`/opportunities/${o.type}/${o.slug}`}
                  className="rounded-xl bg-white p-4 transition-transform hover:-translate-y-0.5"
                >
                  <span className="text-xs font-semibold text-primary">
                    {opportunityTypeLabel(o.type)}
                  </span>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold text-card-foreground">
                    {o.title}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {formatDeadline(o.deadline)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
