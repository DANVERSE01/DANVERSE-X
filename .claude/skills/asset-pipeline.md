# Asset Pipeline

## GLB Optimization (`@gltf-transform/cli`)
- `gltf-transform optimize in.glb out.glb --compress draco`
- `gltf-transform resize --width 2048` for texture downscale
- `gltf-transform webp` for texture conversion
- Target: GLB under 2MB for web delivery

## Video Optimization (`ffmpeg`)
- H.264: `ffmpeg -crf 23 -preset slow -movflags +faststart`
- WebM VP9: `ffmpeg -crf 31 -b:v 0 -row-mt 1`
- Poster frame: `ffmpeg -ss 0.5 -frames:v 1 poster.jpg`
- Targets: `< 5MB` per clip, `< 15MB` hero video

## Image Pipeline (`sharp`)
- Generate srcset widths: `640 / 1024 / 1440 / 2560`
- Formats: `AVIF + WebP + JPEG` fallback
- Blurhash: `encode(pixels, 4, 3)` placeholders

## Cloudflare R2 CDN
- Upload: `wrangler r2 object put bucket/path --file local`
- Cache-Control: `public, max-age=31536000, immutable`
- URL pattern: `https://cdn.danverse.com/[type]/[file]`

## `.claudeignore` Entries
- `node_modules/`
- `dist/`
- `.next/`
- `.lock`
- `public/videos/.mp4`
- `public/images/raw/`
