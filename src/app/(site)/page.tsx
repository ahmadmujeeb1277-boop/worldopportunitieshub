import Link from "next/link";
import { Rocket, ShieldCheck, MagnifyingGlass, Lightning } from "@phosphor-icons/react/dist/ssr";
import {
  latestArticles,
  latestOpportunitiesByType,
  recentOpportunities,
} from "@/lib/queries";
import { CategorySection } from "@/components/category-section";
import { SOCIAL_LINKS } from "@/lib/social";
import { OpportunityCard } from "@/components/opportunity-card";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { HeroVideo } from "@/components/hero-video";
import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";
import { OPPORTUNITY_TYPES } from "@/lib/taxonomy";

const SECTIONS = [
  { type: "scholarship", title: "Scholarships", blurb: "Fully funded and partial funding for study abroad." },
  { type: "conference", title: "Conferences", blurb: "Summits, forums and events you can attend, many fully funded." },
  { type: "fellowship", title: "Fellowships", blurb: "Research and leadership fellowships around the world." },
  { type: "job", title: "Jobs", blurb: "Open roles at universities, NGOs and international bodies." },
  { type: "grant", title: "Grants", blurb: "Funding for projects, research and organizations." },
] as const;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const [latest, articles, ...sectionItems] = await Promise.all([
    recentOpportunities(6),
    latestArticles(3),
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
          logo: `${siteUrl}/brand/logo-icon.svg`,
          sameAs: SOCIAL_LINKS.map((l) => l.href),
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <HeroVideo />
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck size={14} weight="fill" aria-hidden="true" />
            Verified opportunities, updated daily
          </span>
          <div className="mx-auto mt-6 w-fit max-w-3xl rounded-2xl bg-black/45 px-6 py-5 sm:px-10 sm:py-7">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl [text-shadow:0_2px_14px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.4)]">
              Find your next scholarship, job, grant, or fellowship
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.45),0_1px_2px_rgba(0,0,0,0.35)]">
              WorldOpportunitiesHub curates opportunities from official sources around the
              world. Search, read the full details, and apply directly on the provider&apos;s
              website.
            </p>
          </div>

          <form action="/opportunities" className="mx-auto mt-8 flex max-w-xl gap-2">
            <label htmlFor="hero-search" className="sr-only">
              Search opportunities
            </label>
            <div className="relative flex-1">
              <MagnifyingGlass
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder="Search by title, organization, or country..."
                className="w-full rounded-full border border-border bg-card py-3 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            {OPPORTUNITY_TYPES.slice(0, 6).map((t) => (
              <Link
                key={t.value}
                href={`/opportunities/${t.value}`}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 font-medium text-card-foreground/80 transition-colors hover:border-primary hover:text-primary"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

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
