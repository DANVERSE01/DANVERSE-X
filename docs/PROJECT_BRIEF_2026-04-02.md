# DANVERSE-X Project Brief and Execution Roadmap

Date: April 2, 2026

## Purpose

This document turns the April 2, 2026 DANVERSE-X project brief into a repo-level execution plan. It preserves the business vision while grounding priorities in the current codebase, build output, and platform constraints.

## Strategic Direction

- Vision: become a premium creative platform for cinematic advertising, AI-assisted production, and brand systems.
- Mission: build visual advantage for brands that need cinematic storytelling and strategic clarity in one execution.
- Primary audiences: luxury brands, beauty brands, growth-stage technology companies, and emerging premium brands.
- Positioning: faster than traditional agencies, more commercially strategic than generic AI tooling, and more visually disciplined than local studios.

## Repo-Validated Current State

Verified locally on April 2, 2026:

- Build succeeds with `npm run build`.
- Homepage first-load JavaScript is `314 kB`, with `173 kB` shared across routes.
- Static export is enabled via `output: "export"` in [next.config.mjs](/d:/Projects/DANVERSE-X/DANVERSE-X/next.config.mjs).
- Images are still configured as unoptimized in [next.config.mjs](/d:/Projects/DANVERSE-X/DANVERSE-X/next.config.mjs).
- A web app manifest already exists at [public/manifest.webmanifest](/d:/Projects/DANVERSE-X/DANVERSE-X/public/manifest.webmanifest), but there is no service worker, offline cache, background sync, or push-notification implementation in the repo yet.
- Netlify security headers exist in [netlify.toml](/d:/Projects/DANVERSE-X/DANVERSE-X/netlify.toml), but there is no explicit Content Security Policy.
- The UI is effectively dark-first today: [app/globals.css](/d:/Projects/DANVERSE-X/DANVERSE-X/app/globals.css) sets `color-scheme: dark`, and [app/layout.tsx](/d:/Projects/DANVERSE-X/DANVERSE-X/app/layout.tsx) only reacts to system theme for favicon logic rather than full theme switching.
- Accessibility groundwork exists, including a skip link, reduced-motion handling, and Web Vitals reporting in [app/layout.tsx](/d:/Projects/DANVERSE-X/DANVERSE-X/app/layout.tsx).
- The automated test setup was broken by a Windows path-resolution issue in Vitest and is being corrected in this change set.

## Confirmed Gaps Against the Brief

### Foundation

- Testing was not reliable enough to support confident refactors.
- Existing docs are fragmented across architecture, performance, and deployment notes rather than centered on a single current execution plan.

### Performance

- The homepage still exceeds the desired first-load budget.
- Static export plus unoptimized images limits how much media performance we get out of the box.
- Heavy visual presentation and motion need ongoing lower-end-device profiling.

### Security

- No CSP is currently enforced.
- No visible rate-limiting or protected-area authentication strategy exists yet.

### PWA

- Manifest groundwork exists, but the platform is not yet a complete PWA.
- Offline mode, installability polish, background sync, and push flows are still missing.

### UX and Accessibility

- Dark mode is not a full theme system.
- Reduced-motion support exists, but broader accessibility verification is not automated.
- Loading-state strategy is partial rather than systemic.

## Execution Priorities

### Phase 1: Foundation and Risk Reduction

Target: Week 1-2

- Repair the test harness and add smoke coverage for homepage, navigation, and key CTAs.
- Add a strict CSP for the static deployment model and document allowed origins for analytics, media, and Sentry.
- Introduce a lightweight accessibility check in CI for critical routes.
- Establish a single source of truth for strategy, metrics, and current-state status.

### Phase 2: Performance and PWA

Target: Week 3-4

- Reduce homepage first-load JavaScript through route-level and component-level lazy loading.
- Audit hero, showcase, and motion-heavy components for chunk size and hydration cost.
- Replace or supplement current media delivery with optimized formats and preload only truly critical assets.
- Add a service worker, offline fallback, app icons, and installability validation.

### Phase 3: Experience System

Target: Week 5-6

- Expand the current dark-first styling into a real theme architecture with system detection and explicit user preference handling.
- Normalize loading states, skeletons, and error states across high-value routes.
- Tune motion for accessibility, battery, and low-end-device resilience without flattening the brand experience.
- Review responsive behavior for tablets, foldables, and narrow landscape layouts.

### Phase 4: Growth and Trust Infrastructure

Target: Week 7-8

- Strengthen SEO with richer structured data, route-level metadata review, and internal linking improvements.
- Expand case-study credibility patterns and measurable proof points throughout the site.
- Tighten analytics around conversion entry points, CTA engagement, and portfolio exploration depth.
- Add monitoring thresholds and alerting for production regressions.

## KPI Mapping

| Area | Current Repo Signal | Target |
| --- | --- | --- |
| LCP / first impression | Homepage first-load JS is `314 kB` | LCP under 2.5s |
| INP | Motion-heavy UI, no current regression benchmark in repo | Under 200ms |
| CLS | No active alerting in repo | Under 0.1 |
| Security baseline | Headers exist, CSP missing | Enforced CSP and reviewed third-party origins |
| PWA readiness | Manifest only | Offline support and installability |
| Accessibility | Good primitives, limited automation | WCAG 2.1 AA verification |
| Conversion instrumentation | Web vitals route exists, business analytics incomplete | CTA and funnel measurement across key pages |

## Immediate Backlog

1. Keep `npm test` green and expand the smoke suite around homepage rendering and primary contact flows.
2. Add a CSP implementation compatible with Netlify static hosting, Sentry, GTM, GA, Vimeo, and any other live third-party origins.
3. Break down the homepage bundle by component and identify the highest-return dynamic import opportunities.
4. Decide whether to keep static export or move to a hosting mode that enables stronger image optimization and richer PWA behavior.
5. Add a service worker strategy for offline shell caching and graceful route fallbacks.
6. Build a real theme controller instead of a dark-only presentation with favicon-only theme awareness.
7. Add automated accessibility auditing for the homepage and one interior route.
8. Replace or archive stale project documentation that no longer reflects the repo's actual status.

## Working Assumptions

- Netlify remains the active hosting target unless there is a later platform decision.
- The site should preserve its current cinematic visual language rather than move toward a generic SaaS look.
- Business-side pricing, campaign strategy, and portfolio content remain parallel workstreams and should be reflected in copy and analytics after the platform baseline is stabilized.