---
name: security
description: Security rules and patterns for DANVERSE-X — XSS prevention, CSP, secure headers, environment variable handling. Auto-loaded for any work touching user input, APIs, or deployment config.
trigger: security|xss|csp|headers|sanitize|env var|api key|secret|vulnerability|auth|injection
---

# Security — DANVERSE-X

## Environment Variables

### Rule: Never in Client Bundle
Only `NEXT_PUBLIC_` prefixed vars are safe on the client. All others are server-only.

```ts
// ✅ Safe — client accessible
const endpoint = process.env.NEXT_PUBLIC_API_URL;

// ❌ NEVER — exposes secret to client bundle
const apiKey = process.env.ANTHROPIC_API_KEY;
```

### .env Discipline
- `.env.local` — local secrets (gitignored)
- `.env.example` — template with no real values (committed)
- Never commit `.env` or `.env.local`

## XSS Prevention

### dangerouslySetInnerHTML
```tsx
// ❌ NEVER with user input
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Only with sanitized, controlled content
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />

// ✅ Best — avoid it entirely, use React's JSX
```

### Dynamic Content
- URL params → always validate/sanitize before rendering
- Never use `eval()`, `Function()`, or `setTimeout(string)`
- Template literals with user data → use `textContent`, not `innerHTML`

## Content Security Policy

Required in `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = """
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: blob: https:;
      media-src 'self' blob:;
      connect-src 'self' https:;
      worker-src 'self' blob:;
    """
```

> Note: Three.js WebGL and GSAP may require `'unsafe-eval'` — this is acceptable for a portfolio site.

## Dependency Security

Run regularly:
```bash
npm audit --audit-level=moderate
```

Keep dependencies updated — old deps are the #1 attack surface for portfolios.

## Netlify-Specific

- Use Netlify Environment Variables UI for production secrets — never in `netlify.toml`
- Enable "Deploy notifications" — get alerted on failed/suspicious deploys
- Enable branch protection — only `main` auto-deploys

## Third-Party Scripts

- All `<Script>` tags must use `next/script` — never raw `<script>` in JSX
- External scripts must be vetted — check for supply chain risks
- Prefer `strategy="lazyOnload"` for analytics

## Secret Scanning Patterns (never in code)

```
sk-ant-*         ← Anthropic API key
sk-*             ← OpenAI API key
ghp_*            ← GitHub Personal Access Token
netlify_*        ← Netlify token
AKIA*            ← AWS access key
```

If any are found in git history: rotate immediately, then use `git filter-repo` to purge.
