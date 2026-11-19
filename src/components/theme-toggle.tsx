"use client";

import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Private browsing or storage disabled — theme just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark theme"
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-card-foreground/70 transition-colors hover:bg-muted hover:text-card-foreground"
    >
      <Sun size={20} aria-hidden="true" className="hidden dark:block" />
      <Moon size={20} aria-hidden="true" className="block dark:hidden" />
    </button>
  );
}
