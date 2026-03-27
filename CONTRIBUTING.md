# Contributing

## Clone and run locally

```bash
git clone https://github.com/DANVERSE01/DANVERSE-X.git
cd DANVERSE-X
npm install
cp .env.example .env.local
npm run dev
```

Required public environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CONTACT_EMAIL`

Optional public environment variables:

- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_SENTRY_DSN`

## Branch naming

Use one of these prefixes for all branch names:

- `feat/short-description`
- `fix/short-description`
- `chore/short-description`

## Commit convention

Commits are validated with Commitlint and must follow Conventional Commits.

Examples:

- `feat: add vitals ingestion route`
- `fix: prevent video autoplay when offscreen`
- `chore: tighten TypeScript and hook config`

## Run checks

Use these commands before opening a pull request:

```bash
npm run lint
npm run test
npm run test:e2e
npx tsc --noEmit
npm run build
```

## Pull requests

Keep PRs focused, explain the change clearly, and include screenshots for UI changes. Link the related issue when one exists and note any environment or deployment impact in the PR description.
