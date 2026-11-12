import { Bank, Buildings, GraduationCap, HandCoins, Medal, SealCheck } from "@phosphor-icons/react/dist/ssr";

// Generic category icons, not any specific organization's logo — this site
// has no affiliation with the entities it links to (see /disclaimer), so
// this band names categories of sources rather than claiming named partners.
const SOURCES = [
  { icon: SealCheck, label: "International Organizations" },
  { icon: Bank, label: "Government Programs" },
  { icon: Buildings, label: "Universities Worldwide" },
  { icon: GraduationCap, label: "Scholarship Boards" },
  { icon: HandCoins, label: "Grant Foundations" },
  { icon: Medal, label: "Fellowship Programs" },
];

export function TrustBand() {
  return (
    <section className="border-b border-border bg-muted/60 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="shrink-0 text-center text-sm font-semibold text-muted-foreground sm:text-left">
          Opportunities verified
          <br className="hidden sm:block" />
          from top institutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {SOURCES.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-muted-foreground/70">
              <s.icon size={22} aria-hidden="true" />
              <span className="text-xs font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
