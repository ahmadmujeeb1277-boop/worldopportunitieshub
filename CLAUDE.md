@AGENTS.md

# WorldOpportunitiesHub: project handoff

Read this first in a new session. It records what exists, how it was built, and the rules the
owner expects. **No secrets belong in this file** (the GitHub repo is public). Real values live in
`.env` locally and in Vercel's environment variables.

## What this is
An aggregator site for scholarships, jobs, grants, fellowships, conferences, internships and similar
opportunities, plus guide articles. We are NOT the provider: every listing links out to the official
site ("Apply on Official Website"). Live at https://worldopportunitieshub.com (also
worldopportunitieshub.vercel.app). The owner is not a developer. Explain in plain, simple English,
do one thing at a time, and show results before moving on.

## Stack
- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind v4 (+ typography plugin).
  Next 16 renamed middleware to **proxy** (`src/proxy.ts`). Check `node_modules/next/dist/docs/`
  before using framework APIs (see AGENTS.md).
- Prisma 6 + Postgres on **Neon** (pooled connection with `connect_timeout=15`; Neon free tier
  suspends when idle, so the first request after idle can fail once with "Can't reach database").
- Admin auth: own email/password, bcryptjs + `jose` JWT cookie (`src/lib/auth.ts`,
  `src/lib/session-token.ts`); `/admin/*` is guarded by `src/proxy.ts`.
- Images: **Vercel Blob** (public store, authenticated via Vercel OIDC + `BLOB_STORE_ID`, there is
  no `BLOB_READ_WRITE_TOKEN`). Upload goes through `src/app/api/upload/route.ts` using `put()`.
  Content is Markdown rendered with `marked`.
- Hosting: Vercel (auto-deploys from `master` on GitHub). Domain registered at Hostinger; DNS has an
  A record `@` -> Vercel. Analytics: GA4 via `src/components/google-analytics.tsx` (public pages
  only). Google Search Console is verified by a TXT record in Hostinger DNS.

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
  `prisma generate && next build`.
- Orphaned `node` processes survive TaskStop on Windows and lock Prisma's engine file. Kill them
  with PowerShell `Get-Process node | Stop-Process -Force` before `npm run build` or
  `prisma generate`.
- Do not create accounts or accept terms for the owner (for example winget's agreements). Give
  them exact steps instead. Never paste secrets into chat.
- The in-app browser can't screenshot `file://` pages; serve through the dev server instead.
  Take a second screenshot when the first looks blank (lazy images).

## Environment variables (names only; values are in `.env` and Vercel)
`DATABASE_URL` (Neon pooled, with `connect_timeout=15`), `SESSION_SECRET`, `ADMIN_EMAIL`,
`ADMIN_PASSWORD` (only used by `prisma/seed.ts` to create the admin row; changing it in an env var
does nothing until the seed is re-run), `NEXT_PUBLIC_SITE_URL` (Production, type Config),
`BLOB_STORE_ID` and `BLOB_WEBHOOK_PUBLIC_KEY` (added by the Vercel Blob integration).
Vercel also has leftover `DATABASE_URL_UNPOOLED` entries from the Neon integration marked
"Needs Attention"; production still works, so check them later.

## Open item: moving to the Hostinger hosting the owner just bought
Not started. Things to establish and decide first:
1. **Which Hostinger product is it?** Next.js with server rendering, server actions and Prisma needs
   Node.js hosting (Hostinger's Node.js web app hosting / Business-or-higher or Cloud plans, or
   a VPS). Plain shared PHP hosting cannot run this app. Confirm before changing anything.
2. **Is moving needed at all?** Vercel's free tier already runs the site well. Moving costs effort
   and risk; the owner has still decided to move, so help them do it safely.
3. **Image uploads will break off Vercel.** Blob auth uses Vercel OIDC. Off Vercel, either create a
   Blob read-write token and set `BLOB_READ_WRITE_TOKEN`, or switch storage (Cloudinary/S3).
   Existing image URLs on `*.public.blob.vercel-storage.com` keep working either way.
4. Plan: build on the host, set the env vars above, run `prisma migrate deploy` (DB stays on
   Neon), start with `next start`, then repoint DNS: replace the Vercel A record in Hostinger DNS,
   keep the TXT verification records, and update `NEXT_PUBLIC_SITE_URL`. Keep Vercel live until the
   new host is verified, then switch DNS, to avoid downtime. Re-check GA4 and Search Console after.
