import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: September 2026</p>

      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-primary">
        <h2>Acceptance of terms</h2>
        <p>
          By using WorldOpportunitiesHub, you agree to these Terms of Use and our{" "}
          <a href="/disclaimer">Disclaimer</a> and <a href="/privacy">Privacy Policy</a>.
        </p>

        <h2>Use of the site</h2>
        <p>
          This site is provided for informational purposes to help you discover
          scholarships, jobs, grants, and fellowships. You may browse and use this
          information for your personal, non-commercial purposes.
        </p>

        <h2>No application relationship</h2>
        <p>
          We are an information aggregator, not the provider of any listed opportunity. Any
          application you submit through a link on our site creates a relationship solely
          between you and that third-party provider — not with WorldOpportunitiesHub.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Original content on this site — including articles, summaries, and design — is
          owned by WorldOpportunitiesHub. Opportunity details are summarized from publicly
          available official sources.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          WorldOpportunitiesHub is provided &ldquo;as is&rdquo; without warranties of any
          kind. We are not liable for any loss or damage arising from your reliance on
          information found on this site, including missed deadlines or application
          outcomes. Always verify details on the official source.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after
          changes constitutes acceptance of the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? <a href="/contact">Contact us</a>.
        </p>
      </div>
    </div>
  );
}
