#!/bin/bash
# DANVERSE-X — Asset Watch Hook
# Reports unoptimized assets and gives optimization commands

echo "📸 DANVERSE-X Asset Audit"
echo "========================="
echo ""

PUBLIC_DIR="public"

# Check if public dir exists
if [ ! -d "$PUBLIC_DIR" ]; then
  echo "⚠️  No public/ directory found"
  exit 0
fi

# Count assets
IMAGES=$(find "$PUBLIC_DIR" -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" -o -name "*.avif" 2>/dev/null | wc -l | tr -d ' ')
VIDEOS=$(find "$PUBLIC_DIR" -name "*.mp4" -o -name "*.webm" -o -name "*.mov" 2>/dev/null | wc -l | tr -d ' ')

echo "📁 Total images: $IMAGES"
echo "🎬 Total videos: $VIDEOS"
echo "📦 Total public size: $(du -sh "$PUBLIC_DIR" 2>/dev/null | cut -f1)"
echo ""

# Flag large images (> 300kB)
LARGE_IMAGES=$(find "$PUBLIC_DIR" -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" 2>/dev/null | xargs ls -la 2>/dev/null | awk '{if($5 > 307200) print $5" "$9}' | sort -rn | head -10)
if [ -n "$LARGE_IMAGES" ]; then
  echo "⚠️  Large unoptimized images (> 300kB):"
  echo "$LARGE_IMAGES"
  echo ""
  echo "   Fix: npx sharp-cli [file] --format webp --quality 85"
  echo ""
fi

# Flag large videos (> 15MB)
LARGE_VIDEOS=$(find "$PUBLIC_DIR" -name "*.mp4" -o -name "*.webm" 2>/dev/null | xargs ls -la 2>/dev/null | awk '{if($5 > 15728640) print $5" "$9}' | sort -rn | head -5)
if [ -n "$LARGE_VIDEOS" ]; then
  echo "⚠️  Large videos (> 15MB):"
  echo "$LARGE_VIDEOS"
  echo ""
  echo "   Fix: ffmpeg -i [input] -c:v libx264 -crf 23 -movflags +faststart [output]"
  echo ""
fi

# Check for non-WebP images in hero/
HERO_JPGS=$(find "$PUBLIC_DIR/images/hero" -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" 2>/dev/null | wc -l | tr -d ' ')
if [ "$HERO_JPGS" -gt "0" ]; then
  echo "❌ $HERO_JPGS non-WebP images in hero/ — convert to WebP for LCP optimization"
fi

echo "✅ Asset audit complete — run /export-assets for full optimization"
