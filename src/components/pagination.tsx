import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

export function Pagination({
  basePath,
  page,
  totalPages,
  searchParams,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) params.set(key, value);
    }
    params.set("page", String(p));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={`flex h-10 w-10 items-center justify-center rounded-md border border-border ${
          page <= 1
            ? "pointer-events-none opacity-40"
            : "cursor-pointer hover:bg-muted"
        }`}
      >
        <CaretLeft size={16} aria-hidden="true" />
        <span className="sr-only">Previous page</span>
      </Link>
      <span className="px-3 text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-md border border-border ${
          page >= totalPages
            ? "pointer-events-none opacity-40"
            : "cursor-pointer hover:bg-muted"
        }`}
      >
        <CaretRight size={16} aria-hidden="true" />
        <span className="sr-only">Next page</span>
      </Link>
    </nav>
  );
}
