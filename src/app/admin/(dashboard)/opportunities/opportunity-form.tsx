"use client";

import { useActionState } from "react";
import type { Opportunity } from "@prisma/client";
import { WarningCircle } from "@phosphor-icons/react";
import { OPPORTUNITY_TYPES, REGIONS, LEVELS, FUNDING_TYPES } from "@/lib/taxonomy";
import type { OpportunityFormState } from "@/app/actions/opportunities";

const initialState: OpportunityFormState = { status: "idle" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
      <WarningCircle size={12} weight="fill" aria-hidden="true" />
      {message}
    </p>
  );
}

export function OpportunityForm({
  action,
  opportunity,
}: {
  action: (state: OpportunityFormState, formData: FormData) => Promise<OpportunityFormState>;
  opportunity?: Opportunity;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-3xl space-y-5" noValidate>
      {state.status === "error" && state.message && (
        <p role="alert" className="flex items-center gap-1.5 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <WarningCircle size={16} weight="fill" aria-hidden="true" />
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-card-foreground">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={opportunity?.title}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        />
        <FieldError message={errors.title} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium text-card-foreground">
            Type *
          </label>
          <select
            id="type"
            name="type"
            required
            defaultValue={opportunity?.type ?? ""}
            className="w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          >
            <option value="" disabled>Select type</option>
            {OPPORTUNITY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <FieldError message={errors.type} />
        </div>

        <div>
          <label htmlFor="organization" className="mb-1 block text-sm font-medium text-card-foreground">
            Organization *
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            required
            defaultValue={opportunity?.organization}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          />
          <FieldError message={errors.organization} />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className="mb-1 block text-sm font-medium text-card-foreground">
          Summary *
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={2}
          defaultValue={opportunity?.summary}
          placeholder="One or two sentences shown on cards and in search results."
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        />
        <FieldError message={errors.summary} />
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium text-card-foreground">
          Full description (Markdown) *
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={12}
          defaultValue={opportunity?.body}
          placeholder={"## Overview\n\n...\n\n## Eligibility\n\n...\n\n## How to Apply\n\n..."}
          className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:border-primary"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Use Markdown headings (##) to structure Overview, Eligibility, and How to Apply sections.
        </p>
        <FieldError message={errors.body} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="officialUrl" className="mb-1 block text-sm font-medium text-card-foreground">
            Official application URL *
          </label>
          <input
            id="officialUrl"
            name="officialUrl"
            type="url"
            required
            defaultValue={opportunity?.officialUrl}
            placeholder="https://..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          />
          <FieldError message={errors.officialUrl} />
        </div>
        <div>
          <label htmlFor="coverImage" className="mb-1 block text-sm font-medium text-card-foreground">
            Cover image URL
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            defaultValue={opportunity?.coverImage ?? ""}
            placeholder="https://... (optional)"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="region" className="mb-1 block text-sm font-medium text-card-foreground">
            Region *
          </label>
          <select
            id="region"
            name="region"
            required
            defaultValue={opportunity?.region ?? ""}
            className="w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          >
            <option value="" disabled>Select region</option>
            {REGIONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <FieldError message={errors.region} />
        </div>

        <div>
          <label htmlFor="level" className="mb-1 block text-sm font-medium text-card-foreground">
            Level
          </label>
          <select
            id="level"
            name="level"
            defaultValue={opportunity?.level ?? ""}
            className="w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          >
            <option value="">Not specified</option>
            {LEVELS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fundingType" className="mb-1 block text-sm font-medium text-card-foreground">
            Funding type *
          </label>
          <select
            id="fundingType"
            name="fundingType"
            required
            defaultValue={opportunity?.fundingType ?? ""}
            className="w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          >
            <option value="" disabled>Select funding type</option>
            {FUNDING_TYPES.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <FieldError message={errors.fundingType} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="mb-1 block text-sm font-medium text-card-foreground">
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            defaultValue={opportunity?.country ?? ""}
            placeholder="e.g. United Kingdom, or Global"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="deadline" className="mb-1 block text-sm font-medium text-card-foreground">
            Deadline
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            defaultValue={
              opportunity?.deadline ? new Date(opportunity.deadline).toISOString().slice(0, 10) : ""
            }
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          />
          <p className="mt-1 text-xs text-muted-foreground">Leave blank for rolling/no fixed deadline.</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-card-foreground">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={opportunity?.isFeatured}
            className="h-4 w-4 cursor-pointer accent-[var(--color-primary)]"
          />
          Featured
        </label>

        <fieldset className="flex items-center gap-4">
          <legend className="sr-only">Status</legend>
          <label className="flex cursor-pointer items-center gap-1.5 text-sm text-card-foreground">
            <input
              type="radio"
              name="status"
              value="draft"
              defaultChecked={!opportunity || opportunity.status === "draft"}
              className="cursor-pointer accent-[var(--color-primary)]"
            />
            Draft
          </label>
          <label className="flex cursor-pointer items-center gap-1.5 text-sm text-card-foreground">
            <input
              type="radio"
              name="status"
              value="published"
              defaultChecked={opportunity?.status === "published"}
              className="cursor-pointer accent-[var(--color-primary)]"
            />
            Published
          </label>
        </fieldset>
      </div>

      <div className="flex gap-3 border-t border-border pt-5">
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : opportunity ? "Save changes" : "Create opportunity"}
        </button>
      </div>
    </form>
  );
}
