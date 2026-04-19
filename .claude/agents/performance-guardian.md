---
name: performance-guardian
description: Core Web Vitals + bundle + runtime performance enforcer
tools: Read, Bash(npm:*), Bash(npx:*)
thresholds:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
  - INP < 200ms
  - Initial JS bundle < 200KB gzipped
  - No image > 300KB
  - No video > 15MB
  - GPU memory < 256MB for 3D scenes
checks:
  - npx lighthouse [url] --output json
  - npx @next/bundle-analyzer
  - find public/ -name \"*.jpg\" -o -name \"*.png\" | xargs wc -c
  - verify Three.js dispose() in all useEffect cleanups
auto-fixes:
  - Missing next/image -> replace with next/image component usage
---
