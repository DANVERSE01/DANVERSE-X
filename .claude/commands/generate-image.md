# Generate AI Image

Generate professional AI brand images for DANVERSE-X.

**Brief**: $ARGUMENTS

## Steps

### Step 1 — Use the ai-media-director or ai-image-generation skill

Determine the best platform:
- Hero portrait/brand shot → **Midjourney v7**
- Product render → **Flux Dev (Kontext)**
- Text-in-image → **Ideogram 3.0**
- Abstract brand → **Midjourney v7**
- Quick test → **Flux Schnell**

### Step 2 — Write the Prompt

**Midjourney formula:**
```
[COMPOSITION] [SUBJECT], [DETAIL] — [ENVIRONMENT], [TIME OF DAY] — [LIGHTING] — [CAMERA/LENS] — [MOOD] --ar [ratio] --style raw --v 7 --q 2 --no text,watermark,stock,generic
```

**DANVERSE color language:**
- Black bg: "deep obsidian black, ultra-dark navy"
- Citrus-lime: "electric citrus-lime yellow-green glow"
- Aqua-teal: "aqua-teal accent, deep cyan"
- Coral: "warm coral orange-red"

### Step 3 — Generation

**Midjourney**: `/imagine [prompt]`
**Flux Dev**: Use Replicate or Fal.ai API, or via fal.ai web UI
**Ideogram**: Upload to ideogram.ai → Text prompt mode

### Step 4 — Optimization

Convert and optimize for web:
```bash
# WebP conversion + resize
npx sharp-cli --input [source] --output public/images/[folder]/ \
  --format webp --quality 85

# Hero images (< 200kB target)
npx sharp-cli --input [source] --output public/images/hero/ \
  --format webp --quality 80 --resize 1920 1080

# Check file size
ls -lh public/images/[folder]/
```

### Step 5 — Add to Component

```tsx
import Image from 'next/image';

// Hero (priority load)
<Image
  src="/images/hero/hero-01.webp"
  alt="[descriptive alt text]"
  width={1920}
  height={1080}
  priority
/>

// Below fold (lazy default)
<Image
  src="/images/projects/[name].webp"
  alt="[descriptive alt text]"
  width={800}
  height={600}
/>
```

## Naming Convention
```
public/images/
  hero/    → hero-[description]-v[N].webp
  projects/ → [project-name]-[shot].webp
  brand/   → brand-[description].webp
  social/  → social-[description]-1x1.webp
```
