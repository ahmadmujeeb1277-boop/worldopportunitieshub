import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import type { FaqItem } from "@/lib/markdown";

export function FaqList({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <dl className="space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-xl border border-border bg-card p-5 open:shadow-sm"
        >
          <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 text-base font-semibold text-card-foreground">
            {item.question}
            <CaretDown
              size={18}
              weight="bold"
              className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </dl>
  );
}
