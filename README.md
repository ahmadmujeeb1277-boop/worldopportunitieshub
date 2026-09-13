# WorldOpportunitiesHub

An aggregator site for scholarships, jobs, grants, fellowships, and other opportunities.
Every listing links out to the official provider — this site never collects applications.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Prisma** ORM with **SQLite** for local development (swap to Postgres for production — see below)
- Custom email/password admin auth (JWT session cookie via `jose`, `bcryptjs` for hashing)
- **Markdown** content (`marked`) for opportunity and article bodies

## Getting started

```bash
npm install
npm run db:migrate   # creates the local SQLite database
npm run db:seed       # creates the admin user + sample opportunities/articles
npm run dev
```

Visit `http://localhost:3000`. Admin panel: `http://localhost:3000/admin/login`.

Admin credentials come from `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) and are applied the
next time you run `npm run db:seed`. **Change `ADMIN_PASSWORD` in `.env` and re-run
`npm run db:seed` before going live** — the seeded default is not secure.

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

1. **Database**: create a free Postgres instance (e.g. [Neon](https://neon.tech) or
   [Supabase](https://supabase.com)), then in `prisma/schema.prisma` change
   `datasource db { provider = "sqlite" ... }` to `provider = "postgresql"`, set
   `DATABASE_URL` to the new connection string, and run `npm run db:migrate` once against it.
2. **Session secret**: generate a new value for `SESSION_SECRET` in production
   (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
3. **Deploy**: push to GitHub and import the repo on [Vercel](https://vercel.com) (recommended —
   zero-config for Next.js). Set the same environment variables from `.env` in the Vercel
   project settings.
4. **Domain**: buy the domain wherever you like (Hostinger, GoDaddy, etc.) and point its
   DNS/nameservers at Vercel — the registrar and host don't need to be the same company.
5. Run `npm run db:seed` once against the production database to create the real admin
   account (with a strong password), then delete the sample opportunities/articles from
   the admin panel.

## Assets

Drop your logo/brand files in `assets/logo/` and hero imagery in `assets/images/` in the
project root — they're not wired into the site automatically, so tell your dev (or ask
Claude Code) to swap them in when you have final files.
