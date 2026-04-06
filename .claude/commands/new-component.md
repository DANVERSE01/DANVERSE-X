Create a new DANVERSE-X component based on the following request: $ARGUMENTS

Follow these requirements exactly:

**File location:** `components/[ComponentName]/index.tsx` (or `components/[ComponentName].tsx` if simple)

**TypeScript:** 
- Strict — zero `any`, proper interface for props
- `'use client'` directive only if using hooks or event handlers

**Styling:**
- Use CSS custom properties from `lib/tokens.css` for colors, spacing, animations
- Tailwind for layout utilities
- CSS Module (`.module.css`) for complex animations or component-specific styles
- Never hardcode hex colors — use `var(--color-electric-blue)` etc.

**Animations:**
- Framer Motion for component-level animations and gestures
- GSAP for scroll-triggered or timeline animations
- Always cleanup GSAP contexts in `useEffect` return
- Use `--ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1)` from tokens

**Images:**
- Always `next/image`, never raw `<img>`

**Accessibility:**
- Proper ARIA labels on interactive elements
- Focus states using `--focus-ring-color` token
- Semantic HTML elements

**Output:**
1. Complete TypeScript component file
2. CSS module file (if needed)
3. Brief usage example showing props

Do not add unnecessary comments, docstrings, or extra abstraction layers beyond what the component needs.
