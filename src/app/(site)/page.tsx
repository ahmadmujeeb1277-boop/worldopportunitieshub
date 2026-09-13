import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  HandCoins,
  Medal,
  Rocket,
  ShieldCheck,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { featuredOpportunities, latestOpportunities, latestArticles } from "@/lib/queries";
import { OpportunityCard } from "@/components/opportunity-card";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { OPPORTUNITY_TYPES } from "@/lib/taxonomy";

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  scholarship: GraduationCap,
  job: Briefcase,
  grant: HandCoins,
  fellowship: Medal,
  internship: Rocket,
};

export default async function HomePage() {
  const [featured, latest, articles] = await Promise.all([
    featuredOpportunities(6),
    latestOpportunities(8),
    latestArticles(3),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck size={14} weight="fill" aria-hidden="true" />
            Verified opportunities, updated daily
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-card-foreground sm:text-5xl lg:text-6xl">
            Find your next scholarship, job, grant, or fellowship
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            WorldOpportunitiesHub curates opportunities from official sources around the
            world. Search, read the full details, and apply directly on the provider&apos;s
            website.
          </p>

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

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-card-foreground">
          Browse by category
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {OPPORTUNITY_TYPES.slice(0, 5).map((t) => {
            const Icon = categoryIcons[t.value] ?? Briefcase;
            return (
              <Link
                key={t.value}
                href={`/opportunities/${t.value}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="font-semibold text-card-foreground group-hover:text-primary">
                  {t.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-card-foreground">
                Featured opportunities
              </h2>
              <Link href="/opportunities" className="text-sm font-semibold text-primary hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((o) => (
                <OpportunityCard key={o.id} opportunity={o} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-card-foreground">
            Latest opportunities
          </h2>
          <Link href="/opportunities" className="text-sm font-semibold text-primary hover:underline">
            View all &rarr;
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      </section>

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

      {/* Articles */}
      {articles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-card-foreground">
              Guides &amp; articles
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
        </section>
      )}

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
