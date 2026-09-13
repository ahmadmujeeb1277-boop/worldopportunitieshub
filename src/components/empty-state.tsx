import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mt-8 flex flex-col items-center rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <MagnifyingGlass size={22} aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-semibold text-card-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-5 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
