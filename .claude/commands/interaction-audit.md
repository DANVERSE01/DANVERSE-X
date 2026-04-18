# Interaction Audit

Audit all interactive elements for DANVERSE-X quality standards.

## Steps

### Step 1 — Map All Interactive Elements
```bash
# Find all interactive elements
grep -rn "onClick\|onMouseEnter\|onMouseLeave\|onHover\|data-cursor" \
  --include="*.tsx" app/ components/ | sort

# Find all hover states
grep -rn "hover:\|:hover" --include="*.tsx" --include="*.css" app/ components/ styles/

# Find animation hooks
grep -rn "useMagnetic\|useParallax\|useGsapEnter\|useTilt" --include="*.tsx" components/
```

### Step 2 — Audit Each Category

**Cursor System**
- [ ] Custom cursor active on desktop
- [ ] Cursor changes state on hover (`data-cursor="hover"`)
- [ ] Cursor shows label on project cards (`data-cursor-label`)
- [ ] Cursor hidden on touch devices (`pointer: coarse` bail)

**Magnetic Pull**
- [ ] All `<button>` elements have magnetic effect
- [ ] All `<a>` navigation links have magnetic effect
- [ ] Magnetic bail on touch devices

**Scroll Animations**
- [ ] Every section has a ScrollTrigger entrance
- [ ] No element appears without animation
- [ ] TextReveal on all section headings
- [ ] Parallax on background elements

**Hover States**
- [ ] All cards have hover state (lift, glow, or info reveal)
- [ ] All buttons have layered hover (color + scale or glow)
- [ ] All links have underline or color hover

**Page Transitions**
- [ ] Page transition curtain active
- [ ] Transition has correct enter/exit timing
- [ ] No flash of unstyled content

### Step 3 — Missing Interactions List
For each missing interaction, provide:
- What element needs it
- Which pattern to implement (from interactive-design skill)
- Estimated implementation time

### Step 4 — Performance Validation
```bash
# Check for expensive CSS properties (force layout)
grep -rn "style={{" --include="*.tsx" app/ components/ | grep -v "transform\|opacity\|display\|visibility"

# Check GSAP cleanup
grep -rn "ctx\.revert\|ScrollTrigger\.kill\|tl\.kill" --include="*.tsx" components/ hooks/
```

## Output Format

```
🎯 INTERACTION AUDIT — DANVERSE-X

### CURSOR SYSTEM: ✅/❌
[Details]

### MAGNETIC PULL: ✅/❌ (N elements covered)
Missing: [list]

### SCROLL ANIMATIONS: ✅/❌ (N sections animated)
Missing entrances: [list]

### HOVER STATES: ✅/❌ (N elements)
Missing: [list]

### PAGE TRANSITIONS: ✅/❌

### MISSING INTERACTIONS (priority order)
1. [Element] — needs [pattern] — estimated [time]
2. ...

### INTERACTION SCORE: X/10
AWWWARDS interaction quality: [assessment]
```
