# WorldOpportunitiesHub

An aggregator site for scholarships, jobs, grants, fellowships, and other opportunities.
Every listing links out to the official provider — this site never collects applications.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Prisma** ORM with **Postgres** (hosted on [Neon](https://neon.tech))
- Custom email/password admin auth (JWT session cookie via `jose`, `bcryptjs` for hashing)
- **Markdown** content (`marked`) for opportunity and article bodies

## Getting started

Set `DATABASE_URL` in `.env` to your Neon connection string (see `.env.example`), then:

```bash
npm install
npm run db:migrate   # applies migrations to your Postgres database
npm run db:seed       # creates the admin user + sample opportunities/articles
npm run dev
```

Visit `http://localhost:3000`. Admin panel: `http://localhost:3000/admin/login`.

Admin credentials come from `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) and are applied the
next time you run `npm run db:seed`. **Change `ADMIN_PASSWORD` in `.env` and re-run
`npm run db:seed` before going live** — the seeded default is not secure.

### Neon cold starts

Neon's free tier suspends its compute after a period of inactivity. The first request
after idle time can occasionally fail with `Can't reach database server` while Neon wakes
back up — it resolves itself on retry. The `connect_timeout=15` parameter in
`DATABASE_URL` (see `.env.example`) gives Prisma enough time to wait for the wake-up
instead of failing immediately; keep that parameter when you set `DATABASE_URL` on Vercel
too. If cold-start failures become a real problem in production, Neon's paid tiers offer
an option to keep compute from suspending.

## Project structure

- `src/app/(site)/` — public pages (home, opportunities, articles, about, legal pages)
- `src/app/admin/` — admin panel (`/admin/login` public, everything else behind auth via `src/proxy.ts`)
- `src/app/actions/` — server actions (auth, opportunities, articles, newsletter)
- `src/lib/` — Prisma client, auth/session helpers, taxonomy constants, query helpers
- `prisma/schema.prisma` — data model
- `prisma/seed.ts` — admin user + sample content
- `public/brand/logo-icon.svg` — the site mark (also used as the favicon)

## Content model

Opportunities and articles are long-form (Markdown body) with structured metadata
(type, region, level, funding type, deadline, official application URL). Use `##`
headings in the body to structure Overview / Eligibility / How to Apply sections —
see `src/app/admin/(dashboard)/opportunities/opportunity-form.tsx` for the exact fields.

## Moving to production

1. **Push to GitHub**, then import the repo on [Vercel](https://vercel.com) (recommended —
   zero-config for Next.js).
2. **Environment variables**: in the Vercel project settings, set `DATABASE_URL` (your Neon
   connection string, with `connect_timeout=15`), a freshly generated `SESSION_SECRET`
   (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`), your real
   `ADMIN_EMAIL` / `ADMIN_PASSWORD`, and `NEXT_PUBLIC_SITE_URL` (your domain).
3. **Domain**: buy the domain wherever you like (Hostinger, GoDaddy, etc.) and point its
   DNS/nameservers at Vercel — the registrar and host don't need to be the same company.
4. Run `npm run db:seed` once against the production database to (re-)create the admin
   account with your real password, then delete the sample opportunities/articles from
   the admin panel once you have real content.

## Assets

Drop your logo/brand files in `assets/logo/` and hero imagery in `assets/images/` in the
project root — they're not wired into the site automatically, so tell your dev (or ask
Claude Code) to swap them in when you have final files.
