import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Title field had a stray "Title: " prefix, which also baked into
        // the old slug; permanent redirect so the already-indexed URL and
        // any existing backlinks keep working.
        source: "/opportunities/job/title-unido-national-data-entry-and-mande-administrator-cairo-egypt-2026",
        destination: "/opportunities/job/unido-national-data-entry-and-mande-administrator-cairo-egypt-2026",
        permanent: true,
      },
      {
        // Original title's slug exceeded MySQL's VARCHAR(191) column limit
        // and was silently truncated mid-word; Google indexed that 191-char
        // slug before the title was shortened. Redirect so it isn't a 404.
        source:
          "/articles/daad-scholarships-2027-how-to-apply-and-every-visa-and-document-you-will-need-winning-a-daad-scholarship-is-only-half-the-journey-the-other-half-is-paperwork-the-right-documents-for-the-schol",
        destination: "/articles/daad-scholarships-2027-how-to-apply-and-every-visa-and-document-you-will-need",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
