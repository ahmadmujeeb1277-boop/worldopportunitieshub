import type { Metadata } from "next";
import { allArticles } from "@/lib/queries";
import { ArticleCard } from "@/components/article-card";
import { Pagination } from "@/components/pagination";
import { EmptyState } from "@/components/empty-state";

export const metadata: Metadata = {
  title: "Articles & Guides",
  description: "Tips and guides for scholarship essays, job applications, grants, and more.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Number(sp.page ?? "1") || 1;
  const { items, total, totalPages } = await allArticles(page);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground">Articles &amp; Guides</h1>
      <p className="mt-2 text-muted-foreground">
        {total} {total === 1 ? "article" : "articles"} to help you apply with confidence
      </p>

      {items.length === 0 ? (
        <EmptyState title="No articles yet" description="Check back soon for new guides." />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}

      <Pagination basePath="/articles" page={page} totalPages={totalPages} searchParams={sp} />
    </div>
  );
}
