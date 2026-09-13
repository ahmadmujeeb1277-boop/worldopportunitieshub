"use client";

import { useActionState, useState } from "react";
import { Eye, EyeSlash, WarningCircle } from "@phosphor-icons/react";
import { login, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = { status: "idle" };

export function LoginForm({ from }: { from?: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="mt-6 space-y-4" noValidate>
      {from && <input type="hidden" name="from" value={from} />}

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-card-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-card-foreground">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm text-foreground focus:border-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-card-foreground"
          >
            {showPassword ? <EyeSlash size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="flex items-center gap-1.5 text-sm text-destructive">
          <WarningCircle size={16} weight="fill" aria-hidden="true" />
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
