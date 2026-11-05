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
- Prisma 6 + **MySQL (MariaDB 11.8) on Hostinger** (`srv487.hstgr.io`), moved off Neon Postgres on
  2026-11-05. Every long-content field (`body`, `summary`, `eligibility`, `benefitsFunding`,
  `requiredDocuments`, `howToApply`, `importantDates`, `faqs`, `officialUrl`, `coverImage`, and
  Article's `body`/`excerpt`) has `@db.Text` — MySQL's default `VARCHAR(191)` silently truncates
  otherwise. Schema is applied with `prisma db push`, not `migrate dev`/`deploy` — the shared-
  hosting DB user has no permission to create the shadow database migrate needs, so there's no
  `prisma/migrations` folder anymore. Remote access is controlled in hPanel → Databases → Remote
  MySQL; the live app's own outbound IP could not be determined (the DB user lacks privilege to
  see other sessions in `SHOW PROCESSLIST`, even under the same username), so access is currently
  set to "Any Host" — ask Hostinger support for a fixed Node.js Web App egress IP/range if this
  needs tightening later. A full data export taken just before the move lives at
  `neon_export_backup_2026-11-05.json` in the project root (gitignored, not a secret but not code
  either) — keep it until the MySQL move has run cleanly for a few days before deleting the Neon
  project.
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
  Blob store survives independently, see above). Database is **MySQL, also on Hostinger, same
  account** (see Stack above) — domain, hosting, and database are now all one account/bill.
  Analytics: GA4 via `src/components/google-analytics.tsx` (public pages only). Google Search
  Console is verified by a TXT record in Hostinger DNS (same DNS zone as the domain, now self-
  managed since domain + hosting are the same account).
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
  type: scholarship, job, grant, fellowship, internship, competition, conference, **course**,
  exchange, training, workshop, volunteering, other. region: africa, asia, europe, north-america,
  south-america, oceania, middle-east, global. level: high-school, undergraduate, masters, phd,
  postdoc, professional, any. fundingType: fully-funded, partially-funded, paid, unpaid,
  unspecified.
- **Adding a new opportunity type** (done once for "course", 2026-11): add it to `OPPORTUNITY_TYPES`
  in `taxonomy.ts` and a matching entry in `type-theme.ts` (color) and `card-image.tsx` (icon) — the
  admin dropdown, sitemap, and category-page SEO metadata all come for free since they iterate that
  same array. **Gotcha:** `/opportunities/[type]/page.tsx` uses `generateStaticParams`, so a brand
  new type's category page 404s until the *next* production build actually runs — it's not visible
  immediately even though the push succeeded. Confirmed on Hostinger: the page started working only
  once a subsequent deploy rebuilt the static params list, not the same deploy that added the type.
- No `prisma/migrations` folder — schema changes are applied with `prisma db push` (see Stack
  above). The shared Hostinger MySQL DB is the **production** database, so local dev also reads
  and writes production data. Be careful with tests.

## Site structure
- Public pages in `src/app/(site)/`; admin in `src/app/admin/(dashboard)/`; server actions in
  `src/app/actions/`; reusable bits in `src/components/`; queries in `src/lib/queries.ts`.
- Homepage order (set by the owner): hero video, Latest Opportunities (published in the last
  72 hours, any category, queried in the DB), Scholarships, Conferences, Fellowships, Jobs,
  Grants, **Courses**, Guides & Articles, then the newsletter signup. Navbar: Scholarships,
  Conferences, Grants, Fellowships, More (all other types incl. Jobs), Articles, About. Hero pills
  and the footer's category list both show `OPPORTUNITY_TYPES.slice(0, 7)` — kept in sync
  deliberately (2026-11 redesign: Conferences was missing from both because the slice used to stop
  at 6).
- Expired listings (deadline passed) are hidden from lists but the detail page stays up with a
  "deadline passed" notice (plus a visible "Closed" badge next to the category pill) and related-
  opportunity suggestions filtered to currently-open listings only. Sitemap is dynamic. Canonical
  URLs + JSON-LD are in place.
- Hero: muted looping video (`public/video/students-hero.mp4`) on desktop, static poster on
  mobile / reduced motion. White headline text sits on a tight dark chip.
- Footer: WhatsApp Channel banner, big Facebook/Instagram/LinkedIn buttons
  (`src/lib/social.ts`), newsletter form.
- Logo: the owner's supplied image, cropped (`public/brand/logo-icon.png`, `src/app/icon.png`,
  `src/app/apple-icon.png`). The owner rejected a redrawn vector, so do not redraw it. A
  higher-resolution original would be better if they can supply one.
- Admin image uploader (`src/components/admin/image-upload.tsx`) offers Fill (drag/zoom) or Fit
  whole image, saves 1280x720 WebP.

## Design system (2026-11 redesign)
- **Fonts**: Inter (body/UI) + Playfair Display (display headings) — kept from the original brand,
  used with more deliberate size contrast now.
- **Ground**: white. **Ink**: near-black. **Primary**: green `#047857` (brand/trust, text-safe on
  white). **Accent**: amber `#D97706` — the one color used for every primary action ("Simply
  Apply", search, hero CTA), nowhere else.
- **Category colors** (`src/lib/type-theme.ts`, one hue per type, each a `badge`/`iconWrap`/`band`/
  `rule`/`seeMore`/`hoverBorder` set): scholarship=emerald, job=sky, grant=amber, fellowship=violet,
  internship=rose, competition=orange, conference=indigo, **course=blue**, exchange=teal,
  training=cyan, workshop=lime, volunteering=pink. Adding a type needs a new entry here (see the
  taxonomy gotcha above) — pick a hue not already used.
- **Cards** (`src/components/opportunity-card.tsx`): one component, two densities. Default is the
  full card (16:9 image, tag, title, excerpt, deadline, funding badge). `compact` prop swaps the
  hero image for a small thumbnail and tightens type, for secondary slots like a homepage category's
  side list — but keeps every field the full card has. There is no second card component anymore
  (the old `OpportunityRow`, which was missing the tag and funding badge, was removed in favor of
  this).
- **Opportunity-page sections** (`src/components/section-block.tsx`): Overview, Eligibility,
  Benefits/Funding, Required Documents, How to Apply, Important Dates each render as their own
  block — a colored bar + icon chip (same visual language as the homepage's `CategorySection`,
  colored by the listing's own category) + a bold heading, not a single undifferentiated wall of
  prose. "Overview" (the `body` field) always gets this treatment now, even on the 92+ older
  listings that only use `body` — this was a deliberate change in the 2026-11 redesign, not a bug.
- **Markdown pseudo-headings** (`src/lib/markdown.ts`, `promotePseudoHeadings`): a lot of existing
  content was authored with a bold-only line standing in for a subheading (and occasionally an
  italic-only line for a smaller one) instead of real `##`/`###` markdown. Both `renderMarkdown` and
  `renderMarkdownWithToc` now auto-promote a line that is *entirely* `**bold**` to an H3, and
  *entirely* `*italic*`/`_italic_` to an H4, before handing the text to `marked`. This runs on every
  render, not stored — no database changes. Side effect worth knowing: this is also what made the
  articles' table of contents start working (they had zero real headings before, just bold text).
  `decodeHtmlEntities` in the same file fixes a related bug where an apostrophe in a heading showed
  up as literal `&#39;` in the table of contents.
- **Button label**: "Apply on Official Website" → **"Simply Apply"** (`src/components/apply-
  button.tsx`), same behavior (`target="_blank"`, `rel="noopener noreferrer nofollow"`).
- **Social images**: `twitter:image` is now set explicitly alongside `og:image` on opportunity and
  article pages, both from the listing's own cover image. Before this it silently inherited the
  root layout's generic `/og-default.jpg` on every single page, since Next doesn't auto-derive
  `twitter.images` from `openGraph.images`.

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
`DATABASE_URL` (MySQL on Hostinger, `mysql://...@srv487.hstgr.io:3306/...`), `SESSION_SECRET`, `ADMIN_EMAIL`,
`ADMIN_PASSWORD` (only used by `prisma/seed.ts` to create the admin row; changing it in an env var
does nothing until the seed is re-run), `NEXT_PUBLIC_SITE_URL` (now `https://worldopportunitieshub.com`),
`BLOB_READ_WRITE_TOKEN` (the active Blob credential — works independent of any hosting provider).
`BLOB_STORE_ID` / `BLOB_WEBHOOK_PUBLIC_KEY` were only used for Vercel's OIDC-based Blob auth and are
not needed on Hostinger.

## Deploying changes
Push to `master` on GitHub — Hostinger's Web App auto-deploys from it (same as Vercel used to).
Check the deploy under hPanel → Websites → the Web App → Deployments. **Changing an environment
variable in hPanel also triggers an auto-deploy by itself** — found this the hard way moving to
MySQL: changed `DATABASE_URL` before the matching code was pushed, and Hostinger redeployed the
old (Postgres-expecting) code against the new connection string immediately, breaking the site
for a few minutes. When an env var change and a code change both need to land together, push the
code **first** (or immediately after), don't leave a gap.

Schema changes are **not** run automatically by the build — run `npx prisma db push` locally
first (applies directly to the shared production MySQL DB), then commit and push the updated
`schema.prisma`.
