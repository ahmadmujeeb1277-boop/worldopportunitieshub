import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

export function ApplyButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-[var(--color-on-accent)] transition-opacity hover:opacity-90"
    >
      Apply on Official Website
      <ArrowSquareOut size={18} aria-hidden="true" />
    </a>
  );
}
