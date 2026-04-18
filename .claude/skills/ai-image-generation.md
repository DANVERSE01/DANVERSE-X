---
name: ai-image-generation
description: Professional AI image generation workflow — Midjourney, Flux, Ideogram, Stable Diffusion prompting for DANVERSE brand assets. The complete system for generating hero images, UI mockups, brand photography, and visual assets.
trigger: midjourney|flux|ideogram|stable diffusion|image generation|ai image|generate image|dalle|firefly|leonardo|text to image|image prompt|visual asset
---

# AI Image Generation — DANVERSE Professional System

## Platform Routing (2026)

| Use Case | Platform | Why |
|----------|----------|-----|
| Hero brand photography | **Midjourney v7** | Cinematic quality, lighting control |
| Product renders | **Flux Dev** | Best product photorealism, Kontext |
| Text-in-image design | **Ideogram 3.0** | Best legible text rendering |
| Concept art / illustrations | **Midjourney v7** | Widest aesthetic range |
| UI mockup photography | **Flux Pro** | Device mockups, screen shots |
| Quick iteration / testing | **Flux Schnell** | 4 seconds, free tier |
| Architecture / interiors | **Midjourney v7** | Architectural photorealism |
| Social media content | **Adobe Firefly** | Copyright-safe for commercial |
| Character consistency | **Flux Kontext** | Edit character across images |

---

## Midjourney v7 — DANVERSE Prompt System

### Core Formula
```
[SUBJECT] [ACTION] -- [ENVIRONMENT] -- [LIGHTING] -- [CAMERA] -- [MOOD] -- [TECHNICAL]
```

### Essential Parameters
```
--ar 16:9        # widescreen (hero/banner)
--ar 9:16        # portrait/social
--ar 1:1         # square/profile
--ar 4:5         # Instagram feed

--style raw      # realistic, less AI-processed
--v 7            # always specify version
--q 2            # quality 1-2 (2=best)
--chaos 0        # deterministic (0) or varied (100)
--weird 0        # experimental factor

--no text,watermark,logo  # always exclude these
```

### DANVERSE Brand Prompts

#### Brand Hero Portrait
```
professional creative director, late 30s, confident gaze, structured black jacket, standing at floor-to-ceiling window — Dubai or Alexandria skyline at blue hour, city lights bokeh — dramatic side key light from left, subtle rim light, deep shadow on right — medium close-up, slight telephoto compression — premium editorial photography, aspirational, minimal -- cinematic color grade, dark navy atmosphere, sharp focus --ar 16:9 --style raw --v 7
```

#### Dark Product Shot
```
[PRODUCT NAME], minimal product photography — matte black surface, dark studio environment — single soft overhead light, subtle rim highlight, reflection in surface — extreme close-up macro, ultra-shallow depth of field — luxury commercial photography, pristine, editorial — citrus-yellow (#E0E75B) accent light glow from behind --ar 1:1 --style raw --v 7
```

#### Abstract Brand Visual
```
abstract liquid metal morphing sculpture, highly polished chrome surface with warm light reflections — dark studio, controlled dramatic lighting — extreme close-up, selective focus — citrus-lime and aqua-teal color accents — premium brand visual, editorial, distinctive --ar 16:9 --style raw --v 7 --q 2
```

#### Architecture / Space
```
dramatic contemporary office interior, dark walls and ceiling, floor-to-ceiling glass facades with city view, minimal luxury furniture — nighttime, city lights as background — professional architectural photography, wide angle, sharp from foreground to background, professional lighting — premium creative agency aesthetic --ar 16:9 --style raw --v 7
```

#### Social Media Visual
```
[CONCEPT] — dark aesthetic, high contrast, cinematic color grade — bold typography space in upper third — social media native, Instagram aesthetic, premium brand visual — editorial photography style --ar 4:5 --style raw --v 7
```

---

## Flux — Developer API Usage

Flux is best via API or Replicate for programmatic generation:

```ts
// Flux Dev via Replicate API
const response = await fetch('https://api.replicate.com/v1/predictions', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    version: 'flux-dev',
    input: {
      prompt: 'your prompt here',
      aspect_ratio: '16:9',
      output_format: 'webp',
      output_quality: 95,
      num_inference_steps: 28,
    },
  }),
});
```

### Flux Kontext (Character Consistency)
```
// Maintains consistency of a character across multiple images
// Great for: building a character library for brand campaigns

Input image: [reference photo of person/product]
Prompt: "Same person, now in [new environment/pose/outfit]"
```

---

## Ideogram 3.0 — Text-in-Image

Best platform for legible text rendering:

```
Prompt formula: [VISUAL CONCEPT], text reads "[YOUR TEXT]", [STYLE]

Example:
"Dark luxury brand poster design, centered bold display text reads 'DANVERSE', glowing citrus-yellow color (#E0E75B), minimal black background, premium editorial design, professional typography"
```

**Settings:**
- Style: Design (for branded graphics)
- Resolution: 2048×2048 or 1920×1080
- Magic Prompt: Off (for precise prompts)

---

## Negative Prompts (Universal)

Add to ANY platform that supports negative prompts:
```
low quality, blurry, pixelated, watermark, signature, logo, text overlay, stock photo, generic, cliché, overexposed, underexposed, distorted, ugly, bad anatomy, deformed, unnatural, artificial-looking, flat lighting, amateur, cluttered
```

For portrait work, add:
```
bad eyes, bad hands, extra fingers, missing fingers, deformed face, uncanny valley, plastic skin
```

---

## DANVERSE Color Palette for AI Prompts

Use descriptive language instead of hex codes:

| Token | AI Prompt Language |
|-------|-------------------|
| `--color-electric-blue` (#E0E75B) | "citrus-lime yellow-green glow", "electric lime accent" |
| `--color-hot-pink` (#00A6A6) | "aqua teal accent", "deep cyan-teal" |
| `--color-acid-lime` (#EF786A) | "coral orange-red accent", "warm coral" |
| `--color-bg` (#06070a) | "true black, deep obsidian", "ultra-dark navy black" |

---

## Image-to-Video Pipeline (with HiggsField)

The best video generation workflow:

```
Step 1: Generate in Midjourney/Flux at 16:9 aspect ratio
        → Perfect composition, lighting, subject
        → Exactly matches DANVERSE color system

Step 2: Download at max quality (PNG, no compression)

Step 3: Upload to HiggsField.ai → Image to Video
        → Add minimal camera instruction only
        → "Very slow push in, maintain framing, cinematic quality"

Step 4: Download MP4, name as:
        [project]-[shot-type]-[v1].mp4
```

---

## Asset Management for DANVERSE Projects

```
public/
  images/
    hero/         ← 16:9, WebP optimized, < 200kB
    projects/     ← Case study images, 4:3 or 16:9
    team/         ← Portraits, 1:1, WebP
    brand/        ← Abstract brand visuals
  videos/
    hero/         ← MP4 H.264, < 10MB
    projects/     ← Case study clips
    social/       ← 9:16 vertical MP4
```

### Optimization Command
```bash
# Convert to WebP at multiple sizes
npx sharp-cli --input 'public/images/**/*.{jpg,png}' --output 'public/images' \
  --format webp --quality 85

# For hero images (must be < 200kB)
npx sharp-cli --input hero-original.jpg --output public/images/hero/ \
  --format webp --quality 80 --resize 1920 1080
```

---

## Quick Reference Checklist

Before generating any image:
- [ ] Aspect ratio matches intended use (16:9 web / 9:16 social / 1:1 square)
- [ ] DANVERSE color language in prompt
- [ ] Dark background established in prompt
- [ ] Lighting explicitly described
- [ ] "No text, watermark, logo" in negative prompt
- [ ] Format: WebP for web, PNG for video frame generation
