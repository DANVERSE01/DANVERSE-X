Run a pre-deploy audit for DANVERSE-X before Netlify deployment. Check the following in order:

1. **TypeScript** — run `npx tsc --noEmit` and report any errors
2. **Build test** — check if `next.config.mjs` and `netlify.toml` are correct
3. **Raw img tags** — grep components/ and app/ for any `<img ` tags (must use next/image)
4. **Dynamic imports** — verify Three.js and heavy components use `dynamic(() => import(...), { ssr: false })`
5. **Environment variables** — check .env.example for any vars that might be missing in production
6. **Console logs** — grep for `console.log` in production code (not test files)
7. **Any types** — grep for `: any` or `as any` in TypeScript files
8. **Bundle** — check package.json for any obviously heavy dependencies that could be replaced

Report findings as:
```
✅ TypeScript: clean
❌ Images: 3 raw <img> tags found at [files]
⚠️ Console logs: 2 found in [files]
```

End with: **VERDICT: DEPLOY READY** or **HOLD — [list critical blockers]**

Critical blockers (must fix before deploy): TypeScript errors, raw img tags, broken netlify.toml.
Warnings (fix soon): console.logs, any types.
