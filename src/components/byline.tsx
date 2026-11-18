import Link from "next/link";
import { Avatar } from "./avatar";
import { formatDate } from "@/lib/format";

export function Byline({
  author,
  publishedAt,
  updatedAt,
}: {
  author: { name: string; slug: string; avatarUrl: string | null } | null;
  publishedAt: Date | string | null;
  updatedAt: Date | string | null;
}) {
  if (!author) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
      <Avatar name={author.name} avatarUrl={author.avatarUrl} size={38} />
      <div className="text-sm leading-tight">
        <Link
          href={`/authors/${author.slug}`}
          className="font-semibold text-card-foreground hover:text-primary"
        >
          By {author.name}
        </Link>
        <p className="text-xs text-muted-foreground">
          {publishedAt && <>Published {formatDate(publishedAt)}</>}
          {publishedAt && updatedAt && <> &middot; </>}
          {updatedAt && <>Updated {formatDate(updatedAt)}</>}
        </p>
      </div>
    </div>
  );
}
