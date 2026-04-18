# Security Audit

Run a comprehensive security audit of the DANVERSE-X codebase.

## Steps

### 1 — Dependency Vulnerabilities
```bash
npm audit --audit-level=high
```
Report all high/critical CVEs. If found, run `npm audit fix` for non-breaking fixes.

### 2 — Secret Exposure Check
Search for patterns that should never be in source code:
```bash
grep -rn "sk-" --include="*.ts" --include="*.tsx" --include="*.js" app/ components/ lib/
grep -rn "ANTHROPIC_API_KEY\|OPENAI_API_KEY\|SECRET_KEY" --include="*.ts" --include="*.tsx" app/ components/ lib/
```
Flag any hits immediately.

### 3 — Client-Side Env Var Audit
```bash
grep -rn "process.env\." --include="*.ts" --include="*.tsx" app/ components/ hooks/
```
Verify every env var accessed on the client has `NEXT_PUBLIC_` prefix.

### 4 — XSS Vectors
```bash
grep -rn "dangerouslySetInnerHTML" --include="*.tsx" --include="*.ts" app/ components/
```
Every hit must be reviewed — only allow sanitized, non-user-controlled content.

### 5 — Eval / Dynamic Code Execution
```bash
grep -rn "eval(\|new Function(" --include="*.ts" --include="*.tsx" app/ components/ lib/
```
Zero tolerance — flag every occurrence.

### 6 — Security Headers (netlify.toml)
Verify `netlify.toml` sets:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `Content-Security-Policy` (at minimum `default-src 'self'`)

### 7 — Third-Party Scripts
Grep for inline `<script>` tags or `eval`-equivalent patterns in JSX.

## Output Format

```
🔍 SECURITY AUDIT — DANVERSE-X

Dependencies:  ✅/❌ [N high/critical CVEs]
Secrets:       ✅/❌ [findings]
Env vars:      ✅/❌ [all NEXT_PUBLIC_ or server-only]
XSS vectors:   ✅/❌ [findings]
Eval usage:    ✅/❌ [findings]
HTTP headers:  ✅/❌ [missing headers]
3rd-party:     ✅/❌ [unvetted scripts]

VERDICT: SECURE / VULNERABILITIES FOUND
Critical (fix now): [list or "none"]
Warnings (fix soon): [list or "none"]
```
