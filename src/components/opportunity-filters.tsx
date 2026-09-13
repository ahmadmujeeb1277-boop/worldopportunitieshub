import { OPPORTUNITY_TYPES, REGIONS, LEVELS, FUNDING_TYPES } from "@/lib/taxonomy";

export function OpportunityFilters({
  basePath,
  current,
  lockType,
}: {
  basePath: string;
  current: {
    type?: string;
    region?: string;
    level?: string;
    fundingType?: string;
    q?: string;
  };
  lockType?: string;
}) {
  return (
    <form
      action={basePath}
      method="get"
      className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      <div className="sm:col-span-2 lg:col-span-2">
        <label htmlFor="q" className="mb-1 block text-xs font-medium text-muted-foreground">
          Keyword
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={current.q ?? ""}
          placeholder="Title, organization, country..."
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        />
      </div>

      {!lockType && (
        <div>
          <label htmlFor="type" className="mb-1 block text-xs font-medium text-muted-foreground">
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={current.type ?? ""}
            className="w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          >
            <option value="">All types</option>
            {OPPORTUNITY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="region" className="mb-1 block text-xs font-medium text-muted-foreground">
          Region
        </label>
        <select
          id="region"
          name="region"
          defaultValue={current.region ?? ""}
          className="w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        >
          <option value="">All regions</option>
          {REGIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="level" className="mb-1 block text-xs font-medium text-muted-foreground">
          Level
        </label>
        <select
          id="level"
          name="level"
          defaultValue={current.level ?? ""}
          className="w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        >
          <option value="">Any level</option>
          {LEVELS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="fundingType" className="mb-1 block text-xs font-medium text-muted-foreground">
          Funding
        </label>
        <select
          id="fundingType"
          name="fundingType"
          defaultValue={current.fundingType ?? ""}
          className="w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        >
          <option value="">Any funding</option>
          {FUNDING_TYPES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-5">
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-primary px-5 py-2 text-sm font-semibold text-[var(--color-on-primary)] transition-opacity hover:opacity-90"
        >
          Apply filters
        </button>
        <a
          href={basePath}
          className="cursor-pointer rounded-md border border-border px-5 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
        >
          Clear
        </a>
      </div>
    </form>
  );
}
