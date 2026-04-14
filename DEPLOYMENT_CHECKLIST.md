# DANVERSE - Build And Validation Checklist

## Current Delivery Gate

This repository now follows the brief-defined Next.js server build flow.
Deployment steps are intentionally not covered here.

## Required Checks

### 1. Type Safety

```bash
npm run typecheck
```

### 2. Production Build

```bash
npm run build
```

### 3. Manual Validation

- Homepage loads and renders the TX-00 to TX-06 structure
- `/work` loads with brief-compliant work cards
- `/work/[slug]` loads for every verified work entry
- `404` behavior resolves through `app/not-found.tsx`
- contact form validates input and returns a safe failure when `RESEND_API_KEY` is missing
- no local video dependency exists in `/public`

### 4. Notes

- Canonical site identity: `https://danverse.studio`
- Primary inbox: `studio@danverse.ai`
- Outbound email is not treated as finished until DNS and Resend configuration are verified
- Numeric claims remain hidden unless a brief-approved source of truth exists
