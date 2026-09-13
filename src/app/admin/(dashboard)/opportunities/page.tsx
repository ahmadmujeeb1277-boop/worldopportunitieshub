import Link from "next/link";
import { Plus, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { opportunityTypeLabel } from "@/lib/taxonomy";
import { formatDate } from "@/lib/format";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteOpportunity } from "@/app/actions/opportunities";

export const metadata = { title: "Manage Opportunities" };
export const dynamic = "force-dynamic";

export default async function AdminOpportunitiesPage() {
  const opportunities = await prisma.opportunity.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-card-foreground">Opportunities</h1>
          <p className="mt-1 text-sm text-muted-foreground">{opportunities.length} total</p>
        </div>
        <Link
          href="/admin/opportunities/new"
          className="flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90"
        >
          <Plus size={16} aria-hidden="true" />
          Add opportunity
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0">
                <td className="max-w-xs truncate px-4 py-3 font-medium text-card-foreground">
                  {o.title}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{opportunityTypeLabel(o.type)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      o.status === "published"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(o.deadline)}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(o.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/opportunities/${o.id}/edit`}
                      aria-label="Edit"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-card-foreground/70 hover:bg-muted"
                    >
                      <PencilSimple size={16} aria-hidden="true" />
                    </Link>
                    <DeleteButton
                      action={deleteOpportunity.bind(null, o.id)}
                      confirmMessage={`Delete "${o.title}"? This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {opportunities.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No opportunities yet. Add your first one.
          </p>
        )}
      </div>
    </div>
  );
}
