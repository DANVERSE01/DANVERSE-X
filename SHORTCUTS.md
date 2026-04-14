## Daily Commands

- `make dev` or `npm run dev`: start local development.
- `npm run typecheck`: run TypeScript validation.
- `make build` or `npm run build`: production build.

## How to add a new work entry

1. Add or map source material into `content/work.ts`.
2. Use only the brief-approved work fields:
   - `slug`
   - `title`
   - `year`
   - `date`
   - `category`
   - `hook`
   - `solution`
   - `tags`
   - `cover`
   - `gallery`
   - `featured`
   - optional `video`
   - optional `results`
3. Leave unresolved fields unresolved instead of inventing replacements.
4. Store approved still imagery under `public/images/work/`.
5. Keep local video source material out of `/public`.

## How to update navigation copy

1. Update `components/nav/SiteNav.tsx`.
2. Keep labels aligned with the brief sections only: Work, Services, Process, Contact.
3. Mirror any mobile navigation changes in `components/nav/MobileMenu.tsx`.

## How to update the original logo asset

1. Replace `public/brand/danverse-mark.png` with the approved master asset.
2. Regenerate any derived icons or OG assets if the mark changes materially.

## How to validate before handoff

1. Run `npm run typecheck`.
2. Run `npm run build`.
3. Verify `/`, `/work`, one work detail route, and a 404 route in the browser.
