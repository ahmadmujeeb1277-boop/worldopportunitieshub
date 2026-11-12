import Link from "next/link";
import { Rocket, ShieldCheck, MagnifyingGlass, Lightning } from "@phosphor-icons/react/dist/ssr";
import {
  closingSoonOpportunities,
  latestArticles,
  latestOpportunitiesByType,
  openOpportunityCount,
  opportunityCountsByType,
  recentOpportunities,
} from "@/lib/queries";
import { CategorySection } from "@/components/category-section";
import { SOCIAL_LINKS } from "@/lib/social";
import { OpportunityCard } from "@/components/opportunity-card";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { LiveHero } from "@/components/live-hero";
import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";

const SECTIONS = [
  { type: "scholarship", title: "Scholarships", blurb: "Fully funded and partial funding for study abroad." },
  { type: "conference", title: "Conferences", blurb: "Summits, forums and events you can attend, many fully funded." },
  { type: "fellowship", title: "Fellowships", blurb: "Research and leadership fellowships around the world." },
  { type: "job", title: "Jobs", blurb: "Open roles at universities, NGOs and international bodies." },
  { type: "grant", title: "Grants", blurb: "Funding for projects, research and organizations." },
  { type: "course", title: "Courses", blurb: "Free and paid courses to build real, certified skills." },
] as const;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const [latest, articles, openCount, closingSoon, typeCounts, ...sectionItems] = await Promise.all([
    recentOpportunities(6),
    latestArticles(3),
    openOpportunityCount(),
    closingSoonOpportunities(4),
    opportunityCountsByType(),
    ...SECTIONS.map((section) => latestOpportunitiesByType(section.type, 5)),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "WorldOpportunitiesHub",
          url: siteUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/opportunities?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "WorldOpportunitiesHub",
          url: siteUrl,
          logo: `${siteUrl}/brand/logo-icon.png`,
          sameAs: SOCIAL_LINKS.map((l) => l.href),
        }}
      />
      {/* Hero */}
      <LiveHero openCount={openCount} closingSoon={closingSoon} counts={typeCounts} />

      {/* Latest: everything published in the last 72 hours, any category */}
      {latest.length > 0 && (
        <section className="border-b border-border bg-muted/60 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Lightning size={26} weight="fill" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-card-foreground">
                    Latest Opportunities
                  </h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Just added in the last 3 days, across every category.
                  </p>
                </div>
              </div>
              <Link
                href="/opportunities"
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                Browse all &rarr;
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((o) => (
                <OpportunityCard key={o.id} opportunity={o} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* One block per category */}
      {SECTIONS.map((section, i) => (
        <CategorySection
          key={section.type}
          type={section.type}
          title={section.title}
          blurb={section.blurb}
          items={sectionItems[i]}
        />
      ))}

      {/* Guides & articles */}
      {articles.length > 0 && (
        <section className="border-t border-border py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-card-foreground">
                Guides &amp; Articles
              </h2>
              <Link href="/articles" className="text-sm font-semibold text-primary hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <ShieldCheck size={28} className="text-primary" aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-card-foreground">Verified sources only</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Every listing links directly to the official provider — we never collect
              applications ourselves.
            </p>
          </div>
          <div>
            <MagnifyingGlass size={28} className="text-primary" aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-card-foreground">Built for real filtering</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Filter by type, region, degree level, and funding so you only see what
              you&apos;re eligible for.
            </p>
          </div>
          <div>
            <Rocket size={28} className="text-primary" aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-card-foreground">Updated regularly</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              New scholarships, jobs, grants, and fellowships are added as they open.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary/10">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-card-foreground sm:text-3xl">
            Never miss a deadline
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Get new fully funded scholarships, jobs, and fellowships delivered to your
            inbox. No spam — only verified opportunities.
          </p>
          <NewsletterForm className="mx-auto mt-6 max-w-md" />
        </div>
      </section>
    </>
  );
}

export const dynamic = "force-dynamic";
