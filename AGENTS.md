# AGENTS.md — DANVERSE-X

> This file is automatically read by **OpenAI Codex**, **Claude Code**, **Cursor**, **GitHub Copilot**, **KiloCode**, **Gemini CLI**, and any other AI coding agent. It defines project rules, constraints, and agent capabilities.

---

## Project Identity

**DANVERSE-X** is a cinematic creative portfolio built for the Alexandria → GCC market.  
Visual benchmark: jacobandco.com | Quality bar: AWWWARDS Site of the Day.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js App Router | 15.x |
| Language | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS | 3.x |
| Animation | GSAP + ScrollTrigger | 3.14 |
| 3D | Three.js | r169 |
| Smooth scroll | Lenis | 1.3 |
| Motion | Framer Motion | 12.x |
| Deploy | Netlify (static export) | — |

---

## Absolute Rules — All Agents Must Follow

1. **Never change color tokens** — values in `lib/tokens.css` are locked. Do not alter hex values.
2. **Never suggest Vercel** — deploy target is Netlify only, always.
3. **TypeScript strict** — zero `any`, zero `@ts-ignore`, zero `as unknown as X`.
4. **`"use client"` required** on every component that uses React hooks.
5. **Never import GSAP directly** — always import from `lib/gsap.ts` (the singleton).
6. **Never use raw `<img>`** — always use `next/image`.
7. **Mobile-first** — design and implement for 375px viewport first, then scale up.
8. **Tailwind utilities only** — no inline CSS or `style={{}}` unless animating with GSAP/Three.js.
9. **No dead code** — no commented-out blocks, no console.log in production code.
10. **Never read** `node_modules/`, `.next/`, `out/`, `dist/`, `.git/`.

---

## Project Structure

```
app/               ← Next.js App Router pages + layouts
components/        ← React components
styles/            ← CSS modules + global styles
lib/               ← Utilities, tokens, GSAP singleton
hooks/             ← Custom React hooks
docs/              ← Extended architecture docs
public/            ← Static assets
shaders/           ← GLSL shader files
.claude/
  commands/        ← Slash commands (Claude Code / Codex)
  skills/          ← Domain knowledge files
  agents/          ← Specialist sub-agent definitions
  hooks/           ← Lifecycle hook scripts
```

---

## Color System (NEVER modify)

```css
--color-bg:            #06070a   /* true black base */
--color-surface:       #0d1015   /* card backgrounds */
--color-electric-blue: #E0E75B   /* primary brand — citrus-lime */
--color-hot-pink:      #00A6A6   /* secondary brand — aqua-teal */
--color-acid-lime:     #EF786A   /* accent — coral */
--color-lavender:      #C48BB4   /* accent — lavender */
--color-text-primary:  #f4eee5   /* body text */
--ease-cinematic:      cubic-bezier(0.22, 1, 0.36, 1)
--ease-snap:           cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## Animation Architecture

- **Entrances**: All section entrances use GSAP ScrollTrigger via `hooks/use-gsap-enter.ts`
- **Smooth scroll**: Lenis, lazy-loaded after first user interaction, wired to GSAP ticker
- **Page transitions**: Full-screen curtain wipe in `components/page-transition.tsx`
- **Cursor**: Custom cinematic cursor in `components/cursor.tsx`
- **Film grain**: Canvas overlay using Xorshift32 PRNG at 16fps
- **WebGL**: Three.js plasma shader with mouse-reactive uniforms

**Graceful degradation**: Cursor, magnetic effects, and parallax all bail on `pointer: coarse` (touch devices).

---

## Available Slash Commands

Run in Claude Code with `/command-name`:

| Command | Purpose |
|---------|---------|
| `/commit` | Smart conventional commit with gitmoji |
| `/create-pr` | Branch + commit + open pull request |
| `/pr-review $PR` | 5-perspective PR review (PM/Eng/QA/Security/DevOps) |
| `/fix-github-issue $N` | Analyze and fix GitHub issue #N |
| `/todo` | Manage project todos in `todos.md` |
| `/context-prime` | Deep-prime context with codebase knowledge |
| `/release $VERSION` | Tag and publish a release |
| `/security-audit` | Full security vulnerability scan |
| `/performance-check` | Bundle + CWV performance audit |
| `/deploy-check` | Pre-deploy readiness audit |
| `/new-component $NAME` | Scaffold a new DANVERSE-X component |
| `/review-code` | Post-change code quality review |
| `/session-notes` | Write session summary to SESSION_NOTES.md |
| `/video-prompt $BRIEF` | Generate cinematic AI video prompt |

---

## Available Skills (Auto-loaded by trigger)

| Skill | Trigger Keywords |
|-------|----------------|
| `danverse-design-system` | color, token, brand, animation, css variable |
| `nextjs-patterns` | app router, server component, data fetching |
| `typescript-rules` | type, interface, generic, strict |
| `framer-motion` | motion, variant, animate, spring |
| `threejs-webgl` | three.js, webgl, shader, mesh, geometry |
| `cinematic-prompts` | video, ai video, sora, runway, kling |
| `arabic-rtl` | arabic, rtl, dir, بالعربي |
| `accessibility` | a11y, aria, wcag, focus, screen reader |
| `security` | xss, csp, secret, api key, vulnerability |
| `git-workflow` | git, branch, commit, rebase, merge |
| `testing` | test, vitest, playwright, rtl, coverage |
| `performance` | bundle, cwv, lcp, lazy, optimize |
| `seo` | metadata, og, sitemap, ranking, schema |

---

## Available Specialist Agents

Invoke these for deep-focus work:

| Agent | When to Use |
|-------|------------|
| `code-reviewer` | After any code changes — bugs, TS, security, perf |
| `ui-architect` | Designing new components or layout systems |
| `performance-auditor` | Pre-deploy bundle and CWV analysis |
| `debug-specialist` | Systematic diagnosis of errors |
| `prompt-engineer` | AI video prompt writing |
| `security-auditor` | Security-focused audit of any new code |
| `test-engineer` | Writing tests for components, hooks, utilities |
| `accessibility-expert` | WCAG 2.1 AA compliance review |
| `git-master` | Complex git operations (rebase, bisect, release) |
| `seo-optimizer` | Metadata, structured data, sitemap audit |

---

## Build & Deploy

```bash
# Local dev
npm run dev

# TypeScript check
npx tsc --noEmit

# Production build
npm run build

# Deploy (manual)
netlify deploy --prod --dir=out
```

**Deploy target**: Netlify. Static export (`output: "export"` in next.config.mjs).  
All pages prerender at build time — no server-side rendering at runtime.

---

## Docs (load on demand)

- `docs/ARCHITECTURE.md` — full system architecture
- `docs/COLOR_SYSTEM.md` — extended color theming docs
- `DEPLOYMENT_CHECKLIST.md` — full Netlify deploy checklist
- `CLAUDE.md` — primary project context (Claude Code)
