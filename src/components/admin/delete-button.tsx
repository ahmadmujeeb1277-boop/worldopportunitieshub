"use client";

import { useTransition } from "react";
import { Trash } from "@phosphor-icons/react";

export function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          startTransition(() => {
            action();
          });
        }
      }}
      aria-label="Delete"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash size={16} aria-hidden="true" />
    </button>
  );
}
