import Link from "next/link";
import { GraduationCap, Newspaper, Envelope, Eye } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin Dashboard" };

async function getStats() {
  const [opportunities, published, articles, subscribers, viewAgg] = await Promise.all([
    prisma.opportunity.count(),
    prisma.opportunity.count({ where: { status: "published" } }),
    prisma.article.count(),
    prisma.newsletterSubscriber.count(),
    prisma.opportunity.aggregate({ _sum: { viewCount: true } }),
  ]);
  return { opportunities, published, articles, subscribers, views: viewAgg._sum.viewCount ?? 0 };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      label: "Opportunities",
      value: stats.opportunities,
      hint: `${stats.published} published`,
      href: "/admin/opportunities",
      Icon: GraduationCap,
    },
    { label: "Articles", value: stats.articles, hint: "Total", href: "/admin/articles", Icon: Newspaper },
    {
      label: "Subscribers",
      value: stats.subscribers,
      hint: "Newsletter",
      href: "/admin/subscribers",
      Icon: Envelope,
    },
    { label: "Total Views", value: stats.views, hint: "All opportunities", href: "#", Icon: Eye },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-card-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Overview of WorldOpportunitiesHub content.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, hint, href, Icon }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={20} aria-hidden="true" />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-card-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">
              {label} &middot; {hint}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/opportunities/new"
          className="cursor-pointer rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90"
        >
          + Add opportunity
        </Link>
        <Link
          href="/admin/articles/new"
          className="cursor-pointer rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-card-foreground hover:bg-muted"
        >
          + Add article
        </Link>
      </div>
    </div>
  );
}
