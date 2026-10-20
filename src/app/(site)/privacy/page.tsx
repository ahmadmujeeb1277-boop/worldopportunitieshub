import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-card-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: October 2026</p>

      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-primary">
        <h2>What we collect</h2>
        <p>
          If you subscribe to our newsletter, we collect the email address you provide. We
          do not require an account or collect personal information to browse or search
          opportunities on this site.
        </p>
        <p>
          Like most websites, our hosting and analytics providers may automatically collect
          standard technical information such as your IP address, browser type, and pages
          visited, for security and analytics purposes.
        </p>

        <h2>How we use it</h2>
        <ul>
          <li>To send you newsletter emails about new opportunities, if you subscribed.</li>
          <li>To understand site usage and improve the content we publish.</li>
          <li>To respond to messages you send us.</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2>Third-party links</h2>
        <p>
          Opportunity listings link to official third-party websites. Once you leave
          WorldOpportunitiesHub, that site&apos;s own privacy policy applies — we recommend
          reviewing it before submitting any personal information there.
        </p>

        <h2>Cookies and advertising</h2>
        <p>
          We use cookies and similar technologies for basic site functionality and analytics.
          We may also work with third-party advertising vendors, including Google. Google and
          its partners may use cookies or similar technologies to serve ads based on your prior
          visits to this site or other websites. Google&apos;s use of advertising cookies enables
          it and its partners to serve ads based on your visit to this site and/or other sites on
          the Internet. You may opt out of personalized advertising by visiting{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          , or generally at{" "}
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">
            www.aboutads.info/choices
          </a>
          .
        </p>

        <h2>Your choices</h2>
        <p>
          You can unsubscribe from our newsletter at any time using the link in any email we
          send, or by contacting us directly.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? <a href="/contact">Contact us</a>.
        </p>
      </div>
    </div>
  );
}
