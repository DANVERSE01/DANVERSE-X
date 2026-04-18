# Generate AI Video

Generate a cinematic AI video using HiggsField.ai through your browser.

**Brief**: $ARGUMENTS

## Steps

### Step 1 — Invoke the higgs-video-director agent
Use the `higgs-video-director` agent to:
1. Analyze the brief
2. Plan the shot list
3. Write optimized HiggsField prompts
4. Provide step-by-step browser instructions

### Step 2 — Pre-Generation Checklist
Before opening HiggsField.ai:
- [ ] Do you need a still image first? (Recommended: Midjourney/Flux → HiggsField Image-to-Video)
- [ ] Aspect ratio decided: 16:9 (web) or 9:16 (social)?
- [ ] Logged into higgsfield.ai account

### Step 3 — Browser Workflow
```
1. Navigate to: https://higgsfield.ai/create
2. Choose: "Image to Video" (if using reference image) or "Text to Video"
3. Upload reference image (if I2V)
4. Paste the prompt from Step 1
5. Camera Controls: set motion type from shot plan
6. Duration: [from shot plan]
7. Aspect Ratio: [from shot plan]
8. Style: Cinematic
9. Generate → wait 60–90 seconds
10. Review → download → name correctly
```

### Step 4 — Post-Generation
- Convert to WebP (images) or optimize MP4 (videos)
- Place in correct `public/media/` folder
- Add to Next.js component with correct dimensions

## Asset Naming Convention
```
hero-video-[camera-motion]-[duration]s-v[N].mp4
social-video-[description]-9x16-v[N].mp4
```
