import type { FaqItem } from "@/lib/markdown";

export function FaqList({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <dl className="space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-lg border border-border bg-card p-4 open:bg-muted/30"
        >
          <summary className="cursor-pointer select-none text-sm font-semibold text-card-foreground">
            {item.question}
          </summary>
          <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </dl>
  );
}
