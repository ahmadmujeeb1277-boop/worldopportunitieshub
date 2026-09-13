import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Newsletter Subscribers" };
export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-card-foreground">Newsletter Subscribers</h1>
      <p className="mt-1 text-sm text-muted-foreground">{subscribers.length} total</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-card-foreground">{s.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(s.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">No subscribers yet.</p>
        )}
      </div>
    </div>
  );
}
