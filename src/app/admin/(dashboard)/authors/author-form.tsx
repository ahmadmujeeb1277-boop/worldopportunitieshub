"use client";

import { useActionState } from "react";
import type { Author } from "@prisma/client";
import { WarningCircle } from "@phosphor-icons/react";
import type { AuthorFormState } from "@/app/actions/authors";
import { ImageUpload } from "@/components/admin/image-upload";

const initialState: AuthorFormState = { status: "idle" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
      <WarningCircle size={12} weight="fill" aria-hidden="true" />
      {message}
    </p>
  );
}

export function AuthorForm({
  action,
  author,
}: {
  action: (state: AuthorFormState, formData: FormData) => Promise<AuthorFormState>;
  author?: Author;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-2xl space-y-5" noValidate>
      {state.status === "error" && state.message && (
        <p role="alert" className="flex items-center gap-1.5 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <WarningCircle size={16} weight="fill" aria-hidden="true" />
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-card-foreground">
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={author?.name}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        />
        <FieldError message={errors.name} />
      </div>

      <div>
        <label htmlFor="role" className="mb-1 block text-sm font-medium text-card-foreground">
          Role / title
        </label>
        <input
          id="role"
          name="role"
          type="text"
          defaultValue={author?.role ?? ""}
          placeholder="e.g. Editor, WorldOpportunitiesHub"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="bio" className="mb-1 block text-sm font-medium text-card-foreground">
          Short bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={author?.bio ?? ""}
          placeholder="One or two sentences shown on the author card and profile page."
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="socialUrl" className="mb-1 block text-sm font-medium text-card-foreground">
          Social link (optional)
        </label>
        <input
          id="socialUrl"
          name="socialUrl"
          type="url"
          defaultValue={author?.socialUrl ?? ""}
          placeholder="https://..."
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        />
        <FieldError message={errors.socialUrl} />
      </div>

      <ImageUpload
        name="avatarUrl"
        label="Profile photo"
        initialUrl={author?.avatarUrl}
        aspect="square"
      />

      <div className="flex gap-3 border-t border-border pt-5">
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : author ? "Save changes" : "Add author"}
        </button>
      </div>
    </form>
  );
}
