import Link from "next/link";
import { Plus, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteArticle } from "@/app/actions/articles";

export const metadata = { title: "Manage Articles" };
export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-card-foreground">Articles</h1>
          <p className="mt-1 text-sm text-muted-foreground">{articles.length} total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90"
        >
          <Plus size={16} aria-hidden="true" />
          Add article
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0">
                <td className="max-w-xs truncate px-4 py-3 font-medium text-card-foreground">
                  {a.title}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{a.author}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      a.status === "published"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(a.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/articles/${a.id}/edit`}
                      aria-label="Edit"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-card-foreground/70 hover:bg-muted"
                    >
                      <PencilSimple size={16} aria-hidden="true" />
                    </Link>
                    <DeleteButton
                      action={deleteArticle.bind(null, a.id)}
                      confirmMessage={`Delete "${a.title}"? This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No articles yet. Add your first one.
          </p>
        )}
      </div>
    </div>
  );
}
