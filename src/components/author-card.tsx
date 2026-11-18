import Link from "next/link";
import { Avatar } from "./avatar";

export function AuthorCard({
  author,
}: {
  author: {
    name: string;
    slug: string;
    role: string | null;
    bio: string | null;
    avatarUrl: string | null;
  } | null;
}) {
  if (!author) return null;

  return (
    <div className="mt-6 flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
      <Avatar name={author.name} avatarUrl={author.avatarUrl} size={60} />
      <div>
        <p className="font-semibold text-card-foreground">
          Published by{" "}
          <Link href={`/authors/${author.slug}`} className="hover:text-primary">
            {author.name}
          </Link>
        </p>
        {author.role && (
          <p className="text-xs font-medium text-muted-foreground">{author.role}</p>
        )}
        {author.bio && <p className="mt-2 text-sm text-muted-foreground">{author.bio}</p>}
        <p className="mt-2 text-xs text-muted-foreground">
          <Link href="/editorial-policy" className="font-medium text-primary hover:underline">
            Read our editorial policy
          </Link>
        </p>
      </div>
    </div>
  );
}
