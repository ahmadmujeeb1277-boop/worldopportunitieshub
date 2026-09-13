import type { Metadata } from "next";
import { ShieldCheck, MagnifyingGlass, Rocket } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn how WorldOpportunitiesHub curates scholarships, jobs, grants, and fellowships.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground sm:text-4xl">
        About WorldOpportunitiesHub
      </h1>
      <p className="mt-5 text-lg text-muted-foreground">
        WorldOpportunitiesHub is an independent information platform that helps students
        and professionals around the world discover scholarships, jobs, grants, and
        fellowships — and connects them directly to the official source to apply.
      </p>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-a:text-primary">
        <h2>What we do</h2>
        <p>
          We research and summarize opportunities from official providers — universities,
          governments, foundations, UN agencies, and employers — and publish them in a
          clear, consistent format so you can quickly judge whether you&apos;re eligible.
        </p>

        <h2>What we don&apos;t do</h2>
        <p>
          We are <strong>not</strong> the provider of any opportunity listed on this site,
          and we do not process applications. When you click &ldquo;Apply on Official
          Website,&rdquo; you leave WorldOpportunitiesHub and complete your application
          directly with the organization offering it.
        </p>

        <h2>Why trust our listings</h2>
        <p>
          Every listing links to its official source, and we note funding type, deadline,
          and eligibility level as accurately as we can. That said, program details can
          change — always verify specifics on the official page before you invest time in
          an application.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <ShieldCheck size={24} className="text-primary" aria-hidden="true" />
          <h3 className="mt-2 font-semibold text-card-foreground">Verified sources</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Every opportunity links to its official provider.
          </p>
        </div>
        <div>
          <MagnifyingGlass size={24} className="text-primary" aria-hidden="true" />
          <h3 className="mt-2 font-semibold text-card-foreground">Real filtering</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Search by type, region, level, and funding.
          </p>
        </div>
        <div>
          <Rocket size={24} className="text-primary" aria-hidden="true" />
          <h3 className="mt-2 font-semibold text-card-foreground">Updated often</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            New listings added as they open.
          </p>
        </div>
      </div>
    </div>
  );
}
