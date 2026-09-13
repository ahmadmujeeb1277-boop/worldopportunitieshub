import Link from "next/link";
import {
  SquaresFour,
  GraduationCap,
  Newspaper,
  Envelope,
  SignOut,
  ArrowSquareOut,
} from "@phosphor-icons/react/dist/ssr";
import { getSession } from "@/lib/auth";
import { logout } from "@/app/actions/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", Icon: SquaresFour },
  { href: "/admin/opportunities", label: "Opportunities", Icon: GraduationCap },
  { href: "/admin/articles", label: "Articles", Icon: Newspaper },
  { href: "/admin/subscribers", label: "Subscribers", Icon: Envelope },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card md:flex md:flex-col">
        <div className="border-b border-border px-5 py-5">
          <span className="font-display text-lg font-bold text-card-foreground">
            WorldOpportunitiesHub
          </span>
          <p className="text-xs text-muted-foreground">Admin panel</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-card-foreground/80 hover:bg-muted hover:text-card-foreground"
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-card-foreground/80 hover:bg-muted"
          >
            <ArrowSquareOut size={18} aria-hidden="true" />
            View site
          </Link>
          <p className="truncate px-3 pt-2 text-xs text-muted-foreground">{session?.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="mt-1 flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              <SignOut size={18} aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <span className="font-display text-base font-bold text-card-foreground">Admin</span>
          <form action={logout}>
            <button type="submit" className="cursor-pointer text-sm font-medium text-destructive">
              Sign out
            </button>
          </form>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
