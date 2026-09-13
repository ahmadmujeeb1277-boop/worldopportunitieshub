import type { Metadata } from "next";

export const metadata: Metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground">Disclaimer</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: September 2026</p>

      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-primary">
        <h2>We are not the provider</h2>
        <p>
          WorldOpportunitiesHub (&ldquo;we,&rdquo; &ldquo;us&rdquo;) is an independent
          information and aggregation platform. We are not affiliated with, endorsed by, or
          acting on behalf of any university, government, foundation, UN agency, employer,
          or other organization whose opportunities we list, unless explicitly stated.
        </p>

        <h2>No application processing</h2>
        <p>
          We do not collect, process, or review applications for any opportunity listed on
          this site. When you click &ldquo;Apply on Official Website,&rdquo; you are
          redirected to the official provider&apos;s own website to complete your
          application directly with them.
        </p>

        <h2>Accuracy of information</h2>
        <p>
          We make a reasonable effort to keep listings accurate and up to date, including
          deadlines, funding details, and eligibility criteria. However, program details can
          change without notice, and errors can occur. We do not guarantee the accuracy,
          completeness, or timeliness of any listing.
        </p>
        <p>
          <strong>
            Always verify all details — including eligibility, deadlines, and funding — on
            the official provider&apos;s website before applying or making any decisions
            based on our content.
          </strong>
        </p>

        <h2>No guarantee of outcome</h2>
        <p>
          Listing an opportunity on WorldOpportunitiesHub does not guarantee that you will
          be eligible, selected, or funded. Selection decisions are made entirely by the
          respective provider.
        </p>

        <h2>External links</h2>
        <p>
          Our site links to third-party websites we do not control. We are not responsible
          for the content, privacy practices, or security of those external sites.
        </p>

        <h2>Contact</h2>
        <p>
          If you notice inaccurate or outdated information, please{" "}
          <a href="/contact">contact us</a> so we can correct it.
        </p>
      </div>
    </div>
  );
}
