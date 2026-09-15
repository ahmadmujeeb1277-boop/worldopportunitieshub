import Link from "next/link";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import type { Article } from "@prisma/client";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <CalendarBlank size={14} aria-hidden="true" />
        {formatDate(article.publishedAt)}
      </span>
      <h3 className="mt-2 line-clamp-2 font-display text-lg font-semibold text-card-foreground group-hover:text-primary">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>
      <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">
        Read more &rarr;
      </span>
    </Link>
  );
}
