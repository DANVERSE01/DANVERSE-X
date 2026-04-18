# PR Review

**PR**: $ARGUMENTS

Perform a comprehensive 5-perspective code review. Fix all issues immediately — no deferrals.

---

## 1 — Product Review

Evaluate from a product management perspective:
- Does the change deliver clear user or business value?
- Is the UX intuitive and coherent with DANVERSE-X design language?
- Does it align with the portfolio's strategic goal (Alexandria → GCC, AWWWARDS-level quality)?

Fix any UX regressions immediately.

---

## 2 — Engineering Review

Evaluate as a senior lead engineer:
- **Code quality**: readable, maintainable, no dead code
- **TypeScript**: zero `any`, zero `@ts-ignore`, correct types throughout
- **Performance**: no unguarded re-renders, GSAP timelines cleaned up, Three.js geometries disposed
- **Best practices**: `"use client"` on all hook-using components, no direct GSAP imports (use `lib/gsap.ts`)

Refactor anything that doesn't meet the bar — right now.

---

## 3 — QA Review

Evaluate test coverage and correctness:
- Are edge cases handled (mobile, touch, keyboard navigation)?
- Do animations degrade gracefully on `pointer: coarse`?
- Does the build pass: `npx tsc --noEmit` and `next build`?
- Are there regression risks?

Add missing checks immediately.

---

## 4 — Security Review

Evaluate security posture:
- No `dangerouslySetInnerHTML` with user input
- No secrets in client code — only `NEXT_PUBLIC_` env vars on the client
- No `eval()` or `Function()` calls
- Proper Content Security Policy in `netlify.toml`
- No XSS vectors in dynamic content

Fix every vulnerability now.

---

## 5 — Deploy / DevOps Review

Evaluate deployment readiness:
- Does `netlify.toml` have correct headers and redirects?
- Are heavy dependencies dynamically imported (`ssr: false`)?
- No `console.log` in production code paths
- Images use `next/image`, not raw `<img>`

Resolve blockers before merge.

---

## Output Format

```
### Product: ✅/❌ [summary]
### Engineering: ✅/❌ [summary]
### QA: ✅/❌ [summary]
### Security: ✅/❌ [summary]
### Deploy: ✅/❌ [summary]

VERDICT: APPROVE / REQUEST CHANGES
Blockers: [list or "none"]
```
