import Link from "next/link";
import {
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./logo";
import { OPPORTUNITY_TYPES, REGIONS } from "@/lib/taxonomy";
import { NewsletterForm } from "./newsletter-form";

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", Icon: FacebookLogo },
  { href: "https://twitter.com", label: "Twitter / X", Icon: TwitterLogo },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramLogo },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedinLogo },
  { href: "https://youtube.com", label: "YouTube", Icon: YoutubeLogo },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo showTagline />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              WorldOpportunitiesHub curates fully funded scholarships, jobs, grants,
              and fellowships from around the world and links you straight to the
              official source to apply.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-[var(--color-on-primary)]"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-card-foreground">Opportunities</h3>
            <ul className="mt-4 space-y-2.5">
              {OPPORTUNITY_TYPES.slice(0, 6).map((t) => (
                <li key={t.value}>
                  <Link
                    href={`/opportunities/${t.value}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-card-foreground">Regions</h3>
            <ul className="mt-4 space-y-2.5">
              {REGIONS.slice(0, 6).map((r) => (
                <li key={r.value}>
                  <Link
                    href={`/opportunities?region=${r.value}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-card-foreground">Stay updated</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              New verified opportunities in your inbox. No spam.
            </p>
            <NewsletterForm className="mt-4" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} WorldOpportunitiesHub. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
            <Link href="/disclaimer" className="hover:text-primary">Disclaimer</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
