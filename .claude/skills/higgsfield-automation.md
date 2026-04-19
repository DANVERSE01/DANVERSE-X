# HiggsField Automation

## Playwright Persistent Context
- Launch with `chromium.launchPersistentContext('.chrome-data')`
- Auth check: `page.goto('https://app.higgsfield.ai/dashboard')`
- If redirected to `/login`, log: `Manual login required once`

## Video Generation Workflow
- Fill prompt: `page.fill('[data-testid=\"prompt-input\"]', prompt)`
- Select model, duration (`3s | 5s | 10s`), and ratio (`16:9 | 9:16 | 1:1`)
- Click generate and wait for `.generation-complete` (`timeout: 120000`)
- Download via network intercept or explicit download button
- Save output to `/public/videos/[timestamp]-[slug].mp4`

## Session Persistence
- Save cookies after login to `.claude/higgsfield-cookies.json`
- Load cookies at start of each session

## Reliability + Batch
- Retry logic: 3 attempts, 60s base wait, exponential backoff
- Batch queue: read `.claude/video-queue.json` and process sequentially
- On failure, save screenshot to `.claude/debug/higgs-[ts].png`

## Registry + Prompting
- Update `src/data/videos.json` after each successful generation
- Prompt formula: `[shot type], [subject], [action], [lighting], [camera movement], [mood], cinematic, 4K, film grain`
- Camera vocabulary: dolly-in, crane-up, whip-pan, rack-focus, handheld, tracking-shot, aerial, dutch-angle
