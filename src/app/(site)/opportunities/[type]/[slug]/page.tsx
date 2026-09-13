import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarBlank,
  MapPin,
  Buildings,
  GraduationCap,
  HandCoins,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import { opportunityBySlug, relatedOpportunities } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import {
  opportunityTypeLabel,
  regionLabel,
  levelLabel,
  fundingTypeLabel,
} from "@/lib/taxonomy";
import { formatDeadline } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import { OpportunityCard } from "@/components/opportunity-card";
import { ApplyButton } from "@/components/apply-button";

interface PageProps {
  params: Promise<{ type: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = await opportunityBySlug(slug);
  if (!opportunity) return {};
  return {
    title: opportunity.title,
    description: opportunity.summary,
  };
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { type, slug } = await params;
  const opportunity = await opportunityBySlug(slug);

  if (!opportunity || opportunity.type !== type || opportunity.status !== "published") {
    notFound();
  }

  prisma.opportunity.update({ where: { id: opportunity.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

  const related = await relatedOpportunities(opportunity.type, opportunity.id, 3);
  // Content is authored only by the trusted admin account, so raw HTML from
  // our own markdown renderer is safe to inject without a sanitizer here.
  const bodyHtml = renderMarkdown(opportunity.body);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <CaretRight size={12} aria-hidden="true" />
        <Link href={`/opportunities/${opportunity.type}`} className="hover:text-primary">
          {opportunityTypeLabel(opportunity.type)}
        </Link>
        <CaretRight size={12} aria-hidden="true" />
        <span className="line-clamp-1 text-card-foreground">{opportunity.title}</span>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {opportunityTypeLabel(opportunity.type)}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-card-foreground sm:text-4xl">
            {opportunity.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{opportunity.summary}</p>

          <div className="mt-6 lg:hidden">
            <ApplyButton href={opportunity.officialUrl} />
          </div>

          <div
            className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          <p className="mt-8 rounded-lg border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            WorldOpportunitiesHub is an independent information platform. We are not
            affiliated with or endorsed by {opportunity.organization}. Always verify
            details on the official website before applying.
          </p>
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Buildings size={18} className="mt-0.5 text-primary" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Organization</dt>
                  <dd className="font-medium text-card-foreground">{opportunity.organization}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-primary" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Region / Country</dt>
                  <dd className="font-medium text-card-foreground">
                    {opportunity.country ?? regionLabel(opportunity.region)}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarBlank size={18} className="mt-0.5 text-primary" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Deadline</dt>
                  <dd className="font-medium text-card-foreground">
                    {formatDeadline(opportunity.deadline)}
                  </dd>
                </div>
              </div>
              {opportunity.level && (
                <div className="flex items-start gap-3">
                  <GraduationCap size={18} className="mt-0.5 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">Level</dt>
                    <dd className="font-medium text-card-foreground">{levelLabel(opportunity.level)}</dd>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <HandCoins size={18} className="mt-0.5 text-primary" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Funding</dt>
                  <dd className="font-medium text-card-foreground">
                    {fundingTypeLabel(opportunity.fundingType)}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 hidden lg:block">
              <ApplyButton href={opportunity.officialUrl} />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Opens the official site in a new tab
            </p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-card-foreground">
            Related {opportunityTypeLabel(opportunity.type).toLowerCase()}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
