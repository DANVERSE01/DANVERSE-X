---
name: higgsfield-ai
description: HiggsField.ai cinematic video generation — browser-native workflow using the user's own account. Shot anatomy, prompt formulas, camera controls, character consistency, and full pipeline for generating premium AI video through higgsfield.ai via browser automation.
trigger: higgsfield|higgs field|higgs|hf video|ai video higgs|cinematic video generation|character video|camera control video
---

# HiggsField.ai — DANVERSE Professional Workflow

## Platform Overview

HiggsField.ai specialises in **cinematic camera-controlled AI video** — industry-leading for:
- Precise camera path control (dolly, orbit, crane, push, rack focus)
- Character motion coherence across shots
- Cinematic lighting control
- Film-grain post-processing built-in
- Native 16:9, 9:16, 1:1 aspect ratios
- Up to 8 seconds per shot (chain for longer)

**Access**: `https://higgsfield.ai` — use your own account in the browser.

---

## Browser Navigation (for agent/Playwright automation)

```
LOGIN:    https://higgsfield.ai/auth
GENERATE: https://higgsfield.ai/create
HISTORY:  https://higgsfield.ai/history
PROJECTS: https://higgsfield.ai/projects
```

### Generation Flow
1. Navigate to `https://higgsfield.ai/create`
2. Select **Text to Video** or **Image to Video**
3. Enter prompt in the main text field
4. Expand **Camera Controls** panel — set motion type
5. Set **Duration**: 4s / 6s / 8s
6. Set **Aspect Ratio**: 16:9 (landscape) / 9:16 (portrait/social)
7. Set **Style**: Cinematic / Photorealistic / Film
8. Click **Generate**
9. Wait for completion (typically 45–90 seconds)
10. Download via the Download button (MP4, no watermark with Pro)

---

## Prompt Formula

```
[SHOT TYPE], [CAMERA MOTION] — [SUBJECT] [ACTION/EMOTION], [CLOTHING/DETAILS] — [ENVIRONMENT], [TIME OF DAY] — [LIGHTING STYLE] — [MOOD/ATMOSPHERE]
```

**Keep prompts under 120 words** — HiggsField responds poorly to over-specification.

---

## Camera Control Vocabulary

### Motion Types
| Control | Effect | Best For |
|---------|--------|----------|
| `Push in` | Slow dolly forward | Reveals, intimacy |
| `Pull out` | Slow dolly backward | Context reveals |
| `Pan left` / `Pan right` | Horizontal sweep | Following, establishing |
| `Tilt up` / `Tilt down` | Vertical sweep | Building reveals, character |
| `Orbit left` / `Orbit right` | Circular move around subject | Product, character 360° |
| `Crane up` | Rise from ground level | Epic reveals |
| `Crane down` | Descend from high | Immersive landings |
| `Static` | No camera movement | Dialogue, close-ups |
| `Handheld` | Subtle organic shake | Documentary, energy |
| `Steadicam` | Smooth tracking walk | Following subject |
| `Rack focus` | Shift focus between planes | Cinematic depth |
| `Aerial descent` | Drone falling toward subject | Establishing, epic |

### Speed Modifiers
- `slow` / `very slow` — premium, deliberate
- `medium pace` — standard
- `fast` / `rapid` — energy, action
- `subtle` — imperceptible, adds life

---

## Prompt Templates for DANVERSE

### Brand Hero — Dark Cinematic
```
Wide establishing shot, very slow dolly forward — lone creative director standing at floor-to-ceiling glass window overlooking city skyline at blue hour, black structured jacket, confident posture — dark architectural interior, marble floors, minimal lighting — dramatic side key light, city lights bokeh background, deep shadow contrast — premium cinematic, aspirational, award-winning visual identity
```

### Product Reveal
```
Extreme close-up, slow orbit right — luxury product on matte black surface, chrome and glass materials with perfect light refraction — controlled studio environment, seamless background — overhead soft box key, rim light from left, deep shadow on right — pristine, editorial, high-end commercial
```

### Spokesperson — Authority
```
Medium close-up, static — professional speaking directly to camera, calm confident expression, subtle hand gesture — blurred architectural office background with bokeh city view — professional interview lighting, soft fill, slight backlight rim — authoritative, trustworthy, aspirational
```

### Atmospheric Establishing — Alexandria/GCC
```
Aerial descent, slow — Mediterranean coastal city at golden hour, historic architecture meeting modern skyline, palm trees lining corniche promenade — warm golden hour light, long shadows, coastal haze — majestic, aspirational, cinematic scope, teal-orange grade
```

### Abstract Brand Identity
```
Macro close-up, slow push in — abstract liquid metallic surface with citrus-yellow light refraction, bubbles rising through dark fluid — controlled lighting, extreme shallow depth of field, selective focus — premium brand material, editorial, distinctive, luxury
```

### Social Vertical (9:16)
```
Medium close-up portrait, slow tilt up — subject looking off-frame left with subtle smile, casual premium wardrobe, urban background — golden hour natural light, slight lens flare, warm bokeh — candid, authentic, lifestyle editorial, social-native framing
```

---

## Style Presets

### Cinematic Dark (DANVERSE Signature)
```
Cinematic color grade, deep shadows, highlight retention, dark navy blacks, subtle film grain, teal-orange grade, anamorphic lens characteristics
```

### Editorial Clean
```
Clean photorealistic, sharp detail, neutral grade, minimal grain, commercial photography quality
```

### Vintage Film
```
16mm film aesthetic, visible grain, slightly desaturated, warm midtones, slight vignette, organic imperfections
```

---

## Image-to-Video Workflow (Recommended)

The most precise HiggsField workflow:

1. **Generate perfect still** using Midjourney / Flux Dev / Ideogram:
   - Exact composition, lighting, subject
   - Match DANVERSE color palette
   - Export at highest quality

2. **Upload to HiggsField → Image to Video**

3. **Add only camera instruction** in prompt:
   ```
   Very slow push in, maintain composition, cinematic quality
   ```

4. **Result**: Exact control over subject appearance + AI handles motion

---

## Quality Settings

| Setting | Value | Notes |
|---------|-------|-------|
| Duration | 6–8s | Sweet spot for quality vs. generation time |
| Aspect ratio | 16:9 | Web/desktop; use 9:16 for social/mobile |
| Style | Cinematic | Highest quality option |
| Motion intensity | Low-Medium | High = instability risk |

---

## DANVERSE Video Production Pipeline

```
1. BRIEF          → Define shot purpose, platform, mood
2. REFERENCE      → Pull 3 visual references (cinematography, not AI)
3. STILL FIRST    → Generate key frame with Midjourney/Flux
4. HIGGS ANIMATE  → Image-to-video with camera control
5. QUALITY CHECK  → Motion stability, grain, lighting consistency
6. DOWNLOAD       → MP4, name as: project-shot-variant-v1.mp4
7. EDIT           → Cut to music in DaVinci Resolve / Premiere
8. EXPORT         → H.264 for web, ProRes for delivery
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Camera motion too aggressive | Add `subtle` or `very slow` |
| Subject drifts/morphs | Use Image-to-Video instead of Text-to-Video |
| Low quality output | Reduce motion intensity, increase duration |
| Wrong mood | More lighting keywords in prompt |
| Face distortion | Use Character Reference feature with source image |
