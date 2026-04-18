# AI Image Automation

## HiggsField Image Flow
- Reuse persistent browser context
- Navigate to image generation tab
- Inject prompt, style, and ratio
- Download assets and save under `/public/images/`

## Replicate Fallback API
- `FLUX.1-schnell`: 4-step fast previews
- `FLUX.1-dev`: 28-step high quality
- `SDXL-turbo`: realtime iteration
- Call `fetch('https://api.replicate.com/v1/predictions')`
- Poll prediction status until `succeeded` or `failed`

## Sharp Post-Processing
- Resize longest edge to max 2560px
- Convert to WebP quality 85
- Generate blur placeholder (`20px`) as base64
- Generate AVIF variant for modern browsers

## Batch Workflow + Manifest
- Read `src/data/image-queue.json`
- Generate -> optimize -> update manifest
- Output schema:
  - `{ src, srcWebP, srcAvif, width, height, placeholder, alt, generatedAt, prompt }`

## DANVERSE Prompt Formula
- `[subject], [environment], [lighting style], cinematic color grading, [DANVERSE color token], ultra detailed, editorial photography, 8K`
