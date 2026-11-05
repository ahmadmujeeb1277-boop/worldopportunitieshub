import type { IconProps } from "@phosphor-icons/react";
import type { TypeTheme } from "@/lib/type-theme";

// Same icon-chip + colored-bar language as the homepage's CategorySection,
// reused here so every major opportunity-page section reads as a clear,
// weighted block instead of one undifferentiated wall of prose.
export function SectionBlock({
  id,
  title,
  icon: Icon,
  theme,
  html,
}: {
  id: string;
  title: string;
  icon: React.ComponentType<IconProps>;
  theme: TypeTheme;
  html: string;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24 first:mt-0">
      <div className="flex items-center gap-3">
        <span className={`h-1.5 w-8 shrink-0 rounded-full ${theme.rule}`} aria-hidden="true" />
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.iconWrap}`}>
          <Icon size={20} weight="bold" aria-hidden="true" />
        </span>
        <h2 className="font-display text-2xl font-bold text-card-foreground sm:text-3xl">{title}</h2>
      </div>
      <div
        className="prose prose-neutral mt-5 max-w-none prose-headings:font-display prose-headings:scroll-mt-24 prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
