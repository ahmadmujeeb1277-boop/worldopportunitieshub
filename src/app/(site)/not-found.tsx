import Link from "next/link";
import { CompassRose } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CompassRose size={30} aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold text-card-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-muted-foreground">
        This opportunity or page may have been removed, or the link might be incorrect.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90"
        >
          Go home
        </Link>
        <Link
          href="/opportunities"
          className="cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-card-foreground hover:bg-muted"
        >
          Browse opportunities
        </Link>
      </div>
    </div>
  );
}
