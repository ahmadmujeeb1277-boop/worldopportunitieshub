import Link from "next/link";
import { Plus, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/avatar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteAuthor } from "@/app/actions/authors";

export const metadata = { title: "Manage Authors" };
export const dynamic = "force-dynamic";

export default async function AdminAuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { opportunities: true, articles: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-card-foreground">Authors</h1>
          <p className="mt-1 text-sm text-muted-foreground">{authors.length} total</p>
        </div>
        <Link
          href="/admin/authors/new"
          className="flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90"
        >
          <Plus size={16} aria-hidden="true" />
          Add author
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Content</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-card-foreground">
                  <div className="flex items-center gap-3">
                    <Avatar name={a.name} avatarUrl={a.avatarUrl} size={28} />
                    {a.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{a.role ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {a._count.opportunities + a._count.articles} items
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/authors/${a.id}/edit`}
                      aria-label="Edit"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-card-foreground/70 hover:bg-muted"
                    >
                      <PencilSimple size={16} aria-hidden="true" />
                    </Link>
                    <DeleteButton
                      action={deleteAuthor.bind(null, a.id)}
                      confirmMessage={`Delete "${a.name}"? Their existing content will show no author instead. This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {authors.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No authors yet. Add your first one.
          </p>
        )}
      </div>
    </div>
  );
}
