"use client";

import { useActionState } from "react";
import type { Article } from "@prisma/client";
import { WarningCircle } from "@phosphor-icons/react";
import type { ArticleFormState } from "@/app/actions/articles";

const initialState: ArticleFormState = { status: "idle" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
      <WarningCircle size={12} weight="fill" aria-hidden="true" />
      {message}
    </p>
  );
}

export function ArticleForm({
  action,
  article,
}: {
  action: (state: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  article?: Article;
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
          defaultValue={article?.title}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        />
        <FieldError message={errors.title} />
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-1 block text-sm font-medium text-card-foreground">
          Excerpt *
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={article?.excerpt}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
        />
        <FieldError message={errors.excerpt} />
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium text-card-foreground">
          Body (Markdown) *
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={14}
          defaultValue={article?.body}
          placeholder={"## Heading\n\nParagraph text..."}
          className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:border-primary"
        />
        <FieldError message={errors.body} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="author" className="mb-1 block text-sm font-medium text-card-foreground">
            Author *
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            defaultValue={article?.author ?? "WorldOpportunitiesHub Team"}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          />
          <FieldError message={errors.author} />
        </div>
        <div>
          <label htmlFor="coverImage" className="mb-1 block text-sm font-medium text-card-foreground">
            Cover image URL
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            defaultValue={article?.coverImage ?? ""}
            placeholder="https://... (optional)"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary"
          />
        </div>
      </div>

      <fieldset className="flex items-center gap-4">
        <legend className="sr-only">Status</legend>
        <label className="flex cursor-pointer items-center gap-1.5 text-sm text-card-foreground">
          <input
            type="radio"
            name="status"
            value="draft"
            defaultChecked={!article || article.status === "draft"}
            className="cursor-pointer accent-[var(--color-primary)]"
          />
          Draft
        </label>
        <label className="flex cursor-pointer items-center gap-1.5 text-sm text-card-foreground">
          <input
            type="radio"
            name="status"
            value="published"
            defaultChecked={article?.status === "published"}
            className="cursor-pointer accent-[var(--color-primary)]"
          />
          Published
        </label>
      </fieldset>

      <div className="flex gap-3 border-t border-border pt-5">
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : article ? "Save changes" : "Create article"}
        </button>
      </div>
    </form>
  );
}
