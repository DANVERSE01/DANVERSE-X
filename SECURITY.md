# Security Policy

## Supported Versions

We actively support the following versions of DANVERSE-X:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Features

DANVERSE-X is built with security as a top priority:

### Current Security Measures

- ✅ **No Authentication System** - Zero attack surface for auth-related vulnerabilities
- ✅ **No Backend APIs** - Pure static site generation, no server-side vulnerabilities
- ✅ **No Database** - No SQL injection or data breach risks
- ✅ **Environment Variables** - Sensitive data externalized and never committed
- ✅ **Build Validation** - TypeScript strict mode catches errors at compile time
- ✅ **Dependency Audits** - Regular security audits via GitHub Actions
- ✅ **CSP Headers** - Content Security Policy configured (via Vercel)
- ✅ **HTTPS Only** - Forced HTTPS in production

### Removed Attack Vectors

The following were removed in production improvements:

- ❌ Insecure cookie-based admin authentication
- ❌ Unprotected API routes
- ❌ Middleware with authentication vulnerabilities
- ❌ Third-party tracking scripts (GA, GTM)

## Reporting a Vulnerability

### How to Report

If you discover a security vulnerability in DANVERSE-X, please report it responsibly:

**DO NOT** open a public GitHub issue for security vulnerabilities.

**Instead, please:**

1. **Email us directly**: danverseai@outlook.com
2. **Subject line**: "[SECURITY] Vulnerability Report - DANVERSE-X"
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
   - Your contact information

### What to Expect

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution Timeline**: Depends on severity
  - Critical: 1-3 days
  - High: 3-7 days
  - Medium: 7-14 days
  - Low: 14-30 days

### Responsible Disclosure

We follow responsible disclosure practices:

1. **You report** the vulnerability privately
2. **We acknowledge** receipt within 48 hours
3. **We investigate** and develop a fix
4. **We deploy** the fix to production
5. **We notify** you when it's safe to disclose
6. **We credit** you (if desired) in the changelog

## Security Best Practices for Contributors

### When Contributing

1. **Never commit secrets**
   - No API keys in code
   - No passwords or tokens
   - Use `.env.local` for sensitive data

2. **Validate all inputs**
   - Sanitize user inputs
   - Use TypeScript for type safety
   - Validate environment variables

3. **Keep dependencies updated**
   ```bash
   pnpm audit
   pnpm update
   ```

4. **Follow secure coding practices**
   - Use ESLint security rules
   - Avoid `eval()` and `dangerouslySetInnerHTML`
   - Sanitize URLs and external content

### Security Checklist for PRs

Before submitting a pull request:

- [ ] No secrets or API keys committed
- [ ] Dependencies are up to date
- [ ] No security warnings from `pnpm audit`
- [ ] TypeScript strict mode passes
- [ ] ESLint security rules pass
- [ ] Environment variables properly documented

## Security Updates

### Staying Informed

We announce security updates through:

- GitHub Security Advisories
- Repository releases
- CHANGELOG.md updates

### Automatic Dependency Updates

We use:

- GitHub Dependabot for dependency updates
- GitHub Actions for automated security scans
- npm audit in CI/CD pipeline

## Third-Party Dependencies

### Trusted Sources Only

We only use dependencies from:

- Official npm registry
- Verified publishers
- Well-maintained projects with active communities

### Regular Audits

We perform regular security audits:

```bash
# Run security audit
pnpm audit

# Fix vulnerabilities
pnpm audit fix
```

## Privacy & Data Protection

### Data Collection

DANVERSE-X does **NOT** collect:

- Personal user data
- Analytics or tracking data (GA/GTM removed)
- Cookies (except essential ones)
- Form submissions (handled client-side only)

### External Services

The only external service used:

- **Vercel** - Hosting and CDN (GDPR compliant)

## Contact

For security-related inquiries:

**Email**: danverseai@outlook.com  
**Subject**: [SECURITY] Your Subject  
**Website**: https://danverse.ai

---

**Security is a top priority. Thank you for helping keep DANVERSE-X secure! 🔒**

Last Updated: December 5, 2025
