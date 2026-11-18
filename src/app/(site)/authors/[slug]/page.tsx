import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { authorBySlug } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/avatar";
import { OpportunityCard } from "@/components/opportunity-card";
import { ArticleCard } from "@/components/article-card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await authorBySlug(slug);
  if (!author) return {};
  return {
    title: author.name,
    description:
      author.bio ?? `Opportunities and guides published by ${author.name} on WorldOpportunitiesHub.`,
    alternates: { canonical: `/authors/${author.slug}` },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = await authorBySlug(slug);
  if (!author) notFound();

  const [opportunities, articles] = await Promise.all([
    prisma.opportunity.findMany({
      where: { authorId: author.id, status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 9,
    }),
    prisma.article.findMany({
      where: { authorId: author.id, status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex items-center gap-5">
        <Avatar name={author.name} avatarUrl={author.avatarUrl} size={80} />
        <div>
          <h1 className="font-display text-2xl font-bold text-card-foreground sm:text-3xl">
            {author.name}
          </h1>
          {author.role && (
            <p className="text-sm font-medium text-muted-foreground">{author.role}</p>
          )}
        </div>
      </div>

      {author.bio && <p className="mt-6 max-w-2xl text-muted-foreground">{author.bio}</p>}

      {author.socialUrl && (
        <a
          href={author.socialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          Follow &#8599;
        </a>
      )}

      {opportunities.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-card-foreground">Opportunities</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {opportunities.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-card-foreground">Articles</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
