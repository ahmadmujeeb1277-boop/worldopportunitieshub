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
    ];
  },
};

export default nextConfig;
