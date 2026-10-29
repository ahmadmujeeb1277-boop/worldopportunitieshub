@AGENTS.md

# WorldOpportunitiesHub: project handoff

Read this first in a new session. It records what exists, how it was built, and the rules the
owner expects. **No secrets belong in this file** (the GitHub repo is public). Real values live in
`.env` locally and in Hostinger's Web App "Environment variables" panel.

## What this is
An aggregator site for scholarships, jobs, grants, fellowships, conferences, internships and similar
opportunities, plus guide articles. We are NOT the provider: every listing links out to the official
site ("Apply on Official Website"). Live at https://worldopportunitieshub.com, hosted on Hostinger
(moved off Vercel in Oct 2026 — see Hosting below). The owner is not a developer. Explain in plain,
simple English, do one thing at a time, and show results before moving on.

## Stack
- Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 (+ typography plugin). `next dev`
  still uses Turbopack; the **production build uses webpack** (see Hosting below). Next 16 renamed
  middleware to **proxy** (`src/proxy.ts`). Check `node_modules/next/dist/docs/` before using
  framework APIs (see AGENTS.md).
- Prisma 6 + Postgres on **Neon**, paid "Build" plan — always-on compute, no more idle-suspend
  cold-start failures (pooled connection with `connect_timeout=15`).
- Admin auth: own email/password, bcryptjs + `jose` JWT cookie (`src/lib/auth.ts`,
  `src/lib/session-token.ts`); `/admin/*` is guarded by `src/proxy.ts`.
- Images: **Vercel Blob** (store `worldopportunitieshub-images`), accessed via a standalone
  `BLOB_READ_WRITE_TOKEN` — not via Vercel OIDC, since hosting is no longer on Vercel. This token
  works from anywhere; the Blob store is independent of any Vercel project (verified: the old
  Vercel project's connection to the store was removed, images kept working). Upload goes through
  `src/app/api/upload/route.ts` using `put()`. Content is Markdown rendered with `marked`.
- Hosting: **Hostinger** (Node.js Web App, "Build" plan), auto-deploys from `master` on GitHub.
  Build command is `npm run build` (`prisma generate && next build --webpack` — **webpack, not
  Turbopack**: Turbopack's CSS build step fails on Hostinger's build container, see git history
  around Oct 2026 for the failed-build investigation). Domain `worldopportunitieshub.com` and
  hosting are both on Hostinger now, same account. Vercel is no longer used for hosting at all —
  the old Vercel project can be safely deleted (nothing on the live site depends on it, only the
  Blob store survives independently, see above). Database is **Neon Postgres**, now on the paid
  "Build" plan (250 compute-hours/month, always-on compute) after the free tier's 100-hour quota
  was exhausted once. Analytics: GA4 via `src/components/google-analytics.tsx` (public pages
  only). Google Search Console is verified by a TXT record in Hostinger DNS (same DNS zone as the
  domain, now self-managed since domain + hosting are the same account).
- AdSense: site verification script is in `src/components/google-adsense.tsx` (a plain `<script>`
  tag, not `next/script`, so it's present in the server-rendered `<head>` — AdSense's crawler
  checks for the literal tag, which `next/script`'s `beforeInteractive` strategy does NOT produce
  in the initial HTML). `ads.txt` is a static file at `public/ads.txt`.

## Data model (`prisma/schema.prisma`)
- `Opportunity`: title, slug, type, status (draft|published), summary, body (markdown),
  organization, officialUrl, country, region, level, fundingType, deadline, coverImage,
  isFeatured, viewCount, publishedAt. Index on (status, publishedAt).
- `Article`, `Tag` (+ join tables), `AdminUser`, `NewsletterSubscriber`.
- Types/levels/regions/funding are plain strings validated in code: `src/lib/taxonomy.ts`.
  type: scholarship, job, grant, fellowship, internship, competition, conference, exchange,
  training, workshop, volunteering, other. region: africa, asia, europe, north-america,
  south-america, oceania, middle-east, global. level: high-school, undergraduate, masters, phd,
  postdoc, professional, any. fundingType: fully-funded, partially-funded, paid, unpaid,
  unspecified.
- Migrations are Postgres-only (`prisma/migrations`). The shared Neon DB is the **production**
  database, so local dev also reads and writes production data. Be careful with tests.

## Site structure
- Public pages in `src/app/(site)/`; admin in `src/app/admin/(dashboard)/`; server actions in
  `src/app/actions/`; reusable bits in `src/components/`; queries in `src/lib/queries.ts`.
- Homepage order (set by the owner): hero video, Latest Opportunities (published in the last
  72 hours, any category, queried in the DB), Scholarships, Conferences, Fellowships, Jobs,
  Grants, Guides & Articles, then the newsletter signup. Navbar: Scholarships, Conferences,
  Grants, Fellowships, More (all other types incl. Jobs), Articles, About.
- Expired listings (deadline passed) are hidden from lists but the detail page stays up with a
  "deadline passed" notice. Sitemap is dynamic. Canonical URLs + JSON-LD are in place.
- Theme: clean white. Primary green `#047857` (text-safe on white), amber for Featured/Apply,
  and one color per opportunity type in `src/lib/type-theme.ts`. Central tokens in
  `src/app/globals.css`. Fonts: Inter + Playfair Display.
- Hero: muted looping video (`public/video/students-hero.mp4`) on desktop, static poster on
  mobile / reduced motion. White headline text sits on a tight dark chip.
- Footer: WhatsApp Channel banner, big Facebook/Instagram/LinkedIn buttons
  (`src/lib/social.ts`), newsletter form.
- Logo: the owner's supplied image, cropped (`public/brand/logo-icon.png`, `src/app/icon.png`,
  `src/app/apple-icon.png`). The owner rejected a redrawn vector, so do not redraw it. A
  higher-resolution original would be better if they can supply one.
- Admin image uploader (`src/components/admin/image-upload.tsx`) offers Fill (drag/zoom) or Fit
  whole image, saves 1280x720 WebP.

## How content is added
- Owner uses `/admin` for listings and articles. When the owner pastes a source article link we
  (1) read it for facts, (2) verify dates against the official page, (3) write original wording
  in simple English (never copy), (4) insert the Opportunity via a short Prisma node script
  (`process.loadEnvFile(".env")`, slug via `slugify`, `status: "published"`, `publishedAt: new Date()`),
  and (5) check the live page. Do not invent unconfirmed numbers; say "see the official
  announcement" and use `fundingType: "unspecified"` when unknown.

## Working rules and gotchas
- Git: no identity is configured. Commit with
  `git -c user.name="WorldOpportunitiesHub" -c user.email="<owner email>" commit ...`.
  Never change git config. End commit messages with the Co-Authored-By line from the session
  reminder. Pushing to `master` deploys to production within about a minute.
- This Windows machine has an npm allow-scripts policy. Install with
  `npm install --ignore-scripts <pkg>`, and run `npx prisma generate` explicitly. Build is
  `prisma generate && next build --webpack` (the `build` script in package.json) — Turbopack's
  CSS build step fails on Hostinger's build container, so production builds use webpack.
- Orphaned `node` processes survive TaskStop on Windows and lock Prisma's engine file. Kill them
  with PowerShell `Get-Process node | Stop-Process -Force` before `npm run build` or
  `prisma generate`.
- Do not create accounts or accept terms for the owner (for example winget's agreements). Give
  them exact steps instead. Never paste secrets into chat.
- The in-app browser can't screenshot `file://` pages; serve through the dev server instead.
  Take a second screenshot when the first looks blank (lazy images).

## Environment variables (names only; values are in `.env` and Hostinger's env panel)
`DATABASE_URL` (Neon pooled, with `connect_timeout=15`), `SESSION_SECRET`, `ADMIN_EMAIL`,
`ADMIN_PASSWORD` (only used by `prisma/seed.ts` to create the admin row; changing it in an env var
does nothing until the seed is re-run), `NEXT_PUBLIC_SITE_URL` (now `https://worldopportunitieshub.com`),
`BLOB_READ_WRITE_TOKEN` (the active Blob credential — works independent of any hosting provider).
`BLOB_STORE_ID` / `BLOB_WEBHOOK_PUBLIC_KEY` were only used for Vercel's OIDC-based Blob auth and are
not needed on Hostinger.

## Deploying changes
Push to `master` on GitHub — Hostinger's Web App auto-deploys from it (same as Vercel used to).
Check the deploy under hPanel → Websites → the Web App → Deployments. Database migrations are
**not** run automatically by the build — run `npx prisma migrate dev --name <name>` locally
first (applies directly to the shared production Neon DB, same as before the Hostinger move),
commit the generated migration file, then push.
