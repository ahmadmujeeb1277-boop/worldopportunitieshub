import type { Metadata } from "next";
import { EnvelopeSimple, MegaphoneSimple, Bug } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the WorldOpportunitiesHub team.",
};

const CONTACT_EMAIL = "hello@worldopportunitieshub.com";

const reasons = [
  {
    Icon: MegaphoneSimple,
    title: "Submit an opportunity",
    body: "Know a scholarship, job, grant, or fellowship we should list? Send us the official link and details.",
  },
  {
    Icon: Bug,
    title: "Report an outdated or broken listing",
    body: "If a deadline has passed or an official link is broken, let us know which listing so we can fix it.",
  },
  {
    Icon: EnvelopeSimple,
    title: "General questions",
    body: "Partnerships, press, or anything else — we read every message.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground sm:text-4xl">Contact Us</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We&apos;re a small independent team. Reach us by email and we&apos;ll get back to you as
        soon as we can.
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90"
      >
        <EnvelopeSimple size={18} aria-hidden="true" />
        {CONTACT_EMAIL}
      </a>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reasons.map(({ Icon, title, body }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5">
            <Icon size={22} className="text-primary" aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-card-foreground">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
