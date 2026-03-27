## Daily Commands

- `make dev` or `npm run dev`: start local development.
- `make check` or `npm run check`: run TypeScript, lint, and a production build.
- `npm run optimize`: convert oversized JPG/PNG assets in `public/` into WebP files.
- `make build` or `npm run build`: production build plus sitemap verification.
- `make deploy`: stage, commit, and push manually.

## How to add a new service page

1. Copy one of the existing folders in `app/` such as `app/cinematic-ads/`.
2. Rename the folder to the new slug and update the page copy.
3. Add a `generateMetadata()` block using `createServiceMetadata()` from `lib/service-metadata.ts`.
4. Add the new route to `app/sitemap.ts`.
5. Link the new page from `components/site-header.tsx`, the homepage, or any CTA surface that should reach it.

## How to add a new video to hero

1. Drop the MP4 into `public/videos/`.
2. Add or replace the matching poster image in `public/images/hero-posters/`.
3. Update the hero video list in `components/hero.tsx`.
4. Restart `npm run dev` if the new asset is not picked up immediately.

## How to update pricing

1. Update the homepage card pricing in `components/pricing.tsx`.
2. Update plan pricing text in `components/pricing-cards.tsx` if the card copy changes.
3. Update checkout math in `app/checkout/page.tsx`.
4. Update any matching CTA copy on service pages if the public-facing numbers changed.

## How to change WhatsApp number

1. Change `NEXT_PUBLIC_WHATSAPP_NUMBER` in your local `.env.local` and in the hosting platform environment settings.
2. The site reads it through `lib/env.ts`, so every WhatsApp link updates from that single value.
3. Rebuild the app after changing it.

## How to deploy manually

1. Run `npm run check`.
2. Run `git add .`.
3. Run `git commit -m "your message"`.
4. Run `git push origin main`.
5. Watch the CI workflow until it finishes green.
