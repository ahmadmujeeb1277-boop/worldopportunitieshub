import type { Metadata } from "next";
import { BellRinging } from "@phosphor-icons/react/dist/ssr";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Get Alerts",
  description: "Subscribe to get new scholarships, jobs, grants, and fellowships in your inbox.",
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <BellRinging size={26} aria-hidden="true" />
      </span>
      <h1 className="mt-5 font-display text-3xl font-bold text-card-foreground">
        Never miss a deadline
      </h1>
      <p className="mt-2 text-muted-foreground">
        Get new fully funded scholarships, jobs, grants, and fellowships delivered to your
        inbox. No spam — only verified opportunities, and you can unsubscribe anytime.
      </p>
      <NewsletterForm className="mt-8 w-full" />
    </div>
  );
}
