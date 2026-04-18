# AWWWARDS Audit

Run a comprehensive AWWWARDS Site of the Day standard audit.

**Target**: $ARGUMENTS (section name, page, or "full site")

## Steps

### Step 1 — Invoke awwwards-critic agent
Use the `awwwards-critic` agent to evaluate:
- Design (40%): typography, color, layout, visual identity
- Usability (20%): nav, performance, mobile
- Creativity (20%): unexpected interactions, originality
- Content (20%): copy quality, structure, value

### Step 2 — Technical Performance Check
```bash
# TypeScript clean
npx tsc --noEmit

# No raw <img> tags
grep -rn "<img " --include="*.tsx" app/ components/

# No console.log in production
grep -rn "console\.log" --include="*.tsx" --include="*.ts" app/ components/

# Animation coverage (more = better)
echo "GSAP animations found:"
grep -rn "gsap\.\|ScrollTrigger\." --include="*.tsx" components/ | wc -l

echo "useGsapEnter hooks found:"
grep -rn "useGsapEnter\|TextReveal" --include="*.tsx" components/ | wc -l
```

### Step 3 — Interaction Audit
Check each section has:
- [ ] Entrance animation (not just fade-in)
- [ ] Hover states on interactive elements
- [ ] Cursor state change on hover
- [ ] Mobile-friendly fallback

### Step 4 — First-3-Seconds Test
Read hero section code and assess:
- Does something happen in the first 200ms?
- Is there a cinematic entrance sequence?
- Is there a WebGL/3D background or visual element?
- Does the cursor activate immediately?

### Step 5 — Scoring

Score 1–10 on each criterion. Reference winning sites:
- lusion.co — interaction quality
- activetheory.net — 3D immersion
- basement.studio — typography
- resn.co.nz — creativity

## Output Format

```
🏆 AWWWARDS AUDIT — [TARGET]

Design:     X.X/10
Usability:  X.X/10
Creativity: X.X/10
Content:    X.X/10
TOTAL:      X.X/10

PREDICTION: SOTD Contender / Close / Not Yet

🔴 BLOCKERS (fix before submitting)
1. [Critical issue]
2. [Critical issue]

🟡 HIGH IMPACT (do this week)
1. [Important improvement]
2. [Important improvement]

🟢 POLISH (nice to have)
1. [Small improvement]
```
