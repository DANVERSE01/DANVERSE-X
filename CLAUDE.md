# DANVERSE-X

## Identity
Cinematic creative portfolio — Alexandria → GCC markets.
Visual benchmark: jacobandco.com

## Quality Bar
**AWWWARDS Site of the Day level.** Reference studios: Active Theory, Lusion, Resn, Bruno Simon.
Every section must have a cinematic entrance. Nothing just appears. Nothing just fades.

## Stack
Next.js 15 App Router · TypeScript strict · Tailwind CSS
GSAP 3.14 ScrollTrigger · Three.js r169 · Lenis 1.3 · Framer Motion 12
Netlify static export (`output: "export"`)

## Deploy
Netlify ONLY. Never Vercel. Never suggest Vercel.

## Color System — NEVER CHANGE THESE
Actual tokens from `lib/tokens.css`:
```
--color-bg:            #06070a        (true black base)
--color-surface:       #0d1015        (card bg)
--color-electric-blue: #E0E75B        (citrus-lime — primary brand)
--color-hot-pink:      #00A6A6        (aqua-teal — secondary brand)
--color-acid-lime:     #EF786A        (coral — accent)
--color-lavender:      #C48BB4        (lavender — accent)
--color-text-primary:  #f4eee5        (off-white body)
--ease-cinematic:      cubic-bezier(0.22, 1, 0.36, 1)
--ease-snap:           cubic-bezier(0.34, 1.56, 0.64, 1)
```
**Session rule: do not change any color token under any circumstance.**

## Architecture Notes

### Client Component Rule
Any component using React hooks (`useState`, `useRef`, `useGsapEnter`, `useMagnetic`, etc.) MUST have `"use client"` as its first line. Missing this causes `TypeError: x is not a function` in the server bundle.

### Hook Files
`hooks/use-gsap-enter.ts` and `hooks/use-magnetic.ts` have `"use client"` — this is correct. Do NOT remove it.

### Next.js `output: "export"` (static)
No SSR at runtime. All pages prerender at build time. Dynamic components still get SSR'd during build — so `"use client"` on all hook-using components is mandatory.

### GSAP + Lenis Integration
`lib/gsap.ts` is the GSAP singleton. It polls for `window.__DANVERSE_LENIS__` (Lenis is lazy-loaded after user interaction). Never import GSAP directly — always use `lib/gsap.ts`.

## Project Structure
```
app/          ← Next.js App Router pages + layouts
components/   ← Reusable components
styles/       ← CSS modules + global styles
lib/          ← Utilities, tokens, helpers
hooks/        ← React custom hooks
docs/         ← Extended reference docs (read on demand)
```

## Current Status (as of session ending)

### DONE
- Custom cinematic cursor — circular, scales on hover, label on project cards, blend on dark
- Magnetic pull effect — all buttons and nav links via `HoverLift` + `useMagnetic`
- GSAP kinetic entrance on Hero — stage, headline lines, sub copy, chips, CTAs, cards
- GSAP ScrollTrigger entrances — all 8 sections: Features, Pricing, TrustBand, CaseStudySpotlight, LogoMarquee, CinematicShowcase, BriefQualifier, AppverseFooter
- Film grain overlay — canvas with Xorshift32 PRNG, mix-blend-overlay, 16fps
- WebGL plasma shader — mouse-reactive distortion via `u_mouse` uniform
- Lenis smooth scroll — lazy-loaded, wired to GSAP ticker
- GSAP singleton in `lib/gsap.ts`
- `hooks/use-gsap-enter.ts` — 7 entrance presets
- `lib/split-text.ts` — word/char splitting with aria-label preservation
- `components/text-reveal.tsx` — slide-up, blur-in, clip-up, scramble presets
- Page transitions — full-screen curtain/wipe via GSAP, PageTransition in layout
- TextReveal on all `<h2>` section headings — Features, TrustBand, CaseStudySpotlight, LogoMarquee, CinematicShowcase, BriefQualifier, AppverseFooter; MasterclassShowcase uses blur-rise GSAP entrance on content block
- Parallax depth — `useParallax` on background blobs in Features, LogoMarquee, CaseStudySpotlight (featured image); `useParallax` hook disabled on `pointer: coarse`
- Mobile graceful degradation — cursor, magnetic, parallax all bail on `pointer: coarse`
- Work showcase hover state — slide-in info panel + glow ring on hover in CinematicShowcase
- Build passes — clean TypeScript, zero errors
- Lighthouse performance optimizations — dead code pruned (gsap.ts), CapabilitiesGrid lazy-loaded, overlays SSR-disabled, ProcessSection ScrollTrigger nuke fixed, skip-link, aria-hidden marquee, Canvas role/aria-label, nav logo priority, optimizePackageImports, image cache headers

### MISSING (next session must continue)
- Nothing — all work complete. Run Lighthouse desktop audit to verify >85.

### Session Continuation Rule
Every new session MUST:
1. Read this file first
2. Continue from "MISSING" without asking questions
3. Never redo work already marked DONE
4. Mark items DONE as they are completed

## Code Rules
- TypeScript: zero `any`, zero `@ts-ignore`, zero `as unknown`
- Mobile-first — design for 375px first, scale up
- Tailwind utilities only — no arbitrary CSS unless animating with GSAP or Three.js
- Complete files only — never provide snippets or partials
- No backwards-compat shims, no dead code, no commented-out blocks

## Output Rules
- No preamble. No narration ("I'll now..."). No post-summary.
- If fixing a bug → show only the fix
- No docstrings on code you didn't add
- No extra features beyond what was asked

## Forbidden — Never Read
node_modules/ | .next/ | out/ | dist/ | .git/

## MCP Servers Available
- Figma MCP — design-to-code
- Netlify MCP — deploy management
- GitHub MCP — repo/PR/issues
- Context7 — up-to-date library docs (add "use context7" to prompt)

## Skills Available
See `.claude/skills/` — auto-loaded for relevant tasks:

### Original Skills
- `danverse-design-system` — color tokens, animations, design language
- `nextjs-patterns` — App Router, server components, data fetching
- `cinematic-prompts` — AI video prompt engineering
- `framer-motion` — animation patterns and variants
- `threejs-webgl` — 3D scenes and WebGL shaders
- `typescript-rules` — strict TypeScript patterns
- `arabic-rtl` — Arabic language + RTL web systems

### New Skills (April 2026)
- `accessibility` — WCAG 2.1 AA, ARIA patterns, keyboard nav, motion/reduced-motion
- `security` — XSS prevention, CSP, env vars, dependency audit, Netlify headers
- `git-workflow` — branching strategy, conventional commits, rebase, release tagging
- `testing` — Vitest + RTL + Playwright, GSAP/Three.js mocking, coverage targets
- `performance` — Core Web Vitals, bundle budgets, dynamic imports, Lenis+GSAP optimization
- `seo` — metadata API, OG/Twitter cards, structured data, hreflang, sitemap

## Subagents Available
See `.claude/agents/` — invoke for specialized tasks:

### Original Agents
- `code-reviewer` — post-change quality analysis
- `ui-architect` — component and layout design
- `performance-auditor` — pre-deploy bundle + CWV audit
- `prompt-engineer` — AI video prompt writing
- `debug-specialist` — systematic error diagnosis

### New Agents (April 2026)
- `security-auditor` — deep vulnerability scanning (XSS, secrets, CSP, dep CVEs)
- `test-engineer` — write unit/integration/E2E tests with proper GSAP mocking
- `accessibility-expert` — WCAG 2.1 AA compliance review and remediation
- `git-master` — complex git operations: rebase, bisect, cherry-pick, releases
- `seo-optimizer` — metadata audit, structured data, sitemap, hreflang

## Slash Commands Available
See `.claude/commands/` — run with `/command-name` in Claude Code:

### Original Commands
- `/deploy-check` — TypeScript + build + asset + env pre-deploy audit
- `/new-component` — scaffold new DANVERSE-X component
- `/review-code` — post-change code quality review
- `/session-notes` — write session summary to SESSION_NOTES.md
- `/video-prompt` — cinematic AI video prompt generator

### New Commands (April 2026)
- `/commit` — smart conventional commit with gitmoji, auto-stages, splits by concern
- `/create-pr` — branch + commit + push + open GitHub PR
- `/pr-review $PR` — 5-perspective review: PM, Engineering, QA, Security, DevOps
- `/fix-github-issue $N` — fetch, analyze, fix, and PR for GitHub issue #N
- `/todo` — manage project todos.md (add, complete, list, remove, next, past-due)
- `/context-prime` — deep-read codebase and produce structured context summary
- `/release $VERSION` — update CHANGELOG, tag, push, create GitHub release
- `/security-audit` — full security scan: deps, secrets, XSS, CSP, headers
- `/performance-check` — bundle analysis, dynamic import audit, CWV checklist

## Docs (load on demand)
- docs/ARCHITECTURE.md — full system architecture
- docs/COLOR_SYSTEM.md — extended color and theming docs
- DEPLOYMENT_CHECKLIST.md — full Netlify deploy checklist
