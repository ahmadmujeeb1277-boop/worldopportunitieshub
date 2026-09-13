import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarBlank, CaretRight, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { articleBySlug } from "@/lib/queries";
import { formatDate } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await articleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await articleBySlug(slug);

  if (!article || article.status !== "published") {
    notFound();
  }

  // Content is authored only by the trusted admin account, so raw HTML from
  // our own markdown renderer is safe to inject without a sanitizer here.
  const bodyHtml = renderMarkdown(article.body);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <CaretRight size={12} aria-hidden="true" />
        <Link href="/articles" className="hover:text-primary">Articles</Link>
      </nav>

      <h1 className="mt-4 font-display text-3xl font-bold text-card-foreground sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <UserCircle size={16} aria-hidden="true" />
          {article.author}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarBlank size={16} aria-hidden="true" />
          {formatDate(article.publishedAt)}
        </span>
      </div>

      <div
        className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      <div className="mt-12 rounded-xl border border-border bg-primary/10 p-6 text-center">
        <p className="font-semibold text-card-foreground">Ready to find your next opportunity?</p>
        <Link
          href="/opportunities"
          className="mt-3 inline-block cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90"
        >
          Browse Opportunities
        </Link>
      </div>
    </div>
  );
}
