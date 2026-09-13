"use client";

import { useActionState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { subscribeToNewsletter, type SubscribeState } from "@/app/actions/newsletter";

const initialState: SubscribeState = { status: "idle" };

export function NewsletterForm({ className = "" }: { className?: string }) {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <form action={formAction} className={className} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex min-w-0 flex-col gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby="newsletter-feedback"
          className="w-full min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="submit"
          disabled={pending}
          className="w-full cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-semibold text-[var(--color-on-primary)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Joining…" : "Subscribe"}
        </button>
      </div>
      <p
        id="newsletter-feedback"
        aria-live="polite"
        className={`mt-2 flex items-center gap-1.5 text-xs ${
          state.status === "error" ? "text-destructive" : "text-primary"
        }`}
      >
        {state.status === "success" && <CheckCircle size={14} weight="fill" aria-hidden="true" />}
        {state.status === "error" && <WarningCircle size={14} weight="fill" aria-hidden="true" />}
        {state.message}
      </p>
    </form>
  );
}
