import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

export function ApplyButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-lg font-bold text-[var(--color-on-accent)] transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
    >
      Apply
      <ArrowSquareOut size={20} aria-hidden="true" />
    </a>
  );
}
