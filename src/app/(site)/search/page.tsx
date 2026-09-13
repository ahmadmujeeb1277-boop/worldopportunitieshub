import type { Metadata } from "next";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "Search" };

export default function SearchLandingPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MagnifyingGlass size={26} aria-hidden="true" />
      </span>
      <h1 className="mt-5 font-display text-3xl font-bold text-card-foreground">
        Search Opportunities
      </h1>
      <p className="mt-2 text-muted-foreground">
        Search by title, organization, or country across scholarships, jobs, grants, and
        more.
      </p>

      <form action="/opportunities" className="mt-8 flex w-full max-w-lg gap-2">
        <label htmlFor="search-q" className="sr-only">Search opportunities</label>
        <input
          id="search-q"
          name="q"
          type="search"
          autoFocus
          placeholder="e.g. Chevening, Cambridge, UNICEF..."
          className="w-full rounded-full border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="submit"
          className="shrink-0 cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90"
        >
          Search
        </button>
      </form>
    </div>
  );
}
