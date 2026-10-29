import type { TocItem } from "@/lib/markdown";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mt-8 rounded-xl border border-border bg-muted/40 p-5"
    >
      <p className="text-sm font-semibold text-card-foreground">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ml-4" : undefined}>
            <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
