"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X, MagnifyingGlass, CaretDown } from "@phosphor-icons/react";
import { Logo } from "./logo";
import { OPPORTUNITY_TYPES } from "@/lib/taxonomy";

const primaryLinks = [
  { type: "scholarship", href: "/opportunities/scholarship", label: "Scholarships" },
  { type: "conference", href: "/opportunities/conference", label: "Conferences" },
  { type: "grant", href: "/opportunities/grant", label: "Grants" },
  { type: "fellowship", href: "/opportunities/fellowship", label: "Fellowships" },
];

export function Navbar({ counts = {} }: { counts?: Record<string, number> }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const moreTypes = OPPORTUNITY_TYPES.filter(
    (t) => !primaryLinks.some((l) => l.href === `/opportunities/${t.value}`),
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-card-foreground/80 transition-colors hover:bg-muted hover:text-card-foreground"
            >
              {link.label}
              {counts[link.type] != null && (
                <span className="text-muted-foreground"> ({counts[link.type]})</span>
              )}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-card-foreground/80 transition-colors hover:bg-muted hover:text-card-foreground"
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={() => setMoreOpen((v) => !v)}
            >
              More <CaretDown size={14} weight="bold" aria-hidden="true" />
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full w-56 rounded-lg border border-border bg-card p-2 shadow-lg">
                {moreTypes.map((t) => (
                  <Link
                    key={t.value}
                    href={`/opportunities/${t.value}`}
                    className="block rounded-md px-3 py-2 text-sm text-card-foreground/80 hover:bg-muted hover:text-card-foreground"
                  >
                    {t.label}
                    {counts[t.value] != null && (
                      <span className="text-muted-foreground"> ({counts[t.value]})</span>
                    )}
                  </Link>
                ))}
                <div className="my-1 h-px bg-border" />
                <Link
                  href="/opportunities"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
                >
                  Browse all opportunities
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/articles"
            className="rounded-md px-3 py-2 text-sm font-medium text-card-foreground/80 transition-colors hover:bg-muted hover:text-card-foreground"
          >
            Articles
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-2 text-sm font-medium text-card-foreground/80 transition-colors hover:bg-muted hover:text-card-foreground"
          >
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/search"
            aria-label="Search opportunities"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-card-foreground/70 transition-colors hover:bg-muted hover:text-card-foreground"
          >
            <MagnifyingGlass size={20} aria-hidden="true" />
          </Link>
          <Link
            href="/newsletter"
            className="cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-semibold text-[var(--color-on-primary)] transition-opacity hover:opacity-90"
          >
            Get Alerts
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-card-foreground lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <List size={24} aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Primary mobile"
          className="border-t border-border bg-card px-4 py-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {OPPORTUNITY_TYPES.map((t) => (
              <li key={t.value}>
                <Link
                  href={`/opportunities/${t.value}`}
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-card-foreground/85 hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.label}
                  {counts[t.value] != null && (
                    <span className="text-muted-foreground"> ({counts[t.value]})</span>
                  )}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-border pt-1">
              <Link
                href="/search"
                className="block rounded-md px-3 py-2.5 text-base font-medium text-card-foreground/85 hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className="block rounded-md px-3 py-2.5 text-base font-medium text-card-foreground/85 hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block rounded-md px-3 py-2.5 text-base font-medium text-card-foreground/85 hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href="/newsletter"
                className="block rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-[var(--color-on-primary)]"
                onClick={() => setMobileOpen(false)}
              >
                Get Alerts
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
