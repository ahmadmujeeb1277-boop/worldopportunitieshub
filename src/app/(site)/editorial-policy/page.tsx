import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy",
  alternates: { canonical: "/editorial-policy" },
  description:
    "How WorldOpportunitiesHub researches, verifies, and corrects the scholarships, jobs, grants, and fellowships it publishes.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground sm:text-4xl">
        Editorial Policy
      </h1>
      <p className="mt-5 text-lg text-muted-foreground">
        This page explains how we research, write, and correct the listings and guides
        published on WorldOpportunitiesHub.
      </p>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-a:text-primary">
        <h2>Sourcing</h2>
        <p>
          Every listing starts from the provider&apos;s own announcement or programme page —
          a university, government body, foundation, UN agency, or employer. We do not
          source listings from other aggregator sites, and we do not accept payment from
          any organization to list, rank, or describe their opportunity.
        </p>

        <h2>Fact-checking</h2>
        <p>
          Before a listing is published, we check its deadline, funding type, and
          eligibility criteria directly against the official page. If a detail isn&apos;t
          clearly stated there, we say so rather than estimate it — this is why some
          listings show funding type as &ldquo;Unspecified&rdquo; instead of a guess.
        </p>

        <h2>Original writing</h2>
        <p>
          Summaries and guides are written in our own words from the source material, not
          copied or lightly reworded from other websites. Every listing links back to the
          official page so you can verify details yourself.
        </p>

        <h2>Keeping listings current</h2>
        <p>
          As deadlines pass, listings are marked &ldquo;Closed&rdquo; rather than deleted,
          so the page stays useful as a record. The &ldquo;Last updated&rdquo; date on each
          listing reflects the last time its content was actually reviewed or edited.
        </p>

        <h2>Corrections</h2>
        <p>
          If you spot an outdated deadline, a broken official link, or anything else that
          looks wrong, <a href="/contact">let us know</a> and we&apos;ll review and correct
          it. We don&apos;t run syndicated or sponsored content, and we&apos;re not
          affiliated with or endorsed by any organization we list.
        </p>

        <h2>Authorship</h2>
        <p>
          Content on WorldOpportunitiesHub is researched, written, and verified by Jabeen,
          following the process above.
        </p>
      </div>
    </div>
  );
}
