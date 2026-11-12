import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { OPPORTUNITY_TYPES, opportunityTypeLabel } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Sitemap",
  alternates: { canonical: "/sitemap-page" },
  description: "A human-readable map of every section and page on WorldOpportunitiesHub.",
};

export const dynamic = "force-dynamic";

export default async function HtmlSitemapPage() {
  const articles = await prisma.article.findMany({
    where: { status: "published" },
    select: { slug: true, title: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground sm:text-4xl">
        Sitemap
      </h1>
      <p className="mt-5 text-lg text-muted-foreground">
        Every section of WorldOpportunitiesHub, in one place. Looking for the XML version
        search engines use? See the{" "}
        <a href="/sitemap.xml" className="text-primary hover:underline">
          XML sitemap
        </a>
        .
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-card-foreground">
            Opportunity categories
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/opportunities" className="text-sm text-primary hover:underline">
                All opportunities
              </Link>
            </li>
            {OPPORTUNITY_TYPES.map((t) => (
              <li key={t.value}>
                <Link
                  href={`/opportunities/${t.value}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {opportunityTypeLabel(t.value)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-card-foreground">
            Articles &amp; guides
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/articles" className="text-sm text-primary hover:underline">
                All articles
              </Link>
            </li>
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-card-foreground">
            About us
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                About WorldOpportunitiesHub
              </Link>
            </li>
            <li>
              <Link href="/editorial-policy" className="text-sm text-muted-foreground hover:text-primary">
                Editorial Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/newsletter" className="text-sm text-muted-foreground hover:text-primary">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-card-foreground">
            Legal
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
