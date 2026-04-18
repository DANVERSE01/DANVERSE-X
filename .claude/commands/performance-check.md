# Performance Check

Run a full performance audit of the DANVERSE-X bundle and Core Web Vitals readiness.

## Steps

### 1 — Bundle Analysis
```bash
npx next build 2>&1 | tail -50
```
Check:
- First Load JS per route — should be < 200kB shared + < 150kB per-page
- Any route > 400kB is a blocker

### 2 — Heavy Dependency Check
```bash
npx bundlephobia-cli $(cat package.json | jq -r '.dependencies | keys[]') 2>/dev/null | sort -rh | head -20
```
Flag any dependency > 50kB gzipped that could be replaced or lazy-loaded.

### 3 — Dynamic Import Audit
```bash
grep -rn "from 'three'\|from 'gsap'" --include="*.tsx" --include="*.ts" app/ components/ hooks/
```
Three.js and heavy GSAP plugins must use `dynamic(() => import(...), { ssr: false })`.

### 4 — Image Audit
```bash
grep -rn "<img " --include="*.tsx" app/ components/
```
Zero raw `<img>` tags — all must use `next/image` with explicit `width`/`height`.

### 5 — Font Audit
Check `app/layout.tsx` for `next/font` usage — no external font CDNs.

### 6 — CWV Checklist

| Metric | Target | Check |
|--------|--------|-------|
| LCP | < 2.5s | Hero image/video uses `priority` on `next/image` |
| CLS | < 0.1 | All images have explicit dimensions |
| INP | < 200ms | No blocking JS on main thread during scroll |
| FID | < 100ms | Event handlers are lightweight, deferred where possible |
| TTFB | < 600ms | Static export — Netlify CDN edge |

### 7 — Render Blocking
```bash
grep -rn "useEffect\|setTimeout" --include="*.tsx" hooks/ components/ | wc -l
```
All animation init should be in `useEffect` with proper cleanup.

## Output Format

```
⚡ PERFORMANCE AUDIT — DANVERSE-X

Bundle:        ✅/⚠️/❌ [largest route: NkB]
Dependencies:  ✅/⚠️/❌ [heaviest: package@NkB]
Dynamic imports: ✅/❌ [Three.js/GSAP properly lazy?]
Images:        ✅/❌ [N raw <img> tags]
Fonts:         ✅/❌ [next/font or CDN?]
CWV readiness: ✅/⚠️ [LCP/CLS/INP status]

VERDICT: SHIP IT / OPTIMISE FIRST
Blockers: [list or "none"]
Quick wins: [list or "none"]
```
