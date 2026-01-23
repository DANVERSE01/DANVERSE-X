# 🚀 DANVERSE-X Deployment Guide

## Quick Deploy to Cloudflare Pages

### Option 1: Automatic (Recommended)

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your GitHub account
4. Select `DANVERSE01/DANVERSE-X` repository
5. Configure:
   - **Framework preset:** Next.js
   - **Build command:** `pnpm build`
   - **Build output directory:** `.next`
6. Click "Save and Deploy"

### Option 2: Manual via Wrangler

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Deploy to Cloudflare Pages
npx wrangler pages deploy .next --project-name=danverse-x
```

---

## Environment Variables (Optional)

No environment variables required for basic deployment.

---

## Troubleshooting

### Build fails with syntax error
The `app/layout.tsx` file has been fixed. Make sure you're using the latest version.

### Images not loading
Images are set to `unoptimized: true` for Cloudflare compatibility.

### 404 on routes
Make sure all page files are in the `app/` directory with proper naming.

---

## Project Structure

```
danverse-x/
├── app/
│   ├── layout.tsx      ✅ Fixed
│   ├── globals.css     ✅ Updated
│   └── page.tsx        (your main page)
├── components/         (UI components)
├── lib/
│   └── utils.ts        ✅ Helper functions
├── public/             (static assets)
├── next.config.mjs     ✅ Cloudflare ready
├── package.json        ✅ Clean dependencies
└── tsconfig.json       ✅ TypeScript config
```

---

## Support

For issues, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
