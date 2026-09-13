import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Admin Login" };

interface PageProps {
  searchParams: Promise<{ from?: string }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { from } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl font-bold text-card-foreground">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          WorldOpportunitiesHub content management
        </p>
        <LoginForm from={from} />
      </div>
    </div>
  );
}
