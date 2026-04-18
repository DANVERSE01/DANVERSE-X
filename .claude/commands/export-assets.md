# Export Assets

Optimize and export all media assets for production deployment.

## Steps

### Step 1 — Inventory All Assets
```bash
# List all images
find public/ -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" -o -name "*.gif" | sort

# List all videos
find public/ -name "*.mp4" -o -name "*.webm" -o -name "*.mov" | sort

# Find unoptimized images (> 500kB)
find public/ \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) -size +500k -exec ls -lh {} \;

# Find unoptimized videos (> 20MB)
find public/ -name "*.mp4" -size +20M -exec ls -lh {} \;
```

### Step 2 — Image Optimization

Convert all JPG/PNG to WebP:
```bash
# Requires: npm install -g sharp-cli

# Hero images (largest — target < 200kB)
for f in public/images/hero/*.{jpg,png}; do
  npx sharp-cli "$f" -o "public/images/hero/$(basename ${f%.*}).webp" \
    --format webp --quality 80 --resize 1920 1080
done

# Project images
for f in public/images/projects/*.{jpg,png}; do
  npx sharp-cli "$f" -o "public/images/projects/$(basename ${f%.*}).webp" \
    --format webp --quality 85
done

# Social (square)
for f in public/images/social/*.{jpg,png}; do
  npx sharp-cli "$f" -o "public/images/social/$(basename ${f%.*}).webp" \
    --format webp --quality 85
done
```

Generate AVIF (for next-gen support):
```bash
for f in public/images/hero/*.webp; do
  npx sharp-cli "$f" -o "${f%.webp}.avif" --format avif --quality 70
done
```

### Step 3 — Video Optimization

```bash
# Requires: ffmpeg installed

# Web-optimized H.264 (broad compatibility)
ffmpeg -i input.mp4 \
  -c:v libx264 -crf 23 -preset slow \
  -movflags +faststart \
  -vf scale=1920:-2 \
  -an \
  output-web.mp4

# Modern WebM (smaller, Chrome/Firefox)
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 -crf 30 -b:v 0 \
  -vf scale=1920:-2 \
  output-web.webm

# Social vertical (9:16)
ffmpeg -i input.mp4 \
  -c:v libx264 -crf 23 -preset slow \
  -movflags +faststart \
  -vf scale=1080:-2 \
  -an \
  output-social.mp4

# Extract poster frame (first frame as WebP)
ffmpeg -i input.mp4 -vframes 1 -f image2 \
  -vf scale=1920:-2 poster.webp
```

### Step 4 — Size Verification

```bash
# Check all images are under targets
echo "=== Images over 200kB ==="
find public/images/hero/ -size +200k -exec ls -lh {} \;
echo "=== Images over 300kB (projects) ==="
find public/images/projects/ -size +300k -exec ls -lh {} \;
echo "=== Videos over 10MB ==="
find public/videos/ -size +10M -exec ls -lh {} \;

# Total public folder size
du -sh public/
```

### Step 5 — Unused Asset Check

```bash
# Find image files not referenced in code
for f in $(find public/images/ -name "*.webp"); do
  basename=$(basename "$f")
  if ! grep -rq "$basename" app/ components/; then
    echo "UNUSED: $f"
  fi
done
```

## Output Format

```
📦 ASSET EXPORT REPORT

Total images: N
Total videos: N
Total size: XMB

Optimized:
✅ [file] — before: XkB → after: XkB (X% reduction)
❌ [file] — still over target, needs manual attention

Unused assets: [N files listed]

Estimated bundle savings: XMB

VERDICT: SHIP READY / OPTIMIZE FIRST
```
