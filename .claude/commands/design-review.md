# Design Review

Comprehensive design quality review for DANVERSE-X.

**Target**: $ARGUMENTS (component, section, or page)

## Steps

### Step 1 — Visual System Audit
```bash
# Check color token usage — no hardcoded colors
grep -rn "#[0-9a-fA-F]\{3,6\}" --include="*.tsx" --include="*.css" \
  app/ components/ styles/ | grep -v "tokens\|config\|globals"

# Check Tailwind class usage (should use tokens not arbitrary)
grep -rn "\[#" --include="*.tsx" components/ app/

# Find inline styles (only allowed for GSAP/Three.js)
grep -rn "style={{" --include="*.tsx" app/ components/
```

### Step 2 — Typography Audit
Check each element for:
- [ ] Display text uses `--font-display` (Bebas Neue / Syne)
- [ ] Body text uses `--font-body` (Inter / Manrope)
- [ ] Font sizes use fluid clamp (not fixed px)
- [ ] Letter spacing: `-0.02em` to `-0.04em` on headings
- [ ] Line height: `1.0–1.1` for display, `1.5–1.6` for body

### Step 3 — Spacing Audit
- [ ] Section padding uses `--section-block` and `--section-inline`
- [ ] `max-width: --content-max (1440px)` on all sections
- [ ] Grid gaps are consistent (4rem, 6rem, 8rem — not arbitrary)

### Step 4 — Component Quality Check
For each component:
- [ ] Mobile-first implementation (375px first, scale up)
- [ ] Dark mode is the only mode (no light mode variants needed)
- [ ] All images are `next/image` with explicit dimensions
- [ ] No layout shift on load (CLS < 0.1)

### Step 5 — AWWWARDS Comparison
```
Compare the design against:
- lusion.co — motion and minimalism
- basement.studio — typography and grid
- activetheory.net — hero and 3D
- jacobandco.com — luxury and craft (the DANVERSE benchmark)
```

### Step 6 — Mobile Review
```bash
# Find desktop-only logic
grep -rn "pointer: coarse\|window.matchMedia" --include="*.tsx" --include="*.ts" hooks/ components/
```
Check: cursor, magnetic, parallax — all bail on touch.

## Output Format

```
🎨 DESIGN REVIEW — [TARGET]

### COLOR SYSTEM: ✅/❌
Hardcoded colors found: [N]
Token violations: [list]

### TYPOGRAPHY: ✅/❌
Display font correct: [Y/N]
Fluid sizing: [Y/N]
Issues: [list]

### SPACING & LAYOUT: ✅/❌
Section tokens used: [Y/N]
Max-width applied: [Y/N]

### COMPONENT QUALITY: X/10
Mobile-first: [Y/N]
Image optimization: [Y/N]
CLS risk: [Y/N]

### vs. AWWWARDS STANDARD
"This reminds me of [reference site]. Gap to close: [specific differences]."

### ACTION LIST
1. [Highest priority fix]
2. [Second priority]
3. [Third priority]

DESIGN SCORE: X/10
```
