# DANVERSE

DANVERSE is an AI-powered creative studio site rebuilt around the locked `TRANSMISSION` brief.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript strict mode
- GSAP orchestration
- Three.js device-tier rendering
- Zustand state
- Mitt event bus

## Local Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Structure

```text
app/                routes, metadata, API, global styles
components/         canvas, cursor, nav, sections, UI primitives
content/            brief-compliant work data
lib/                motion, gsap, store, webgpu, work helpers, tokens
public/             brand assets, icons, work imagery
shaders/            transmission shader helpers
docs/               rebuild inventory and asset audit
```

## Work Data Rules

Only the brief-approved work fields are valid:

- `slug`
- `title`
- `year`
- `date`
- `category`
- `hook`
- `solution`
- `tags`
- `cover`
- `gallery`
- `featured`
- optional `video`
- optional `results`

If required data is unresolved, it stays unresolved and dependent UI stays hidden.

## Validation

Run:

```bash
npm run typecheck
npm run build
```

Then verify:

- `/`
- `/work`
- one work detail route
- one unknown route for `404`
