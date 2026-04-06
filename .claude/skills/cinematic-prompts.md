---
name: cinematic-prompts
description: AI video prompt engineering for DANVERSE brand content. Platform routing guide, shot anatomy, and ready-made templates for Kling, Seedance, Runway, Veo, Sora, and Luma. Auto-loaded for video prompt or AI video tasks.
trigger: video prompt|ai video|kling|runway|seedance|veo|sora|luma|pika|hailuo|comfyui|film|cinematic prompt|shot
---

# DANVERSE AI Video Prompt System

## Platform Routing (April 2026)

| Goal | Platform | Reason |
|---|---|---|
| Hero cinematic shot | **Kling 3.0** | 8.4/10 score, native 4K, multi-shot |
| Realistic human motion | **Kling 3.0** | best human movement fidelity |
| Spokesperson + lip-sync | **Seedance 2.0** | native audio architecture |
| Long narrative (25s+) | **Sora 2** | best multi-element coherence |
| Product / material photorealism | **Veo 3.1** | highest material rendering |
| Stylized / VFX / creative | **Runway Gen-4 Turbo** | widest aesthetic range |
| Fast draft / testing | **Luma Ray 3.14** | Draft Mode saves credits |
| Daily social volume | **Seedance 2.0** | free tier, no watermark |
| Quick overflow | **Hailuo (Minimax)** | fastest generation |

## Cost Strategy
**Image-to-Video > Text-to-Video** always:
1. Generate perfect still (Midjourney / Flux / Ideogram)
2. Refine the still until exact
3. Animate — faster, cheaper, more precise

## Prompt Architecture

### Formula
```
[SHOT TYPE] [CAMERA MOTION] — [SUBJECT] [ACTION] — [ENVIRONMENT] — [LIGHTING] — [MOOD/ATMOSPHERE] — [TECHNICAL]
```

### Shot Types
- ECU · CU · MCU · MS · WS · EWS
- POV · Dutch angle · Bird's eye · Worm's eye

### Camera Motions
- Static · Pan L/R · Tilt U/D · Dolly in/out
- Tracking · Crane up · Arc/Orbit · Aerial descent
- Handheld · Steadicam glide · Slow push in

### Lighting Keywords (premium)
- Golden hour · Blue hour · Overcast diffuse
- High-key studio · Low-key noir · Backlit silhouette
- Volumetric rays · Practical lights · IMAX-grade

## DANVERSE Brand Aesthetic

### Environment
- Deep navy, charcoal, true black backgrounds (#06070a)
- Citrus-lime (#E0E75B) accent glows
- Aqua-teal (#00A6A6) secondary accent
- Coral (#EF786A) warm accent
- Alexandria / GCC cultural visual language

### Feel
- Premium · Aspirational · Not generic stock
- High contrast cinematic color grade
- Subtle film grain (8mm or Kodak 5219)
- Architectural, composed frames

## Templates

### Brand Hero
```
Slow cinematic dolly forward, wide establishing — [SUBJECT] in [DARK ENVIRONMENT], commanding presence — dramatic side lighting, god rays, deep shadow contrast — citrus-lime accent glow on edges — premium cinematic color grade, dark navy atmosphere — photorealistic, 4K, subtle film grain — 8 seconds
```

### Product Reveal
```
Extreme close-up macro, ultra-shallow depth-of-field — [PRODUCT] on [DARK SURFACE], [MATERIAL: glass/metal/leather] with light refraction — soft overhead studio key, subtle bokeh — luxury product aesthetic, pristine, minimal — slow 3D orbit motion — 6 seconds
```

### Spokesperson (use Seedance 2.0)
```
Medium close-up, static frame — [PERSON] addressing camera directly, [EXPRESSION: confident/warm/authoritative] — professional interview lighting, natural fill — authentic, aspirational — [BACKGROUND: blurred architectural environment] — 15 seconds
```

### Atmospheric B-Roll
```
Aerial descent, drone shot — [LOCATION/CITY], [TIME OF DAY: golden hour/blue hour] — establishing geographic mood — slow deliberate motion, wide angle — cinematic LUT, teal-orange grade — 10 seconds
```

### Product + Brand Identity
```
Medium shot, slow orbit left — [PRODUCT] foreground, [BRAND ENVIRONMENT] mid-ground — key light from upper-left, hair light, rim light — citrus-lime and aqua-teal brand color accents — dark, premium, aspirational — film grain, 4K — 8 seconds
```

## Negative Prompts (where supported)
```
low quality, blurry, pixelated, stock photo, generic, watermark, text overlay, distorted faces, bad anatomy, unnatural motion, jitter, flicker, oversaturated
```

## Settings Reference

### Kling 3.0
- Resolution: 1080p or 4K
- Duration: 5–10s (hero), up to 3 min (narrative)
- Mode: Standard (fast) or Pro (quality)
- Enable: Multi-shot storyboard for brand films

### Seedance 2.0
- Best for: character consistency across shots
- At-reference system: maintains person/product consistency
- Free tier: resets daily, no watermark

### Runway Gen-4 Turbo
- Motion control: reference image + text
- Style lock: reference style image for consistency
- Best for: VFX composites, creative treatments

### Veo 3.1 (Google)
- Material rendering: best for glass, metal, fabric
- Photorealism: highest fidelity in class
- Access: via Google AI Studio or Vertex AI
